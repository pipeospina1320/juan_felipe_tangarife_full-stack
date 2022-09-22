import PropTypes from 'prop-types';
import useApi from '../../hooks/useApi';
import './style.css';

AlbumItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  images: PropTypes.array,
  canDelete: PropTypes.bool,
  onDelete: PropTypes.func
};

export default function AlbumItem({ id, name, releaseDate, images, canDelete = false, onDelete }) {
  const { doPut, doDelete } = useApi();
  const srcset = images.map((item) => `${item.url} ${item.width}w`).join(',');

  const onAddAlbum = async () => {
    await doPut(`/me/albums?ids=${id}`);
  };

  const onRemoveAlbum = async () => {
    await doDelete(`/me/albums?ids=${id}`);
    onDelete();
  };

  return (
    <div className="album-artist-container">
      <div>
        <img
          className="artist-image"
          sizes="(max-width: 390px) 160px, (max-width: 834px) 320px, 900px"
          srcSet={srcset}
          alt="Logo"
        />
        <p className="album-artist-name">{name}</p>
        <p className="album-artist-date-publish">Publicado: {releaseDate}</p>
      </div>
      {canDelete ? (
        <button className="remove-album" type="submit" onClick={onRemoveAlbum}>
          - Remove album
        </button>
      ) : (
        <button className="add-album" type="submit" onClick={onAddAlbum}>
          + Add album
        </button>
      )}
    </div>
  );
}
