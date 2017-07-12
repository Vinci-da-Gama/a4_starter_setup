import 'bootstrap/dist/css/bootstrap.css';
import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from '../aot/src/app/app.module.ngfactory';
console.info('20 -- app.environment is: ', app.environment);
if (app.environment === 'production') {
    enableProdMode();
}
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
//# sourceMappingURL=main.js.map