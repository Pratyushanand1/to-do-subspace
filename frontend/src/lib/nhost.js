import { NhostClient } from '@nhost/nhost-js';

// Initialize Nhost client with correct service URLs
// Format: subdomain.SERVICE.region.nhost.run
const subdomain = process.env.REACT_APP_NHOST_SUBDOMAIN || 'placeholder';
const region = process.env.REACT_APP_NHOST_REGION || 'eu-central-1';

const nhost = new NhostClient({
  subdomain,
  region,
  // Explicit service URLs for reliability
  authUrl: `https://${subdomain}.auth.${region}.nhost.run/v1`,
  graphqlUrl: `https://${subdomain}.hasura.${region}.nhost.run/v1/graphql`,
  storageUrl: `https://${subdomain}.storage.${region}.nhost.run/v1`,
  functionsUrl: `https://${subdomain}.functions.${region}.nhost.run/v1`,
});

export { nhost };
