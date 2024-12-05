const authEndpoints = "https://accounts.spotify.com/authorize?"
const cliendID = "4062d8e168554706bea6c309e6f2ce98"
const redirectURI = 'http://localhost:3000/'
const scopes = ["user-library-read", "playlist-read-private"]


export const loginEndpoint = `${authEndpoints}client_id=${cliendID}&redirect_uri$
    =${redirectURI}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`

