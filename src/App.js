import { useEffect, useState } from 'react';
import './App.css';
import { Login } from "./pages/login";
import Cookies from 'universal-cookie'
import { Chat } from './pages/chat';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  signOut} from 'firebase/auth'
import { auth } from './config/config-firebase';

const cookies = new Cookies();



function App() {

  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'));
  const [room, setRoom] = useState('');
  const [enter, setEnter] = useState(false)

  const handleLogOut = async () => {
    await signOut( auth);
    setIsAuth(false);
    cookies.remove('auth-token')
    setEnter(false)
  }
  useEffect(()=> {

  }, [])


  if (!isAuth) {
    return (
      <div className="App ">
        <Login setIsAuth={setIsAuth} />
        <div className='mt-5'>
          <h3 className='text-danger alien mb-3'>how to use chat room: </h3>
          <p>1. sign in with your gmail account</p>
          <p>2. type the room you want to enter</p>
          <p>3. invite others to use the same room</p>
          <p>4. happy hidden chatting</p>

        </div>
      </div>
    );
  } else if (enter) {
    return <div>
    <h3 className='text-center trajia m-5'>you are in the <span className='text-danger alien'>{room}</span> chat</h3>
    < Chat room={room} />
    <div className='d-flex align-items-center gap-3 justify-content-center mb-5'>
       <a className='btn btn-warning text-dark d-inline-block mr-4 mono' 
       onClick={()=> setEnter(false)}  href="">kembali ke room</a>   
       <a className='btn btn-danger mono ' 
       onClick={()=> handleLogOut()}  href="">keluar</a>
    </div>
  </div>
  } else {
  return <div>
    < div className='d-flex flex-column align-items-center mt-5'>
    <input placeholder='input the room...' className='mono form-control w-50 mb-3' onChange={(e)=> setRoom(e.target.value)} />
    <button className='rounded btn btn-success alien ' onClick={()=> room? setEnter(true): setEnter(false)}>get to the room</button>
    </div>
    
    
  </div>
  }
}

export default App;
