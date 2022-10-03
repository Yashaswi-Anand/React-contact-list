//  https://jsonplaceholder.typicode.com/user
import './App.css';
import React, { useEffect, useState } from 'react'
import { success } from './Toast';

function ContactList() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contactInput, setContactInput] = useState({
    name: "",
    phone: ""
  })
  const onHandleChange = (event) => {
    setContactInput({ ...contactInput, [event.target.name]: event.target.value })
  }
  const [isEditing, setIsEditing] = useState({
    edit: false,
    contactId: ""
  })
  // load data from api before component load.
  useEffect(() => {
    (async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
      const data = await res.json();
      console.log(data)
      setData(data);
      setLoading(false);
    })();
  }, []);


  // update contact list
  const updateContact = () => {

    // dummy put call
    const res = fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'PUT',
      body: JSON.stringify({
        name: contactInput.name,
        phone: contactInput.phone
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
      phone: contactInput.phone
    }
    setData(currContactList);
    setContactInput({
      name: "",
      phone: ""
    })
    setIsEditing({ ...isEditing, edit: false, contactId: "" })
    success('updated successfully !!!')
  }

  // edit detail in input box
  const onContactEdit = (id) => {
    setIsEditing({ ...isEditing, edit: true, contactId: id })
    const currContactList = [...data]
    const contact = currContactList.find(contact => contact.id === id);
    setContactInput({ phone: contact.phone, name: contact.name })
  }

  // add contact 
  const onContactAdd = () => {
    // dummy post call
    const res = fetch('https://jsonplaceholder.typicode.com/posts', {
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
      ...data, { id: Math.floor(Math.random() * 100), name: contactInput.name, phone: contactInput.phone }
    ])

    setContactInput({
      name: "",
      phone: ""
    })
    success('Added successfully !!!')
  }

  // detete contact
  const deteteContact = (id) => {

    // dummy delete call
    const res = fetch('https://jsonplaceholder.typicode.com/users/id', {
      method: 'DELETE',
    });
    // delete from data array
    const updatedList = data.filter(item => item.id !== id)
    setData(updatedList)
    success('deleted successfully !!!')
  }

  return (
    <div >
      <div className='d-flex justify-content-evenly mt-3 ms-5 w-75'>
        <div>

          <input type="text"
            placeholder="Enter name"
            name='name'
            value={contactInput.name}
            onChange={(e) => onHandleChange(e)}
          />

          <input type="text"
            placeholder="Enter phone"
            name='phone'
            value={contactInput.phone}
            onChange={(e) => onHandleChange(e)}
          />

        </div>
        {!isEditing.edit ? <button className='btn btn-primary text-light align-self-center button-style' onClick={() => onContactAdd()}>+ ADD</button>
          : <button className='btn btn-info text-light align-self-center button-style' onClick={() => updateContact()}>Update</button>}
      </div>

      <hr />

      <div className='margin'>
        <div className='row mt-3 ms-5'>
          <div className='col-3 text-success fs-4'>Name</div>
          <div className='col-4 text-success fs-4'>Phone</div>
          <div className='col-2 text-success fs-4'>Update</div>
          <div className='col-1 text-success fs-4'>Delete</div>
        </div>
      </div>

      <div className='margin'>
        {loading
          ? (<p>Loading....</p>)
          : (data.map(item => (
            <div className='row mt-3 ms-5 ' key={item.id}>
              <div className='col-3 fs-6 text-align'>{item.name}</div>
              <div className='col-3 fs-6 text-align'>{item.phone}</div>
              <div className='col-2'><i onClick={() => onContactEdit(item.id)} className="fa-solid fa-pen-to-square fs-6"></i></div>
              <div className='col-1'><i onClick={() => deteteContact(item.id)} className="fa-solid fa-trash-can fs-6"></i></div>
            </div>
          )))}
      </div>

    </div>
  )
}

export default ContactList