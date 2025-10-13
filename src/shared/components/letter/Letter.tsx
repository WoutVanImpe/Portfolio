import styles from "./letter.module.scss";
import frontImg from "../assets/letter-front.svg";
import backImg from "../assets/letter-back.svg";
import flapImg from "../assets/letter-flap.svg";
import { useRef } from "react";
import { motion, MotionValue, useAnimation } from "motion/react";
import { Trans } from "react-i18next";
import emailjs from "@emailjs/browser";

interface EmailContent {
	name: string;
	email: string;
	message: string;
	time: string;
}

export const Letter = ({ letterReady }: { letterReady: MotionValue<number> }) => {
	const nameInput = useRef<HTMLInputElement | null>(null);
	const emailInput = useRef<HTMLInputElement | null>(null);
	const messageInput = useRef<HTMLTextAreaElement | null>(null);

	const emailVars = {
		serviceId: "service_ayytesk",
		templateId: "template_jcqws8w",
		emailKey: "Nxvib6hyUFSl5mzua",
	};

	const letterControls = useAnimation();
	const envelopeControls = useAnimation();
	const messageControls = useAnimation();

	const handleSend = async () => {
		const current = new Date();
		const date = `${current.getHours()}:${current.getMinutes()} - ${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

		const name = nameInput.current?.value.trim() || "";
		const email = emailInput.current?.value.trim() || "";
		const message = messageInput.current?.value.trim() || "";

		if (!name || !email || !message) {
			alert("Please fill in all fields before sending.");
			return;
		}

		const letter: EmailContent = {
			name: nameInput.current!.value,
			email: emailInput.current!.value,
			message: messageInput.current!.value,
			time: date,
		};
		sendEmail(letter);
		await closeEnvelope();
	};

	const sendEmail = (letter: EmailContent) => {
		emailjs
			.send(emailVars.serviceId, emailVars.templateId, { ...letter }, emailVars.emailKey)
			.then(() => alert("Message sent!"))
			.catch((err) => console.error("Email send failed:", err));
	};

	const handleMsgTyping = () => {
		if (messageInput.current) {
			messageInput.current.style.height = "auto";
			messageInput.current.style.height = messageInput.current.scrollHeight + "px";
		}
	};

	const closeEnvelope = async () => {
		await Promise.all([
			messageControls.start({
				opacity: 0,
				height: 0,
				transition: { duration: 0.5, ease: "easeInOut" },
			}),
			letterControls.start({
				y: 150,
				transition: { duration: 0.8, ease: "easeInOut" },
			}),
		]);

		letterReady.set(1);

		await envelopeControls.start({
			rotateX: 180,
			zIndex: 5,
			transition: { duration: 0.8, ease: "easeInOut" },
		});
	};

	return (
		<div className={styles["letter"]}>
			<motion.div className={styles["letter__paper"]} animate={letterControls}>
				<motion.p>
					<Trans>contact.nameInput</Trans> <motion.input name="name" ref={nameInput} type="text" />
				</motion.p>

				<motion.p>
					<Trans>contact.emailInput</Trans> <motion.input name="email" ref={emailInput} type="text" />
				</motion.p>

				<motion.p>
					<Trans>contact.messageInput</Trans>
				</motion.p>
				<motion.div className={styles["letter__paper__message-wrapper"]} animate={messageControls}>
					<motion.textarea name="message" className={styles["letter__paper__message-wrapper__message"]} rows={1} onInput={handleMsgTyping} ref={messageInput} />
				</motion.div>
				<motion.button onClick={handleSend}>
					<Trans>contact.sendButton</Trans>
				</motion.button>
			</motion.div>
			<div className={styles["letter__envelope-container"]}>
				<div className={styles["letter__envelope-container__envelope"]}>
					<img className={styles["letter__envelope-container__envelope__front"]} src={frontImg} alt="envelope" />
					<img className={styles["letter__envelope-container__envelope__back"]} src={backImg} alt="envelope" />
					<motion.img className={styles["letter__envelope-container__envelope__flap"]} animate={envelopeControls} src={flapImg} alt="envelope" />
				</div>
			</div>
		</div>
	);
};
