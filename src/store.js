import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import { noteCreateReducer, noteDeleteReducer, noteListReducer, noteUpdateReducer } from './redux/reducers/NotesReducers';
import { userLoginReducers, userRegisterReducer, userUpdateReducer } from './redux/reducers/userReducers';


const reducer = combineReducers({
    userLogin: userLoginReducers,
    userRegister: userRegisterReducer,
    noteList: noteListReducer,
    noteCreate: noteCreateReducer,
    noteUpdate: noteUpdateReducer,
    noteDelete: noteDeleteReducer,
    userUpdate: userUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
   composeWithDevTools(applyMiddleware(...middleware))
);


export default  store;