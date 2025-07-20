import styles from "./navbar.module.scss";

type RefType = React.RefObject<HTMLDivElement | null>;

export const NavBar = ({ home, about, works, contact }: { home: RefType; about: RefType; works: RefType; contact: RefType }) => {
	return (
		<div className={styles["navbar"]}>
			<div className={styles["navbar__logo"]}></div>
			<div className={styles["navbar__links"]}>
				<button onClick={() => home.current?.scrollIntoView({ behavior: "smooth" })}>home</button>
				<button onClick={() => about.current?.scrollIntoView({ behavior: "smooth" })}>about</button>
				<button onClick={() => works.current?.scrollIntoView({ behavior: "smooth" })}>works</button>
				<button onClick={() => contact.current?.scrollIntoView({ behavior: "smooth" })}>contact</button>
			</div>
		</div>
	);
};
