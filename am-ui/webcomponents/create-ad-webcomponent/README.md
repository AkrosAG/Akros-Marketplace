# Create-Ad-Webcomponent

Create-Ad-Webcomponent is a webcomponent written in VueJS for the AKROS marketplace.
Calls corresponding API to obtain a list of categories(GET: /categories{create}) each with their own fields, where the "create" parameter is used to indicate whether to obtain the category fields for posting and add, or otherwise obtain the fields for the search form. Once a category is chosen a dynamic form is created based on those fields.
The generated form can be filled to make a POST call to create a new Topic(Ad).

Some basic validation logic can be found in the class CreateAdFields which prevents the user atempting to POST a Topic with invalid data.

## Installation

The installation of the webcomponents is carried out at higher level, starting the main application will also build and integrate the webcomponents. For further detail refer to the README in the webcomponents root or the README in the main am-ui root.

To run locally the command `npm run dev` can be used, which through Vite (https://vitejs.dev/) it will start a local server at http://localhost:3000/
## Translations

The translations for the create Ad module can be found under src/locales/i18n.js, having the resources for both english and german together, in an object as creation result of the use of Vue createI18n (https://vue-i18n.intlify.dev/)
