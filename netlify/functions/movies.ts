import axios from 'axios';
import { apiKey, apiBase } from './constants';
import { Handler } from '@netlify/functions';

const handler: Handler = async (event, context) => {
  const split = event.path.split('/');
  const movieId = split[split.length - 1];
  let url = `${apiBase}movie/${movieId}`;
  console.log('server movie ID', movieId, url);
  const response = await axios.get(url, {
    params: {
      api_key: apiKey
    }
  });
  // console.log('resp', response)
  return {
    statusCode: 200,
    body: JSON.stringify(response.data),
    contentType: 'application/json'
  };
}

export { handler };
