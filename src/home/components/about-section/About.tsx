import { forwardRef } from "react";
import styles from "./about.module.scss";

export const About = forwardRef<HTMLDivElement, {}>((props, ref) => {
	return (
		<div ref={ref} className={styles["p-about"]}>
			<h1>About</h1>
			<h3>Ik ben Wout, een derdejaars student Multimedia en Creatieve Technologie en socialmediamanager bij JNM, met een passie voor visuele communicatie en technologie.</h3>
			<hr></hr>
			<div className={styles["p-about__long"]}>
				<p>
					Hi! Ik ben Wout, een derdejaarsstudent Multimedia en Creatieve Technologie aan de Erasmushogeschool Brussel, met een sterke passie voor front-end development en motion design. Ik experimenteer graag met nieuwe technologieën en daag mezelf
					uit om creatief en oplossingsgericht te werken. Naast mijn studie ben ik actief als socialmediamanager bij JNM (Jeugdbond voor Natuur en Milieu), waar ik onder andere meewerk aan promomateriaal zoals Instagramcontent, flyers en magazines.
					Verder besteed ik in mijn vrije tijd graag aandacht aan het aanscherpen van mijn technische en visuele skills.
				</p>
				<div className={styles["p-about__long__img"]}></div>
			</div>
		</div>
	);
});
