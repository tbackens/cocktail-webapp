import React from 'react'
import {FaCocktail } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <Link to="/" className='navbar-brand' style={{fontFamily: 'pacifico'}}>El Cocktail <FaCocktail/></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <Link className="nav-item nav-link active" data-toggle="collapse" data-target="#navbarNavAltMarkup" to="/">Cocktails <span className="sr-only">(current)</span></Link>
                <Link className="nav-item nav-link" data-toggle="collapse" data-target="#navbarNavAltMarkup" to="/manual">Manuell Mixen</Link>
                <Link className="nav-item nav-link" data-toggle="collapse" data-target="#navbarNavAltMarkup" to="/settings">Einstellungen</Link>
                <Link className="nav-item nav-link" data-toggle="collapse" data-target="#navbarNavAltMarkup" to="/qr">Connect</Link>
                <Link className="nav-item nav-link" data-toggle="collapse" data-target="#navbarNavAltMarkup" to="/clean">Reinigen</Link>
            </div>
        </div>
    </nav>
  )
}

export default Nav