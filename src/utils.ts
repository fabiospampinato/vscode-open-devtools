
/* IMPORT */

import vscode from 'vscode';
import type {Devtool} from './types';

/* MAIN */

const getDevtools = async (): Promise<Devtool[]> => {

  const devtools: Devtool[] = [];

  for ( const port of [9229, 9222, 5858] ) {

    try {

      const response = await globalThis.fetch ( `http://127.0.0.1:${port}/json/list` );

      if ( !response.ok ) continue;

      const devtoolsRaw = await response.json ();

      for ( const {title, description, devtoolsFrontendUrl} of devtoolsRaw ) {

        devtools.push ({ title, description, url: devtoolsFrontendUrl });

      }

    } catch {}

  }

  return devtools;

};

const getDevtool = async ( devtools: Devtool[] ): Promise<Devtool | undefined> => {

  if ( devtools.length === 0 ) return;
  if ( devtools.length === 1 ) return devtools[0];

  const options = devtools.map ( devtool => ({ label: devtool.title || '[No name]', description: devtool.description, devtool }) );
  const option = await vscode.window.showQuickPick ( options );
  const devtool = option?.devtool;

  return devtool;

};

/* EXPORT */

export {getDevtools, getDevtool};
