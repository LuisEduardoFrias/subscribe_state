/** @format */

export default function initialState() {
	return {
		name: "luis eduardo",
		age: 17,
		color: "yellow",
		volume: 30,
		persons: [
			{
				name: "Juan Pérez",
				age: 30,
				occupation: "Software Engineer",
				residence: "Mexico City",
				interests: "technology, travel, photography",
				skills: "programming, data analysis, project management"
			},
			{
				name: "Maria Garcia",
				age: 28,
				occupation: "Marketing Specialist",
				residence: "Madrid, Spain",
				interests: "art, fashion, yoga",
				skills: "digital marketing, graphic design, social media management"
			},
			{
				name: "Li Wei",
				age: 35,
				occupation: "Business Consultant",
				residence: "Shanghai, China",
				interests: "business strategy, cultural exchange, hiking",
				skills: "market analysis, negotiation, cross-cultural communication"
			}
		],
		fontFamily: "Arial",
		appStyle: {
			backgroundColor: "#bae17b",
			textColor: "#e17b9f",
			titleSize: "12"
		},
		formStyle: {
			backgroundColor: "#d77be1",
			textColor: "#7b9ce1",
			titleSize: "12"
		},
		jsonStyle: {
			braces: "#f7d181",
			squareBrackets: "#f3b802",
			colonComma: "#5a5a5a",
			quotationMarks: "#00c1fb",
			key: "#efa600",
			value: "#14d600"
		}
	};
}
