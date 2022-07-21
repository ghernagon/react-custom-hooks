import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";


const init = () => {
    return JSON.parse( localStorage.getItem( 'todos' ) ) || [];
}

// const initialState = [
//     {
//     	id: new Date().getTime(),
//     	description: 'Recolectar la piedra del alma',
//     	done: false,
//     },
// ];

/**
 * useTodo custom hook
 * @returns 
 */
export const useTodo = () => {
    const [ todos, dispatchTodoAction ] = useReducer( todoReducer, [], init );

    useEffect( () => {
        localStorage.setItem( 'todos', JSON.stringify( todos ) || [] );
    }, [ todos ] )


    const handleNewTodo = ( todo ) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo,
        };

        dispatchTodoAction( action );
    };

    const handleDeleteTodo = ( id ) => {
        const action = {
            type: '[TODO] Remove Todo',
            payload: id
        };
        dispatchTodoAction( action );
    }

    const handleToggleTodo = ( id ) => {
        const action = {
            type: '[TODO] Toggle Todo',
            payload: id
        };
        dispatchTodoAction( action );
    }

    return {
        todos,
        handleDeleteTodo,
        handleToggleTodo,
        handleNewTodo,
        todosCount: todos.length,
        pendientTodosCount: todos.filter( todo => !todo.done ).length,
    }
};
