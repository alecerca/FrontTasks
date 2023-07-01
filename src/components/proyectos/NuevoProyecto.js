import React, { Fragment, useContext, useState } from "react";
import ProyectoContext from "../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {

    //obtener el state del formulario
    const proyectosContext = useContext(ProyectoContext);
    const {formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError} = proyectosContext;

    //state del proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    });

    const {nombre} = proyecto;

    const onChangeProyectos = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        });
    }

    const onSubmitProyecto = e =>{
        e.preventDefault();

        //validar proyecto
        if(nombre === ''){
            mostrarError();
            return;
        }

        agregarProyecto(proyecto);

        guardarProyecto({
            nombre: ''
        })
        
    }


    return(
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => mostrarFormulario()}
            >Nuevo Proyecto</button>

            {
                formulario
                ?
                    (
                        <form
                            className="formulario-nuevo-proyecto"
                            onSubmit={onSubmitProyecto}
                        >
                            <input
                                type="text"
                                className="input-text"
                                placeholder="Nombre Proyecto"
                                name="nombre"
                                value={nombre}
                                onChange={onChangeProyectos}
                            />

                            <input
                                type="submit"
                                className="btn btn-block btn-primario"
                                value="Agregar Proyecto"
                            />

                        </form>
                    ) : null
            }

            {errorformulario ? <p className="mensaje error">El nombre del Proyecto es obligatorio</p> : null}

        </Fragment>
    );
}

export default NuevoProyecto;