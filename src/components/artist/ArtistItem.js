import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './style.css';

ArtistItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  followers: PropTypes.number.isRequired,
  images: PropTypes.array
};

export default function ArtistItem({ id, name, followers, images = [] }) {
  const navigate = useNavigate();
  const srcset = images.map((item) => `${item.url} ${item.width}w`).join(',');

  const onSelectArtist = () => {
    console.log('ar');
    // artist
    navigate(`/artist/${id}`, { replace: true });
  };

  return (
    <div className="artist-container" onClick={onSelectArtist}>
      <img
        className="artist-image"
        sizes="(max-width: 390px) 160px, (max-width: 834px) 320px, 900px"
        srcSet={srcset}
        alt="Logo"
      />
      <p className="artist-name">{name}</p>
      <p className="artist-followers">Followers: {followers}</p>
    </div>
  );
}
