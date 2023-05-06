import { useState, useEffect } from 'react'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { socket } from './url_settings'


const Mix = () => {

  const { state } = useLocation()

  const [progress, setProgress] = useState(0)
  const [pumpStatus, setPumpStatus] = useState('')
  const navigate = useNavigate()

useEffect(()=> {
  socket.connect()
  socket.emit("start_cocktail", state)
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
    socket.disconnect()
    navigate('/final')
    })
  return () => {
    socket.disconnect();
  };
}, [])
  return (

    <div className='container'>
        <div className="card bg-dark mt-3" >
            <h3 className='card-header'>{state['name']}</h3>
            <div className="card-body">
                <div className="progress">
                  <div className="progress-bar bg-success" role="progressbar" style={{width: `${progress}%`}} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">{progress}%</div>
                </div>
                <p>{pumpStatus}</p>
            </div>
        </div>
    </div>
  )
}

export default Mix