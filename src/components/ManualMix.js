import React, { useState, useEffect } from 'react'
import { socket, pumpsURL } from './url_settings';


const ManualMix = () => {

    const [pumps, setPumps] = useState([]);
    const [running, setRunning] = useState(false);

    const getPumps = async () => {
        const result = await fetch(pumpsURL);
        const data = await result.json();
        setPumps(data);
    };

    const handleButtons = (pump, value) => {
        console.log(pump, value)
        setRunning(true)
        socket.emit('start_manual', { pump, value})
    };


    useEffect(() =>{
        socket.connect()
        socket.on("pump_stopped_signal", (signal) => {
            console.log(signal)
            setRunning(false)
        })
        return () => {
            socket.disconnect();
        };
        
    },[]);

    useEffect(() =>{
        getPumps();
    },[]);


    const pumpCards = pumps.map(pump => 
        <div className="card bg-dark m-2 flex-row justify-content-around" key={pump['id']} alt={pump['name']}>
            <div className="">
                <h5 className="card-title m-2">{pump['name'].toUpperCase()}</h5>
                <button className='btn btn-success m-2' onClick={() => {handleButtons(pump, 10)}} style={{width: '80px'}} disabled={running}>+10cl</button>
                <br/>
                <button className='btn btn-success m-2' style={{width: '80px'}} onClick={() => {handleButtons(pump, 50)}} disabled={running}>+50cl</button>
            </div>
            <img className="card-img-right example-card-img-responsive m-2 rounded" src={pump['img']} style={{maxWidth: '150px'}} alt={pump['name']} />
        </div>
         
         )



  return (

    <div className='container text-center text-monospace'>
        <h5 className='mt-3'>Füge etwas zu deinem Drink hinzu:</h5>
        {pumpCards}
    </div>
  )
}

export default ManualMix