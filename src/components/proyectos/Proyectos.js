import React from "react";
import Sidebar from "../layout/Sidebar";
import Barra from "../layout/Barra";
import FormTarea from "../tareas/FormTarea";
import ListadoTarea from "../tareas/ListadoTarea";
import authContext from "../../context/authenticacion/authContext";
import { useContext } from "react";
import { useEffect } from "react";

const Proyectos = () => {

    //extraer la informacion de autenticacion
    const AuthContext = useContext(authContext);
    const {usuarioAutenticado} = AuthContext;

    const id = localStorage.getItem('id');

    useEffect(() => {
        usuarioAutenticado(id);
        // eslint-disable-next-line
    }, []);

    return(
        <div className="contenedor-app">
            <Sidebar/>
            <div className="seccion-principal">
                <Barra/>
                <main>
                    <FormTarea/>
                    <div className="contenedor-tareas">
                        <ListadoTarea/>
                    </div>
                </main>
            </div>

        </div>
    );
}

export default Proyectos;