
/* IMPORT */

import openPath, {apps} from 'open';
import vscode from 'vscode';
import {getDevtools, getDevtool} from './utils';

/* MAIN */

const open = async (): Promise<void> => {

  const devtools = await getDevtools ();

  if ( !devtools.length ) return void vscode.window.showErrorMessage ( 'No DevTools found' );

  const devtool = await getDevtool ( devtools );

  if ( !devtool ) return;
  if ( !devtool.url ) return void vscode.window.showErrorMessage ( 'No valid DevTools URL found' );

  await openPath ( devtool.url, { app: { name: apps.chrome }, newInstance: true } );

};

/* EXPORT */

export {open};
