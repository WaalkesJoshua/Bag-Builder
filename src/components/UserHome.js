import { useIsAuthenticated } from 'react-auth-kit'
import { useEffect } from 'react';




export default function UserHome() {
  const isAuth = useIsAuthenticated();

  return (
    <>
      <h6>UserHome</h6>
    </>
  )
}