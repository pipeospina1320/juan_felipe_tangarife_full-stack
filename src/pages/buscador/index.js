import { useState } from 'react';
import useApi from '../../hooks/useApi';
import ArtistItem from '../../components/artist/ArtistItem';
import './style.css';
import Header from '../../components/layout/header/Header';

const LIMIT = 4;

export default function Buscador() {
  const initState = {
    items: [],
    total: 0
  };
  const { doGet } = useApi();
  const [searchValue, setSearchValue] = useState('');
  const [state, setState] = useState(initState);

  const onChangeInput = (event) => {
    event.preventDefault();
    setSearchValue(event.target.value);
  };

  const onSearch = async () => {
    try {
      if (searchValue) {
        const params = {
          q: searchValue,
          type: 'artist',
          limit: LIMIT
        };
        const { artists } = await doGet('/search', params);

        if (artists) {
          const { items, total } = artists;
          setState({
            items,
            total
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showResult = () => {
    const { items, total } = state;

    return (
      <>
        <div className="text-conatner-buscador-3">
          <p className="text-buscador-3">Mostrando 4 resultados de {total}</p>
        </div>
        <div className="container-result-buscador">
          {items.map((item, index) => {
            const {
              id,
              name,
              followers: { total },
              images
            } = item;
            return <ArtistItem key={index} id={id} name={name} followers={total} images={images} />;
          })}
        </div>
      </>
    );
  };

  return (
    <>
      <Header />
      <div className="container-text-buscador-1">
        <p className="text-buscador-1">
          <span style={{ color: '#FFFFFF' }}>Busca tus</span>
          <br />
          <span style={{ color: '#D6F379' }}>artistas</span>
        </p>
        <p className="text-buscador-2">
          Encuentra tus artistas favoritos gracias a nuestro buscador y guarda tus álbumes favoritos
        </p>
      </div>
      <div className="buscador">
        <div className="container-buscador">
          <input className="input-buscador" name="search" type="text" onChange={onChangeInput} />
          <button className="button-buscador" type="submit" onClick={onSearch}>
            Search
          </button>
        </div>
      </div>
      {showResult()}
    </>
  );
}
