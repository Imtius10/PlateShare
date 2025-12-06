import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Navigate } from 'react-router';

const PrivateRoutes = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (user && user?.email) { return children }
    return <Navigate to={'/login'}></Navigate>
};

export default PrivateRoutes;