import { signInWithPopup } from 'firebase/auth'
import { auth, provider} from '../config/config-firebase'
import Cookies from 'universal-cookie'

const cookies = new Cookies();
export const Login = (props) => {
 const {setIsAuth} = props

    const signIn = async () => {
       const result = await signInWithPopup(auth, provider);
       cookies.set('auth-token', result.user.refreshToken);
       const getcookies = cookies.get('auth-token');
        setIsAuth(true);
       
       
       console.log(getcookies);
       console.log(result.user.displayName);
       console.log(result);

    }
    return<div>
    <h2 className='mt-5 alien'> Chat App by Fadhil</h2>
    <div  className='container bg-light mt-5 py-5 col-8 col-md-4 rounded border shadow '>
        <div class="row justify-content-center align-items-center g-2">
            <h3>sign in with google</h3>
            <button className='btn btn-success col-3 alien shadow-sm' onClick={()=> signIn()}>sign in</button>
        </div>
    </div>
      
        
   
    </div>
}