////////////////////////////////////////////////////////////////
// This two will be imported in polyfills in webpack.config.js//
// import 'core-js';                                          //
// import 'zone.js/dist/zone';                                //
////////////////////////////////////////////////////////////////
import 'bootstrap/dist/css/bootstrap.css';

import { enableProdMode } from '@angular/core';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { AppModule } from './app/app.module';
import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from '../aot/src/app/app.module.ngfactory';

declare var app: {
	environment: string
}

/*declare function require(id: string): any;*/

console.info('20 -- app.environment is: ', app.environment);
if ( app.environment === 'production' ) {
	enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule);
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
