import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Navigate } from 'react-router';
import { Commet } from 'react-loading-indicators';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    if (loading) {
        return <div className='flex justify-center items-center mx-auto min-h-full min-w-full'><Commet color={["#673a18", "#915221", "#ba692b", "#d48244"]} /></div>
    }
    if (user && user?.email) { return children }
    return <Navigate to={'/login'}></Navigate>
};

export default PrivateRoutes;