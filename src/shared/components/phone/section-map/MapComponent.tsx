import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import styles from "./mapSection.module.scss";
import "leaflet/dist/leaflet.css";
import { useTheme } from "~context/ThemeContext";

export const MapComponent = ({ lat, lon, formatted }: { lat: number; lon: number; formatted: string }) => {
	const { darkmode } = useTheme();
	const dark = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
	const light = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

	return (
		<MapContainer style={{ width: "270px", height: 509, zIndex: 1 }} center={[lat, lon]} zoom={15} scrollWheelZoom={true}>
			<TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url={darkmode ? dark : light} />
			<Marker position={[lat, lon]}>
				<Popup>{formatted}</Popup>
			</Marker>
		</MapContainer>
	);
};
