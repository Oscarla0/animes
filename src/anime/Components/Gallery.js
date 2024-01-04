import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../context/global';


function Gallery() {
    const location = useLocation();
    const character = location.state?.character;

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

    const filteredVoiceActors = character && character.voice_actors
        ? character.voice_actors
        : [];

    // Asegúrate de que character.voice_actors no sea undefined
    console.log(character && character.voice_actors);
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


    useEffect(() => {
        getAnimePictures(id);
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
            <div className="voice-actors">
    <h3 className="title">Voice Actors</h3>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Language</th>
            </tr>
        </thead>
        <tbody>
            {filteredVoiceActors.map((character, characterIndex) => (
                <React.Fragment key={characterIndex}>
                    <tr>
                        <td colSpan="2" className="character-name">
                            {character.person && character.person.name}
                        </td>
                    </tr>
                    {character.language && (
                        <tr>
                            <td colSpan="2" className="language">
                                Language: {character.language}
                            </td>
                        </tr>
                    )}
                    {character.person &&
                        character.person.voice_actors &&
                        character.person.voice_actors.map((voiceActor, actorIndex) => (
                            <React.Fragment key={actorIndex}>
                                <tr>
                                    <td>Name: {voiceActor.person && voiceActor.person.name}</td>
                                </tr>
                                <tr>
                                    <td>Language: {voiceActor.language}</td>
                                </tr>
                            </React.Fragment>
                        ))}
                </React.Fragment>
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
    
        h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }
    
        table {
            width: 100%;
            border-collapse: collapse;
    
            th, td {
                border: 1px solid #e5e7eb;
                padding: 0.5rem;
                text-align: left;
            }
    
            .character-name {
                font-weight: bold;
            }
    
            .language {
                font-style: italic;
            }
        }
    }
`;

export default Gallery