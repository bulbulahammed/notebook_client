import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/loading/Loading";
import { deleteNoteAction, updateNoteAction } from '../../redux/actions/notesActions';


const  UpdateNote = ({match})=> {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const {id} = useParams();

  const dispatch = useDispatch();

  const noteUpdate = useSelector((state)=> state.noteUpdate);
  const {loading,error} = noteUpdate;

  const noteDelete = useSelector((state)=> state.noteDelete);
  const {loading: loadingDelete, error:errorDelete} =  noteDelete;

   const deleteHandler = (id) =>{
    if(window.confirm("Are You Sure?")){
      dispatch(deleteNoteAction(id));
      navigate("/myNotes");
    }
   }
  
   useEffect(()=>{
    const fetching = async () =>{
      const {data} = await axios.get(`https://notebookserver.up.railway.app/notes/${id}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };
    fetching();
   },[id,date])

   const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateNoteAction(id, title, content, category));
    if (!title || !content || !category) return;
    resetHandler();
    navigate("/myNotes");
  };

  return (
    <>
      <Card style={{maxWidth:"600px", margin:"auto",marginTop:"80px"}}>
        <Card.Header style={{textAlign:"center",textTransform:"uppercase",fontWeight:"bold"}}>Edit Your Note</Card.Header>
        <Card.Body>
          <Form onSubmit={handleUpdate}>
            {loading ? <Loading></Loading>: undefined}
            {loadingDelete ? <Loading></Loading>: undefined}
            {error ? <ErrorMessage>{error}</ErrorMessage>: undefined}
            {errorDelete ? <ErrorMessage>{error}</ErrorMessage>: undefined}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            
            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
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

              <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                placeholder="Enter the Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            {loadingDelete ? <Loading></Loading>: undefined}
            {errorDelete ? <ErrorMessage>{error}</ErrorMessage>: undefined}
            <div style={{marginTop:"20px",textAlign:"center"}}>
              <Button variant="primary" type="submit">
                Update Note
              </Button>
              <Button
                className="mx-2"
                variant="danger"
                onClick={() => deleteHandler(id)}
              >
                Delete Note
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}

export default UpdateNote