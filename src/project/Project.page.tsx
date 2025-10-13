import { useParams } from "react-router";
import styles from "./project.module.scss";
import { useData } from "~context/DataContext";
import { PageTitle } from "~shared/hooks/page-title/PageTitle";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import type ProjectType from "~shared/hooks/projects-data/project.types";
import { HeaderSectionP } from "./components/header-section/HeaderSectionP";
import { InfoSectionP } from "./components/info-section/InfoSectionP";

export const ProjectPage = () => {
	const { id } = useParams<{ id: string }>();
	const { projects } = useData();
	const projectInfo: ProjectType = projects!.find((p) => p.id === Number(id))!;

	const { i18n } = useTranslation();
	const [selectedLanguage, setSelectedLanguage] = useState<string>("en");

	useEffect(() => {
		setSelectedLanguage(i18n.language);
	}, [i18n.language]);

	const text: Record<
		string,
		{
			title: string;
			teaser: string;
		}
	> = {
		en: projectInfo.en,
		nl: projectInfo.nl,
	};

	return (
		<>
			<PageTitle title={`Wout Van Impe | ${text[selectedLanguage].title}`} />
			<div className={styles["p-project"]}>
				<HeaderSectionP />
				<InfoSectionP />
			</div>
		</>
	);
};
