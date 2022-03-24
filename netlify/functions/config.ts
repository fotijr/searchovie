import axios from 'axios';
import { apiKey, apiBase } from './constants';
import { Handler } from '@netlify/functions';

const url = `${apiBase}configuration`;

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
