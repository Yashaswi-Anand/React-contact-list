import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const success = (message) => {
    toast.success(message, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    })
}