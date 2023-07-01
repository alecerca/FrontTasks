import React, { useReducer } from "react";
import TareaContext from "./tareasContext";
import TareaReducer from "./tareasReducer";
import {

        TAREAS_PROYECTO,
        AGREGAR_TAREA,
        VALIDAR_TAREA,
        ELIMINAR_TAREA,
        TAREA_ACTUAL,
        ACTUALIZAR_TAREA,
        LIMPIAR_TAREA
        
        } from "../../types";
import clienteAxios from "../../config/axios";

const TareaState = props => {
    const initialState = {
        tareasproyecto : [],
        errortarea: false,
        tareaseleccionada: null
    }

    const [state, dispatch] = useReducer(TareaReducer, initialState);

    //crear las funciones

    //obtener las tareas de un proyecto
    const obtenerTareas = async proyectoId => {
        try {
            const respuesta = await clienteAxios.get(`/api/Tarea/${proyectoId}`);
            dispatch({
                type: TAREAS_PROYECTO,
                payload: respuesta.data.resultado
            });
        } catch (error) {
            console.log(error);
        }
    }

    //agregar una tarea al proyecto actual
    const agregarTarea = async tarea => {
        try {
            const respuesta = clienteAxios.post(`/api/Tarea/${tarea.proyectoId}`, tarea);
            console.log(respuesta);
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })
        } catch (error) {
            console.log(error);
        }
    }

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //eliminar tarea por id
    const eliminarTarea = async id => {
        try {
            await clienteAxios.delete(`/api/Tarea/${id}`);
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            });
        } catch (error) {
            console.log(error);
        }
    }

    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    const editarTarea = async tarea => {

        try {
            const respuesta = await clienteAxios.put(`/api/Tarea/${tarea.id}`, tarea);
            console.log(respuesta);

            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: respuesta.data.resultado
            })
        } catch (error) {
            console.log(error);
        }
        
    }

    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return(
        <TareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                editarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    );

}

export default TareaState;