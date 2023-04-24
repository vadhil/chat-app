import {  addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { auth, db } from "../config/config-firebase"

export const Chat = (props) => {
    const [users, setUsers] = useState([])
    const [newUser, setNewUser] = useState('')
    const [newText, setNewText] = useState('')
    const [newMessage, setNewMessage] = useState([])
    const ref = collection(db, "chats")

    const { room } = props;

    
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

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(newMessage === "") return;
        await addDoc(collection(db, 'chats'),{
            createdAt: serverTimestamp(),
            text: newMessage,
            user: auth.currentUser.displayName,
            room
        })

        setNewMessage('');
    }

    return <div>

    {users.map((user)=>{
        return <div>
            <h4>{user.user}</h4>
            <p>{user.text}</p>
            {/* <p>{user.createdAt}</p> */}
        </div>
    })}    
    
     <form onSubmit={handleSubmit} class="d-flex" action="">
        <input value={newMessage} onChange={(e)=> setNewMessage(e.target.value)} class="form-control" placeholder="type message..." />
        <button class="btn btn-outline-success" >send</button>
      </form>
    </div>
}