import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Tag } from 'antd';
import Gallery from './Gallery';

function AnimeItem() {
  const { id } = useParams();
  const [anime, setAnime] = useState({});
  const [characters, setCharacters] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const onViewVoiceActors = (character) => {
    setSelectedCharacter(character);
  };

  const {
    title, synopsis, trailer, duration, aired,
    season, images, rank, score, scored_by,
    popularity, status, rating, source
  } = anime;

  const getAnime = async (animeId) => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
      const data = await response.json();
      setAnime(data.data);
    } catch (error) {
      console.error('Error fetching anime:', error);
    }
  };

  const getCharacters = async (animeId) => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/characters`);
      const data = await response.json();
      setCharacters(data.data);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  useEffect(() => {
    getAnime(id);
    getCharacters(id);
  }, [id]);

  return (
    <AnimeItemStyled>
      <h1>{title}</h1>
      <div className="details">
        <div className="detail">
          <div className="image">
            <img src={images?.jpg.large_image_url} alt="" />
          </div>
          <div className="anime-details">
            <p><span>Aired:</span><Tag color="magenta">{aired?.string}</Tag></p>
            <p><span>Rating:</span><Tag color="volcano">{rating}</Tag></p>
            <p><span>Rank:</span><Tag color="orange">{rank}</Tag></p>
            <p><span>Score:</span><Tag color="gold">{score}</Tag></p>
            <p><span>Scored By:</span><Tag color="lime">{scored_by}</Tag></p>
            <p><span>Popularity:</span><Tag color="cyan">{popularity}</Tag></p>
            <p><span>Status:</span><Tag color="geekblue">{status}</Tag></p>
            <p><span>Source:</span><Tag color="purple">{source}</Tag></p>
            <p><span>Season:</span><Tag color="blue">{season}</Tag></p>
            <p><span>Duration:</span><Tag color="green">{duration}</Tag></p>
          </div>
        </div>
        <h1>Bio:</h1>
        <p className="description">
          {showMore ? synopsis : synopsis?.substring(0, 450) + '...'}
          <button onClick={() => setShowMore(!showMore)}>
            {showMore ? 'Show Less' : 'Read More'}
          </button>
        </p>
      </div>
      <h3 className="title">Trailer</h3>
      <div className="trailer-con">
        {trailer?.embed_url ?
          <iframe
            src={trailer?.embed_url}
            title="Inline Frame Example"
            width="800"
            height="450"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
          </iframe> :
          <h3>Trailer no disponible</h3>}
      </div>
      <h3 className="title">Personajes</h3>
    <div className="characters">
      {characters?.map((character, index) => {
        const { role } = character;
        const { images, name, mal_id } = character.character;
        return (
          <div key={index} className="character">
            <img src={images?.jpg.image_url} alt="" />
            <h4>{name}</h4>
            <p>{role}</p>
            <button onClick={() => onViewVoiceActors(character)}>View Voice Actors</button>
          </div>
        );
      })}
    </div>
    {selectedCharacter && (
      <>
        <h3 className="title">Voice Actors</h3>
        <Gallery selectedCharacter={selectedCharacter} />
      </>
    )}
  </AnimeItemStyled>
);
    }
const AnimeItemStyled = styled.div`
  padding: 3rem 18rem;
  background-color: #EDEDED;
  h1 {
    display: inline-block;
    font-size: 3rem;
    margin-bottom: 1.5rem;
    cursor: pointer;
    background: linear-gradient(to right, #A855F7, #27AE60);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all .4s ease-in-out;
    &:hover {
      transform: skew(-3deg);
    }
  }
  .title {
    display: inline-block;
    margin: 3rem 0;
    font-size: 2rem;
    cursor: pointer;
    background: linear-gradient(to right, #A855F7 23%, #27AE60);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .description {
    margin-top: 2rem;
    color: black;
    line-height: 1.7rem;
    button {
      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      font-size: 1.2rem;
      color: #27AE60;
      font-weight: 600;
    }
  }

  .trailer-con {
    display: flex;
    justify-content: center;
    align-items: center;
    iframe {
      outline: none;
      border: 5px solid #e5e7eb;
      padding: 1.5rem;
      border-radius: 10px;
      background-color: Black;
    }
  }

  .details {
    background-color: #fff;
    border-radius: 20px;
    padding: 2rem;
    border: 5px solid black;
    .detail {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      img {
        border-radius: 7px;
      }
    }
    .anime-details {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        display: flex;
        gap: 1rem;
      }
      p span:first-child {
        font-weight: 600;
        color: #454e56;
      }
    }
  }

  .characters {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 2rem;
    background-color: #fff;
    padding: 2rem;
    border-radius: 20px;
    border: 5px solid #e5e7eb;
    .character {
      padding: .4rem .6rem;
      border-radius: 7px;
      background-color: #EDEDED;
      transition: all .4s ease-in-out;
      img {
        width: 100%;
      }
      h4 {
        padding: .5rem 0;
        color: #454e56;
      }
      p {
        color: #27AE60;
      }
      &:hover {
        transform: translateY(-5px);
      }
    }
  }
`;

export default AnimeItem;
