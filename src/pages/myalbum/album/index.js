import './style.css';

export default function Album() {
  return (
    <div className="album-artist-container">
      <img className="album-artist-image" src={'/assets/unsplash.png'} alt="Logo" />
      <p className="album-artist-name">ArtistName</p>
      <p className="album-artist-date-publish">ArtistName</p>
    </div>
  );
}
