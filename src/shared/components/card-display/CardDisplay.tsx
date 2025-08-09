import styles from "./carddisplay.module.scss";
import frontFrameImg from "../assets/cardholder-front.svg";
import backFrameImg from "../assets/cardholder-back.svg";
import { Postcard } from "../postcard/Postcard";

export const CardDisplay = () => {
	return (
		<div className={styles["postcard-display-container"]}>
			<img className={styles["postcard-display-container__back"]} src={backFrameImg} alt="back of frame" />
            <div className={styles["postcard-display-container__card"]}>
                <Postcard/>
            </div>
            <img className={styles["postcard-display-container__front"]} src={frontFrameImg} alt="front of frame" />
		</div>
	);
};
