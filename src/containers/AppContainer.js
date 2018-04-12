import React, {Component} from 'react';
import App from '../components/App';
//import axios from 'axios';
//import uuid from 'uuid';
import {
	getTodos,
	addTodo,
	deleteTodo,
	updateTodo
} from '../services/api';

class AppContainer extends Component {
	constructor() {
		super();

		this.state = {
			filterText: '',
			addText: '',
			isLoading: false,
			hasError: false,
			todos: []
		};
	}

	handleIsDoneToggle = async (todoId, isDone) => {
		this.setState({
			isLoading: true
		});
		try {
			await updateTodo('rut', todoId, isDone);
			this.setState({
				todos: this.state.todos.map((todo) => {
					if (todo.id === todoId) {
						return { ...todo,
							isDone: isDone
						};
					} else {
						return todo;
					}
				})
			});
		} catch (err) {
			this.setState({
				hasError: true
			});
		} finally {
			this.setState({
				isLoading: false
			});
		}
	};

	onFilterTextChanged = (text) => {
		this.setState({
			filterText: text
		});
	};

	onAddTextChanged = (text) => {
		this.setState({
			addText: text
		});
	};

	handleAddButtonClick = async () => {
		this.setState({
			isLoading: true
		});
		try {
			let res = await addTodo('rut', this.state.addText);
			if (this.state.addText.trim().length < 0) {
				return;
			}
			this.setState({
				addText: '',
				filterText: '',
				todos: [...this.state.todos, {
					id: res.data.id,
					text: res.data.text,
					isDone: res.data.isDone
				}]
			});
		} catch (err) {
			this.setState({
				hasError: true
			});
		} finally {
			this.setState({
				isLoading: false
			});
		}
	};

	handleTrashClicked = async (todoId) => {
		this.setState({
			isLoading: true
		});
		try {
			await deleteTodo('rut', todoId);
			this.setState({
				todos: this.state.todos.filter((t) => t.id !== todoId)
			});
		} catch (err) {
			this.setState({
				hasError: true
			});
		} finally {
			this.setState({
				isLoading: false
			});
		}
	};

	async componentDidMount() {
		this.setState({
			isLoading: true
		});
		try {
			let res = await getTodos('rut');
			this.setState({
				todos: res.data
			});
		} catch (err) {
			this.setState({
				hasError: true
			});
		} finally {
			this.setState({
				isLoading: false
			});
		}
	}

	filter = (todos, filter) => {
		if (filter && filter.trim().length > 0) {
			return todos.filter((t) => t.text.indexOf(filter) > -1);
		}
		return todos;
	};

	render() {
		return ( <
			App filterText = {this.state.filterText}
			addText = {this.state.addText}
			isLoading = {this.state.isLoading}
			hasError = {this.state.hasError}
			todos = {this.filter(this.state.todos, this.state.filterText)}
			handleIsDoneToggle = {this.handleIsDoneToggle}
			handleTrashClicked = {this.handleTrashClicked}
			onFilterTextChanged = {this.onFilterTextChanged}
			onAddTextChanged = {this.onAddTextChanged}
			handleAddButtonClick = {this.handleAddButtonClick}
			/>
		);
	}
}

export default AppContainer;
