import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';


function App() {


  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID_FRANCO;//Franco
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI
  const AUTH_ENDPOINT = process.env.REACT_APP_AUTH_ENDPOINT
  const RESPONSE_TYPE = process.env.REACT_APP_RESPONSE_TYPE

  const [token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])


  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)

    }

    setToken(token)

  }, [])


  const salir = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  const buscarArtista = async (e) => {
    e.preventDefault()
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: "artist"
      }
    })

    setArtists(data.artists.items)
  }




  const renderArtist = () => {
    return artists.map(artist => (

      <div key={artist.id}>
        <div className="card">
          <div className="card-image" style={{
            backgroundImage: `url("${artist.images.length ? artist.images[0].url : 'No hay imagen'}")`
          }}>

          </div>
          <div className="card-text">
            <span className="date">Artista</span>
            <h2>{artist.name}</h2>
            <p>Popularidad: {artist.popularity}</p>
          </div>
          <div className="card-stats">
            <div className="stat">
              <div className="value"></div>
              <div className="type"></div>
            </div>
            <div className="stat border">
              <div className="value"> {artist.followers.total}</div>
              <div className="type">Seguidores</div>
            </div>
            <div className="stat">
              <div className="value"></div>
              <div className="type"></div>
            </div>
          </div>
        </div>





        {/*  */}
        {/* {artist.images.length ? <img width={"100px"} height={"100px"} src={artist.images[0].url} alt=''></img> : <div>No hay imagen</div>}
        {artist.name} */}
      </div >
    ))
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify API con React</h1>
        {!token ?
          <a className="boton" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Iniciar sesión</a>
          : <button className="boton" onClick={salir}>Cerrar sesión</button>}
        {
          token ?
            <form onSubmit={buscarArtista}>
              <p>! Consulta a tu artista !</p>
              <input className="box-text" type='text' onChange={e => setSearchKey(e.target.value)} />
              <button className="boton" type={"submit"} >Buscar</button>
            </form>
            : <h2>Por favor Iniciar sesión</h2>
        }

        {renderArtist()}

      </header>



    </div >
  );
}

export default App;
