import TrackItem from "./TrackItem";

function TrackList({ tracks, onAdd }) {
  const renderedTracks = tracks.map((track) => {
    return <TrackItem track={track} onAdd={onAdd} key={track.id} id={track.id} />
  })

  return <div className="container bg-dark bg-opacity-75 custom-min-height">
    <div className="p-2">
      {tracks && <h2 className="text-center pb-3">Results</h2>}
    </div>
    <div>
      {renderedTracks}
    </div>
  </div>
}

export default TrackList;