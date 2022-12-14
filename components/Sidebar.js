import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import { signOut, useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";

// icons import
import {
  HomeIcon,
  MagnifyingGlassIcon as SearchIcon,
  BuildingLibraryIcon as LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
  ArrowLeftOnRectangleIcon as LogoutIcon,
} from "@heroicons/react/24/outline";

function Sidebar() {
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36">
      <div className="space-y-4">
        {/* <button
          className="flex items-centre space-x-2 hover:text-white"
          onClick={() => signOut({ callbackUrl: `/login` })}
        >
          <LogoutIcon className="h-5 w-5 " />
          <p>Logout</p>
        </button> */}
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5 " />
          <p>Home</p>
        </button>
        <button className="flex items-centre space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5 " />
          <p>Search</p>
        </button>
        <button className="flex items-centre space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5 " />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-centre space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5 " />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-centre space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5 text-blue-500" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-centre space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5 text-green-500" />
          <p>Your Playlists</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {/* playlists */}
        {playlists.map((playlist) => (
          <p
            key={playlist.id}
            className="cursor-pointer hover:text-white"
            onClick={() => setPlaylistId(playlist.id)}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
