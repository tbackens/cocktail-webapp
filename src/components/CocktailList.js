import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { cocktailsURL } from './url_settings'
import { getIp } from './url_settings'

const CocktailList = (props) => {
    const [cocktails, setCocktails]= useState([])



    const getCocktails = async () => {
        const response = await fetch(cocktailsURL);
        const data = await response.json();
        setCocktails(data);
    };

    useEffect(() => {
        getCocktails()
    },[]);


    const cocktailCards = cocktails.map(item => 
        <div className="card flex-row bg-dark mt-3" key={item['id']}>
            <div className="card-body">
                <h3 className="card-title h5 h4-sm">{item['name']}</h3>
                <p className="card-text text-capitalize font-weight-lighter">{Object.keys(item['ingredients']).join(', ')}</p>
                <Link to="/cocktails/mix" state={item} className='btn btn-success'>Auswählen</Link>
            </div>
            <img className="card-img-right example-card-img-responsive m-2 rounded" src={item['img']} style={{maxWidth: '150px', height: 'auto'}} alt={item['name']} />
        </div>)



  return (
    <div className='container'>
       {cocktailCards}
    </div>
  )
}

export default CocktailList