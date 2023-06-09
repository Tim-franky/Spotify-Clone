import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";

export default function CurrentTrack() {
  let [{ token, currentlyPlaying }, dispatch] = useStateProvider();
  console.log("component", currentlyPlaying);
  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      let currentlyPlayingInit;
      if (response.data !== "") {
        const { item } = response.data;
        currentlyPlayingInit = {
          id: item.id,
          name: item.name,
          artists: item.artists.map((artist) => artist.name),
          image: item.album.images[2].url,
        };
      }
      dispatch({
        type: reducerCases.SET_PLAYING,
        currentlyPlaying: currentlyPlayingInit,
      });
      dispatch({
        type: reducerCases.SET_PLAYER_STATE,
        playerState: response.data.is_playing,
      });
    };
    getCurrentTrack();
  }, [token, dispatch]);

  return (
    <Container>
      {currentlyPlaying && (
        <div className="track">
          <div className="track__image">
            <img src={currentlyPlaying.image} alt="currentlyPlaying" />
          </div>
          <div className="track__info">
            <h4>{currentlyPlaying.name}</h4>
            <h6>{currentlyPlaying.artists.join(", ")}</h6>
          </div>
        </div>
      )}
    </Container>
  );
}
const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;

    &__info {
      display: flex;
      flex-direction: column;
      gap: 0 rem;
      h4 {
        color: white;
        margin: 0px;
      }
      h6 {
        color: #b3b3b3;
        margin: 0px;
      }
    }
  }
`;
