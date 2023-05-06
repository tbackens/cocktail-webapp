import React from 'react'

const QrCode = () => {
  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col">
          <div className="text-center ">
            <h1 className={''} style={{fontFamily: "monospace", fontSize: '30px'}}>Netzwerk</h1>
            <img className='img-fluid mt-1' src='static/images/wifi-qr-code.png' alt='wifi-qr' style={{maxWidth: "65%"}}/>
          </div>
        </div>
        <div className="col">
          <div className="text-center ">
            <h1 style={{fontFamily: "monospace",  fontSize: '30px'}}>Menü</h1>
            <img className='img-fluid mt-1' src='static/images/qr-code.png' alt='menu-qr' style={{maxWidth: "65%"}}/>
          </div>
        </div>
      </div>
      <div className='text-center mt-3'>
        <p>Schritt 1: Mit dem Netzwerk verbinden. Schritt 2: Menü aufrufen</p>
      </div>
    </div>
  )
}

export default QrCode