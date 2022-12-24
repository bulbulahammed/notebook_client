import React, { useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/loading/Loading';
import SingleNote from '../../components/singleNote/SingleNote';
import { listNotes } from './../../redux/actions/notesActions';




function MyNotes({search}) {
    const dispatch = useDispatch();
    const  noteList = useSelector(state=> state.noteList)
    const {loading,notes,error} = noteList;

    const navigate = useNavigate();

    // If the user is not logged in then push user to Login Page
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin;
    
    // If the User is Created then Refetch again
    const noteCreate = useSelector((state)=>state.noteCreate);
    const {success: successCreate} = noteCreate;

    // If User Delete Then Refetch Again
    const noteDelete = useSelector((state)=> state.noteDelete);
    const {success:successDelete} = noteDelete;

    useEffect(()=>{
      dispatch(listNotes());
      if(!userInfo){
        navigate("/");
      }
    },[dispatch,navigate,successCreate,userInfo,successDelete]);
  return (
    <div className='myNotesHeader'>
        <Container>
            <div className='myNotesTitle'>
                    {userInfo? <h2>{`Welcome Back ${userInfo.name}!`}</h2> : <h2>Please Login To see Your Notes</h2>}
                <hr/>
            </div>
            <Link to="/createnote">
                <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
                    Create new Note
                </Button>
            </Link>

            {/* If there is Error Show the Error message */}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            {/* If the state is Loading Show Loading component */}
            {loading && <Loading/>}
            {/* {
               notes &&
                notes.map(note=><SingleNote note={note} key={note._id}/>)
            } */}

            {
              search? notes && notes.filter((filteredNote)=>
              filteredNote.title.toLowerCase().includes(search.toLowerCase())).map(note=><SingleNote note={note} key={note._id}/>) : notes && notes.map(note=><SingleNote note={note} key={note._id}/>)
            }
        </Container>
    </div>
  )
}

export default MyNotes