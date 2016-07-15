# Wechaty APP [![Build Status](https://travis-ci.org/zixia/wechaty-app.svg?branch=master)](https://travis-ci.org/zixia/wechaty-app)
Wechaty APP Web Component

[![TypeScript definitions on DefinitelyTyped](http://definitelytyped.org/badges/standard.svg)](http://definitelytyped.org)

# Refference

## Angular

1. [Angular University](https://blog.angular-university.io)
1. [THOUGHTRAM - EXPLORING ANGULAR 2 SERIES](http://blog.thoughtram.io/exploring-angular-2/)
1. [PGRADING APPS TO ANGULAR 2 USING NGUPGRADE](http://blog.thoughtram.io/angular/2015/10/24/upgrading-apps-to-angular-2-using-ngupgrade.html)
1. [How to create an Angular 2 component library](https://blog.angular-university.io/how-to-create-an-angular-2-library-and-how-to-consume-it-jspm-vs-webpack/)
## Desktop App
1. [Angular 2 0 Module Loader System JS Loading](https://www.youtube.com/watch?v=sQ0_nQM7YD8)
1. [Angular2 and Electron - The definitive guide](https://www.xplatform.rocks/2016/02/14/angular2-and-electron-the-definitive-guide/)
2. ...

## Bundle Tool

1. [WebPack Tutorial](http://webpack.github.io/docs/tutorials/getting-started/)


## Testing

What's the relationship between [Protractor](http://www.protractortest.org), Karma and Jasmine?

Simple.

1. Jasmine tell us whether the function is as expected by compare the function return value with the expected value.
1. Karma start browser, and run Jasmine inside browser, for Unit Testing
1. ProTractor start browser, and run Jasmine outside browser, for End to End Testing

### Unit Testing

What is a Unit testing?

Simple. It call functions in your code, then confirm the return is as expected.

1. Unit [Testing strategies with Angular 2 – Julie Ralph](YouTube https://www.youtube.com/watch?v=C0F2E-PRm44)
2.

### End to End Testing

What is End to End(E2E) testing?

Simple. It simulates user action to interactive with the browser.


1. [Protractor styleguide – Carmen Popoviciu and Andres Dominguez](https://www.youtube.com/watch?v=-lTGnYwnEuM)
2.

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
