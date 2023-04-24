import { useEffect, useState } from 'react';
import './App.css';
import { Login } from "./pages/login";
import Cookies from 'universal-cookie'
import { Chat } from './pages/chat';
// import { Profile } from './pages/profile';
// import { Detail } from './pages/detail';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Chats } from './pages/chats';

const cookies = new Cookies();



function App() {

  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'));
  const [room, setRoom] = useState('');
  const [enter, setEnter] = useState(false)
  
  
  
  useEffect(()=> {

  }, [])


  if (!isAuth) {
    return (
      <div className="App">
        <Login />
      </div>
    );
  }

  {if (enter) {
    return <div>
    <h3 className='text-center trajia m-5'>you are in the room chat</h3>
    < Chat room={room} />
    <button className='btn btn-outline-danger mt-5 mx-auto ms-auto text-center' onClick={()=> setRoom(false)}>log out</button>
  </div>}}
  return <div>
    < div className='d-flex flex-column align-items-center mt-5'>
    <input className='form-control w-50 mb-3' onChange={(e)=> setRoom(e.target.value)} />
    <button className='rounded' onClick={()=> room? setEnter(true): setEnter(false)}>get to room</button>
    </div>
    
  </div>

}

export default App;
