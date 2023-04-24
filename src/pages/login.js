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
    return <div>
        <h3>sign in with google</h3>
        <button onClick={()=> signIn()}>sign in</button>
   
    </div>
}