import youtube_dl
from spotipy import Spotify

def spotifyToYT(link, access_token):
    link = link[34:45]
    sp = Spotify(auth=access_token)
    youtube_url = f"https://www.youtube.com/watch?v={link}"
    video = youtube_dl.YoutubeDL({'quiet': True}).extract_info(
            youtube_url, download=False
        )
    try:
        artist = video['artist']
        songName = video['track']
        searchquery = 'track:'+songName+' '+'artist:'+artist
    except:
        artist = ''
        songName = ''
        searchquery = video['title']

    if songName==None:
        searchquery = video['title']

    data = sp.search(q=searchquery)
    new_url = 'https://open.spotify.com/track/'
    try:
        new_url+= data['tracks']['items'][0]['id']
        return new_url
    except:
        return 'error'