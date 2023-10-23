import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import TrackList from "./components/TrackList";
import ChosenTrackList from "./components/ChosenTrackList";
import Header from "./components/Header";
import { searchSongs } from "./api";
import { getInitialAccessToken } from "./api";
import {
  getAccessToken,
  getUserId,
  createAPlaylist,
  addTracksToPlaylist,
  generateTrackURIs,
} from "./utils/spotifyHelperFns";
import "./styles.css";

function App() {
  const [tracks, setTracks] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [chosenTracks, setChosenTracks] = useState(() => {
    const storedChosenTracks = localStorage.getItem("chosenTracks");
    return storedChosenTracks ? JSON.parse(storedChosenTracks) : [];
  });
  const [playlistName, setPlaylistName] = useState("");


  useEffect(() => {
    // after the re-render post authorization
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");

    const storedChosenTracks = localStorage.getItem("chosenTracks");
    if (storedChosenTracks) {
      setChosenTracks(JSON.parse(storedChosenTracks));
    }

    async function handlePlaylist() {
      if (code) {
        const token = await getAccessToken(code, setAccessToken);
        const userID = await getUserId(token);

        const defaultPlaylistName = "My playlist";
        const storedPlaylistName = localStorage.getItem("playlistName");
        const parsedStoredPlaylistName = JSON.parse(storedPlaylistName);
        const finalPlaylistName =
          parsedStoredPlaylistName === null
            ? defaultPlaylistName
            : parsedStoredPlaylistName;

        const playlistDataId = await createAPlaylist(token, userID, finalPlaylistName);

        const generatedTrackURIs = generateTrackURIs(chosenTracks);
        await addTracksToPlaylist(token, playlistDataId, generatedTrackURIs);
        setChosenTracks([]);
        localStorage.removeItem("chosenTracks");
        setPlaylistName("");
        localStorage.removeItem("playlistName");
      }
    }
    handlePlaylist();
  }, []);
  
  const handlePlaylistNameChange = (name) => {
    setPlaylistName(name);
    localStorage.setItem("playlistName", JSON.stringify(name));
  };

  const handleSearchSubmit = async (songTitle) => {
    let initialToken = await getInitialAccessToken();
    const results = await searchSongs(songTitle, initialToken);
    setTracks(results);
  };

  const addTrackById = (id) => {
    const trackToAdd = tracks.find((track) => track.id === id);

    if (!chosenTracks.some((chosenTrack) => chosenTrack.id === id)) {
      setChosenTracks((prevChosenTracks) => [...prevChosenTracks, trackToAdd]);
      localStorage.setItem(
        "chosenTracks",
        JSON.stringify([...chosenTracks, trackToAdd])
      );
    }
  };

  const removeChosenTrackById = (id) => {
    const updatedChosenTracks = chosenTracks.filter(
      (chosenTrack) => chosenTrack.id !== id
    );
    setChosenTracks(updatedChosenTracks);
    localStorage.setItem("chosenTracks", JSON.stringify(updatedChosenTracks));
  };

  return (
    <div className="container">
      <Header />
      <div className="row mt-5 pt-5 pb-3">
        <div className="col-md-12 d-flex justify-content-center align-items-center p-4">
          <SearchBar onSubmit={handleSearchSubmit} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-2">
          <TrackList tracks={tracks} onAdd={addTrackById} />
        </div>
        <div className="col-md-6 mb-2">
          <ChosenTrackList
            chosenTracks={chosenTracks}
            onRemove={removeChosenTrackById}
            onPlaylistNameChange={handlePlaylistNameChange}
            value={playlistName}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
