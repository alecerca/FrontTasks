import React,{useContext, useEffect} from "react";
import authContext from "../../context/authenticacion/authContext";

const Barra = () => {

    //extraer la informacion de autenticacion
    const AuthContext = useContext(authContext);
    const {usuario, usuarioAutenticado, cerrarSesion} = AuthContext;

    const id = localStorage.getItem('id');

    useEffect(() => {
        usuarioAutenticado(id);
        // eslint-disable-next-line
    }, []);

    return(
        <header className="app-header">
            {usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p> : null}
            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => cerrarSesion()}
                >Cerrar Sesion</button>
            </nav>
        </header>
    );
}

export default Barra;