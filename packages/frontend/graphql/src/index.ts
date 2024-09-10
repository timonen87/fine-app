export * from './error';
export * from './fetcher';
export * from './graphql';
export * from './schema';

import { setupGlobal } from '@affine/env/global';

import { gqlFetcherFactory } from './fetcher';

setupGlobal();

export function getBaseUrl(): string {
  if (environment.isDesktop) {
    return runtimeConfig.serverUrlPrefix;
  }
  if (typeof window === 'undefined') {
    // is nodejs
    return '';
  }
  const { protocol, hostname, port } = window.location;
  return `${protocol}//${hostname}${port ? `:${port}` : ''}`;
}

export const fetcher = gqlFetcherFactory('http://localhost:3010' + '/graphql');
