import axios from 'axios';
import { apiKey, apiBase } from './constants';
import { Handler } from '@netlify/functions';

const url = `${apiBase}movie/popular`;

const handler: Handler = async (event, context) => {
  const response = await axios.get(url, {
    params: {
      api_key: apiKey
    }
  });

  return {
    statusCode: 200,
    body: JSON.stringify(response.data),
    headers: {
      // cache for 4 hours
      'Cache-Control': 'public, max-age=14400',
      'content-type': 'application/json'
    }
  };
}

export { handler };
