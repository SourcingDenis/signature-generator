import { Handler } from '@netlify/functions';
import { SignatureData, StyleConfig } from '../../../src/types';

interface SavedSignature {
  id: string;
  data: SignatureData;
  config: StyleConfig;
  createdAt: string;
}

// In a real application, you would use a database
const signatures: SavedSignature[] = [];

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const { data, config } = JSON.parse(event.body || '{}');
    
    if (!data || !config) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required data' }),
      };
    }

    const signature: SavedSignature = {
      id: Math.random().toString(36).substring(2, 15),
      data,
      config,
      createdAt: new Date().toISOString(),
    };

    signatures.push(signature);

    return {
      statusCode: 200,
      body: JSON.stringify(signature),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
}