// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  ownUrl: 'http://localhost:4200',
  apiUrl: 'http://localhost:8080',
  signOn: {
    authority: 'https://login.microsoftonline.com/45a8141c-94c3-4fde-9cf3-0cfcc10ad529',
    clientId: '9f9965aa-840d-4c88-8121-eac081ee2dd8',
  }
};
