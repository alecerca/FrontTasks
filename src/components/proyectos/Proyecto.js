import React, { useContext } from "react";
import ProyectoContext from "../../context/proyectos/proyectoContext";
import TareaContext from "../../context/tareas/tareasContext";

const Proyecto = ({proyecto}) => {

    //obtener el state de proyecto
    const proyectosContext = useContext(ProyectoContext);
    const { proyectoActual } = proyectosContext;

    //obtener la funcion del context de tarea
    const tareaContext = useContext(TareaContext);
    const {obtenerTareas} = tareaContext;

    //funcion para agregar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id);
        obtenerTareas(id);
    }


    return(
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarProyecto(proyecto.id)}
            >{proyecto.nombre}</button>
        </li>
    );
}

export default Proyecto;