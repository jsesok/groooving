// all the functions below are used before the authorization, i.e. before the redirectURI kicks in
import axios from "axios";
const baseUrl = "https://api.spotify.com/v1/search";

export async function getInitialAccessToken() {
  let body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: process.env.REACT_APP_CLIENT_ID,
    client_secret: process.env.REACT_APP_CLIENT_SECRET,
  });
  try {
    const response = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body,
      }
    );
    let data = await response.json();
    return data.access_token;
  } catch (error) {
    console.log("An error occurred:", error);
  }
}

export async function searchSongs(songTitle, token) {
  try {
    const response = await axios.get(`${baseUrl}?q=${songTitle}&type=track`, {
      headers: {
        Authorization:
          `Bearer ${token}` ,
      },
    });
    return response.data.tracks.items;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
