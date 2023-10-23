import { RiAddLine } from "react-icons/ri";

function TrackItem({ track, onAdd, id }) {
  const artistNames = [];

  for (let i = 0; i < track.artists.length; i++) {
    artistNames.push(track.artists[i].name);
  }
  const artistsNames = artistNames.join(", ");

  const handleClick = () => {
    onAdd(id);
  };

  return (
    <div className="container border-bottom p-2">
      <div className="row">
        <div className="col-10">
          <div className="pt-1">
            <h3>{artistsNames}</h3>
          </div>
          <div className="pb-1">
            <p>{track.name}</p>
          </div>
        </div>
        <div className="col-2 d-flex align-items-center justify-content-end">
          <RiAddLine onClick={handleClick} size={40} className="icon"/>
        </div>
      </div>
      
    </div>
  );
}

export default TrackItem;
