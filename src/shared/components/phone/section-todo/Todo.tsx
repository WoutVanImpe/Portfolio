import { useState, type Dispatch, type SetStateAction } from "react";
import styles from "./todoSection.module.scss";
import { useTheme } from "~context/ThemeContext";
import { motion } from "motion/react";
import { Trans } from "react-i18next";

interface Todo {
	id: number;
	name: string;
	color: string;
}

type TodoProps = {
	todo: Todo;
	setDoneTodos: Dispatch<SetStateAction<number>>;
	removeTodo: (id: number, completed: boolean) => void;
};

export const Todo = ({ todo, setDoneTodos, removeTodo }: TodoProps) => {
	const { textColor, textBgColor, darkmode } = useTheme();
	const [completed, setCompleted] = useState<boolean>(false);

	const handleClick = () => {
		setDoneTodos((prev) => (completed ? prev - 1 : prev + 1));
		setCompleted((prev) => !prev);
	};

	const handleDelete = () => {
		removeTodo(todo.id, completed);
	};

	return (
		<motion.div
			className={styles["todo"]}
			animate={{ backgroundColor: completed ? "#9b9b9bff" : textBgColor, borderColor: darkmode ? "rgba(250, 250, 250, 0.384)" : "rgba(0, 0, 0, 0.384)", borderLeftColor: todo.color }}
			style={{ textDecoration: completed ? "line-through" : "none" }}
			transition={{ backgroundColor: { duration: 0.2, ease: "easeIn" }, borderColor: { duration: 0.2, ease: "easeIn" } }}
		>
			<motion.div className={styles["todo__front"]} onClick={handleClick}>
				<motion.div className={styles["todo__front__input"]} animate={{ borderColor: textColor }} transition={{ borderColor: { duration: 1, ease: "easeIn" } }}>
					<motion.svg animate={{ fill: textColor, opacity: completed ? 1 : 0 }} transition={{ fill: { duration: 0.2, ease: "easeIn" }, opacity: { duration: 0.2, ease: "easeIn" } }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
						<path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" />
					</motion.svg>
				</motion.div>
				<motion.h5 animate={{ color: textColor }} transition={{ color: { duration: 0.2, ease: "easeIn" } }}>
					<Trans>{todo.name}</Trans>
				</motion.h5>
			</motion.div>
			<motion.svg animate={{ fill: textColor }} transition={{ fill: { duration: 0.2, ease: "easeIn" } }} onClick={handleDelete} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
				<path d="M232.7 69.9C237.1 56.8 249.3 48 263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9zM128 208L512 208L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 208zM216 272C202.7 272 192 282.7 192 296L192 488C192 501.3 202.7 512 216 512C229.3 512 240 501.3 240 488L240 296C240 282.7 229.3 272 216 272zM320 272C306.7 272 296 282.7 296 296L296 488C296 501.3 306.7 512 320 512C333.3 512 344 501.3 344 488L344 296C344 282.7 333.3 272 320 272zM424 272C410.7 272 400 282.7 400 296L400 488C400 501.3 410.7 512 424 512C437.3 512 448 501.3 448 488L448 296C448 282.7 437.3 272 424 272z" />
			</motion.svg>
		</motion.div>
	);
};
