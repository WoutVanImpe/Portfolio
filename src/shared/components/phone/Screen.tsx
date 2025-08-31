import styles from "./phone.module.scss";
import { motion, MotionValue, useMotionValue, useSpring, useTransform } from "motion/react";
import { useState, type ChangeEvent } from "react";
import { useTheme } from "~context/ThemeContext";
import { Canvas } from "./Canvas";

interface Todo {
	id: number;
	name: string;
	done: boolean;
	color: string;
	time: string;
}

export const Screen = ({ screenState }: { screenState: MotionValue<number> }) => {
	// HOME & BASICS
	const [appState, setAppState] = useState<"home" | "draw" | "todo" | "weather" | "map">("home");
	const { textBgColor, textColor } = useTheme();

	const smoothPower = useSpring(screenState, {
		stiffness: 150,
		damping: 20,
		mass: 1,
	});

	const screenOpacity = useTransform(smoothPower, [0, 1], [0, 0.9]);

	// DRAW
	const drawColor = useMotionValue(0);
	const clearCanvas = useMotionValue(false);

	const smoothColor = useSpring(drawColor, {
		stiffness: 50,
		damping: 20,
		mass: 1,
	});

	const color = useTransform(smoothColor, (value) => `hsla(${value}, 100%, 50%, 1)`);

	// TODOLIST
	const [todoList, setTodoList] = useState<Todo[] | []>([]);

	const addTodo = () => {};

	return (
		<motion.div className={styles["screen"]} style={{ opacity: screenOpacity }} animate={{ backgroundColor: textBgColor }} transition={{ duration: 1, ease: "easeIn" }}>
			{appState === "home" && (
				<div className={styles["screen__home"]}>
					{/* Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. */}
					<motion.svg onClick={() => setAppState("draw")} animate={{ fill: textColor }} transition={{ duration: 1, ease: "easeIn" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
						<path d="M160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 160C544 124.7 515.3 96 480 96L160 96zM421.8 203.7L436.2 218.1C451.8 233.7 451.8 259 436.2 274.7L412.4 298.5L341.4 227.5L365.2 203.7C380.8 188.1 406.1 188.1 421.8 203.7zM215.9 353L307.4 261.4L378.4 332.4L286.8 423.9C282.7 428 277.6 430.9 271.9 432.3L211.8 447.3C206.3 448.7 200.6 447.1 196.6 443.1C192.6 439.1 191 433.4 192.4 427.9L207.4 367.8C208.8 362.2 211.7 357 215.8 352.9z" />
					</motion.svg>
					<motion.svg onClick={() => setAppState("todo")} animate={{ fill: textColor }} transition={{ duration: 1, ease: "easeIn" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
						<path d="M197.8 100.3C208.7 107.9 211.3 122.9 203.7 133.7L147.7 213.7C143.6 219.5 137.2 223.2 130.1 223.8C123 224.4 116 222 111 217L71 177C61.7 167.6 61.7 152.4 71 143C80.3 133.6 95.6 133.7 105 143L124.8 162.8L164.4 106.2C172 95.3 187 92.7 197.8 100.3zM197.8 260.3C208.7 267.9 211.3 282.9 203.7 293.7L147.7 373.7C143.6 379.5 137.2 383.2 130.1 383.8C123 384.4 116 382 111 377L71 337C61.6 327.6 61.6 312.4 71 303.1C80.4 293.8 95.6 293.7 104.9 303.1L124.7 322.9L164.3 266.3C171.9 255.4 186.9 252.8 197.7 260.4zM288 160C288 142.3 302.3 128 320 128L544 128C561.7 128 576 142.3 576 160C576 177.7 561.7 192 544 192L320 192C302.3 192 288 177.7 288 160zM288 320C288 302.3 302.3 288 320 288L544 288C561.7 288 576 302.3 576 320C576 337.7 561.7 352 544 352L320 352C302.3 352 288 337.7 288 320zM224 480C224 462.3 238.3 448 256 448L544 448C561.7 448 576 462.3 576 480C576 497.7 561.7 512 544 512L256 512C238.3 512 224 497.7 224 480zM128 440C150.1 440 168 457.9 168 480C168 502.1 150.1 520 128 520C105.9 520 88 502.1 88 480C88 457.9 105.9 440 128 440z" />
					</motion.svg>
					<motion.svg onClick={() => setAppState("weather")} animate={{ fill: textColor }} transition={{ duration: 1, ease: "easeIn" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
						<path d="M32 400C32 479.5 96.5 544 176 544L480 544C550.7 544 608 486.7 608 416C608 364.4 577.5 319.9 533.5 299.7C540.2 286.6 544 271.7 544 256C544 203 501 160 448 160C430.3 160 413.8 164.8 399.6 173.1C375.5 127.3 327.4 96 272 96C192.5 96 128 160.5 128 240C128 248 128.7 255.9 129.9 263.5C73 282.7 32 336.6 32 400z" />
					</motion.svg>
					<motion.svg onClick={() => setAppState("map")} animate={{ fill: textColor }} transition={{ duration: 1, ease: "easeIn" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
						<path d="M576 112C576 100.9 570.3 90.6 560.8 84.8C551.3 79 539.6 78.4 529.7 83.4L413.5 141.5L234.1 81.6C226 78.9 217.3 79.5 209.7 83.3L81.7 147.3C70.8 152.8 64 163.9 64 176L64 528C64 539.1 69.7 549.4 79.2 555.2C88.7 561 100.4 561.6 110.3 556.6L226.4 498.5L399.7 556.3C395.4 549.9 391.2 543.2 387.1 536.4C376.1 518.1 365.2 497.1 357.1 474.6L255.9 440.9L255.9 156.4L383.9 199.1L383.9 298.4C414.9 262.6 460.9 240 511.9 240C534.5 240 556.1 244.4 575.9 252.5L576 112zM512 288C445.7 288 392 340.8 392 405.9C392 474.8 456.1 556.3 490.6 595.2C502.2 608.2 521.9 608.2 533.5 595.2C568 556.3 632.1 474.8 632.1 405.9C632.1 340.8 578.4 288 512.1 288zM472 408C472 385.9 489.9 368 512 368C534.1 368 552 385.9 552 408C552 430.1 534.1 448 512 448C489.9 448 472 430.1 472 408z" />
					</motion.svg>
					<motion.svg animate={{ fill: textColor }} transition={{ duration: 1, ease: "easeIn" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
						<path d="M237.9 461.4C237.9 463.4 235.6 465 232.7 465C229.4 465.3 227.1 463.7 227.1 461.4C227.1 459.4 229.4 457.8 232.3 457.8C235.3 457.5 237.9 459.1 237.9 461.4zM206.8 456.9C206.1 458.9 208.1 461.2 211.1 461.8C213.7 462.8 216.7 461.8 217.3 459.8C217.9 457.8 216 455.5 213 454.6C210.4 453.9 207.5 454.9 206.8 456.9zM251 455.2C248.1 455.9 246.1 457.8 246.4 460.1C246.7 462.1 249.3 463.4 252.3 462.7C255.2 462 257.2 460.1 256.9 458.1C256.6 456.2 253.9 454.9 251 455.2zM316.8 72C178.1 72 72 177.3 72 316C72 426.9 141.8 521.8 241.5 555.2C254.3 557.5 258.8 549.6 258.8 543.1C258.8 536.9 258.5 502.7 258.5 481.7C258.5 481.7 188.5 496.7 173.8 451.9C173.8 451.9 162.4 422.8 146 415.3C146 415.3 123.1 399.6 147.6 399.9C147.6 399.9 172.5 401.9 186.2 425.7C208.1 464.3 244.8 453.2 259.1 446.6C261.4 430.6 267.9 419.5 275.1 412.9C219.2 406.7 162.8 398.6 162.8 302.4C162.8 274.9 170.4 261.1 186.4 243.5C183.8 237 175.3 210.2 189 175.6C209.9 169.1 258 202.6 258 202.6C278 197 299.5 194.1 320.8 194.1C342.1 194.1 363.6 197 383.6 202.6C383.6 202.6 431.7 169 452.6 175.6C466.3 210.3 457.8 237 455.2 243.5C471.2 261.2 481 275 481 302.4C481 398.9 422.1 406.6 366.2 412.9C375.4 420.8 383.2 435.8 383.2 459.3C383.2 493 382.9 534.7 382.9 542.9C382.9 549.4 387.5 557.3 400.2 555C500.2 521.8 568 426.9 568 316C568 177.3 455.5 72 316.8 72zM169.2 416.9C167.9 417.9 168.2 420.2 169.9 422.1C171.5 423.7 173.8 424.4 175.1 423.1C176.4 422.1 176.1 419.8 174.4 417.9C172.8 416.3 170.5 415.6 169.2 416.9zM158.4 408.8C157.7 410.1 158.7 411.7 160.7 412.7C162.3 413.7 164.3 413.4 165 412C165.7 410.7 164.7 409.1 162.7 408.1C160.7 407.5 159.1 407.8 158.4 408.8zM190.8 444.4C189.2 445.7 189.8 448.7 192.1 450.6C194.4 452.9 197.3 453.2 198.6 451.6C199.9 450.3 199.3 447.3 197.3 445.4C195.1 443.1 192.1 442.8 190.8 444.4zM179.4 429.7C177.8 430.7 177.8 433.3 179.4 435.6C181 437.9 183.7 438.9 185 437.9C186.6 436.6 186.6 434 185 431.7C183.6 429.4 181 428.4 179.4 429.7z" />
					</motion.svg>
					<motion.svg animate={{ fill: textColor }} transition={{ duration: 1, ease: "easeIn" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
						<path d="M160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 160C544 124.7 515.3 96 480 96L160 96zM165 266.2L231.5 266.2L231.5 480L165 480L165 266.2zM236.7 198.5C236.7 219.8 219.5 237 198.2 237C176.9 237 159.7 219.8 159.7 198.5C159.7 177.2 176.9 160 198.2 160C219.5 160 236.7 177.2 236.7 198.5zM413.9 480L413.9 376C413.9 351.2 413.4 319.3 379.4 319.3C344.8 319.3 339.5 346.3 339.5 374.2L339.5 480L273.1 480L273.1 266.2L336.8 266.2L336.8 295.4L337.7 295.4C346.6 278.6 368.3 260.9 400.6 260.9C467.8 260.9 480.3 305.2 480.3 362.8L480.3 480L413.9 480z" />
					</motion.svg>
				</div>
			)}

			{appState === "draw" && (
				<div className={styles["screen__draw"]}>
					<Canvas color={color.get()} clearCanvas={clearCanvas} />
					<div className={styles["screen__draw__controls"]}>
						<motion.div className={styles["screen__draw__controls__color"]} style={{ backgroundColor: color }}></motion.div>
						<motion.input type="range" defaultValue={0} min={0} max={360} onChange={(e: ChangeEvent<HTMLInputElement>) => drawColor.set(Number(e.target.value))} />
						<motion.svg onClick={() => clearCanvas.set(true)} animate={{ fill: textColor }} transition={{ duration: 1, ease: "easeIn" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
							<path d="M232.7 69.9C237.1 56.8 249.3 48 263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9zM128 208L512 208L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 208zM216 272C202.7 272 192 282.7 192 296L192 488C192 501.3 202.7 512 216 512C229.3 512 240 501.3 240 488L240 296C240 282.7 229.3 272 216 272zM320 272C306.7 272 296 282.7 296 296L296 488C296 501.3 306.7 512 320 512C333.3 512 344 501.3 344 488L344 296C344 282.7 333.3 272 320 272zM424 272C410.7 272 400 282.7 400 296L400 488C400 501.3 410.7 512 424 512C437.3 512 448 501.3 448 488L448 296C448 282.7 437.3 272 424 272z" />
						</motion.svg>
					</div>
					<motion.svg
						onClick={() => {
							setAppState("home");
							drawColor.set(0);
						}}
						animate={{ fill: textColor }}
						transition={{ duration: 1, ease: "easeIn" }}
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 640 640"
					>
						<path d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z" />
					</motion.svg>
				</div>
			)}

			{appState === "todo" && (
				<div className={styles["screen__todo"]}>
					<motion.h1 animate={{ color: textColor }} transition={{ duration: 1, ease: "easeIn" }}>
						ToDo's
					</motion.h1>
					<div className={styles["screen__todo__list"]}></div>
					<div className={styles["screen__todo__controls"]}>
						<motion.svg onClick={() => setAppState("home")} animate={{ fill: textColor }} transition={{ duration: 1, ease: "easeIn" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
							<path d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z" />
						</motion.svg>
						<p>Nog 10 todo's</p>
						<motion.svg onClick={addTodo} animate={{ fill: textColor }} transition={{ duration: 1, ease: "easeIn" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
							<path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z" />
						</motion.svg>
					</div>
				</div>
			)}

			{appState === "weather" && (
				<div className={styles["screen__weather"]}>
					<div></div>
				</div>
			)}

			{appState === "map" && (
				<div className={styles["screen__map"]}>
					<div></div>
				</div>
			)}
		</motion.div>
	);
};
