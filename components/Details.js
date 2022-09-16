import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { shuffle } from "lodash";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

//import icons
import { ChevronDownIcon, MusicalNoteIcon } from "@heroicons/react/24/outline";
import spotifyApi from "../lib/spotify";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

export const Details = () => {
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState); //Recoil allows you to pull read only version of state
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  const { data: session } = useSession();
  const spotifyApi = useSpotify();

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log("Something went wrong while fetching playlist data: ", err));
  }, [spotifyApi, playlistId]);

  console.log(playlist);

  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-red-300 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
          <div className="relative w-10 h-10">
            {session?.user.image ? (
              <Image
                src={session.user.image}
                alt="user image"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            ) : (
              <MusicalNoteIcon />
            )}
          </div>

          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b ${color} to-black h-80 text-white padding-8`}
      >
        <div className="relative w-44 h-44">
          <Image
            src={playlist?.images?.[0].url}
            alt="playlist art"
            layout="fill"
            className="shadow-2xl"
          />
        </div>
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
};
