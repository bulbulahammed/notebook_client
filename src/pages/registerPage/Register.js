import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/loading/Loading';
import { register } from './../../redux/actions/userActions';

function Register() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [pic, setPic] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState("");


    const dispatch = useDispatch();
    const userRegister = useSelector((state)=> state.userRegister);
    const {loading,error,userInfo} = userRegister;
    const navigate = useNavigate();


    useEffect(() => {
        if (userInfo) {
          navigate("/myNotes");
        }
      }, [navigate, userInfo]);
      
    const handleSubmit = async(e)=>{
        e.preventDefault();
        if (password !== confirmPassword) { 
            setMessage("Passwords do not match");
          } else dispatch(register(name, email, password, pic));
    };

const postDetails = (pics) => {
  if (!pics) {
    return setPicMessage("Please Select an Image");
  }
  setPicMessage(null);
  if (pics.type === "image/jpeg" || pics.type === "image/png") {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "notebook");
    data.append("cloud_name", "dp9psbgjh");
    fetch("https://api.cloudinary.com/v1_1/dp9psbgjh/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data:==>",data,"Data Url:==>",data.url);
        setPic(data.url.toString());
        console.log("Image After Set:==>",pic);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    return setPicMessage("Please Select an Image");
  }
};
    
  return (
    <div className='text-center'  style={{maxWidth:"400px",margin:"auto"}}>
    <Container>
        <div>
            <h2>Register</h2>
            <hr/>
        </div>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
        {loading && <Loading/>}
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type="name"
                    value={name} 
                    placeholder="Enter Your Name"
                    onChange={(e)=>setName(e.target.value)} 
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email"
                    value={email} 
                    placeholder="Enter email"
                    onChange={(e)=>setEmail(e.target.value)} 
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password"
                    value={password} 
                    placeholder="Password"
                    onChange={(e)=>setPassword(e.target.value)}
                 />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                    type="password"
                    value={confirmPassword} 
                    placeholder="Confirm Password"
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                 />
            </Form.Group>

            {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
            <Form.Group>
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => postDetails(e.target.files[0])}
                  id="custom-file"
                  custom
                  label="Upload Profile Picture"
                />
          </Form.Group>
            <Button variant="primary" type="submit" style={{marginTop:"10px"}}>
                Submit
            </Button>
        </Form>
        <hr/>
        <p>Already have an account? <Link to="/login">Login</Link> </p>
    </Container>
</div>
  )
}

export default Register