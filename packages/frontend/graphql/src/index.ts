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
  // return `${protocol}//${process.env.AFFINE_SERVER_HOST}${process.env.AFFINE_SERVER_PORT ? `:${process.env.AFFINE_SERVER_PORT}` : ''}`;
}

export const fetcher = gqlFetcherFactory(getBaseUrl() + '/graphql');
