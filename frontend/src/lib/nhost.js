import { NhostClient } from '@nhost/nhost-js';

// Initialize Nhost client with environment variables
// User must configure these in .env file after creating Nhost project
const nhost = new NhostClient({
  subdomain: process.env.REACT_APP_NHOST_SUBDOMAIN || 'placeholder',
  region: process.env.REACT_APP_NHOST_REGION || 'eu-central-1',
});

export { nhost };
