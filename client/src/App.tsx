import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Editor from './pages/Editor'
import NotFound from './pages/NotFound'
import { ThemeProvider } from './components/theme-provider'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useGetUserDetailsQuery } from './redux/slices/api'
import { useDispatch } from 'react-redux'
import { updateCurrentUser, updateIsLoggedIn } from './redux/slices/AppSlice'
import { useEffect } from 'react'
import MyCodes from './pages/MyCodes'
import Profile from './pages/Profile'
import User from './pages/User'
import Room from './pages/Room'
const App = () => {

  // @ts-ignore
  const { data, error } = useGetUserDetailsQuery()
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(updateCurrentUser(data));
      dispatch(updateIsLoggedIn(true));
    } else if (error) {
      dispatch(updateCurrentUser({}));
      dispatch(updateIsLoggedIn(false));
    }
  }, [data, error]);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/editor' element={<Editor />} />
          <Route path='/editor/:id' element={<Editor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/my-codes' element={<MyCodes />} />
          <Route path="*" element={<NotFound />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/user/:id' element={<User />} />
          <Route path='/room' element={<Room />} />
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App