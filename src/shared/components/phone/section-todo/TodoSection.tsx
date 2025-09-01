import { useState, type Dispatch, type SetStateAction } from "react";
import styles from "./todoSection.module.scss";
import { useTheme } from "~context/ThemeContext";
import { motion } from "motion/react";
import { Todo } from "./Todo";

interface Todo {
	id: number;
	name: string;
	done: boolean;
	color: string;
}

const defaultData: Todo[] = [
	{ id: 1, name: "gordijn", done: false, color: "rgba(102, 85, 255, 1)" },
	{ id: 2, name: "lamp", done: false, color: "rgba(255, 255, 85, 1)" },
	{ id: 3, name: "lade", done: false, color: "rgba(85, 255, 122, 1)" },
	{ id: 4, name: "bol", done: false, color: "rgba(255, 85, 136, 1)" },
	{ id: 5, name: "kaart", done: false, color: "rgba(255, 147, 85, 1)" },
];

export const TodoSection = ({ setAppState }: { setAppState: Dispatch<SetStateAction<"home" | "draw" | "todo" | "weather" | "map">> }) => {
	const { textBgColor, textColor } = useTheme();

	const [addingState, setAddingState] = useState<boolean>(false);

	const [todoList, setTodoList] = useState<Todo[] | []>(defaultData);
	const [totalTodos, setTotalTodos] = useState<number>(defaultData.length);
	const [doneTodos, setDoneTodos] = useState<number>(0);
	const [idData, setIdData] = useState<number>(defaultData.length);

	const addTodo = () => {
		setAddingState(true);
	};

	const removeTodo = (id: number, completed: boolean) => {
		setTotalTodos((prev) => prev - 1);
		if (completed) {
			setDoneTodos((prev) => prev - 1);
		}
		const newList: Todo[] = todoList.filter((todo) => todo.id !== id);
		setTodoList(newList);
	};

	if (addingState) {
		return (
			<div className={styles["adding"]}>
				<div></div>
			</div>
		);
	}

	return (
		<div className={styles["todoSection"]}>
			<motion.h1 animate={{ color: textColor }} transition={{ duration: 1, ease: "easeIn" }}>
				ToDo's
			</motion.h1>
			<div className={styles["todoSection__list"]}>
				{todoList.map((todo) => (
					<Todo key={todo.id} todo={todo} setDoneTodos={setDoneTodos} removeTodo={removeTodo} />
				))}
			</div>
			<div className={styles["todoSection__controls"]}>
				<motion.svg onClick={() => setAppState("home")} animate={{ fill: textColor }} transition={{ duration: 1, ease: "easeIn" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
					<path d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z" />
				</motion.svg>
				<motion.p animate={{ color: textColor }} transition={{ duration: 1, ease: "easeIn" }}>
					{doneTodos}/{totalTodos} todo's gedaan
				</motion.p>
				<motion.svg onClick={addTodo} animate={{ fill: textColor }} transition={{ duration: 1, ease: "easeIn" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
					<path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" />
				</motion.svg>
			</div>
		</div>
	);
};
