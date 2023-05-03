import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import './AddEdit.css';
import fireDb from "../firebase";
import {toast} from "react-toastify";
import 'firebase/compat/database';

const initialState = {
    name: "",
    email: "",
    role: "",
}

const AddEdit = () => {
    const [state,setState] = useState(initialState);
    const [data, setData] = useState({});

    const {name, email, role} = state;

    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        fireDb.child("supporter").on("value", (snapshot) => {
            if (snapshot.val()!== null){
                setData({...snapshot.val()})
            } else {
                setData({});
            }
        })
        return () => {
            setData ({});
        };
    }, [id]);

    useEffect(() => {
        if (id) {
            setState({...data[id]})
        } else {
            setState({...initialState})
        }
        return () => {
            setState({...initialState})
        }
    }, [id, data])

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({ ...state, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || ! email || !role) {
            toast.error("Please fill up all forms")
        } else {
            if (!id){
                fireDb.child("supporter").push(state, (err) => {
                    if (err) {
                        toast.error(err);
                    } else {
                        toast.success("Account Added Successfully!");
                    }
                }); 
            } else {
            fireDb.child(`supporter/${id}`).set(state, (err) => {
                if (err) {
                    toast.error(err);
                } else {
                    toast.success("Account Updated Successfully!");
                }
            });
            setTimeout(() => navigate("/"), 500);
            }}
    };

    return(
        <div class="body">
        <div style={{marginTop: "100px"}}>
        <div class="">
                <p class="biggg">Cyborg Account Registration</p>
            </div>
            <form style={{
                margin: "auto",
                maxWidth: "400px",
                alignContent: "center",}}
                on onSubmit={handleSubmit}>
                    <label class="zzz" htmlFor="name">Name</label>
                    <input
                    class="smoler"
                    type="text"
                    id="name"
                    name="name"
                    placeHolder="Firstname MI. Lastname"
                    value={name || ""}
                    onChange={handleInputChange} /><p></p>
                    
                    <label class="zzz" htmlFor="email">Email</label>
                    <input
                    class="smoler"
                    type="email"
                    id="email"
                    name="email"
                    placeHolder="email@email.com"
                    value={email || ""}
                    onChange={handleInputChange} /><p></p>
                    
                    <label class="zzz" htmlFor="role">Game</label>
                    <input
                    class="smoler"
                    type="text"
                    id="role"
                    name="role"
                    placeHolder="Name of the game"
                    value={role || ""}
                    onChange={handleInputChange} /><h1></h1><h1></h1><p></p><br></br>

                    <input class="seyb" type="submit" value={id ? "Update": "Save"} />
            </form>
        </div>
        </div>
    )
}

export default AddEdit