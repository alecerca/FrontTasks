import {
    REGISTRO_ERROR,
    REGISTRO_EXITOSO,
    OBTENER_USUARIO,
    LOGIN_ERROR,
    LOGIN_EXITOSO,
    CERRAR_SESION
} from '../../types/index.js';

export default (state, action) => {
    switch(action.type) {
        
        case LOGIN_EXITOSO:
            localStorage.setItem('token',action.payload.token);
            localStorage.setItem('id', action.payload.resultado)
            return{
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false
            }
        case REGISTRO_EXITOSO:
            localStorage.setItem('token',action.payload.token);
            localStorage.setItem('id', action.payload.resultado.id);
            return{
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false
            }

        case OBTENER_USUARIO:
            return{
                ...state,
                autenticado: true,
                usuario: action.payload,
                cargando: false
            }

        case CERRAR_SESION:
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            return{
                ...state,
                autenticado: null,
                usuario: null,
                token: null,
                mensaje: action.payload,
                cargando: false
            }

        default:
            return state;
    }
}