import { createStore } from "vuex"
import axios from "axios"

const url = ('https://tychak.github.io/')

export default createStore({
    state: {
        todos: JSON.parse(localStorage.getItem("TODOS")) ? JSON.parse(localStorage.getItem("TODOS")) : [],
    },
    getters: {
        completeTodos(state) {
            return state.todos.filter(todo => todo.isComplete == true)
        },
        inCompleteTodos(state) {
            return state.todos.filter(todo => todo.isComplete == false)
        }
    },
    actions: {
        async fetchTodos({commit}) {
            axios
            .get(url)
            .then(response => response.data)
            .then(todos => {
                commit('SET_TODOS', todos)
            })
        },
        async createTodo({commit}, todo) {
            commit('NEW_TODO', todo)
        },
        async deleteTodos({commit}, {id}) {
            commit('DELETE_TODO', {id})
        },
        async editTodos({commit}, {id}) {
            commit('EDIT_TODO', {id})
        },
        async markComplete({commit}, {id, isComplete}) {
            commit('MARK_COMPLETE', {id, isComplete})
        }
    },
    mutations: {
        SET_TODOS(state, todos) {
            //state.todos = todos
            localStorage.setItem("TODOS", JSON.stringify(state.todos))
            state.todos = JSON.parse(localStorage.getItem("TODOS"))
        },
        NEW_TODO(state, todo) {
            let todos = state.todos.concat(todo)
            localStorage.setItem("TODOS", JSON.stringify(todos))
            state.todos = JSON.parse(localStorage.getItem(todos))
        },
        DELETE_TODO(state, {id}) {
            let todos = state.todos.filter(t => t.id != id)
            state.todos = todos
            var newTodo = JSON.parse(localStorage.getItem("TODOS"))
            for (var i = 0; i < newTodo.length; i++ ) {
                if(newTodo[i].id == id) {
                    newTodo = state.todos
                }
            }
            localStorage.setItem("TODOS", JSON.stringify(newTodo))

        },
        EDIT_TODO(state, {id}) {
            var newTodo = JSON.parse(localStorage.getItem("TODOS"))
            for (var i = 0; i < newTodo.length; i++ ) {
                if(newTodo[i].id == id) {
                    newTodo = state.todos
                }
            }
            localStorage.setItem("TODOS", JSON.stringify(newTodo))
        },
        MARK_COMPLETE(state, {id, isComplete}) {
            state.todos.find(todo => todo.id == id).isComplete = isComplete
            var newTodo = JSON.parse(localStorage.getItem("TODOS"))
            for (var i = 0; i < newTodo.length; i++ ) {
                if(newTodo[i].id == id) {
                    newTodo[i].isComplete = isComplete
                }
            }
            localStorage.setItem("TODOS", JSON.stringify(newTodo))
        }
    },
    modules: {},
})