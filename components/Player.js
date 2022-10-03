import { useSession } from "next-auth/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";

//import icons
import {
  ArrowsRightLeftIcon,
  BackwardIcon,
  ForwardIcon,
  PauseCircleIcon as PauseIcon,
  PlayCircleIcon as PlayIcon,
  ArrowPathRoundedSquareIcon as ReplayIcon,
  SpeakerWaveIcon as VolumeUpIcon,
  SpeakerXMarkIcon as VolumeDownIcon,
} from "@heroicons/react/24/solid";
import { debounce } from "lodash";

export const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();
  //   console.log(songInfo);

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  // Using the slider to change the volume will send a request for every point on the slider, this will rate limit. We prevent this with debounce which will only update the value every 500ms if a change occurs
  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume);
    }, 200),
    []
  );

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

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume, debouncedAdjustVolume]);

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      {/* left section */}
      <div className="flex items-center space-x-4">
        {songInfo && (
          <div className="hidden md:inline">
            <div className="relative w-10 h-10">
              <Image
                src={songInfo?.album?.images?.[0].url}
                layout="fill"
                alt="song art"
                className=""
              />
            </div>
          </div>
        )}

        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      {/* center section */}
      <div className="flex items-center justify-evenly">
        {/* we use custom tailwind "button" */}
        <ArrowsRightLeftIcon className="button" />
        <BackwardIcon className="button" onClick={() => spotifyApi.skipToPrevious()} />

        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="button w-10 h-10" />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />
        )}

        <ForwardIcon className="button" />
        <ReplayIcon className="button" />
      </div>

      {/* right section */}
      <div className="flex items-center space-x-3 md:space-x-4 justify-end">
        <VolumeDownIcon onClick={() => volume > 0 && setVolume(volume - 10)} className="button" />
        <input
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          type="range"
          min={0}
          max={100}
          className="w-14 md:w-28"
        />
        <VolumeUpIcon onClick={() => volume < 100 && setVolume(volume + 10)} className="button" />
      </div>
    </div>
  );
};
