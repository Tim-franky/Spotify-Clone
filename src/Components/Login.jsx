import React from 'react'
import styled from "styled-components"

export default function Login() {
    const handleClick=()=>{
        const clientId = "52f0675b626b41dca6125e69860f1e5b";
        const redirectUrl = "http://localhost:3000/";
        const apiUrl = "https://accounts.spotify.com/authorize";
        const scope = ['user-read-email','user-read-private','user-read-playback-state',
        'user-modify-playback-state',
        'user-read-currently-playing','user-read-playback-position',
        'user-top-read',
        'user-read-recently-played',
        'playlist-read-private',
        'playlist-read-collaborative',
        'playlist-modify-private',
        'playlist-modify-public'
    ];
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}&response_type=token&show_dialogue=true`;

    };  
    return <Container>
        <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png" alt="spotify" />
        <button onClick={handleClick} >Connect Spotify</button>
    </Container>
}

const Container = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width:100vw;
    background-color: black;
    gap: 5rem;
    img{
        height:20vh;
    }
    button{
        padding: 1rem 5rem;
        border-radius: 5rem;
        border:none;
        background-color: #03C988;
        color:black;
        font-size:1.5rem;
        cursor:pointer;
    }
`;