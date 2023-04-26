import React from 'react'

const QrCode = () => {
  return (
    <div className="container text-center mt-3">
        <h1 style={{fontFamily: "monospace"}}>Scan me for the Menu!</h1>
        <img className='img-fluid mt-5' src='static/images/qr-code.png' style={{maxWidth: "60%"}}/>
    </div>
  )
}

export default QrCode