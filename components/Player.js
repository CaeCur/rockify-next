import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";

export const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();
  //   console.log(songInfo);

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      //fetch song info
      if (!songInfo) {
        spotifyApi.getMyCurrentPlayingTrack().then((data) => {
          console.log("Now Playing: ", data.body?.item);
          setCurrentTrackId(data.body?.item?.id);

          spotifyApi.getMyCurrentPlaybackState().then((data) => {
            setIsPlaying(data.body?.is_playing);
          });
        });
      }
      setVolume(50);
    }
  }, [currentTrackId, setCurrentTrackId, setIsPlaying, songInfo, spotifyApi, session]);

  return (
    <div>
      {/* left section */}
      <div className="relative w-10 h-10">
        <Image src={songInfo?.album?.images?.[0].url} layout="fill" alt="song art" />
      </div>
    </div>
  );
};
