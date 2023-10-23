import { IoRemove } from "react-icons/io5";

function ChosenTrackItem({ chosenTrack, onRemove, id }) {
  const artistNames = [];

  for (let i = 0; i < chosenTrack.artists.length; i++) {
    artistNames.push(chosenTrack.artists[i].name);
  }
  const artistsNames = artistNames.join(", ");

  const handleClick = () => {
    onRemove(id);
  };

  return (
    <div className="container border-bottom p-2">
      <div className="row">
        <div className="col-10">
          <div className="pt-1">
            <h3>{artistsNames}</h3>
          </div>
          <div className="pb-1">
            <p>{chosenTrack.name}</p>
          </div>
        </div>
        <div className="col-2 d-flex align-items-center justify-content-end">
          <IoRemove onClick={handleClick} size={40} className="icon" />
        </div>
      </div>
    </div>
  );
}

export default ChosenTrackItem;
