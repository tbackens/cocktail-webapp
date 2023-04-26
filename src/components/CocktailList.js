import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

const URL = 'http://192.168.0.153:5001/cocktails'

const CocktailList = (props) => {
    const [cocktails, setCocktails]= useState([])

    const getCocktails = async () => {
        const response = await fetch(URL);
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
            <img className="card-img-right example-card-img-responsive m-2 rounded" src={item['img']} style={{maxWidth: '150px'}} alt={item['name']} />
        </div>)



  return (
    <div className='container'>
       {cocktailCards}
    </div>
  )
}

export default CocktailList