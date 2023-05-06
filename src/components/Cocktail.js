import { useState, useEffect } from 'react'
import React from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { socket } from './url_settings'

const Cocktail = () => {



  const { state } = useLocation()
  const [running, setRunning] = useState(false)
  const navigate = useNavigate()
  const image = "../" + state['img']



  const startMix = () => {
    navigate('/mix', {state: state})
}

useEffect(()=> {
  socket.connect()
  socket.on("receive_progress", () => {
      setRunning(true)
  })

socket.on("receive_end_signal", (signal) => {
  console.log(signal)
  setRunning(false)
  socket.disconnect()
})
  return () => {
    socket.disconnect();
  };
},[])
  return (

    <div className='container p-3'>
        <div className="card bg-dark mt-3" >
            <img className="card-img-top" src={image} alt={image}/>
            <div className="card-body">
                <h5 className="card-title">{state['name']}</h5>
                <p className="card-text">{Object.keys(state['ingredients']).join(', ').toUpperCase()}</p>
                {!running && 
                <div>
                  <button onClick={() => {console.log(state); startMix()}} className="btn btn-success " style={{minWidth: '110px'}} disabled={running}>Mixen</button>
                  <Link to="/" className="btn btn-danger ml-3 " style={{minWidth: '110px'}} disabled={running}>Zurück</Link>
                </div>}
                {running && 
                <div>
                  <div className="spinner-grow text-success" role="status"><span class="sr-only"></span></div>
                  <p>Maschine läuft gerade...</p>
                </div>}
            </div>
        </div>
    </div>
  )
}

export default Cocktail