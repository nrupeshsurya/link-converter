from spotipy.oauth2 import SpotifyOAuth
from flask import Flask, url_for, session, request, redirect, jsonify
from flask_cors import cross_origin, CORS
import time
from .util import spotifyToYT, YTtoSpotify, profileDetails
import os
from dotenv import load_dotenv
load_dotenv()


# App config
app = Flask(__name__)
cors = CORS(app)

app.secret_key = 'SOMETHING-RANDOM'
app.config['SESSION_COOKIE_NAME'] = 'spotify-login-session'

@app.route('/login',methods=['GET'])
@cross_origin()
def login():
    sp_oauth = create_spotify_oauth()
    auth_url = sp_oauth.get_authorize_url()
    print(auth_url)
    return jsonify({'link':auth_url})
    # return redirect(auth_url)

@app.route('/authorize')
@cross_origin()
def authorize():
    sp_oauth = create_spotify_oauth()
    session.clear()
    code = request.args.get('code')
    token_info = sp_oauth.get_access_token(code)
    session["token_info"] = token_info
    return "success"
    # return redirect("/home")

@app.route('/logout')
def logout():
    for key in list(session.keys()):
        session.pop(key)
    return redirect('https://accounts.spotify.com/en/logout')

@app.route('/convertSpotify')
@cross_origin()
def convertSpotify():
    session['token_info'], authorized = get_token()
    session.modified = True
    if not authorized:
        #TODO: tell frontend to redirect
        return redirect('/login')
    # link = request.form['link']
    link = 'https://music.youtube.com/watch?v=vU05Eksc_iM&feature=share'
    linkToReturn = spotifyToYT(link,session.get('token_info').get('access_token'))
    data = {
        'link': linkToReturn
    }
    return jsonify(data)

@app.route('/convertYoutube')
@cross_origin()
def convertYoutube():
    session['token_info'], authorized = get_token()
    session.modified = True
    if not authorized:
        #TODO: tell frontend to redirect
        return redirect('/login')
    # link = request.form['link']
    link = 'https://open.spotify.com/track/7jzyD37KmUByt9qUKL8cWH?si=ec0fcadb838248c5'
    linkToReturn = YTtoSpotify(link,session.get('token_info').get('access_token'))
    data = {
        'link': linkToReturn
    }
    return jsonify(data)

@app.route('/home')
@cross_origin()
def home():
    session['token_info'], authorized = get_token()
    session.modified = True
    if not authorized:
        #TODO: tell frontend to redirect
        return redirect('/login')
    # link = request.form['link']
    data = profileDetails(session.get('token_info').get('access_token'))
    return jsonify(data)

# Checks to see if token is valid and gets a new token if not
def get_token():
    token_valid = False
    token_info = session.get("token_info", {})

    # Checking if the session already has a token stored
    if not (session.get('token_info', False)):
        token_valid = False
        return token_info, token_valid

    # Checking if token has expired
    now = int(time.time())
    is_token_expired = session.get('token_info').get('expires_at') - now < 60

    # Refreshing token if it has expired
    if (is_token_expired):
        sp_oauth = create_spotify_oauth()
        token_info = sp_oauth.refresh_access_token(session.get('token_info').get('refresh_token'))

    token_valid = True
    return token_info, token_valid

def create_spotify_oauth():
    return SpotifyOAuth(
            client_id=os.getenv('client_id'),
            client_secret=os.getenv('client_secret'),
            redirect_uri=url_for('authorize', _external=True),
            scope=["user-read-private", "user-read-email"])