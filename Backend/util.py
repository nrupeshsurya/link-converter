import youtube_dl
from spotipy import Spotify
from ytmusicapi import YTMusic

ytmusic = YTMusic()

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

def YTtoSpotify(link, access_token):
    song_id=''   
    l = len(link)
    for i in range(l):
        if link[l-i-1]=='/':
            break
        song_id+=link[l-i-1]
    song_id = song_id[::-1]

    sp = Spotify(auth=access_token)
    data = sp.track(song_id)

    songName = data['name']
    artistName = data['artists'][0]['name']

    search = ytmusic.search(query=songName+' '+artistName,filter='songs')
    backupSearch = ytmusic.search(query=songName+' '+artistName)

    url='https://music.youtube.com/watch?v='
    try:
        url+=search[0]['videoId']
    except:
        url+=backupSearch[1]['videoId']

    return url

def profileDetails(access_token):
    sp = Spotify(auth=access_token)
    data = sp.me()
    return data
    pass