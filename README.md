Swagger 2 Angular 2 MaterializeCSS
==========

# Presentation
Swagger 2 UI made with Angular 2 and MaterializeCSS

# Demo
Feel free to try it here: [Swagger 2 UI Demo](http://public.redfroggy.fr/swagger2)
You can try with your Swagger 2 api by setting the url under the "Settings" menu

# Features
- Responsive application
- Toolbar menu
- Api list
- Api detail
- Api execution
- Possibility to switch between request types (Accept header): for now only application/json and application/xml are supported
- Possibility to switch between response types (Content-Type header): for now only application/json and application/xml are supported
- Dynamic url construction when specifying parameters
- Responses messages listed in table
- Detailed model and sub models information: fields name, types, etc...
- Charts displaying requests time
- Possibility to compare statistics from one api to another

# Screenshots
![image](http://i.imgur.com/2aXJ3TK.png?1)
![image](http://i.imgur.com/zUvFBFB.png?1)
![image](http://i.imgur.com/ddWJJgF.png?1)
![image](http://i.imgur.com/UWzzSii.png?1)
![image](http://i.imgur.com/WD53mGp.png?1)
![image](http://i.imgur.com/oqZ3Xec.png?1) 

# Supported browsers
Tested on the following browsers:
- Chrome
- Firefox
- Internet Explorer 11

# Stack
- [Angular 2](https://angular.io)
- [MaterializeCSS](http://materializecss.com)
- [ChartJS](http://www.chartjs.org/)
- Webpack
- Karma
- Jasmine
- PhantomJS

# Project Structure

```
- src: Sources folder
    -- app: Application files (TypeScript)
		-- boot.ts: Angular2 entry point
		-- app.component.ts: Booststrap component
		-- app.html: Bootsrap html
		-- directives: Angular 2 directives
		-- services: Angular 2 services
		-- model: Swagger api typescript definition
		-- components: Main components
		-- pipes: Angular2 @Pipe components
		-- utils: Utility classes
    -- assets: Assets folder
	   -- icons
	   -- styles
- typings: TypeScript interfaces for libraries
- node_modules (not in git repository): NPM dependencies
- karma.conf.js: Karma configuration file for unit tests (not yet)
- webpack.test.config.js: Build configuration file used for unit tests (not yet)
- webpack.config.js: Build configuration file
- tsconfig.json: TypeScript configuration file
- tslint.json: TSLint configuration file
- typings.json: Typings configuration file
- package.json: For managing npm dependencies and running scripts
- dist: production folder
```


# Installation
Install the node dependencies:
```bash
$ npm install
```

# Execution
To start the server:
```bash
$ npm run start
```
Then go to http://localhost:3000

To build the project:
```bash
$ npm run build
```