import React from 'react'

function Navbar() {
  return (
    <div className='row bg-warning p-1'>
        <div className='col-4'><h2 className='mt-3'><i className="fa-solid fa-address-book"></i> Contact List</h2></div>
        <div className='col-4'></div>
        <div className='col-4'><h2 className='mt-3'>Add Contact</h2></div>
    </div>
  )
}

export default Navbar