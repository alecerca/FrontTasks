import React, { useContext, useEffect, useState } from "react";
import ProyectoContext from "../../context/proyectos/proyectoContext";
import TareaContext from "../../context/tareas/tareasContext";

const FormTarea = () => {

    const proyectosContext = useContext(ProyectoContext);
    const { proyecto } = proyectosContext;

    //obtener la funcion del context de tarea
    const tareasContext = useContext(TareaContext);
    const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, editarTarea, limpiarTarea } = tareasContext;


    useEffect(() => {
        if(tareaseleccionada !== null){
            guardarTarea(tareaseleccionada);
        }else{
            guardarTarea({
                nombre: ''
            });
        }
    }, [tareaseleccionada]);

    const [tarea, guardarTarea] = useState({
        nombre: ''
    });

    //extraer el nombre del proyecto
    const { nombre } = tarea;

    if(!proyecto) return null;

    const [proyectoActual] = proyecto;

    //leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault();

        //validar
        if(nombre.trim() === ''){
            validarTarea();
            return;
        }

        if(tareaseleccionada === null){
            //agregar la nueva tarea al state de tareas
            tarea.proyectoId = proyectoActual.id;
            agregarTarea(tarea);
        }else {
            editarTarea(tarea);

            //elimina la tarea seleccionada del state
            limpiarTarea();
        }

        //pasar la validacion

        

        obtenerTareas(proyectoActual.id);

        //reinicar el form
        guardarTarea({
            nombre: ''
        })

    }

    return(
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"}
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
    );
}

export default FormTarea;