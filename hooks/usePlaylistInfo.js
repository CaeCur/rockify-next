import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import useSpotify from "./useSpotify";

const usePlaylistInfo = () => {
  const spotifyApi = useSpotify();
  const [currentPlaylistId, setCurrentPlaylistId] = useRecoilState(playlistIdState);
  const [playlistInfo, setPlaylistInfo] = useState(null);

  useEffect(() => {
    const fetchPlaylistInfo = async () => {
      if (currentPlaylistId) {
        const playlistInfo = await fetch(
          `https://api.spotify.com/v1/playlists/${currentPlaylistId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then((res) => res.json());

        setPlaylistInfo(playlistInfo);
      }
    };
    fetchPlaylistInfo();
  }, [currentPlaylistId, spotifyApi]);

  return playlistInfo;
};

export default usePlaylistInfo;
