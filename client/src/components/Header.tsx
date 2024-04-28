import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from '@/redux/slices/api'
import { updateCurrentUser, updateIsLoggedIn } from '@/redux/slices/AppSlice'
import { handleError } from '@/utils/handleError'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { updateIsOwner } from '@/redux/slices/CodeSlices'


const Header = () => {

  const [logout, { isLoading }] = useLogoutMutation()
  const isLoggedIn = useSelector((state: RootState) => state.AppSlice.isLoggedIn)
  const currentUser = useSelector((state: RootState) => state.AppSlice.currentUser);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      //@ts-ignore
      await logout().unwrap();
      dispatch(updateIsLoggedIn(false));
      dispatch(updateCurrentUser({}));
      dispatch(updateIsOwner(false));
      navigate("/")
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <nav className="w-full h-[60px] bg-gray-900 text-white p-3 flex justify-between items-center">
      <Link to="/">
        <h2 className="font-bold select-none">SpaghettiHub</h2>
      </Link>
      <ul className="flex gap-2">
        <li>
          <Link to="/all-codes">
            <Button variant="secondary">All Codes</Button>
          </Link>
        </li>
        <li>
          <Link to="/editor">
            <Button variant="secondary">Editor</Button>
          </Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/my-codes">
                <Button variant="blue">My Codes</Button>
              </Link>
            </li>
            <li>
              <Button onClick={handleLogout} disabled={isLoading} variant="destructive">
                Logout
              </Button>
            </li>
            <li>
              <Link to="/profile">
                <Avatar className='cursor-pointer'>
                  <AvatarImage src={`http://localhost:4000/${currentUser.picture}`} />
                  <AvatarFallback className="capitalize">
                    {currentUser.username?.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <Button variant="blue">Login</Button>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <Button variant="blue">Signup</Button>
              </Link>
            </li>
          </>
        )}
      </ul >
    </nav >
  )
}

export default Header