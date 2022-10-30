import React, { useEffect, useState } from 'react'
import { Route, Navigate, Routes as Switch, BrowserRouter } from 'react-router-dom'
// import ChatPage from './Pages/HomePage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { isSignin } from './Store/Actions/user';
import AuthenticationPage from './pages/AuthenticationPage';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Navbar from './components/NavBar/Navbar';
import Footer from './components/Footer/Footer';
import AddPost from './pages/AddPost';
import ProductDetail from './pages/ProductDetail';
import UserProfile from './pages/UserProfile';
import WishList from './pages/WishList';
import ChatBot from './components/ChatBot/ChatBot';
import Chats from './pages/Chats';


const Routes = () => {
  const login = useSelector(state => state.user.login);
  const user = useSelector(state => state.user.user);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const setSearchQuery = (val) => {
    setSearch(val)
  }

  useEffect(() => {
    dispatch(isSignin());
  }, [dispatch])

  return (
    <div >
      <ToastContainer />
      <BrowserRouter className="container">
        {login && user.role === 'client' && <Navbar setSearchQuery={setSearchQuery} />}
        {login && user.role === 'client' && <ChatBot />}
        <Switch className="container">

          {
            login ?
              <>
                {user.role === 'client' ?
                  <>
                    <Route path='/home' element={<HomePage search={search} />} exact />
                    <Route path='/productdetail/:id' element={<ProductDetail search={search} />} exact />
                    <Route path='/userprofile/:id' element={<UserProfile search={search} />} exact />
                    <Route path='/wishlist/:id' element={<WishList search={search} />} exact />
                    <Route path='/addpost' element={<AddPost search={search} />} exact />
                    <Route path='/chats' element={<Chats search={search} />} exact />
                    <Route path="/" element={<Navigate to="/home" />} />
                  </>
                  :
                  <>
                    <Route path='/dashboard' element={<Dashboard />} exact />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                  </>
                }

              </>
              :
              <Route path='/' element={<AuthenticationPage />} exact />


          }
        </Switch>
        {login && user.role === "client" && < Footer />}
      </BrowserRouter>

    </div>
  )
}

export default Routes