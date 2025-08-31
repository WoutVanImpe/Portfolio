import { useState, type Dispatch, type SetStateAction } from "react";
import styles from "./todoSection.module.scss";
import { useTheme } from "~context/ThemeContext";
import { motion } from "motion/react";

interface Todo {
	id: number;
	name: string;
	done: boolean;
	color: string;
	time: string;
}

export const TodoSection = ({ setAppState }: { setAppState: Dispatch<SetStateAction<"home" | "draw" | "todo" | "weather" | "map">> }) => {
	const { textBgColor, textColor } = useTheme();
	const [todoList, setTodoList] = useState<Todo[] | []>([]);

	const addTodo = () => {};

	return (
		<div className={styles["todo"]}>
			<motion.h1 animate={{ color: textColor }} transition={{ duration: 1, ease: "easeIn" }}>
				ToDo's
			</motion.h1>
			<div className={styles["todo__list"]}></div>
			<div className={styles["todo__controls"]}>
				<motion.svg onClick={() => setAppState("home")} animate={{ fill: textColor }} transition={{ duration: 1, ease: "easeIn" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
					<path d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z" />
				</motion.svg>
				<p>Nog 10 todo's</p>
				<motion.svg onClick={addTodo} animate={{ fill: textColor }} transition={{ duration: 1, ease: "easeIn" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
					<path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" />
				</motion.svg>
			</div>
		</div>
	);
};
