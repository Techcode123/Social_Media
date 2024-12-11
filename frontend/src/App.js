import './App.css';
import { Header } from './Components/Header';
import { Sidebar } from './Components/Sidebar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { SignIn } from './Components/SignIn';
import { LogIn } from './Components/LogIn';
import { CreatePost } from './Components/CreatePost';
import { Rightbar } from './Components/RightBar';
import { Home } from './Components/Home';
import { useEffect } from 'react';
import axios from 'axios';
import { UserProfile } from './Components/UserProfile';
import { Friends } from './Components/Friends';
import { OtherProfile } from './Components/OtherProfile';
import { Search } from './Components/Search';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const navigate = useNavigate();


  useEffect(() => {
    axios('http://localhost:5000/api/v1/user/auth', {
      method: "get",
      withCredentials: true
    }).then((res) => {
      if (res.data.success === false) navigate('/login');
    }).catch((error) => {
      console.log(error)
    });
  }, [])
  return (
    <>
      <Header />
      <div className='wrapper flex items-start '>
        {console.log(window.location.pathname)}
        {window.location.pathname === '/signin' || window.location.pathname === '/login' || window.innerWidth < 640 ? "" : <Sidebar />}

        <Routes>
          <Route path='/createpost' element={<CreatePost />}></Route>
          <Route path='/' element={<Home />}></Route>
          <Route path='/userprofile' element={<UserProfile />}></Route>
          <Route path='/friends' element={<Friends />}></Route>
          <Route path='/singleuser/:id' element={<OtherProfile />}></Route>
          <Route path='search' element={<Search />} />
          {window.innerWidth < 640 && <Route path='/alluser' element={<Rightbar />}></Route>}
        </Routes>

        {window.location.pathname === '/signin' || window.location.pathname === '/login' || window.innerWidth < 640 ? "" : <Rightbar />}

      </div>
      <Routes>
        <Route path='/signin' element={<SignIn />}></Route>
        <Route path='/login' element={<LogIn />}></Route>
      </Routes>


      <ToastContainer
        position="top-center"
        autoClose={1000}
      />
    </>
  );
}

export default App;
