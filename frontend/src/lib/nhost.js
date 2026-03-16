import { NhostClient } from '@nhost/nhost-js';

// Initialize Nhost client
// Using explicit service URLs based on the backendUrl format
const backendUrl = process.env.REACT_APP_NHOST_BACKEND_URL || 'https://placeholder.nhost.run';

const nhost = new NhostClient({
  subdomain: process.env.REACT_APP_NHOST_SUBDOMAIN || 'placeholder',
  region: process.env.REACT_APP_NHOST_REGION || 'eu-central-1',
  // Override with explicit URLs if the standard format doesn't work
  authUrl: `${backendUrl}/v1/auth`,
  graphqlUrl: `${backendUrl}/v1/graphql`,
  storageUrl: `${backendUrl}/v1/storage`,
  functionsUrl: `${backendUrl}/v1/functions`,
});

export { nhost };
