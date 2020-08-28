/**
 * Fala galerinha!
 * Este arquivo contem a  criação de uma instância 
 * do axios para fazer requisições ao azure.
 */
import axios from 'axios';

const api = axios.create({
	baseURL: 'https://api.cognitive.microsoft.com/bing/v7.0/news',
	headers: {
		'Ocp-Apim-Subscription-Key': process.env.AZURE_SECRET,
	},
});

export default api;
