import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({children}) {
    // const token = useSelector((state) => state.user.token);
    const token = localStorage.getItem("token")
    const auth = useSelector((state)=> state.user.auth)
   
    if(!token)
    {   console.log(auth)
        return <Navigate to="/" />;
    }
    return children;
}

export default PrivateRoute;