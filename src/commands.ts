
/* IMPORT */

import {alert, openInApp} from 'vscode-extras';
import {getDevtool, getDevtools} from './utils';

/* MAIN */

const open = async (): Promise<void> => {

  const devtools = await getDevtools ();

  if ( !devtools.length ) return alert.error ( 'No DevTools found' );

  const devtool = await getDevtool ( devtools );

  if ( !devtool ) return;
  if ( !devtool.url ) return alert.error ( 'No valid DevTools URL found' );

  openInApp ( devtool.url, 'chrome' );

};

/* EXPORT */

export {open};
