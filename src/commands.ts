
/* IMPORT */

import openPath, {apps} from 'open';
import * as vscode from 'vscode';

/* MAIN */

//TODO: Show a QuickPick if there's more than one option instead

const open = async (): Promise<void> => {

  for ( const port of [9229, 9222, 5858] ) {

    try {

      const response = await globalThis.fetch ( `http://127.0.0.1:${port}/json/list` );

      if ( !response.ok ) continue;

      const devtools = await response.json ();
      const devtoolUrl: string = devtools[devtools.length - 1]?.devtoolsFrontendUrl; // The last one is the most recent one, presumably

      if ( !devtoolUrl ) continue;

      await openPath ( devtoolUrl, { app: { name: apps.chrome }, newInstance: true } );

      return;

    } catch ( error ) {

      // console.log ( error );

    }

  }

  vscode.window.showErrorMessage ( 'No DevTools windows found' );

}

/* EXPORT */

export {open};
