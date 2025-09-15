import styles from "./letter.module.scss";
import frontImg from "../assets/letter-front.svg";
import backImg from "../assets/letter-back.svg";
import flapImg from "../assets/letter-flap.svg";
import { useRef } from "react";
import { motion } from "motion/react";
import { Trans } from "react-i18next";

export const Letter = () => {

	const nameInput = useRef<HTMLInputElement | null>(null);
	const emailInput = useRef<HTMLInputElement | null>(null);
	const messageInput = useRef<HTMLTextAreaElement | null>(null);

	const handleSend = () => {
		const letter = {
			name: nameInput.current?.value,
			email: emailInput.current?.value,
			message: messageInput.current?.value,
		};
	};

	const handleMsgTyping = () => {
		if (messageInput.current) {
			messageInput.current.style.height = "auto";
			messageInput.current.style.height = messageInput.current.scrollHeight + "px";
		}
	};

	return (
		<div className={styles["letter"]}>
			<div className={styles["letter__paper"]}>
				<motion.p >
					<Trans>contact.nameInput</Trans> <motion.input name="name"  ref={nameInput} type="text" />
				</motion.p>

				<motion.p >
					<Trans>contact.emailInput</Trans> <motion.input name="email"  ref={emailInput} type="text" />
				</motion.p>

				<motion.p >
					<Trans>contact.messageInput</Trans>
				</motion.p>
				<motion.div className={styles["letter__paper__message-wrapper"]}>
					<motion.textarea name="message" className={styles["letter__paper__message-wrapper__message"]} rows={1} onInput={handleMsgTyping}  ref={messageInput} />
				</motion.div>
				<motion.button  onClick={handleSend}>
					<Trans>contact.sendButton</Trans>
				</motion.button>
			</div>
			<div className={styles["letter__envelope-container"]}>
				<div className={styles["letter__envelope-container__envelope"]}>
					<img className={styles["letter__envelope-container__envelope__front"]} src={frontImg} alt="envelope" />
					<img className={styles["letter__envelope-container__envelope__back"]} src={backImg} alt="envelope" />
					<img className={styles["letter__envelope-container__envelope__flap"]} src={flapImg} alt="envelope" />
				</div>
			</div>
		</div>
	);
};
