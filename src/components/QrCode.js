import React from 'react'
import QRCode from 'react-qr-code'

const QrCode = () => {

  const host = window.location.host
  const ip = 'http://' + host.slice(0, -5) + ':3000'; 

  const qr = (
    <QRCode
      value={ip}
      bgColor='white'
      style={{ height: "auto", maxWidth: "65%", width: "65%" }}
    
    />
  )
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
            {qr}
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