import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/loading/Loading";
import { updateProfile } from "../../redux/actions/userActions";
import "./Profile.css";

const Profile = ({ location }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [navigate, userInfo]);

  const postDetails = (pics) => {
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
          setPic(data.url.toString());
          console.log(pic);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateProfile({ name, email, password, pic }));
  };

  return (
      <>
        <h2>Update Your Profile</h2>
        <Row className="profileContainer">
            <Col md={6}>
              <Form onSubmit={submitHandler}>
                 {loading && <Loading/>}
                 {success && (<ErrorMessage variant="success">Update Successfully</ErrorMessage>)}
                 {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                 {/*------------ Name------------ */}
                 <Form.Group>
                 <Form.Label>Name</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                 </Form.Group>
                 {/* -----------------Email--------------- */}
                 <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                {/* --------------Password------------------ */}
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                {/* ----------------Confirm Password---------- */}
                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>{" "}
                {picMessage && (
                    <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                )}
                {/* -----------------Pic------------- */}
                {/* TODO: Implement Update Profile Picture */}

                <Button type="submit" varient="primary" style={{marginTop:"10px"}}>
                Update
              </Button>

              </Form>
            </Col>
            <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt={name} className="profilePic" />
          </Col>
        </Row>
      </>

  );
};

export default Profile;
