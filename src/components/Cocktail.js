import { useState, useEffect } from 'react'
import React from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
const socket = io("http://192.168.0.153:5001", {autoConnect: false})
const START_URL = 'http://192.168.0.153:5001/cocktails/start'

const Cocktail = (props) => {



  const { state } = useLocation()
  const [progress, setProgress] = useState(0)
  const [pumpStatus, setPumpStatus] = useState('')
  const [running, setRunning] = useState(false)
  const navigate = useNavigate()
  const cocktail = state
  const image = "../" + state['img']


  const startMix = () => {
    socket.connect()
    setRunning(true)
    socket.emit("start_cocktail", cocktail)
}

  const startCocktail = async () => {
    const res = await fetch(START_URL, {method: 'POST', body: JSON.stringify(cocktail)});
    const data = await res.json();
    return data;
}

useEffect(() => {
  
})
useEffect(()=> {
  socket.connect()
  socket.on("receive_progress", (prog) => {
      setProgress(prog)
  })
  socket.on("receive_pump_status", (status) => {
    setPumpStatus(status)
})
socket.on("receive_end_signal", (signal) => {
  console.log(signal)
  setPumpStatus('')
  setProgress(0)
  setRunning(false)
  socket.disconnect()
  navigate('/final')
})
  return () => {
    socket.disconnect();
  };
},[])
  return (

    <div className='container'>
        <div className="card bg-dark mt-3" >
            <img className="card-img-top" src={image} alt={image} />
            <div className="card-body">
                <h5 className="card-title">{state['name']}</h5>
                <p className="card-text">{Object.keys(state['ingredients']).join(', ').toUpperCase()}</p>
                <p></p>
                {running &&
                <div className="progress">
                  <div className="progress-bar bg-success" role="progressbar" style={{width: `${progress}%`}} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">{progress}%</div>
                </div>}
                <p>{pumpStatus}</p>
                {!running && 
                <div>
                  <a onClick={() => {console.log(state); startMix()}} className="btn btn-success " style={{minWidth: '110px'}} disabled={running}>Mixen</a>
                  <Link to="/" className="btn btn-danger ml-3 " style={{minWidth: '110px'}} disabled={running}>Zurück</Link>
                </div>}
            </div>
        </div>
    </div>
  )
}

export default Cocktail