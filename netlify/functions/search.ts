import axios from 'axios';
import { apiKey, apiBase } from './constants';
import { Handler } from '@netlify/functions';

const url = `${apiBase}search/movie`;


const handler: Handler = async (event, context) => {
  const split = event.path.split('/');
  const searchTerm = split[split.length - 1];
  const response = await axios.get(url, {
    params: {
      api_key: apiKey,
      query: searchTerm
    }
  });

  return {
    statusCode: 200,
    body: JSON.stringify(response.data),
    contentType: 'application/json'
  };
}

export { handler };
