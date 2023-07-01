import React, {useReducer} from 'react';
import authContext from './authContext.js';
import authReducer from './authReducer.js';
import tokenAuth from '../../config/tokenAuth.js';

import {
    REGISTRO_ERROR,
    REGISTRO_EXITOSO,
    OBTENER_USUARIO,
    LOGIN_ERROR,
    LOGIN_EXITOSO,
    CERRAR_SESION
} from '../../types/index.js';
import clienteAxios from '../../config/axios.js';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        usuario: null,
        autenticado: null,
        mensaje: null,
        id: localStorage.getItem('id'),
        cargando: true
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/Usuario/SignUp', datos);
            const id = respuesta.data;
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: id
            });
            //obtener el usuario autenticado
            usuarioAutenticado(respuesta.data.resultado.id);
        } catch (error) {
            console.log(error);

            const alerta = {
                msg: error.response.data.NombreExiste,
                categoria: 'alerta-error'
            }

            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            });
        }
        
    }


    const usuarioAutenticado = async (id) => {
        const token = localStorage.getItem('token');

        if(token){
            //TODO: funcion para enviar el token por headers
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get(`/api/Usuario/${id}`)
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.resultado
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: LOGIN_ERROR
            });
        }

    }

    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    //cuando el usuario inicia sesio
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/Usuario/Login', datos);
            const id = respuesta.data;
            dispatch({
                type: LOGIN_EXITOSO,
                payload: id
            });
            usuarioAutenticado(respuesta.data.resultado);
        } catch (error) {
            console.log(error);
            const alerta = {
                msg: error.response.data.NoExiste,
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            });
        }
    }


    return(
        <authContext.Provider
            value={{
                token: state.token,
                usuario: state.usuario,
                autenticado: state.autenticado,
                mensaje: state.mensaje,
                id: state.id,
                cargando: state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </authContext.Provider>
    );

}

export default AuthState;