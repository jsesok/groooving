import ChosenTrackItem from "./ChosenTrackItem";
import { generateRandomString } from "../utils/chosenTrackListHelperFns";
import { generateCodeChallenge } from "../utils/chosenTrackListHelperFns";

function ChosenTrackList({
  chosenTracks,
  onRemove,
  onPlaylistNameChange,
  value,
}) {

  const handleChange = (e) => {
    onPlaylistNameChange(e.target.value);
  };

  const renderedChosenTracks = chosenTracks.map((chosenTrack) => {
    return (
      <ChosenTrackItem
        chosenTrack={chosenTrack}
        key={chosenTrack.id}
        id={chosenTrack.id}
        onRemove={onRemove}
      />
    );
  });

  // authorization process
  async function handleSaveToSpotifyClick() {
    const redirectUri = "http://localhost:3000";

    let codeVerifier = generateRandomString(128);

    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const state = generateRandomString(16);
    const scope =
      "playlist-modify-public playlist-modify-private user-read-private user-read-email";

    localStorage.setItem("code_verifier", codeVerifier);

    let args = new URLSearchParams({
      response_type: "code",
      client_id: process.env.REACT_APP_CLIENT_ID,
      scope: scope,
      redirect_uri: redirectUri,
      state: state,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
    });
    window.location = "https://accounts.spotify.com/authorize?" + args;
  }

  return (
    <div className="container bg-dark bg-opacity-75 custom-min-height">
      <div className="p-1 d-flex justify-content-center align-items-center mb-4">
        <input
          className="form-control form-control-lg shadow-none transparent-background"
          value={value}
          name={value}
          placeholder="Add a playlist title"
          onChange={handleChange}
        />
      </div>
      <div className="">{renderedChosenTracks}</div>
      <div className="p-4 mt-4 d-flex justify-content-center align-items-center">
        <button
          className="btn btn-primary rounded-pill"
          onClick={handleSaveToSpotifyClick}
          disabled={chosenTracks.length === 0}
        >
          SAVE TO SPOTIFY
        </button>
      </div>
    </div>
  );
}

export default ChosenTrackList;
