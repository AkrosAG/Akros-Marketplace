# SearchWebcomponent

Search-Webcomponent is a webcomponent created in Angular for the purpose of searching for the Topic registers in each of the categories in Akros Marketplace. Calls corresponding API to obtain a list of categories(GET: /categories{create}) each with their own fields, where the `create` must be set to false in order to receive the fields that apply to the search. Once a category is chosen a dynamic form is constructed with the received fields.

To perform the search no value is required to be entered in the form, an empty form will send to the Topics controller in the backend, through POST: /topics/searches, the id of the category and a value for the variable `request_or_offer` (which must be `request` or `offer`) and an empty array for the variable `search_values`, or if form with data then one object for each filled field inside this array containing the id of the field and the value entered.

Some validations have been implemented in this components, but most work related to validations is pending.

## Installation

The installation of the webcomponents is carried out at higher level, starting the main application will also build and integrate the webcomponents. For further detail refer to the README in the webcomponents root or the README in the main am-ui root.

To run locally the command `pnpm dev` can be used, which through Vite (https://vitejs.dev/) it will start a local server at http://localhost:3000/


## Running unit tests

Run `pnpm test` to execute the unit tests via [Jest](https://jestjs.io).

## Lint

Run `pnpm lint` to lint the project via [Angular-Eslint](https://github.com/angular-eslint/angular-eslint), [GTS](https://github.com/google/gts) and [Stylelint](https://stylelint.io).
