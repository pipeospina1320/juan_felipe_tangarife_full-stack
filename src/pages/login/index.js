import './style.css';

const AUTH_URL = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const CLIENT_ID = 'e41987af34804ca294417cf46ba0e07e';
const REDIRECT_URI = 'http://localhost:3000/get-credential';
const SCOPE = 'user-library-modify user-library-read';

export default function Login() {
  const urlSpotify = `${AUTH_URL}?response_type=${RESPONSE_TYPE}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`;
  return (
    <div className="login-container">
      <img className="vector-2" src={'/assets/vector-2.svg'} alt="Logo" />
      <div>
        <div className="login-text-container">
          <p className="text-1">
            <span style={{ color: '#FFFFFF' }}>Disfruta de la</span>
            <br />
            <span style={{ color: '#D6F379' }}>mejor música</span>
          </p>
          <p className="text-2">Accede a tu cuenta para guardar tus albumes favoritos.</p>
        </div>
        <div className="container-text-3">
          <p className="text-3">Log in con Spotify</p>
          <a href={urlSpotify}>
            <img className="arrow" src={'/assets/arrow.svg'} alt="Logo" />
          </a>
        </div>
      </div>
    </div>
  );
}
