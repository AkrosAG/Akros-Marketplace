# Create-Ad-Webcomponent

Create-Ad-Webcomponent is a webcomponent written in VueJS for the AKROS marketplace.
Calls corresponding API to obtain a list of categories each with their own fields, once a category is chosen a dynamic form is created based on theose fields.
The generated form can be filled to make a POST call to create a new advertisement(Topic)

## Installation

Use npm to install the webcomponent along with its dependencies.

```bash
npm install
```

Use the respective commands to lint and run tests.

```bash
npm run lint
```

```bash
npm run test
```

## Usage

The following command will start the development server for the webcomponent.

```bash
npm run dev
```

If you want to start the webcomponent within the main application, just start the main application (in the folder _am-ui_) - The script will build the webcomponents and add them to the application accordingly.
