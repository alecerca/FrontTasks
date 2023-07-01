import React, { useContext, useEffect } from "react";
import Proyecto from "./Proyecto";
import ProyectoContext from "../../context/proyectos/proyectoContext";
import alertaContext from "../../context/alertas/alertaContext";
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const ListadoProyectos = () => {

    const proyectosContext = useContext(ProyectoContext);
    const {mensaje,proyectos, obtenerProyectos} = proyectosContext;

    const AlertaContext = useContext(alertaContext);
    const {alerta, mostrarAlerta} = AlertaContext;

    useEffect(() => {

        //si hay un error
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        obtenerProyectos();
        // eslint-disable-next-line
    }, [mensaje]);

    if(proyectos.length === 0) return <p>No hay Proyectos, comienza creando uno</p>;

    return(
        <ul className="listado-proyectos">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <TransitionGroup>
                {proyectos.map(proyecto =>(
                    <CSSTransition
                        key={proyecto.id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Proyecto
                            proyecto={proyecto}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
}

export default ListadoProyectos;