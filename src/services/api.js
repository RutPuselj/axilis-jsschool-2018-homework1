import axios from 'axios';

export function getTodos(key) {
    return axios.get(`https://react.axilis.com/${key}/todos`);
}

export function addTodo(key, text) {
    return axios.post(`https://react.axilis.com/${key}/todo`, {
        text: text
    });
}

export function deleteTodo(key, id) {
    return axios.delete(`https://react.axilis.com/${key}/todo/${id}`);
}

export function updateTodo(key, id, isDone) {
    return axios.put(`https://react.axilis.com/${key}/todo`, {
        id: id,
        isDone: isDone
    });
}