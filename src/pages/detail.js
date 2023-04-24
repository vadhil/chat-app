import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"
import { db } from "../config/config-firebase"
import { useEffect, useState } from "react"

export const Detail = () => {
    const [users, setUsers] = useState ([])
    const ref = collection(db, "users")
    // const userRef = doc(db, 'users', id) tidak bisa karna id di params dari button
    
    //create 
    const handleCreate = () =>{
        addDoc(ref, {
            name: "fadhil",
            age: Number(25)
        })
    }
    // read, complicated but that is fine
    const handleRead = async () => {
        const data = await getDocs(ref);
        setUsers(data.docs.map((doc)=>({...doc.data(), id: doc.id})))
    }
    //update 
    const handleUpdate = (id, age) => {
        updateDoc(doc(db, 'users', id), {
        age: age +1
    })}
    //delete
    const handleDelete = (id) => {
        deleteDoc(doc(db, 'users', id))
    }
    useEffect(()=> {
        handleRead()
    }, [])
    return <div>
            <h1 className="display-3 text-center"> CRUD in react</h1>
            {users.map((user)=> {
                return <div className="p-3 bg-light border">
                    <h5>{user.name}</h5>
                    <h5>{user.age}</h5>
                    <button onClick={()=> handleDelete(user.id)} className="btn btn-danger">delete user</button>
                    <button onClick={()=> handleUpdate(user.id, user.age)} className="btn btn-warning">update</button>
                </div>
            })}

            <h4>create</h4>
            <button onClick={()=> handleCreate()} className="btn btn-success">create new user</button>


    </div>
}