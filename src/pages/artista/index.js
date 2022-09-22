import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import AlbumItem from '../../components/album/AlbumItem';
import './style.css';
import Header from '../../components/layout/header/Header';

export default function Buscador() {
  const initState = {
    name: '',
    image: [],
    followers: 0,
    albums: []
  };
  const { doGet } = useApi();
  const { id } = useParams();
  const [state, setState] = useState(initState);

  useEffect(() => {
    const init = async () => {
      try {
        const [artist, albums] = await Promise.all([
          await doGet(`/artists/${id}`),
          await doGet(`/artists/${id}/albums`)
        ]);
        const { name, images, followers } = artist;
        const { items } = albums;
        const srcset = images.map((item) => `${item.url} ${item.width}w`).join(',');

        setState({ name, images: srcset, followers: followers.total, albums: items });
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
        {albums.map((item, index) => {
          const { id, name, images, release_date: releaseDate } = item;
          return (
            <AlbumItem key={index} id={id} name={name} images={images} releaseDate={releaseDate} />
          );
        })}
      </>
    );
  };

  const { name, images, followers } = state;
  return (
    <>
      <Header />
      <div className="artist-detail-container">
        <img
          className="artist-detail-image"
          srcSet={images}
          sizes="(max-width: 390px) 160px, (max-width: 834px) 320px, 900px"
          alt="Logo"
        />
        <div className="artist-detail-info">
          <p className="artist-info-1">Artista certificado</p>
          <p className="artist-info-2">{name}</p>
          <p className="artist-info-3">Followers: {followers}</p>
          <p className="artist-info-4">Oyentes mensuales: nº</p>
        </div>
      </div>
      <div className="artist-save-info-container">
        <p className="artist-save-text">Guarda tus álbumes favoritos de {name}</p>
      </div>
      <div className="artist-album-container">{showResult()}</div>
    </>
  );
}
