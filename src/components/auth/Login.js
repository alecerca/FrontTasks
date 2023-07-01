import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import alertaContext from "../../context/alertas/alertaContext";
import authContext from "../../context/authenticacion/authContext";
import { useContext } from "react";
import { useEffect } from "react";

const Login = () => {

    //extraer los valores del context
    const AlertaContext = useContext(alertaContext);
    const {alerta, mostrarAlerta} = AlertaContext;

    const AuthContext = useContext(authContext);
    const {mensaje, autenticado, iniciarSesion} = AuthContext;

    const navigate = useNavigate();

    //En caso de que el usuario o el password no exista
    useEffect(() => {

        if(autenticado){
            navigate('/proyectos');
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado]);
    // eslint-disable-next-line
    //state para iniciar sesion
    const [usuario, guardarUsuario] = useState({
        email: '',
        password: ''
    });

    //extraer de usuario
    const { email, password} = usuario;

    const onChange = e => {

        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        });

    }

    const onSubmit = e => {
        e.preventDefault();

        //validar que no haya campos vacios
        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        }

        //pasarlo al action
        iniciarSesion({email, password});
    }

    return(
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-darl">
                <h1>Iniciar Sesión</h1>

                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesión"
                        />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Obtener Cuenta
                </Link>
            </div>
        </div>
    );
}

export default Login;