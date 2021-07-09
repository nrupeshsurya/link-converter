import spotipy
from spotipy.oauth2 import SpotifyOAuth
from flask import Flask, url_for, session, request, redirect, jsonify, send_from_directory
from flask_cors import cross_origin, CORS
import time
from .util import spotifyToYT, YTtoSpotify, profileDetails
import os
from dotenv import load_dotenv
# from flask_session import Session
load_dotenv()


# App config
app = Flask(__name__, static_url_path='', static_folder='../Frontend/spotify-youtube/build')
cors = CORS(app, supports_credentials=True)

app.secret_key = '\xfd{H\xe5<\x95\xf9\xe3\x96.5\xd1\x01O<!\xd5\xa2\xa0\x9fR"\xa1\xa8'
app.config['SESSION_COOKIE_NAME'] = 'spotify-login-session'

class FlaskSessionCacheHandler(spotipy.cache_handler.CacheHandler):
    """
    A cache handler that stores the token info in the session framework
    provided by Django.
    Read more at https://docs.djangoproject.com/en/3.2/topics/http/sessions/
    """

    def __init__(self, session):
        """
        Parameters:
            * request: HttpRequest object provided by Django for every
            incoming request
        """
        self.session = session

    def get_cached_token(self):
        token_info = None
        try:
            token_info = self.session.get("token_info", {})
        except KeyError:
            print("Token not found in the session")

        return token_info

    def save_token_to_cache(self, token_info):
        try:
            self.session['token_info'] = token_info
        except Exception as e:
            print("Error saving token to cache: " + str(e))

    def modify_token(self):
        self.session.modified = True

    def logout_session(self):
        for key in list(self.session.keys()):
            self.session.pop(key)
        pass

    def clear_session(self):
        self.session.clear()
        
flaskSessionCacheHandler = FlaskSessionCacheHandler(session)

@app.route('/login',methods=['GET'])
@cross_origin()
def login():
    sp_oauth = create_spotify_oauth()
    auth_url = sp_oauth.get_authorize_url()
    print(auth_url)
    return jsonify({'link':auth_url})

@app.route('/authorize')
@cross_origin()
def authorize():
    sp_oauth = create_spotify_oauth()
    # session.clear()
    flaskSessionCacheHandler.clear_session()
    code = request.args.get('code')
    token_info = sp_oauth.get_access_token(code)
    flaskSessionCacheHandler.save_token_to_cache(token_info)
    # session["token_info"] = token_info
    # session.modified = True
    # session.new = True
    return redirect(f"{os.getenv('backend_url')}/Dashboard")

@app.route('/logout', methods=['GET'])
@cross_origin(supports_credentials=True)
def logout():
    for key in list(session.keys()):
        session.pop(key)
    return jsonify({'link': 'https://accounts.spotify.com/en/logout'})

@app.route('/convertSpotify', methods=['POST', 'GET'])
@cross_origin(supports_credentials=True)
def convertSpotify():
    token_info, authorized = get_token()
    if not authorized:
        return jsonify({'authorize' : False})
    flaskSessionCacheHandler.save_token_to_cache(token_info)
    flaskSessionCacheHandler.modify_token()
    link = request.form['link']
    # link = 'https://music.youtube.com/watch?v=vU05Eksc_iM&feature=share'
    linkToReturn = YTtoSpotify(link,session.get('token_info').get('access_token'))
    data = {
        'link': linkToReturn,
        'authorize' : True
    }
    return jsonify(data)

@app.route('/convertYoutube', methods=['POST'])
@cross_origin(supports_credentials=True)
def convertYoutube():
    token_info, authorized = get_token()
    if not authorized:
        return jsonify({'authorize' : False})
    flaskSessionCacheHandler.save_token_to_cache(token_info)
    flaskSessionCacheHandler.modify_token()
    
    link = request.form['link']
    print(link)
    #link = 'https://open.spotify.com/track/7jzyD37KmUByt9qUKL8cWH?si=ec0fcadb838248c5'
    linkToReturn = spotifyToYT(link,session.get('token_info').get('access_token'))
    data = {
        'link': linkToReturn,
        'authorize': True
    }
    return jsonify(data)

@app.route('/home')
@cross_origin(supports_credentials=True)
def home():
    token_info, authorized = get_token()
    if not authorized:
        print("here")
        return jsonify({'authorize':False})
    flaskSessionCacheHandler.save_token_to_cache(token_info)
    print(token_info)
    print(authorized)
    flaskSessionCacheHandler.modify_token()
    
    # link = request.form['link']
    data = profileDetails(session.get('token_info').get('access_token'))
    data['authorize'] = True
    return jsonify(data)

@app.route('/checkLogin', methods = ['GET'])
@cross_origin(supports_credentials=True)
def checkLogin():
    token_info, authorized = get_token()
    if not authorized:
        print("here")
        return jsonify({'authorize':False})
    # flaskSessionCacheHandler.save_token_to_cache(token_info)
    # print(token_info)
    # print(authorized)
    # flaskSessionCacheHandler.modify_token()
    return jsonify({'authorize':True})

# Checks to see if token is valid and gets a new token if not
# @cross_origin(supports_credentials=True)
def get_token():
    token_valid = False
    # token_info = session.get("token_info", {})
    token_info = flaskSessionCacheHandler.get_cached_token()
    # Checking if the session already has a token stored
    if token_info=={}:
        token_valid = False
        return token_info, token_valid

    # Checking if token has expired
    now = int(time.time())
    is_token_expired = token_info.get('expires_at') - now < 60

    # Refreshing token if it has expired
    if (is_token_expired):
        sp_oauth = create_spotify_oauth()
        token_info = sp_oauth.refresh_access_token(token_info.get('refresh_token'))

    token_valid = True
    return token_info, token_valid

def create_spotify_oauth():
    return SpotifyOAuth(
            client_id=os.getenv('client_id'),
            client_secret=os.getenv('client_secret'),
            redirect_uri=url_for('authorize', _external=True),
            scope=["user-read-private", "user-read-email"],
            cache_handler=flaskSessionCacheHandler)

@app.route("/", defaults={'path':''})
@app.route('/<path:path>')
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

@app.errorhandler(404)   
def not_found(e):   
  return send_from_directory(app.static_folder,'index.html')