import { useEffect, useState } from 'react';
import AlbumItem from '../../components/album/AlbumItem';
import Header from '../../components/layout/header/Header';
import useApi from '../../hooks/useApi';
import './style.css';

export default function MyAlbum() {
  const initState = {
    albums: [],
    total: 0
  };
  const [state, setState] = useState(initState);
  const { doGet } = useApi();

  useEffect(() => {
    const init = async () => {
      try {
        const resp = await doGet('/me/albums');
        const { items } = resp;

        setState({ albums: items });
      } catch (error) {
        console.log(error);
      }
    };
    init();
  }, []);

  const showResult = () => {
    const { albums } = state;

    return (
      <>
        <div className="myalbum-container">
          {albums.map((item, index) => {
            const { id, name, images, release_date: releaseDate } = item.album;
            return (
              <AlbumItem
                key={index}
                id={id}
                name={name}
                images={images}
                releaseDate={releaseDate}
              />
            );
          })}
        </div>
      </>
    );
  };
  return (
    <>
      <Header />
      <div className="myalbum-container-info">
        <p className="myalbum-text-1">
          <span style={{ color: '#FFFFFF' }}>Mis albumes</span>
          <br />
          <span style={{ color: '#D6F379' }}>guardados</span>
        </p>
        <p className="myalbum-text-2">
          Disfruta de tu música a un solo click y descube que discos has guardado dentro de “mis
          álbumes”
        </p>
      </div>
      {showResult()}
    </>
  );
}
