import axios from 'axios';
import { apiKey } from './constants';
import { Handler } from '@netlify/functions';

const url = 'https://api.themoviedb.org/3/movie/popular';

const handler: Handler = async (event, context) => {
  const response = await axios.get(url, {
    params: {
      api_key: apiKey
    }
  });

  return {
    statusCode: 200,
    body: JSON.stringify(response.data),
    contentType: 'application/json'
  };
}

export { handler };
