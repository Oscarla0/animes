import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/global';
import styled from 'styled-components';
import Sidebar from './Sidebar';

function Popular({ rendered }) {
  const { popularAnime, isSearch, searchResults } = useGlobalContext();
  const [showMore, setShowMore] = useState(10);
  const maxToShow = 100;

  const conditionalRender = () => {
    const totalAnime = isSearch ? searchResults.length : popularAnime.length;
    const animesToRender = (isSearch ? searchResults : popularAnime).slice(0, showMore);

    return animesToRender.map((anime) => (
      <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
        <img src={anime.images.jpg.large_image_url} alt="" />
      </Link>
    ));
  };

  const handleShowMore = () => {
    setShowMore((prevCount) => Math.min(prevCount + 10, maxToShow));
  };

  return (
    <PopularStyled>
      <div className="popular-anime">
        {conditionalRender()}
        {showMore < maxToShow && (
          <button onClick={handleShowMore}>Mostrar Más</button>
        )}
      </div>
      <Sidebar />
    </PopularStyled>
  );
}

const PopularStyled = styled.div`
  display: flex;
  .popular-anime {
    margin-top: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-left: 5rem;
    padding-right: 0;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 2rem;
    background-color: #fff;
    border-top: 5px solid #e5e7eb;
    a {
      height: 500px;
      border-radius: 7px;
      border: 5px solid #e5e7eb;
    }
    a img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;
    }
  }
  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
  }
`;

export default Popular;
