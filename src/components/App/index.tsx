import * as React from "react";

import ITask from "../../interfaces/ITask";
import TodoList from '../TodoList';

import "./style.scss";

interface IProps {
}

interface IState {
	currentTask: string;
	tasks: Array<ITask>;
}

export default class App extends React.Component<IProps, IState>{

	constructor(props: IProps) {
		super(props);

		this.state = {
			currentTask: "",
			tasks: new Array<ITask>(),
		}
	}

	private _thisInMilliseconds(): number {
		return new Date().getTime();
	}

	public handleSubmit(ev: React.FormEvent<HTMLFormElement>): void {
		ev.preventDefault();
		this.setState({
			currentTask: "",
			tasks: [
				...this.state.tasks,
				{
					id: this._thisInMilliseconds(),
					value: this.state.currentTask,
					completed: false
				}
			]
		});
	}

	public deleteTask = (id: number): void => {

		const filteredTasks: Array<ITask> = this.state.tasks.filter((task: ITask) => task.id !== id);

		this.setState({ tasks: filteredTasks });
	}

	public toggleDone = (index: number): void => {

		let tasks: ITask[] = this.state.tasks.splice(index, 1);

		tasks[0].completed = !tasks[0].completed;

		const updatedTasks: ITask[] = [...tasks,...this.state.tasks];
		this.setState({ tasks: updatedTasks });
	}

	public render(): JSX.Element {
		console.log(this.state);
		return (
			<div>
				<h1>Todo LIst</h1>
				<form onSubmit={(ev) => this.handleSubmit(ev)}>
					<input type="text"
						className="input"
						placeholder="Adicionar tarefa"
						value={this.state.currentTask}
						onChange={
							(ev) => this.setState({ currentTask: ev.target.value })
						}
					/>
					<input type="submit" value="Inserir" className="btn-submit" />
				</form>

				<section>
					<TodoList tasks={this.state.tasks} toggleDone={this.toggleDone} deleteTask={this.deleteTask} />
				</section>
			</div>
		);
	}
}