import React from 'react'
import { Route, Redirect } from 'react-router-dom'
// import { useGlobalContext } from '../context/appContext'

const PrivateRoute = ({ children, ...rest }) => {
  // const { user } = useGlobalContext()

  return (
    <div></div>
    // <Route
    //   {...rest}
    //   render={() => {
    //     return user ? children : <Redirect to='/'></Redirect>
    //   }}
    // ></Route>
  )
}
export default PrivateRoute
