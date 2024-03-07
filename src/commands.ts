
/* IMPORT */

import openPath from 'tiny-browser-open';
import vscode from 'vscode';
import {getDevtools, getDevtool} from './utils';

/* MAIN */

const open = async (): Promise<void> => {

  const devtools = await getDevtools ();

  if ( !devtools.length ) return void vscode.window.showErrorMessage ( 'No DevTools found' );

  const devtool = await getDevtool ( devtools );

  if ( !devtool ) return;
  if ( !devtool.url ) return void vscode.window.showErrorMessage ( 'No valid DevTools URL found' );

  openPath ( devtool.url, { app: 'chrome' } );

};

/* EXPORT */

export {open};
