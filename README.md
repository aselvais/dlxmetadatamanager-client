# Dlx Meta-data manager

This is the front-end of the tool developed for Deluxe's big data platform.
The objective is to have a simple and easy GUI for managing the schemas and
meta-data coming from the source systems we are integrating in our datalake.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Instalation

```
git clone https://github.com/aselvais/dlxmetadatamanager-client.git
yarn install
yarn start
```

## Available Scripts

In the project directory, you can run:

### `yarn docs`

Generate the technical documentation from the code docblocks.

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).




# TODO front end fine tuning (sprint 29)

## new fields

- Schemas
  - code
  - destination_lake : with lake_p01_snapshots as default
  - destination_storage : with choices of HIVE or Snowflaque (with HIVE as default)
- Fields
  - is_obfuscated
  - is_partition

## remove fields

- Systems
  - organization (organization)
  - code (code)
- Origins
  - code (app_code)
  - customer type (cust_type)
  - business contact (business_contact)
  - cdc enable (cdc_enabled)
- Databases
  - code (code)
  - timezone (timezone)
  - app name (app_name)
  - network (network)
  - hosted area (hosted_area)
  - in bidm (in_bidm)
  - deluxe name (deluxe_name)
  - firewall (firewall)
  - instance name (instance_name)
  - schema name (schema_name)
- Schemas
  - storage engine (storageengine)
  - vendor brand (vendorbrand)
  - timezone (timezone)
- Tables
  - is_gdpr (is_gdpr)
  - landing destination (landing_destination)
- Fields
  - Has other special handling defined? (is_other_special_handling)
  - Special handling description (other_special_handling_type)

## Top menus remove

- Users (but for admins?)
- data dict
- docs (but for devs)
- data


