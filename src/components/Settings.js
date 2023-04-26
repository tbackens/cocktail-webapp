import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const PUMPS_URL = 'http://192.168.0.153:5001/pumps';
const OPTIONS_URL = 'http://192.168.0.153:5001/options';
const UPDATE_URL = 'http://192.168.0.153:5001/pumps/update';


const Settings = () => {

    const navigate = useNavigate(true);

    const [pumps, setPumps] = useState([]);
    const [options, setOptions] = useState([]);
    const [showButtons, setShowButtons] = useState(false);

    const getPumps = async () => {
        const result = await fetch(PUMPS_URL);
        const data = await result.json();
        setPumps(data);
    };

    const getOptions = async () => {
        const result = await fetch(OPTIONS_URL);
        const data = await result.json();
        setOptions(data);
    };

    const updatePumps = async () => {
        const res = await fetch(UPDATE_URL, {method: 'POST', body: JSON.stringify(pumps)});
        const data = await res.json();
        setShowButtons(false);
        return data;
    }

    const cancelChange = () => {
        setShowButtons(false);
        getPumps()
    }

    useEffect(() =>{
        getPumps();
        getOptions();
    },[]);


    const onOptionChange = (opt, id) => {
        console.log(opt['name']);
        const newPumpsState = pumps.map(p => {
            if (p['id'] === id) {
                return {...p, "name": opt['name'], "img": opt['img']};
            }
            return p;
        })
        setPumps(newPumpsState);
        setShowButtons(true)
    }

    const buttonContainer = (
        <div className='row justify-content-start ml-3'>
            <button onClick={() => {updatePumps(); navigate('/')}} className="btn btn-success">Speichern</button>
            <button onClick={() => {cancelChange(); navigate('/')}} className="btn btn-danger ml-2">Abbrechen</button>
        </div>
    )

    const pumpCards = pumps.map(pump => 
        <div className='card flex-row bg-dark mt-3' key={pump['id']}>
            <div className='card-body'>
                <h3 className='card-title h5 h4-sm'>{pump['name'].toUpperCase()}</h3>
                <p className='card-text'>Pumpe Nr.: {pump['id'] + 1}</p>
                
                <div className="dropdown">
                    <button className="btn btn-outline-success dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                        Ändern
                    </button>
                    <div className="dropdown-menu">
                        {options.map(option => <button className="dropdown-item" key={option['id']} onClick={() => onOptionChange(option, pump['id'])} value={option['name']}>{option['name']}</button>)}
                    </div>
                </div>
            </div>
            <img className="card-img-right example-card-img-responsive m-2 rounded" src={pump['img']} style={{maxWidth: '150px'}} alt={pump['name']} />
        </div>)

  return (
    <div className='container mt-3'>
        {showButtons && buttonContainer}
        {pumpCards}
    </div>
  )
}

export default Settings