import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/loading/Loading';
import { createNoteAction } from '../../redux/actions/notesActions';

function CreateNote() {
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [category,setCategory] = useState("");
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const noteCreate = useSelector((state)=>state.noteCreate);
    const {loading,error,note} = noteCreate;
    console.log(note);

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(createNoteAction(title,content,category));
        if(!title || !content || !category) return;
        handleReset();
        navigate("/myNotes");
    }
    const handleReset = () =>{
        console.log("Someone Reset The Form");
        setTitle("");
        setContent("");
        setCategory("");
    }
  return (
    <>
        <Card style={{maxWidth:"600px", margin:"auto",marginTop:"80px"}}>
            <Card.Header style={{textAlign:"center",textTransform:"uppercase",fontWeight:"bold"}}>Create A New Note Page</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    {error ? <ErrorMessage>{error}</ErrorMessage> : undefined}
                    <Form.Group controlId='title'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                           type="text"
                           value={title}
                           placeholder="Enter Note Title"
                           onChange={(e)=>setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='content'>
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                           as="textarea"
                           value={content}
                           placeholder="Enter Note Content"
                           onChange={(e)=>setContent(e.target.value)}
                        />
                    </Form.Group>
                    {content ? (
                        <Card>
                            <Card.Header>Note Preview</Card.Header>
                            <Card.Body>
                                <ReactMarkdown>{content}</ReactMarkdown>
                            </Card.Body>
                        </Card>
                    ) : undefined}
                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                          type='text'
                          value={category}
                          placeholder="Enter The Category"
                          onChange={(e)=>setCategory(e.target.value)}
                        />
                    </Form.Group>
                    {loading ? <Loading/> : undefined}
                    <div style={{marginTop:"20px",textAlign:"center"}}>
                        <Button type="submit" variant="primary">Create Note</Button>
                        <Button className='mx-2' variant='danger' onClick={handleReset}>Reset</Button>
                    </div>
                </Form>
            </Card.Body>
            <Card.Footer className='text-muted'>
                 Creating on - {new Date().toLocaleDateString()}
            </Card.Footer>
        </Card>
    </>
  )
}

export default CreateNote