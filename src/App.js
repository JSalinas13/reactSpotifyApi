import { useEffect, useState } from 'react';
import './App.css';


function App() {

  const CLIENT_ID = "cd68fb72c48e4f60bd41cf8c250bfae6";
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")


  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
      setToken(token)
    }

  }, [])


  const salir = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify API con React</h1>
        {!token ?
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Iniciar sesión</a>
          : <button onClick={salir}>Cerrar sesión</button>}
      </header>
    </div >
  );
}

export default App;
