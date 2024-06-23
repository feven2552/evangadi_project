import {Routes, Route, useNavigate} from 'react-router-dom'
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import axios from './axiosConfig'
import { useEffect, useState, createContext } from 'react';
import DashBoard from './pages/DashBoard/DashBoard';
import Answer from './pages/Answer/Answer';
import Questions from './pages/Question/Question'

export const AppState = createContext()

function App() {
  const [user, setUser] = useState({})
  const token = localStorage.getItem('token')
  const navigate = useNavigate();


useEffect(() => {
  async function checkuser(){
    try {
      const {data} = await axios.get('/users/check', {
        headers:{
          Authorization: `Bearer ${token}`,
        }
      })
      setUser(data);
    } catch (error) {
      console.log(error.response);
      navigate('/login');
    }
    }
    if (token) {

      checkuser();
    } 
    else {
      navigate('/login');
    }  
}, [token]);

  return (
    <AppState.Provider value = {{user, setUser}}>      
      <Routes>
        <Route path='/' element = {<DashBoard/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/register' element = {<Register/>}/>
        <Route path="/answer/:questionid" element={<Answer />} />
        <Route path="/ask" element={<Questions />}/>
      </Routes>
    </AppState.Provider>
  );
}

export default App;
