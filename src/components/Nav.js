import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <Link to="/" className='navbar-brand'>COCKTAIL-MAKER</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <Link className="nav-item nav-link active" data-toggle="collapse" data-target="#navbarNavAltMarkup" to="/">Cocktails <span className="sr-only">(current)</span></Link>
                <Link className="nav-item nav-link" data-toggle="collapse" data-target="#navbarNavAltMarkup" to="/">Manuell Mixen</Link>
                <Link className="nav-item nav-link" data-toggle="collapse" data-target="#navbarNavAltMarkup" to="/">Spülen</Link>
                <Link className="nav-item nav-link" data-toggle="collapse" data-target="#navbarNavAltMarkup" to="/settings">Einstellungen</Link>
            </div>
        </div>
    </nav>
  )
}

export default Nav