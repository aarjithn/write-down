import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'write-down',
  outputTargets:[
    {
      type: 'dist'
    },
    {
      type: 'www',
      baseUrl: '/write-down',
      serviceWorker: null
    }
  ],
  plugins: [
    sass()
  ]
};
