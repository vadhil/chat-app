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

    const usersInRoom = [...new Set(messages.map((message)=> message.user))]

    console.log(usersInRoom);


    return <div className="bg-light container  rounded p-5">
            <h2 className="text-danger text-center mb-4 alien">user ini this {room} room:</h2>
                <div className="d-flex gap-1 mb-5">
                {usersInRoom.map((message, i)=>{
                  return  <span className="alien p-1 bg-opacity-75 rounded">{" "+ message + " "}</span>
                })}
                </div>
            <div>            
            </div>

            {messages.map((message)=>{
                return  <div className="d-flex flex-column">
                <p className={message.user === auth.currentUser.displayName? 
                "text-end bg-success bg-opacity-25 py-1 px-2 rounded ms-auto ":
                "p-1 rounded"} >
                <span className={message.user === auth.currentUser.displayName? 
                    "d-none": "rounded text-dark text-opacity-50"}>
                    {message.user + ":"}</span>
                    {"  " + message.text}</p>
            </div>
            })}
     <form onSubmit={handleSubmit} class="d-flex gap-1 mt-4" action="">
        <input value={newMessage} onChange={(e)=> setNewMessage(e.target.value)} class="form-control mono" placeholder="type message..." />
        <button class="btn btn-success mono " >send </button>
      </form>
    </div>
}
