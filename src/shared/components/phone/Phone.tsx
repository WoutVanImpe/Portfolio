import styles from "./phone.module.scss";
import phoneImg from "../assets/phone.svg";

export const Phone = () => {
	return (
		<div className={styles["phone-container"]}>
			<img src={phoneImg} alt="phone" className={styles["phone-container__phone"]} />
			<div className={styles["phone-container__button"]}></div>
			<div className={styles["phone-container__screen"]}></div>
		</div>
	);
};
