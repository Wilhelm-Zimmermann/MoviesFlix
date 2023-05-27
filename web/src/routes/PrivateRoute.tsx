import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext, useAuth } from '../contexts/AuthContext';
import { NotLogged } from '../pages/NotLogged';

interface Props {
    component: React.ComponentType
    path?: string
  }
  
export const PrivateRoute: React.FC<Props> = ({ component: RouteComponent }) => {
    const { isAuthenticated } = useAuth();
  
    if (isAuthenticated) {
      return <RouteComponent />
    }
  
    if (!isAuthenticated) {
      // if user is not logged, this component will be rendered
      return <Navigate to="/forbidden"/>
    }
  
    return <Navigate to="/" />
}