import {  addDoc, collection, getDocs, onSnapshot, serverTimestamp, where, query, orderBy } from "firebase/firestore"
import { useEffect, useState } from "react"
import { auth, db } from "../config/config-firebase"

export const Chat = (props) => {
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

    
    useEffect(() => {
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
            <h2 className="text-danger text-center mb-4 alien">room: {room}</h2>
            <div>
                
            </div>
            {messages.map((message)=>{
            return <div className={auth.currentUser.displayName === message.user? "text-end": "text-start"}><span className="">{message.user + "   "}</span>{message.text}</div>
        })}

  
    
     <form onSubmit={handleSubmit} class="d-flex mt-2" action="">
        <input value={newMessage} onChange={(e)=> setNewMessage(e.target.value)} class="form-control" placeholder="type message..." />
        <button class="btn btn-outline-success alien" >send</button>
      </form>
    </div>
}
