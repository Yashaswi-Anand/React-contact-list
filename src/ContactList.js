//  https://jsonplaceholder.typicode.com/users

import React, { useEffect, useState } from 'react'

function ContactList() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contactInput, setContactInput] = useState({
    name: "",
    phone:""
  })
  const onHandleChange = (event) =>{
    setContactInput({...contactInput, [event.target.name] : event.target.value })
  }
  const [isEditing,setIsEditing] = useState({
    edit: false,
    contactId:""
  })

  useEffect(() => {
    (async() => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
        const data = await res.json();
        console.log(data)
        setData(data);
        setLoading(false);
    })();
  }, []);


   // update contact
   const updateContact = () =>{

    // dummy put call
    const res = fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'PUT',
      body: JSON.stringify({
        name: contactInput.name,
        phone:contactInput.phone
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })

    // update data in data array
    const contactId = isEditing.contactId;
    const currContactList = [...data]
    const index = currContactList.findIndex(contact => contact.id === contactId);
    console.log(index)
    const contact = currContactList.find(contact => contact.id === contactId);
    currContactList[index] = {
        ...contact,
        name: contactInput.name,
        phone:contactInput.phone
    }
    setData(currContactList);
    setContactInput({
        name:"",
        phone:""
    })
    setIsEditing({...isEditing, edit:false,contactId:""})
  }

  // edit detail in input box
  const onContactEdit = (id) =>{
    setIsEditing({...isEditing, edit:true,contactId:id})
    const currContactList = [...data]
    const contact = currContactList.find(contact => contact.id === id);
    setContactInput({phone:contact.phone,name:contact.name})
  }

  // add contact 
  const onContactAdd = () =>{
    // dummy post call
    const res =fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })

    // add contact item
    setData([
        ...data,{id:Math.floor(Math.random() * 100),name:contactInput.name,phone:contactInput.phone}
    ])

    setContactInput({
        name:"",
        phone:""
    })
  }

  // detete contact
  const deteteContact = (id) =>{
    
    // dummy delete call
    const res = fetch('https://jsonplaceholder.typicode.com/users/id', {
      method: 'DELETE',
    });
    // delete from data array
    const updatedList = data.filter(item => item.id !== id)
    setData(updatedList)
  }

  return (
    <div>

      <div className='d-flex justify-content-evenly mt-3 ms-5 w-75'>
            <div>
              <div>
                  <input  type="text" 
                  placeholder="Enter name" 
                  name='name'
                  value={contactInput.name} 
                  onChange={(e)=>onHandleChange(e)}
                  />
              </div>
              <div>
                  <input  type="text" 
                  placeholder="Enter phone" 
                  name='phone'
                  value={contactInput.phone}
                  onChange={(e)=>onHandleChange(e)}
                  />
              </div>
            </div>
            {!isEditing.edit ?<button className='btn btn-primary align-self-center ms-2 p-2' onClick={()=>onContactAdd()}>+ ADD</button>
              :<button className='btn btn-warning align-self-center ms-2 p-2' onClick={()=>updateContact()}>Update</button>} 
            </div>

      <div className='row center m-5'>
          <div className='col-3'>Name</div>
          <div className='col-3'>Phone</div>
          <div className='col-3'>Update</div>
          <div className='col-3'>Delete</div>
      </div>
      
      {loading 
      ? (<p>Loading....</p>)
      : (data.map(item => (
          <div className='row mt-3 ms-2 me-3' key={item.id}>
              <div className='col-3'>{item.name}</div>
              <div className='col-3'>{item.phone}</div>
              <div className='col-3'><i onClick={()=> onContactEdit(item.id)} className="fa-solid fa-pen-to-square"></i></div>
              <div className='col-3'><i onClick={()=> deteteContact(item.id)} className="fa-solid fa-trash-can"></i></div>
          </div>   
      )))}

  </div>
  )
}

export default ContactList