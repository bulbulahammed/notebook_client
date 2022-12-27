import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/loading/Loading';
import { register } from './../../redux/actions/userActions';


const initialState = {
  name:"",
  email:"",
  password:"",
  pic:"",
}


function Register() {
  const [userData,setUserData] = useState(initialState);
  const {name,email,password,pic} = userData;
    const [message, setMessage] = useState(null);


    const dispatch = useDispatch();
    const userRegister = useSelector((state)=> state.userRegister);
    const {loading,error,userInfo} = userRegister;
    const navigate = useNavigate();


    useEffect(() => {
        if (userInfo) {
          navigate("/myNotes");
        }
      }, [navigate, userInfo]);

      const onInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
      };
      
    const handleSubmit = async(e)=>{
        e.preventDefault();
        if (name && email && password && pic) { 
          dispatch(register(name, email, password, pic));
          } else setMessage("Fill All The Field");
    };

    
  return (
    <div className='text-center'  style={{maxWidth:"400px",margin:"auto"}}>
    <Container>
        <div>
            <h2>Register</h2>
            <hr/>
        </div>
        {error ? <ErrorMessage variant="danger">{error}</ErrorMessage> : undefined}
        {message ? <ErrorMessage variant='danger'>{message}</ErrorMessage> : undefined}
        {loading ? <Loading/> : undefined}
        <form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type="text"
                    value={name}
                    name="name"
                    placeholder="Enter Your Name"
                    onChange={onInputChange} 
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email"
                    value={email}
                    name="email" 
                    placeholder="Enter email"
                    onChange={onInputChange} 
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password"
                    value={password}
                    name="password"
                    placeholder="Password"
                    onChange={onInputChange} 
                 />
            </Form.Group>
            <Form.Group>
            <Form.Label>Profile Picture</Form.Label>
            <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                  setUserData({ ...userData, pic: base64 })
                }
                />
          </Form.Group>
            <Button variant="primary" type="submit" style={{marginTop:"10px"}}>
                Submit
            </Button>
        </form>
        <hr/>
        <p>Already have an account? <Link to="/login">Login</Link> </p>
    </Container>
</div>
  )
}

export default Register