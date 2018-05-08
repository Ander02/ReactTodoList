import * as React from "react";
import ITask from "../../interfaces/ITask";

import TodoItem from "./TodoItem";

interface IProps {
	tasks: Array<ITask>,
	deleteTask(id: number): void;
	toggleDone(index: number): void;
}


interface IState {

}

export default class TodoList extends React.Component<IProps, IState> {

	constructor(props: IProps) {
		super(props);
	}

	public renderTasks(): JSX.Element[] {
		const { toggleDone, deleteTask, tasks } = this.props;
		return tasks.map((task: ITask, index: number) => {
			return (
				<TodoItem task={task} index={index} toggleDone={toggleDone} deleteTask={deleteTask} key={task.id} />
			);
		});
	}

	public render(): JSX.Element {
		console.log(this.props.tasks)
		return (
			<div>
				{this.renderTasks()}
			</div>
		);
	}
}