import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../context/global';

function Gallery({selectedCharacter}) {
    const { getAnimePictures, getCharacters, pictures } = useGlobalContext();
    const [voiceActors, setVoiceActors] = useState([]);
    const { id } = useParams();

    // Estados
    const [index, setIndex] = useState(0);
    const [biography, setBiography] = useState('');

    const handleImageClick = (i) => {
        setIndex(i);
        // Obtener la biografía del personaje seleccionado
        const characterId = pictures[i]?.character?.mal_id;
        if (characterId) {
          getCharacterBiography(characterId);
        }
      };

    const filteredVoiceActors = selectedCharacter
    ? selectedCharacter.voice_actors
    : [];

    // Obtener la biografía del personaje
    const getCharacterBiography = async (characterId) => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/character/${characterId}`);
            const data = await response.json();
            setBiography(data.data.biography);
        } catch (error) {
            console.error('Error fetching character biography:', error);
        }
    };

    // Obtener actores de voz
    const getVoiceActors = async (animeId) => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/characters_staff`);
      
            if (response.status === 404) {
                console.warn(`Anime characters and staff not found for anime ID: ${animeId}`);
                setVoiceActors([]); // Set voiceActors to an empty array
            } else if (response.ok) {
                const data = await response.json();
          
                if (data?.data?.characters_staff) {
                    const voiceActorsData = data.data.characters_staff
                        .filter(character => character.role === "Main" && character.voice_actors?.length > 0);
              
                    setVoiceActors(voiceActorsData);
                    console.log('Voice Actors Data:', voiceActorsData);
                } else {
                    console.error('Invalid API response:', data);
                    setVoiceActors([]); // Set voiceActors to an empty array
                }
            } else {
                console.error(`Error fetching voice actors. Status: ${response.status}`);
                setVoiceActors([]); // Set voiceActors to an empty array
            }
        } catch (error) {
            console.error('Error fetching voice actors:', error);
            setVoiceActors([]); // Set voiceActors to an empty array
        }
    };

    useEffect(() => {
        getAnimePictures(id);
        getVoiceActors(id);
    }, [id]);
    return (
        <GalleryStyled>
      <div className="big-image" style={{ marginTop: 100 }}>
        <img src={pictures[index]?.jpg.image_url} alt="" />
        {biography && <p className="biography">{biography}</p>}
      </div>
      <div className="small-images">
        {pictures?.map((picture, i) => (
          <div
            className="image-con"
            onClick={() => {
              handleImageClick(i);
            }}
            key={i}
          >
            <img
              src={picture?.jpg.image_url}
              style={{
                border: i === index ? '3px solid #27AE60' : '3px solid #e5e7eb',
                filter: i === index ? 'grayscale(0)' : 'grayscale(60%)',
                transform: i === index ? 'scale(1.1)' : 'scale(1)',
                transition: 'all .3s ease-in-out',
              }}
              alt=""
            />
          </div>
        ))}
            </div>
            <h3 className="title">Voice Actors</h3>
            <div className="voice-actors">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Language</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVoiceActors.map((actor, actorIndex) => (
                            <tr key={actorIndex}>
                                <td>{actor.person.name}</td>
                                <td>{actor.language}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </GalleryStyled>
    );
}


const GalleryStyled = styled.div`
    background-color: #EDEDED;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    .back{
        position: absolute;
        top: 2rem;
        left: 2rem;
        a{
            font-weight: 600;
            text-decoration: none;
            color: #EB5757;
            display: flex;
            align-items: center;
            gap: .5rem;
        }
    }
    .big-image{
        display: inline-block;
        padding: 2rem;
        margin: 2rem 0;
        background-color: #fff;
        border-radius: 7px;
        border: 5px solid #e5e7eb;
        position: relative;
        img{
            width: 350px;
        }
    }

    .small-images{
        display: flex;
        flex-wrap: wrap;
        gap: .5rem;
        width: 80%;
        padding: 2rem;
        border-radius: 7px;
        background-color: #fff;
        border: 5px solid #e5e7eb;
        img{
            width: 6rem;
            height: 6rem;
            object-fit: cover;
            cursor: pointer;
            border-radius: 5px;
            border: 3px solid #e5e7eb;
        } 
    }
    .voice-actors {
        margin-top: 2rem;

        h2 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }

        ul {
            list-style: none;
            padding: 0;

            li {
                margin-bottom: 1.5rem;

                strong {
                    font-size: 1.2rem;
                    display: block;
                }

                p {
                    margin: 0.5rem 0;
                }

                ul {
                    list-style: none;
                    padding: 0;

                    li {
                        margin-top: 1rem;

                        img {
                            width: 80px;
                            height: 80px;
                            object-fit: cover;
                            border-radius: 50%;
                            margin-top: 0.5rem;
                        }
                    }
                }
            }
        }
    }
`;

export default Gallery