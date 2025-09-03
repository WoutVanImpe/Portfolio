export default interface WeatherResponseType {
	location: {
		name: string;
		country: string;
		localtime: string;
	};
	current: {
		temp_c: number;
		wind_kph: number;
		condition: {
			text: string;
			icon: string;
		};
		precip_mm: number;
	};
}
