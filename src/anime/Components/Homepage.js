import React, { useEffect } from 'react';
import { useGlobalContext } from '../context/global';
import Popular from './Popular';
import styled from 'styled-components';
import Upcoming from './Upcoming';
import Airing from './Airing';
import { Button, Input, Select } from 'antd';
import { FireOutlined, PlusOutlined } from '@ant-design/icons';
import Paginacion from './Paginacion';

const { Option } = Select;

function Homepage() {
  const { handleSubmit, search, searchAnime, handleChange, genres } = useGlobalContext();
  const { getUpcomingAnime, getAiringAnime, getPopularAnime, getAnimeGenres } = useGlobalContext();

  const [rendered, setRendered] = React.useState('popular');
  const [selectedGenre, setSelectedGenre] = React.useState(null);

  useEffect(() => {
    // Llama a la función que obtenga la lista de géneros cuando el componente se monte
    getAnimeGenres();
  }, []);

  const switchComponent = () => {
    switch (rendered) {
      case 'airing':
        return <Airing rendered={rendered} />;
      case 'popular':
        return <Popular rendered={rendered} />;
      case 'upcoming':
        return <Upcoming rendered={rendered} />;
      default:
        return <Popular rendered={rendered} />;
    }
  };

  const handleGenreChange = (value) => {
    setSelectedGenre(value);
    // Realiza la búsqueda con el nuevo género seleccionado
    // Puedes implementar la lógica para obtener animes por género aquí
    console.log(selectedGenre); // Asegúrate de que selectedGenre tenga el valor correcto aquí
};
console.log(selectedGenre)
  return (
    <HomepageStyled>
      <header>
        <div className="logo" style={{marginTop : 100}}>
          <h1>
            {rendered === 'popular'
              ? 'Anime Populares'
              : rendered === 'airing'
              ? 'Anime En Emisión'
              : 'Animes en lanzamiento'}
          </h1>
        </div>

        <div className="search-container">
          <div className="filter-btn popular-filter">
            <Button
              icon={<FireOutlined />}
              onClick={() => {
                setRendered('airing');
                getAiringAnime();
              }}
            >
              Emisión
            </Button>
          </div>
          <div className="filter-btn upcoming-filter">
            <Button
              icon={<PlusOutlined />}
              onClick={() => {
                setRendered('upcoming');
                getUpcomingAnime();
              }}
            >
              Próximos
            </Button>
          </div>
          <Select
            placeholder="Selecciona un género"
            style={{ width: 200 }}
            onChange={handleGenreChange}
            value={selectedGenre}
            loading={!genres}  // Agrega esta línea para manejar la carga de géneros
        >
            {genres &&
                genres.map((genre) => (
                    <Option key={genre.mal_id} value={genre.mal_id}>
                        {genre.name}
                    </Option>
                ))}
        </Select>

          <form action="" className="search-form" onSubmit={handleSubmit}>
            <div className="Input-control">
              <Input type="text" placeholder="Buscar Anime" value={search} onChange={handleChange} />
              <Button type="submit">Search</Button>
            </div>
          </form>
        </div>
        <Paginacion />
      </header>
      {switchComponent()}
    </HomepageStyled>
  );
}

const HomepageStyled = styled.div`
  background-color: #ededed;
  header {
    padding: 2rem 5rem;
    width: 60%;
    margin: 0 auto;
    transition: all 0.4s ease-in-out;
    @media screen and (max-width: 1530px) {
      width: 95%;
    }
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 2rem;
    }
    .search-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      form {
        position: relative;
        width: 100%;
        .Input-control {
          position: relative;
          transition: all 0.4s ease-in-out;
        }

        .Input-control Button {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
`;

export default Homepage;
