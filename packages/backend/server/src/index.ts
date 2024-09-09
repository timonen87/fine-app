/// <reference types="./global.d.ts" />
import './prelude';

import { Logger } from '@nestjs/common';
import { omit } from 'lodash-es';

import { createApp } from './app';
import { URLHelper } from './fundamentals';

const app = await createApp();
// app.enableCors({
//   origin: ['http://localhost:8080', 'http://notionai.pro'],
//   methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
//   credentials: true,
// });
app.enableCors({
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
});
const listeningHost = AFFiNE.deploy ? '0.0.0.0' : 'localhost';
await app.listen(3010);
await app.listen(AFFiNE.server.port, listeningHost);
const url = app.get(URLHelper);

const logger = new Logger('App');

logger.log(`AFFiNE Server is running in [${AFFiNE.type}] mode`);
if (AFFiNE.node.dev) {
  logger.log('Startup Configuration:');
  logger.log(omit(globalThis.AFFiNE, 'ENV_MAP'));
}
logger.log(`Listening on http://${listeningHost}:${AFFiNE.server.port}`);
logger.log(`And the public server should be recognized as ${url.home}`);
