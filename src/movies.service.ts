import axios from 'axios';
import { ApiConfig, MovieDetails, MovieResultsResponse } from './models';

export async function getConfig() {
    const response = await axios.get<ApiConfig>('/.netlify/functions/config');
    return response.data;
}

/**
 * Get movie by ID
 * @param movieId Movie ID
 * @returns 
 */
export async function get(movieId: number) {
    const response = await axios.get<MovieDetails>(`/.netlify/functions/movies/${movieId}`);
    return response.data;
}

export async function search(criteria: string): Promise<MovieResultsResponse> {
    if (!criteria) {
        // if no search criteria, return popular movies
        const popular = await getPopular();
        return { results: popular } as MovieResultsResponse;
    }
    const response = await axios.get<MovieResultsResponse>(`/.netlify/functions/search/${encodeURI(criteria)}`);
    return response.data;
}

export async function getPopular() {
    const response = await axios.get<MovieResultsResponse>('/.netlify/functions/popular');
    return response.data?.results || [];
}