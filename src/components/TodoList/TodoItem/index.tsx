import * as React from "react";
import ITask from "../../../interfaces/ITask";
import "./style.scss"

interface IProps {
	task: ITask;
	index: number;
	deleteTask(id: number): void;
	toggleDone(index: number): void;
}

interface IState {
	currentTask: string;
	tasks: Array<ITask>;
}

export default class TodoItem extends React.Component<IProps, IState> {

	constructor(props: IProps) {
		super(props);
	}

	public deleteTask = (): void => {
		const { deleteTask } = this.props;
		deleteTask(this.props.task.id);
	}

	public toggleDone = (): void => {
		const { toggleDone } = this.props;
		toggleDone(this.props.index);
	}

	public render(): JSX.Element {
		const { task, index } = this.props;

		return (
			<div key={task.id} className={task.completed ? "completed-task" : "task"}>
				<input type="checkbox" onClick={this.toggleDone} className="check-task" />
				<span className={task.completed ? "is-completed" : ""}> {task.value} </span>
				<button className="btn-delete" onClick={this.deleteTask}> Excluir </button>
			</div>
		);
	}

}