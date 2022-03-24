import axios from 'axios';
import { ApiConfig, MovieResultsResponse } from './models';

export async function getConfig() {
    const response = await axios.get<ApiConfig>('/.netlify/functions/config');
    return response.data;
}

export async function search(criteria: string) {
    console.log('Search crit', criteria, encodeURI(criteria));
    const response = await axios.get(`/.netlify/functions/search/${encodeURI(criteria)}`);
    return response.data;
}

export async function getPopular() {
    const response = await axios.get<MovieResultsResponse>('/.netlify/functions/popular');
    return response.data?.results || [];
}