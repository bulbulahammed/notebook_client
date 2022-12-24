import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/loading/Loading';
import { login } from '../../redux/actions/userActions';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const userLogin = useSelector((state)=> state.userLogin);
    const {loading,error,userInfo} = userLogin;
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(userInfo){
            navigate("/myNotes");
        }
    },[userInfo,navigate])

    const submitHandler = async(e)=>{
        e.preventDefault();
        console.log(email,password);

        dispatch(login(email,password))
    }


  return (
    <div className='text-center'  style={{maxWidth:"400px",margin:"auto"}}>
        <Container>
            <div>
                <h2>Login</h2>
                <hr/>
            </div>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {loading && <Loading/>}
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email"
                        value={email} 
                        placeholder="Enter email"
                        onChange={(e)=>setEmail(e.target.value)} 
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password"
                        value={password} 
                        placeholder="Password"
                        onChange={(e)=>setPassword(e.target.value)}
                     />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <hr/>
            <p>Don't have an account? <Link to="/register">Register</Link> </p>
        </Container>
    </div>
  )
}

export default Login