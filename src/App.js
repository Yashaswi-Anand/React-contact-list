import './App.css';
import ContactList from './ContactList';
import Navbar from './Navbar';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <ContactList />
    </div>
  );
}

export default App;