
/* IMPORT */

import {prompt} from 'vscode-extras';
import type {Devtool} from './types';

/* MAIN */

const getDevtool = async ( devtools: Devtool[] ): Promise<Devtool | undefined> => {

  if ( devtools.length < 2 ) return devtools[0];

  const options = devtools.map ( devtool => ({ label: devtool.title || 'Unnamed', description: devtool.description, devtool }) );
  const option = await prompt.select ( 'Select a devtools window to open...', options );
  const devtool = option?.devtool;

  return devtool;

};

const getDevtools = async (): Promise<Devtool[]> => {

  const devtools: Devtool[] = [];

  for ( const port of [9229, 9222, 5858] ) {

    try {

      const url = `http://127.0.0.1:${port}/json/list`;
      const response = await fetch ( url );

      if ( !response.ok ) continue;

      const devtoolsList = await response.json ();

      for ( const {title, description, devtoolsFrontendUrl} of devtoolsList ) {

        devtools.push ({ title, description, url: devtoolsFrontendUrl });

      }

    } catch ( error: unknown ) {

      console.error ( error );

    }

  }

  return devtools;

};

/* EXPORT */

export {getDevtool, getDevtools};
