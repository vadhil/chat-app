import { Timestamp, addDoc, collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { auth, db } from "../config/config-firebase"

export const Chats = () => {
    // const [ user] = auth; 
    const [users, setUsers] = useState([])
    const [newUser, setNewUser] = useState('')
    const [newText, setNewText] = useState('')
    const ref = collection(db, "chats")


    // const currentUser = auth.currentUser;
    // console.log(currentUser.displayName);
    const handleCreate = async() => {
        await addDoc(ref, {
            user: newUser,
            text: newText
        })
    }

    const handleRead = async () => {
        const data = await getDocs(ref)
        setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    useEffect(() => {
        handleRead()
    }, [])

    return <div>
        {/* {users.map((user)=> {
            return <div>
                <p>{user.text}</p>
                <p>{user.user}</p>
                </div>
        })} */}
     
     <form  class="d-flex" action="submit">
        <input class="form-control" placeholder="type message..." />
        <button class="btn btn-outline-success" type="submit">send</button>
      </form>


         {/* <input onChange={(e)=> setNewUser(e.target.value)} placeholder="type a message" />
        <button onClick={()=>handleCreate()} className="btn"> name </button>
        <input onChange={(e)=> setNewText(e.target.value)} placeholder="type a message" />
        <button onClick={()=>handleCreate()} className="btn"> send </button> */}


    </div>
}