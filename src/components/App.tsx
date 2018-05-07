import * as React from "react";

export class App extends React.Component<IProps, IState>{

	constructor(props: IProps) {
		super(props)

		this.state = {
			currentTask: "",
			tasks: []
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

	public deleteTask(id: number): void {

		const filteredTasks: Array<ITask> = this.state.tasks.filter((task: ITask) => task.id !== id);

		this.setState({ tasks: filteredTasks });
	}

	public toggleDone(index: number): void {

		let task: ITask[] = this.state.tasks.splice(index, 1);

		task[0].completed = !task[0].completed;

		const updatedTasks: ITask[] = [...this.state.tasks, ...task];
		this.setState({ tasks: updatedTasks });
	}

	public renderTasks(): JSX.Element[] {
		return this.state.tasks.map((task: ITask, index: number) => {
			return (
				<div key={task.id} className="taks" >
					<span className={task.completed ? "is-completed" : ""}> {task.value} </span>
					<button onClick={() => this.toggleDone(index)}> {task.completed ? "Undone" : "Done"} </button>
					<button className="deleteButton" onClick={() => this.deleteTask(task.id)}> Delete </button>
				</div>
			);
		});
	}

	public render(): JSX.Element {
		console.log(this.state);
		return (
			<div>
				<form onSubmit={(ev) => this.handleSubmit(ev)}>
					<input type="text"
						className="input"
						placeholder="Add a Task"
						value={this.state.currentTask}
						onChange={
							(ev) => this.setState({
								currentTask: ev.target.value
							})
						} />
					<input type="submit" value="Add Task" />
				</form>

				<section> {this.renderTasks()} </section>
			</div>
		);
	}
}

interface IProps {
}

interface IState {
	currentTask: string;
	tasks: Array<ITask>;
}

interface ITask {
	id: number;
	value: string;
	completed: boolean;
}