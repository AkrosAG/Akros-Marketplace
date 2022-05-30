# am-ui

Web-Frontend for the Akros Marketplace build with Angular using webcomponents.

The actual components of a page are located in the webcomponents/ directory and will be build and copied to the scripts folder for the frontend to use.

Currently the application is composed of a main Angular application hosting the webcomponents for the search(Angular), creation (Vue), search results (React).

## Development server

Run `npm run start_ssl` for a dev server with a SSL certificate. This will go through a prebuild command that will build the webcomponents by `build:webcomponents`. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files, however this does not apply to changes being made inside the webcomponents, in order to see changes in the webcomponents it will be required to run the command again. `npm run start_ssl` can also be used to launch the application under secure protocol.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm run test` to execute the unit tests via [Jest](https://jestjs.io). Configuration for the unit tests can be found in the file `jest.config.js`.

## Lint

Run `npm run lint` to lint the project via [Angular-Eslint](https://github.com/angular-eslint/angular-eslint), [GTS](https://github.com/google/gts) and [Stylelint](https://stylelint.io). This will run the lint for angular, typescript and style. Individual linting can be performed using the commands `npm run lint:angular`, `npm run lint:typescript`, `npm run lint:style`. `npm run fix` can be used as well with the same logic as for lint to attempt to fix automatically certain linting problems.

## Translations

Currently the application supports two languages, with the main language being in German and English as secondary. The change of the language can be performed in navbar through the language selector, changing the language in the main application and the webcomponents. However, due to the aplication being split into webcomponents, the i18n resources are not centralized, and work different depending on the component.

The translations for the main application, and the search-webcomponent, can be found under assets/i18n, and are used via Angular TranslateModule.
