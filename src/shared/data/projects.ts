import parallaxHallShot from "@assets/bluebeard/parallax-hall-shot.webp";
import parallaxBluebeardHead from "@assets/bluebeard/parallax-bluebeard-head.webp";
import parallaxTrees from "@assets/bluebeard/parallax-trees.webp";
import parallaxSky from "@assets/bluebeard/parallax-sky.webp";

import portalHomeScreen from "@assets/once-upon-a-time/portal-home-screen.webp";
import portalFilter from "@assets/once-upon-a-time/portal-filter.webp";
import portalAboutUs from "@assets/once-upon-a-time/portal-about-us.webp";
import portalMakingOff from "@assets/once-upon-a-time/portal-making-off.webp";

import trifoldMockUp from "@assets/trifold-flyer/trifold-mock-up.webp";
import trifoldFront from "@assets/trifold-flyer/trifold-front.webp";
import trifoldBack from "@assets/trifold-flyer/trifold-back.webp";

import instaMockUp from "@assets/social-media/insta-mock-up.webp";
import instaPost from "@assets/social-media/insta-post.webp";
import instaMultipost from "@assets/social-media/insta-multipost.webp";
import instaAffinity from "@assets/social-media/insta-affinity.webp";

import droneThumbnail from "@assets/drone-video/drone-tumbnail.webp";

import kikkertjeMockUp from "@assets/het-kikkertje/kikkertje-mock-up.webp";
import kikkertjeArticleOne from "@assets/het-kikkertje/kikkertje-article-1.webp";
import kikkertjeArticleTwo from "@assets/het-kikkertje/kikkertje-article-2.webp";
import kikkertjeAffinity from "@assets/het-kikkertje/kikkertje-affinity.webp";

import sproutspotKeyImage from "@assets/sproutspot/sproutspot-key-image.webp";

import forumChat from "@assets/jnm-forum/forum-chat.webp";
import forumThreadChannel from "@assets/jnm-forum/forum-thread-channel.webp";
import forumThread from "@assets/jnm-forum/forum-thread.webp";

import wdmHome from "@assets/wdm-project/wdm-home.webp";
import wdmDashboardOne from "@assets/wdm-project/wdm-dashboard-1.webp";
import wdmDashboardTwo from "@assets/wdm-project/wdm-dashboard-2.webp";
import wdmAdminViewOne from "@assets/wdm-project/wdm-admin-view-1.webp";
import wdmAdminViewTwo from "@assets/wdm-project/wdm-admin-view2.webp";

import type { LocalizedText } from "@/i18n/localize";

export type ProjectCategory = "web" | "motion" | "design" | "social" | "mobile";

export interface ProjectMedia {
	type: "image" | "video" | "youtube";
	src: string;
	alt?: LocalizedText;
}

const YOUTUBE_ID_PATTERN = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/i;

export const getYouTubeVideoId = (src: string): string | null => src.match(YOUTUBE_ID_PATTERN)?.[1] ?? null;

export const getYouTubeEmbedUrl = (src: string): string | null => {
	const id = getYouTubeVideoId(src);
	return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
};

export const getYouTubeThumbnailUrl = (src: string): string | null => {
	const id = getYouTubeVideoId(src);
	return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
};

export interface Project {
	id: string;
	title: LocalizedText;
	description: LocalizedText;
	category: ProjectCategory;
	categories: ProjectCategory[];
	liveUrl: string;
	media: ProjectMedia[];
}

export const projects: Project[] = [
	{
		id: "bluebeard",
		title: { nl: "Het verhaal van Blauwbaard", en: "The story of Bluebeard" },
		description: {
			nl: "Het eerste deel van mijn eindwerk voor het vak Frontend Development: een scroll-gebaseerde webpagina die het verhaal van Blauwbaard vertelt aan de hand van gelaagde parallax-scènes. Elementen zoals de lucht, bergen, bomen en het kasteel bewegen met verschillende snelheden en timings via Framer Motion (useScroll en useTransform). De applicatie is gebouwd met React, TypeScript en SCSS Modules, met AI-gegenereerde illustraties in een middeleeuwse houtsnedestijl.",
			en: "The first part of my final project for Frontend Development: a scroll-driven web application that tells the story of Bluebeard through layered parallax scenes. Visual elements such as the sky, mountains, trees, and castle move at distinct speeds and timings using Framer Motion (useScroll and useTransform). Built with React, TypeScript, and SCSS Modules, featuring AI-generated illustrations in a medieval woodcut style.",
		},
		category: "web",
		categories: ["web", "motion"],
		liveUrl: "https://ehb-mct.github.io/cp-frontend-WoutVanImpe/#/fairytale",
		media: [
			{
				type: "image",
				src: parallaxHallShot,
				alt: {
					nl: "Kasteelhal in Het verhaal van Blauwbaard",
					en: "Castle hall in The story of Bluebeard",
				},
			},
			{
				type: "image",
				src: parallaxBluebeardHead,
				alt: {
					nl: "Gelaagde parallax-illustratie van Blauwbaard",
					en: "Layered parallax illustration of Bluebeard",
				},
			},
			{
				type: "image",
				src: parallaxTrees,
				alt: {
					nl: "Bomenlaag in de parallax-scène",
					en: "Tree layer in the parallax scene",
				},
			},
			{
				type: "image",
				src: parallaxSky,
				alt: {
					nl: "Luchtlaag in de parallax-scène",
					en: "Sky layer in the parallax scene",
				},
			},
		],
	},
	{
		id: "once-upon-a-time",
		title: { nl: "Er was eens...", en: "Once upon a time..." },
		description: {
			nl: "Het tweede deel van mijn eindwerk Frontend Development: een centrale portaalwebsite en catalogus waarin alle parallax-sprookjes van medestudenten gebundeld zijn. Bezoekers kunnen projecten filteren op genre, zoeken op naam of een willekeurig sprookje openen via een shuffle-functie, aangevuld met een over-ons-pagina en een 'Making Of'. Ontwikkeld met React, TypeScript, React Router, React Query, Context API, SCSS Modules en Vite.",
			en: "The second part of my Frontend Development final project: a central portal and catalogue bringing together all parallax fairytale projects created by fellow students. Visitors can filter projects by genre, search by title, or load a random story via a shuffle function, alongside an About Us page and a 'Making Of' section. Built with React, TypeScript, React Router, React Query, Context API, SCSS Modules, and Vite.",
		},
		category: "web",
		categories: ["web"],
		liveUrl: "https://ehb-mct.github.io/cp-frontend-WoutVanImpe/",
		media: [
			{
				type: "image",
				src: portalHomeScreen,
				alt: {
					nl: "Startscherm van de sprookjescatalogus Er was eens...",
					en: "Home screen of the Once upon a time... fairytale catalogue",
				},
			},
			{
				type: "image",
				src: portalFilter,
				alt: {
					nl: "Filter- en zoekfunctie van de sprookjescatalogus",
					en: "Filter and search features of the fairytale catalogue",
				},
			},
			{
				type: "image",
				src: portalAboutUs,
				alt: {
					nl: "Over-ons-pagina van Er was eens...",
					en: "About Us page of Once upon a time...",
				},
			},
			{
				type: "image",
				src: portalMakingOff,
				alt: {
					nl: "Making-of-pagina van Er was eens...",
					en: "Making-of page of Once upon a time...",
				},
			},
		],
	},
	{
		id: "trifold-flyer",
		title: { nl: "Trifold flyer", en: "Trifold flyer" },
		description: {
			nl: "Een drieluik-promofolder ontworpen voor JNM (Jeugdbond voor Natuur en Milieu) om jongeren te informeren over de werking en activiteiten van de vereniging. De volledige lay-out en typografie zijn uitgewerkt in Adobe InDesign, terwijl de 3D-mockup voor de presentatie is gemodelleerd en gerenderd in Autodesk Maya.",
			en: "A promotional trifold brochure designed for JNM (Youth Association for Nature and Environment) to inform young people about the organization and its activities. The print layout and typography were created in Adobe InDesign, while the 3D presentation mockup was modeled and rendered in Autodesk Maya.",
		},
		category: "design",
		categories: ["design"],
		liveUrl: "https://example.com/trifold-flyer",
		media: [
			{
				type: "image",
				src: trifoldMockUp,
				alt: {
					nl: "3D-mockup van de JNM trifold promofolder",
					en: "3D mockup of the JNM promotional trifold flyer",
				},
			},
			{
				type: "image",
				src: trifoldFront,
				alt: {
					nl: "Voorzijde van de JNM trifold promofolder",
					en: "Front of the JNM promotional trifold flyer",
				},
			},
			{
				type: "image",
				src: trifoldBack,
				alt: {
					nl: "Achterzijde van de JNM trifold promofolder",
					en: "Back of the JNM promotional trifold flyer",
				},
			},
		],
	},
	{
		id: "social-media",
		title: { nl: "Social media", en: "Social media" },
		description: {
			nl: "Al drie jaar ben ik sociale media verantwoordelijke bij JNM, waar ik samen met collega's een groot deel van de visuele content verzorg. Alle posts worden opgebouwd volgens de JNM-huisstijl, die ik onlangs mee heb uitgebreid met nieuwe sjablonen en richtlijnen. Waar ik de ontwerpen vroeger in Adobe InDesign maakte, werk ik ze tegenwoordig uit in Affinity.",
			en: "For the past three years, I have worked as social media coordinator for JNM, producing a large share of the visual content alongside fellow volunteers. Every post follows the JNM brand identity, which I recently helped expand with updated templates and visual guidelines. Originally designed in Adobe InDesign, the graphics are now produced in Affinity.",
		},
		category: "social",
		categories: ["social"],
		liveUrl: "https://www.instagram.com/jnm_vzw/",
		media: [
			{
				type: "image",
				src: instaMockUp,
				alt: {
					nl: "Voorbeeld van sociale media visuals in de JNM-huisstijl",
					en: "Preview of social media visuals in the JNM brand identity",
				},
			},
			{
				type: "image",
				src: instaPost,
				alt: {
					nl: "Enkele JNM-socialemediapost",
					en: "Single JNM social media post",
				},
			},
			{
				type: "image",
				src: instaMultipost,
				alt: {
					nl: "Meerdere JNM-socialemediaposts in de huisstijl",
					en: "Several JNM social media posts in the brand identity",
				},
			},
			{
				type: "image",
				src: instaAffinity,
				alt: {
					nl: "Sjablonen voor JNM-socialemediaposts in Affinity",
					en: "Affinity templates for JNM social media posts",
				},
			},
		],
	},
	{
		id: "drone-video",
		title: { nl: "Drone video", en: "Drone video" },
		description: {
			nl: "Een korte dronevideo opgenomen voor het vak Drones op het platteland net buiten Brussel. De video volgt iemand die een sprint trekt en combineert dat met luchtbeelden, gefilmd met een DJI Mini 3 en vervolgens gemonteerd en nabewerkt in Adobe After Effects.",
			en: "A short aerial video produced for a Drones course in the countryside just outside Brussels. The video follows someone breaking into a sprint and combines it with aerial footage captured using a DJI Mini 3, then edited and post-processed in Adobe After Effects.",
		},
		category: "motion",
		categories: ["motion"],
		liveUrl: "https://youtu.be/Y4RpClyYqQg",
		media: [
			{
				type: "youtube",
				src: "https://youtu.be/Y4RpClyYqQg",
				alt: {
					nl: "Dronevideo van een sprint op het platteland",
					en: "Drone video of a sprint in the countryside",
				},
			},
			{
				type: "image",
				src: droneThumbnail,
				alt: {
					nl: "Luchtopname van het platteland buiten Brussel",
					en: "Aerial shot of the countryside outside Brussels",
				},
			},
		],
	},
	{
		id: "het-kikkertje",
		title: { nl: "Het kikkertje", en: "Het kikkertje" },
		description: {
			nl: "Het Kikkertje is het seizoensboekje van JNM gericht op de jongste leeftijdsgroep binnen de vereniging. Ik heb voor meerdere edities de volledige redactionele lay-out verzorgd in Adobe InDesign.",
			en: "Het Kikkertje is JNM's seasonal publication aimed at the youngest age group within the organization. Across multiple editions, I handled the full editorial layout in Adobe InDesign.",
		},
		category: "design",
		categories: ["design"],
		liveUrl: "https://jnm.be/nl/bijlage/3edb1093-3d8e-474b-80bb-032a80337bed/kikkertjeherfst2025web.pdf",
		media: [
			{
				type: "image",
				src: kikkertjeMockUp,
				alt: {
					nl: "Lay-out van het JNM-seizoensboekje Het Kikkertje",
					en: "Layout of the JNM seasonal booklet Het Kikkertje",
				},
			},
			{
				type: "image",
				src: kikkertjeArticleOne,
				alt: {
					nl: "Artikelpagina uit Het Kikkertje",
					en: "Article page from Het Kikkertje",
				},
			},
			{
				type: "image",
				src: kikkertjeArticleTwo,
				alt: {
					nl: "Tweede artikelpagina uit Het Kikkertje",
					en: "Second article page from Het Kikkertje",
				},
			},
			{
				type: "image",
				src: kikkertjeAffinity,
				alt: {
					nl: "Lay-out van Het Kikkertje in Affinity",
					en: "Het Kikkertje layout in Affinity",
				},
			},
		],
	},
	{
		id: "sproutspot",
		title: { nl: "SproutSpot", en: "SproutSpot" },
		description: {
			nl: "Mijn afstudeerproject dat stadsbewoners ongeacht hun kennisniveau helpt bij het starten en onderhouden van een moestuin. Het systeem combineert zelfgebouwde ESP32-C3 bodemsensoren (bodemvocht, temperatuur, licht en batterij) met een mobiele app in Expo React Native en een Node.js/PostgreSQL-backend. De app biedt een plantenencyclopedie met 44+ soorten, een keuzehulp, een 5-stappen installatiewizard, een interactief tuinraster, groeifase-opvolging, historische grafieken en 9 automatische pushmeldingen.",
			en: "My graduation project designed to help urban residents start and maintain a vegetable and herb garden regardless of experience level. The system combines custom ESP32-C3 soil sensor probes (moisture, temperature, light, and battery) with an Expo React Native mobile app and a Node.js/PostgreSQL backend. Key features include a 44+ species encyclopedia, a plant finder quiz, a 5-step setup wizard, an interactive garden grid, growth stage tracking, historical sensor charts, and 9 automated alert types.",
		},
		category: "web",
		categories: ["web", "mobile"],
		liveUrl: "https://github.com/WoutVanImpe/FinalWork-SproutSpot",
		media: [
			{
				type: "youtube",
				src: "https://youtu.be/QW_tPCw-y7I",
				alt: {
					nl: "Promotionele showreel van SproutSpot",
					en: "Promotional showreel for SproutSpot",
				},
			},
			{
				type: "youtube",
				src: "https://youtu.be/9y3hyChDjOs",
				alt: {
					nl: "Demo van de SproutSpot-installatie",
					en: "SproutSpot installation demo",
				},
			},
			{
				type: "image",
				src: sproutspotKeyImage,
				alt: {
					nl: "Key visual van SproutSpot",
					en: "SproutSpot key visual",
				},
			},
		],
	},
	{
		id: "jnm-forum",
		title: { nl: "JNM Forum", en: "JNM Forum" },
		description: {
			nl: "Een op maat gemaakte full-stack forum- en communicatieapplicatie om het interne overleg, aankondigingen en besluitvorming binnen JNM te centraliseren. Het platform bevat rolgebaseerd toegangsbeheer op basis van JNM-functies en drie kanaaltypes: chat, broadcast-kanalen voor aankondigingen en geneste threads voor discussies zoals moties. Gebouwd met React, TypeScript, TanStack Query, SCSS Modules, Node.js, Express en PostgreSQL, inclusief citaten, @mentions, zoekfunctie en ongelezen-tellers.",
			en: "A custom full-stack forum and communication platform built to centralize internal discussions, announcements, and decision-making within JNM. The application implements role-based access control tied to JNM functions and supports three channel types: group chat, read-only broadcast channels for announcements, and nested threads for structured discussions such as motions. Built with React, TypeScript, TanStack Query, SCSS Modules, Node.js, Express, and PostgreSQL, complete with message quoting, @mentions, search, and unread tracking.",
		},
		category: "web",
		categories: ["web"],
		liveUrl: "https://github.com/WoutVanImpe",
		media: [
			{
				type: "image",
				src: forumChat,
				alt: {
					nl: "Chatkanaal in het interne JNM Forum",
					en: "Chat channel in the internal JNM Forum",
				},
			},
			{
				type: "image",
				src: forumThreadChannel,
				alt: {
					nl: "Kanaal met geneste discussies in het JNM Forum",
					en: "Channel with nested discussions in the JNM Forum",
				},
			},
			{
				type: "image",
				src: forumThread,
				alt: {
					nl: "Geneste thread in het JNM Forum",
					en: "Nested thread in the JNM Forum",
				},
			},
		],
	},
	{
		id: "wdm-project",
		title: { nl: "WDM Project", en: "WDM Project" },
		description: {
			nl: "Een full-stack applicatie voor het vak Development V (Weapons of Math Destruction) die zich voordoet als een persoonlijke finance tracker, maar op de achtergrond gebruikers- en gedragsmetadata verzamelt. Gebruikers kunnen kasticketjes uploaden die automatisch worden uitgelezen via OCR (Tesseract.js) en gecategoriseerd met een lokaal Ollama LLM-model. In het admin-dashboard worden deze verzamelde metadata gevisualiseerd in gebruikersprofielen en risico-analyses. Gebouwd met Next.js 15, TypeScript, Express, PostgreSQL en Recharts.",
			en: "A full-stack application built for a Development V course (Weapons of Math Destruction) disguised as a personal finance tracker that covertly collects user and behavioral metadata in the background. Users upload receipts that are parsed via OCR (Tesseract.js) and categorized using a local Ollama LLM, while an admin dashboard visualizes the harvested metadata as user profiles and risk analytics. Built with Next.js 15, TypeScript, Express, PostgreSQL, and Recharts.",
		},
		category: "web",
		categories: ["web"],
		liveUrl: "https://github.com/EHB-MCT/wdm-WoutVanImpe",
		media: [
			{
				type: "image",
				src: wdmHome,
				alt: {
					nl: "Startscherm van de finance tracker",
					en: "Home screen of the finance tracker",
				},
			},
			{
				type: "image",
				src: wdmDashboardOne,
				alt: {
					nl: "Dashboard met persoonlijke financiën",
					en: "Dashboard with personal finances",
				},
			},
			{
				type: "image",
				src: wdmDashboardTwo,
				alt: {
					nl: "Tweede dashboardweergave van het WDM Project",
					en: "Second dashboard view of the WDM Project",
				},
			},
			{
				type: "image",
				src: wdmAdminViewOne,
				alt: {
					nl: "Admin-dashboard met metadata-analyse",
					en: "Admin dashboard with metadata analytics",
				},
			},
			{
				type: "image",
				src: wdmAdminViewTwo,
				alt: {
					nl: "Tweede admin-weergave met risico-analyse",
					en: "Second admin view with risk analysis",
				},
			},
		],
	},
];

export const getProject = (id: string | undefined): Project | undefined => projects.find((project) => project.id === id);

export const projectMatchesCategory = (project: Project, category?: ProjectCategory): boolean => !category || project.categories.includes(category);
