import React from 'react'
import { Link } from 'react-router-dom'

const Final = () => {
  return (
    <div className='container text-center mt-3'>
        <h2>Fertig!</h2>
        <img className="card-img-top" src='static/images/prost.png' alt='prost' style={{maxWidth: '150px'}}/>
        <Link to='/' className='btn btn-success mt-3'>Zurück zm Menü</Link>
    </div>
  )
}

export default Final