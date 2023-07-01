import React from 'react';
import {Navigate} from 'react-router-dom';
import authContext from '../../context/authenticacion/authContext';
import { useContext } from 'react';
import { useEffect } from 'react';

const RutaPrivada = ({children}) => {

    const AuthContext = useContext(authContext);
    const { cargando, autenticado, usuarioAutenticado } = AuthContext;

    const id = localStorage.getItem('id');

    useEffect(() => {
        usuarioAutenticado(id);
        // eslint-disable-next-line
    }, []);

    if(!autenticado && !cargando){
        return <Navigate to="/"/>
    }

    return children;
}
 
export default RutaPrivada;