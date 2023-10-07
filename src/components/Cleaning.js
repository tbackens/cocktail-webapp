import React, { useState } from 'react'

const Cleaning = () => {

  const [status, setStatus] = useState(2)
  const unselectedClass = 'list-group-item text-primary'
  const selectedClass = 'list-group-item list-group-item-primary'
  return (
    <div class="container">
        <div class="card flex-row bg-dark mt-3">
            <div class="col text-center m-auto">
            <button className='btn btn-success' style={{width: '150px', height:'150px'}}>
              Starten
            </button>
            </div>
            <div class="col text-center m-auto">
            <ul class="list-group m-3">
              <li class={status === 1 ? selectedClass: unselectedClass}>Pumpe 1</li>
              <li class={status === 2 ? selectedClass: unselectedClass}>Pumpe 2</li>
              <li class={status === 3 ? selectedClass: unselectedClass}>Pumpe 3</li>
              <li class={status === 4 ? selectedClass: unselectedClass}>Pumpe 4</li>
              <li class={status === 5 ? selectedClass: unselectedClass}>Pumpe 5</li>
              <li class={status === 6 ? selectedClass: unselectedClass}>Pumpe 6</li>
              <li class={status === 7 ? selectedClass: unselectedClass}>Pumpe 7</li>
              <li class={status === 8 ? selectedClass: unselectedClass}>Pumpe 8</li>
            </ul>
          </div>
        </div>
    </div>
  )
}

export default Cleaning