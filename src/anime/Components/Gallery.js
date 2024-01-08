import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../context/global';
import { Table, Typography, Image, Tag } from 'antd';

const { Title } = Typography;

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
                <Title className="title">Voice Actors</Title>
                <Table dataSource={character?.voice_actors} pagination={false}>
                    <Table.Column
                        title="Image"
                        dataIndex={['person', 'images', 'jpg', 'image_url']}
                        key="person.images.jpg.image_url"
                        render={(image, record) => (
                            <Image src={image} alt={record?.person?.name} />
                        )}
                    />
                    <Table.Column
                        title="Name"
                        dataIndex={['person', 'name']}
                        key="person.name"
                        render={(text) => (
                            <div className="tag-container">
                                <Tag color="blue" className="character-name">{text}</Tag>
                            </div>
                        )}
                    />
                    <Table.Column
                        title="Language"
                        dataIndex="language"
                        key="language"
                        render={(text) => (
                            <div className="tag-container">
                                <Tag color="green" className="actor-language">{text}</Tag>
                            </div>
                        )}
                    />
                </Table>
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

        ${Title} {
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }

        ${Image} {
            width: 50px; // Ajusta el tamaño según tus necesidades
            height: 50px; // Ajusta el tamaño según tus necesidades
            object-fit: cover;
            border-radius: 50%;
            margin-right: 10px; // Ajusta el espaciado entre la imagen y el texto
        }

        ${Table} {
            width: 100%;

            th, td {
                border: 1px solid #e5e7eb;
                padding: 0.5rem;
                text-align: left;
            }

            .actor-info {
                display: flex;
                align-items: center;
            }

            .character-name {
                font-weight: bold;
            }

            .actor-language {
                font-style: italic;
            }

            .tag-container {
                display: flex;
                margin-top: 5px; // Ajusta el espaciado entre las etiquetas y el contenido de la tabla
            }
        }

        ${Tag} {
            margin-right: 5px; // Ajusta el espaciado entre las etiquetas
        }
    }
`;

export default Gallery