import React, { useEffect , useState} from 'react'
import { Link, useParams,useHistory  } from 'react-router-dom'
import styled from 'styled-components'
import { Tag , Button} from 'antd';

function AnimeItem() {
    const { id } = useParams()
    const history = useHistory();
    // Estados
    const [anime, setAnime] = React.useState({})
    const [characters, setCharacters] = React.useState([])
    const [showMore, setShowMore] = React.useState(false)

    // Destructurar anime
    const {
        title, synopsis,
        trailer, duration, aired,
        season, images, rank,
        score, scored_by, popularity,
        status, rating, source
    } = anime

    const onViewGallery = (character) => {
      const characterId = character.character.mal_id;
      history.push(`/character/${characterId}`, { character });
  };
    // Obtener anime en base al ID
    const getAnime = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`)
        const data = await response.json()
        setAnime(data.data)
    }

    // Obtener los personajes
    const getCharacters = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}/characters`)
        const data = await response.json()
        setCharacters(data.data)
        console.log(data.data)
    }

    // Render inicial
    useEffect(() => {
        getAnime(id)
        getCharacters(id)
    }, [])

    return (
        <>
            <AnimeItemStyled>
                <h1>{title}</h1>
                <div className="details">
                    <div className="detail">
                        <div className="image">
                            <img src={images?.jpg.large_image_url} alt="" />
                        </div>
                        <div className="anime-details">
                            <p><span>Aired:</span><span><Tag color="magenta">{aired?.string}</Tag></span></p>
                            <p><span>Rating:</span><span><Tag color="volcano">{rating}</Tag></span></p>
                            <p><span>Rank:</span><span><Tag color="orange">{rank}</Tag></span></p>
                            <p><span>Score:</span><span><Tag color="gold">{score}</Tag></span></p>
                            <p><span>Scored By:</span><span><Tag color="lime">{scored_by}</Tag></span></p>
                            <p><span>Popularity:</span><span><Tag color="cyan">{popularity}</Tag></span></p>
                            <p><span>Status:</span><span><Tag color="geekblue">{status}</Tag></span></p>
                            <p><span>Source:</span><span><Tag color="purple">{source}</Tag></span></p>
                            <p><span>Season:</span><span><Tag color="blue">{season}</Tag></span></p>
                            <p><span>Duration:</span><span><Tag color="green">{duration}</Tag></span></p>
                        </div>
                    </div>
                    <h1>Bio:</h1>
                    <p className="description">
                        {showMore ? synopsis : synopsis?.substring(0, 450) + '...'}
                        <button onClick={() => {
                            setShowMore(!showMore)
                        }}>{showMore ? 'Show Less' : 'Read More'}</button>
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
                    {characters?.map((character, index) => (
                        <div key={index} className="character">
                            <img src={character.character.images?.jpg.image_url} alt="" />
                            <h4>{character.character.name}</h4>
                            <p>{character.role}</p>
                            <Button onClick={() => onViewGallery(character)}>View Gallery</Button>
                        </div>
                    ))}
                </div>
            </AnimeItemStyled>
        </>
    );
}

const AnimeItemStyled = styled.div`
    padding: 3rem 18rem;
    background-color: #EDEDED;
    h1{
        display: inline-block;
        font-size: 3rem;
        margin-bottom: 1.5rem;
        cursor: pointer;
        background:linear-gradient( to right, #A855F7, #27AE60);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        transition: all .4s ease-in-out;
        &:hover{
            transform: skew(-3deg);
        }
    }
    .title{
        display: inline-block;
        margin: 3rem 0;
        font-size: 2rem;
        cursor: pointer;
        background:linear-gradient( to right, #A855F7 23%, #27AE60);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .description{
        margin-top: 2rem;
        color: black;
        line-height: 1.7rem;
        button{
            background-color: transparent;
            border: none;
            outline: none;
            cursor: pointer;
            font-size: 1.2rem;
            color: #27AE60;
            font-weight: 600;
        }
    }

    .trailer-con{
        display: flex;
        justify-content: center;
        align-items: center;
        iframe{
            outline: none;
            border: 5px solid #e5e7eb;
            padding: 1.5rem;
            border-radius: 10px;
            background-color:Black;
        }
    }

    .details{
        background-color: #fff;
        border-radius: 20px;
        padding: 2rem;
        border: 5px solid black;
        .detail{
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            img{
                border-radius: 7px;
            }
        }
        .anime-details{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p{
                display: flex;
                gap: 1rem;
            }
            p span:first-child{
                font-weight: 600;
                color: #454e56;
            }
        }
    }

    .characters{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: 2rem;
        background-color: #fff;
        padding: 2rem;
        border-radius: 20px;
        border: 5px solid #e5e7eb;
        .character{
            padding: .4rem .6rem;
            border-radius: 7px;
            background-color: #EDEDED;
            transition: all .4s ease-in-out;
            img{
                width: 100%;
            }
            h4{
                padding: .5rem 0;
                color: #454e56;
            }
            p{
                color: #27AE60;
            }
            &:hover{
                transform: translateY(-5px);
            }
        }
    }
`;

export default AnimeItem
