import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../config/config-firebase";

export const Profile = () => {
    const [newName, setNewName] = useState('');
    const [newAge, setNewAge] = useState(0);
    const [users, setUsers] = useState([])
    const ref = collection(db, 'users');   

    const addUserData = async () => {
        await addDoc(ref, {
            name: newName,
            age: Number(newAge)
        })
    }

    const updateUser = async (id, age) => {
        const userDoc = doc(db, 'users', id)
        await updateDoc(userDoc, {
            age: age + 1,
        
        })
    }

    const deleteUser = async (id) => {
        const user = doc(db, 'users', id)
        await deleteDoc(user)
    }

    const getUserData = async () => {
        const data = await getDocs(ref);
        setUsers(data.docs.map((doc)=> ({...doc.data(), id: doc.id})))
        console.log(users);
    }
    useEffect(()=> {
        getUserData()

    }, [])
    return <div>
          <input placeholder="name" type="text" onChange={(e)=>setNewName(e.target.value)} />
        <input placeholder="age" type="number" onChange={(e)=>setNewAge(e.target.value)} />
        <button onClick={() => addUserData()} className="btn btn-success"> enter</button>
        {users.map((user)=>{
            return <div className="row text-center justify-contect-center">
                <h3 className="col-3">{user.name}</h3>
                <h4 className="col-3">{user.age}</h4>
                <h4 className="col-3">{user.hero}</h4>
                <button onClick={() => updateUser(user.id, user.age)} className="btn btn-secondary">increase age</button>
                <button onClick={() => deleteUser(user.id)} className="btn btn-danger">delete</button>
            </div>
        })}
    </div>
}