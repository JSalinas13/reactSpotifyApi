import './App.css';


function App() {

  const CLIENT_ID = "cd68fb72c48e4f60bd41cf8c250bfae6";
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

 

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify API con React</h1>
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Iniciar sesión</a>

        
      </header>
    </div >
  );
}

export default App;
