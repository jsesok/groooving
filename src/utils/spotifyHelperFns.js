// all the functions below are used after the authorization, i.e. after the redirectURI kicks in

export async function getAccessToken(code, setAccessToken) {
  const redirectUri = 'https://groooving.netlify.app/';

  let codeVerifier = localStorage.getItem('code_verifier');

  let body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
    client_id: process.env.REACT_APP_CLIENT_ID,
    code_verifier: codeVerifier,
  });

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body,
    });

    if (!response.ok) {
      throw new Error('HTTP status ' + response.status);
    }

    const data = await response.json();
    localStorage.setItem('access_token', data.access_token);
    setAccessToken(data.access_token);
    return data.access_token;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function getUserId(accessToken) {
  try {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    const data = await response.json();
    return data.id;
  } catch(error) {
    console.error('Error:', error);
  }

}

export async function createAPlaylist(accessToken, userId, tracklistName) {
  try {
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: tracklistName,
        public: false,
      }),
    });
    if (!response.ok) {
      throw new Error('HTTP status ' + response.status);
    }
    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function addTracksToPlaylist(accessToken, playlistId, trackURIs) {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: trackURIs,
      }),
    });

    if (!response.ok) {
      throw new Error('HTTP status ' + response.status);
    }

    const data = await response.json();
  } catch (error) {
    console.error("Error adding tracks to the playlist:", error);
  }
}

export function generateTrackURIs(chosenTracks) {
  const trackURIs = [];
  chosenTracks.forEach((chosenTrack) =>
    trackURIs.push(`spotify:track:${chosenTrack.id}`)
  );
  return trackURIs;
}

