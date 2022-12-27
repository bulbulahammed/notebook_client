import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/loading/Loading";
import { updateProfile } from "../../redux/actions/userActions";
import "./Profile.css";

const Profile = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [updatedUserData,setUpdatedUserData] = useState({userInfo});

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } 
  }, [navigate, userInfo]);


  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData({ ...updatedUserData, [name]: value });
  };
  
  const {name,email,password,pic} = updatedUserData;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ name, email, password, pic }));
  };

  return (
      <>
        <h2 className="profile-header">Update Your Profile</h2>
        <Row className="profileContainer">
            <Col md={6}>
              <Form onSubmit={submitHandler}>
                 {loading ? <Loading/> :  undefined}
                 {success ? (<ErrorMessage variant="success">Update Successfully</ErrorMessage>) : undefined}
                 {error ? <ErrorMessage variant="danger">{error}</ErrorMessage> : undefined}
                 {/*------------ Name------------ */}
                 <Form.Group controlId="name">
                 <Form.Label>Name</Form.Label>
                    <Form.Control
                    type="text"
                    name="name"
                    value={name}
                    placeholder={userInfo?.name}
                    onChange={onInputChange}
                    ></Form.Control>
                 </Form.Group>
                {/* --------------Password------------------ */}
                <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email address</Form.Label>
                  <Form.Control 
                      type="email"
                      value={email}
                      name="email" 
                      placeholder={userInfo?.email}
                      onChange={onInputChange} 
                  />
              </Form.Group>
                {/* --------------Password------------------ */}
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Input New Password"
                    onChange={onInputChange}
                    ></Form.Control>
                </Form.Group>
                {/* -----------------Pic------------- */}
                <Form.Group>
                  <Form.Label>Profile Picture</Form.Label>
                  <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) =>
                        setUpdatedUserData({ ...updatedUserData, pic: base64 })
                      }
                      />
                </Form.Group>
                <Button type="submit" varient="primary" style={{marginTop:"10px"}}>Update</Button>
              </Form>
            </Col>
            <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={userInfo?.pic} alt="Profile" className="profilePic" />
          </Col>
        </Row>
      </>

  );
};

export default Profile;
