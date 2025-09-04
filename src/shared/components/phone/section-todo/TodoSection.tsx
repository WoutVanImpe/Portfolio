import { useRef, useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react";
import styles from "./todoSection.module.scss";
import { useTheme } from "~context/ThemeContext";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Todo } from "./Todo";
import { Trans } from "react-i18next";

interface Todo {
	id: number;
	name: string;
	color: string;
}

const defaultData: Todo[] = [
	{ id: 1, name: "phone.todo.curtain", color: "rgba(102, 85, 255, 1)" },
	{ id: 2, name: "phone.todo.lamp", color: "rgba(255, 255, 85, 1)" },
	{ id: 3, name: "phone.todo.drawer", color: "rgba(85, 255, 122, 1)" },
	{ id: 4, name: "phone.todo.globe", color: "rgba(255, 85, 136, 1)" },
	{ id: 5, name: "phone.todo.card", color: "rgba(255, 147, 85, 1)" },
];

export const TodoSection = ({ setAppState }: { setAppState: Dispatch<SetStateAction<"home" | "draw" | "todo" | "weather" | "map">> }) => {
	const { textColor } = useTheme();

	const [addingState, setAddingState] = useState<boolean>(false);

	const [todoList, setTodoList] = useState<Todo[] | []>(defaultData);
	const [totalTodos, setTotalTodos] = useState<number>(defaultData.length);
	const [doneTodos, setDoneTodos] = useState<number>(0);

	const [idData, setIdData] = useState<number>(defaultData.length);

	const handleCreate = () => {
		setAddingState(true);
	};

	// REMOVE TODOS
	const removeTodo = (id: number, completed: boolean) => {
		setTotalTodos((prev) => prev - 1);
		if (completed) {
			setDoneTodos((prev) => prev - 1);
		}
		const newList: Todo[] = todoList.filter((todo) => todo.id !== id);
		setTodoList(newList);
	};

	// ADD TODOS
	const todoColor = useMotionValue(0);

	const smoothColor = useSpring(todoColor, {
		stiffness: 50,
		damping: 20,
		mass: 1,
	});

	const colorInput = useTransform(smoothColor, (value) => `hsla(${value}, 100%, 50%, 1)`);

	const textInputRef = useRef<HTMLInputElement | null>(null);

	const handleCancel = () => {
		setAddingState(false);
		todoColor.set(0);
		textInputRef.current!.value = "";
	};

	const handleAdd = () => {
		if (!textInputRef.current) return;

		const newTodo: Todo = {
			id: idData + 1,
			name: textInputRef.current.value,
			color: colorInput.get(),
		};
		setTodoList((prev) => [...prev, newTodo]);

		setTotalTodos((prev) => prev + 1);
		setIdData((prev) => prev + 1);

		handleCancel();
	};

	if (addingState) {
		return (
			<div className={styles["todoSection"]}>
				<motion.h1 animate={{ color: textColor }} transition={{ color: { duration: 1, ease: "easeIn" } }}>
					ToDo's
				</motion.h1>
				<div className={styles["todoSection__form"]}>
					<motion.p animate={{ color: textColor }} transition={{ color: { duration: 1, ease: "easeIn" } }}>
						<Trans>phone.todo.inputTitle</Trans>
					</motion.p>
					<input name="title" type="text" ref={textInputRef} maxLength={20} style={{ marginBottom: 20 }} />
					<motion.p animate={{ color: textColor }} transition={{ color: { duration: 1, ease: "easeIn" } }}>
						<Trans>phone.todo.inputColor</Trans>
					</motion.p>
					<motion.div className={styles["todoSection__form__color"]} style={{ backgroundColor: colorInput }} />
					<input name="color" type="range" min={0} max={360} defaultValue={0} onChange={(e: ChangeEvent<HTMLInputElement>) => todoColor.set(Number(e.target.value))} />
				</div>
				<div className={styles["todoSection__controls"]}>
					<motion.svg onClick={handleCancel} animate={{ fill: textColor }} transition={{ fill: { duration: 1, ease: "easeIn" } }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
						<path d="M232.7 69.9C237.1 56.8 249.3 48 263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9zM128 208L512 208L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 208zM216 272C202.7 272 192 282.7 192 296L192 488C192 501.3 202.7 512 216 512C229.3 512 240 501.3 240 488L240 296C240 282.7 229.3 272 216 272zM320 272C306.7 272 296 282.7 296 296L296 488C296 501.3 306.7 512 320 512C333.3 512 344 501.3 344 488L344 296C344 282.7 333.3 272 320 272zM424 272C410.7 272 400 282.7 400 296L400 488C400 501.3 410.7 512 424 512C437.3 512 448 501.3 448 488L448 296C448 282.7 437.3 272 424 272z" />
					</motion.svg>
					<motion.svg onClick={handleAdd} animate={{ fill: textColor }} transition={{ fill: { duration: 1, ease: "easeIn" } }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
						<path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" />
					</motion.svg>
				</div>
			</div>
		);
	}

	return (
		<div className={styles["todoSection"]}>
			<motion.h1 animate={{ color: textColor }} transition={{ color: { duration: 1, ease: "easeIn" } }}>
				ToDo's
			</motion.h1>
			<div className={styles["todoSection__list"]}>
				{todoList.map((todo) => (
					<Todo key={todo.id} todo={todo} setDoneTodos={setDoneTodos} removeTodo={removeTodo} />
				))}
			</div>
			<div className={styles["todoSection__controls"]}>
				<motion.svg onClick={() => setAppState("home")} animate={{ fill: textColor }} transition={{ fill: { duration: 1, ease: "easeIn" } }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
					<path d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z" />
				</motion.svg>
				<motion.p animate={{ color: textColor }} transition={{ duration: 1, ease: "easeIn" }}>
					{doneTodos}/{totalTodos} <Trans>phone.todo.done</Trans>
				</motion.p>
				<motion.svg onClick={handleCreate} animate={{ fill: textColor }} transition={{ fill: { duration: 1, ease: "easeIn" } }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
					<path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" />
				</motion.svg>
			</div>
		</div>
	);
};
