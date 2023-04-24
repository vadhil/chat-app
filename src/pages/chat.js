import {  addDoc, collection, getDocs, onSnapshot, serverTimestamp, where, query, orderBy } from "firebase/firestore"
import { useEffect, useState } from "react"
import { auth, db } from "../config/config-firebase"

export const Chat = (props) => {
    const [users, setUsers] = useState([])
    const [newUser, setNewUser] = useState('')
    const [newText, setNewText] = useState('')
    const [newMessage, setNewMessage] = useState([])
    const [messages, setMessages] = useState([])
    const ref = collection(db, "chats")

    const { room } = props;

    
    useEffect(()=> {
        const queryMessages = query(ref, where("room", "==", room), orderBy("createdAt") )
        const unsubscribe = onSnapshot(queryMessages, (snapshot)=> {
            let messages = []
            snapshot.forEach((doc)=> {
                messages.push({...doc.data(), id: doc.id})
            })
            setMessages(messages);
        })
        return () => unsubscribe();
    }, [])

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



    return <div className="bg-light container w-75  rounded p-5">
            <h2 className="text-danger">room: {room}</h2>
            <div>
                
            </div>
            {messages.map((message)=>{
            return <div><span className="">{message.user + "   "}</span>{message.text}</div>
        })}

  
    
     <form onSubmit={handleSubmit} class="d-flex" action="">
        <input value={newMessage} onChange={(e)=> setNewMessage(e.target.value)} class="form-control" placeholder="type message..." />
        <button class="btn btn-outline-success" >send</button>
      </form>
    </div>
}



// {users.map((user)=>{
//     return <div className="">
//         <h4 className="">{user.user}</h4>
//         <p>{user.text}</p>
//         {/* <p>{user.createdAt}</p> */}
//     </div>
// })}   