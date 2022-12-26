import React from 'react';
import { Accordion, Badge, Button, Card } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteNoteAction } from '../../redux/actions/notesActions';
import ErrorMessage from '../ErrorMessage';
import Loading from '../loading/Loading';
import './singleNote.css';

function SingleNote({note}) {
  const dispatch = useDispatch();
  const noteDelete = useSelector((state)=> state.noteDelete);
  const {loading:loadingDelete, error:errorDelete, success:successDelete} = noteDelete;

        const handleDelete =(id)=>{
            if (window.confirm("Are you sure?")) {
                dispatch(deleteNoteAction(id));
              }
        }
  return (
    <Accordion>
        <Accordion.Item eventKey='0'>
            <Card  style={{ margin: 10 }}>
                <Card.Header  style={{ display: "flex" }}>
                    <span
                        style={{
                            flex: 1}}
                        >
                        <Accordion.Header                         
                        style={{
                            color: "black",
                            textDecoration: "none",
                            cursor: "pointer",
                            alignSelf: "center",
                            fontSize: 18,
                            }}>
                            {note.title}
                        </Accordion.Header>
                    </span>
                    {loadingDelete ? <Loading/> :undefined}
                    {errorDelete ? <ErrorMessage>{errorDelete}</ErrorMessage> : undefined}
                    <div>
                        <Button style={{marginLeft:"15px"}}><Link to={`/note/${note._id}`}>Edit</Link> </Button>
                        <Button 
                            variant="danger"
                            className="mx-2"
                            onClick={() => handleDelete(note._id)}>Delete
                        </Button>
                    </div>
                </Card.Header>
                <Accordion.Body>
                    <Card.Body>
                    <h4>
                      <Badge className="bg-success text-white">
                        Category - {note.category}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <ReactMarkdown>{note.content}</ReactMarkdown>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {note.createdAt.substring(0,10)}
                        </cite>
                      </footer>
                    </blockquote>
                    </Card.Body>
                </Accordion.Body>
            </Card>
        </Accordion.Item>
    </Accordion>
  )
}

export default SingleNote