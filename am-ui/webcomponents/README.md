# Webcomponents for AMP

This directory contains all the webcomponents for the UI.
* create-ad-webcomponent: Vue webcomponent containing the logic to POST new Topics(Ads)
* search-results-webcomponent: React webcomponent to display the list of topics found in the search and be able to access their details. 
* search-webcomponent: Angular webcomponent with dynamic forms (https://angular.io/guide/dynamic-form) to search for topics

## Build

Run `pnpm build` to build the every webcomponent. The build artifacts will be stored in its respective `dist/` directory. Running the same command in the root directory of am-ui will also run this command and build the webcomponents through the prebuild.

## Running unit tests

Run `pnpm test` to execute the tests with its respective command in each webcomponent.

## Lint

Run `pnpm test` to lint each webcomponent with its respective command.
