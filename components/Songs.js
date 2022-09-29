import { Song } from "./Song";
import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";

const Songs = () => {
  const playlist = useRecoilValue(playlistState);

  return (
    <div className="px-8 flex flex-col space-y-1 pb-28 text-white">
      {playlist?.tracks.items.map((track, idx) => {
        return <Song key={track.track.id} track={track} order={idx} />;
      })}
    </div>
  );
};

export default Songs;
