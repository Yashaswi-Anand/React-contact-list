//  https://jsonplaceholder.typicode.com/users

import React, { useEffect, useState } from 'react'

function ContactList() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async() => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
        const data = await res.json();
        console.log(data)
        setData(data);
        setLoading(false);
    })();
}, []);

  return (
    <div>

{/* <li key={item.id}><pre>{item.name} {item.phone}</pre></li> */}
      <div className='row center m-5'>
          <div className='col-3'>Name</div>
          <div className='col-3'>Phone</div>
          <div className='col-3'>Update</div>
          <div className='col-3'>Delete</div>
      </div>
      <ul>
            {loading 
            ? (<p>Loading....</p>)
            : (data.map(item => (
                <div className='row mt-3 ms-2 me-5' key={item.id}>
                    <div className='col-3'>{item.name}</div>
                    <div className='col-3'>{item.phone}</div>
                    <div className='col-3'><i class="fa-solid fa-pen-to-square"></i></div>
                    <div className='col-3'><i class="fa-solid fa-trash-can"></i></div>
                </div>
                
            )))}
        </ul>
    </div>
  )
}

export default ContactList