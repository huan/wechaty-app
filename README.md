# Wechaty APP

[![Build Status](https://travis-ci.org/zixia/wechaty-app.svg?branch=master)](https://travis-ci.org/zixia/wechaty-app) [![TypeScript definitions on DefinitelyTyped](http://definitelytyped.org/badges/standard.svg)](http://definitelytyped.org) [![Greenkeeper badge](https://badges.greenkeeper.io/zixia/wechaty-app.svg)](https://greenkeeper.io/)

Wechaty APP Web Component

# Refference

## Angular

1. [Angular University](https://blog.angular-university.io)
1. [THOUGHTRAM - EXPLORING ANGULAR 2 SERIES](http://blog.thoughtram.io/exploring-angular-2/)
1. [PGRADING APPS TO ANGULAR 2 USING NGUPGRADE](http://blog.thoughtram.io/angular/2015/10/24/upgrading-apps-to-angular-2-using-ngupgrade.html)
1. [How to create an Angular 2 component library](https://blog.angular-university.io/how-to-create-an-angular-2-library-and-how-to-consume-it-jspm-vs-webpack/)
1. [SystemJS & AngularFire for Angular 2](https://www.youtube.com/watch?v=ngnSOTSS8Q8)

## Desktop App

1. [Angular 2 0 Module Loader System JS Loading](https://www.youtube.com/watch?v=sQ0_nQM7YD8)
1. [Angular2 and Electron - The definitive guide](https://www.xplatform.rocks/2016/02/14/angular2-and-electron-the-definitive-guide/)

## Bundle Tool

1. [WebPack Tutorial](http://webpack.github.io/docs/tutorials/getting-started/)

## Documentation

* [Compodoc - The missing documentation tool for your Angular application](https://compodoc.github.io/compodoc/)

## Testing

What's the relationship between [Protractor](http://www.protractortest.org), Karma and Jasmine?

Simple.

1. Jasmine tell us whether the function is as expected by compare the function return value with the expected value.
1. Karma start browser, and run Jasmine inside browser, for Unit Testing
1. ProTractor start browser, and run Jasmine outside browser, for End to End Testing

### Unit Testing

What is a Unit testing?

Simple. It call functions in your code, then confirm the return is as expected.

1. [Unit Testing strategies with Angular 2 – Julie Ralph](https://www.youtube.com/watch?v=C0F2E-PRm44)

### End to End Testing

What is End to End(E2E) testing?

Simple. It simulates user action to interactive with the browser.

1. [Protractor styleguide – Carmen Popoviciu and Andres Dominguez](https://www.youtube.com/watch?v=-lTGnYwnEuM)


# Testing

```bash
npm run test
```

which is equals to run:

```bash
npm run unit
npm run e2e
```

## Unit Testing

Under directory test/unit (?)

## End to End Testing

Under directory test/e2e (?)

## Environment Setup

We must set Xvfb to run chrome/firefox in headless mode.

### Xvfb

```bash
$ Xvfb :99 -ac
$ export DISPLAY=:99
```

# Wechaty Test

```
$ npm test
```

Notice: if you use cloud9, you need to change the default shell from `dash` to `bash`, because npm run script use `ls *.{js,html}` blob, but dash seems not support this.

```shell
$ sudo ln -sf /bin/bash /bin/sh
```

# Version History

### v0.2 (May 2017)

1. Update to Angular 4

### v0.1.1 (Jul 2016)

1. Build on Angular 2 Beta

# Upgrade to Angular 4

* [Upgrading from Beta.10 to Beta.14](https://github.com/angular/angular-cli/wiki/Upgrading-from-Beta.10-to-Beta.14)
* [stories 1.0 update](https://github.com/angular/angular-cli/wiki/stories-1.0-update)
* [Angular 4.0.0 Now Available](https://angularjs.blogspot.com/2017/03/angular-400-now-available.html)

# Reference

* [RESOLVING ROUTE DATA IN ANGULAR](https://blog.thoughtram.io/angular/2016/10/10/resolving-route-data-in-angular-2.html)
* [ANGULAR COMPONENT TESTING WITH ROUTERLINK AND ROUTEROUTLET](http://www.kirjai.com/ng2-component-testing-routerlink-routeroutlet/)

----------------------------------


# Angular4

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
