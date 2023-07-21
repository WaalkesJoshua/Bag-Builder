// import { useIsAuthenticated } from 'react-auth-kit'
import { useEffect } from 'react';
import { fetchUsers } from '../slicers/userSlice';
import { useDispatch, useSelector } from "react-redux";





export default function UserHome() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.currentUser);

  useEffect(() => {
    fetchUsers(dispatch);
  }, [dispatch]);

  return (
    <>
    <div>{user.firstName}</div>
    </>
  )
}