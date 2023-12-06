import React, { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';

export default function RouteGuard({children}) {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    useEffect(function(){
        if(!isAuthenticated) navigate('/');
    }, [isAuthenticated, navigate])

  return isAuthenticated ? children : null
}
