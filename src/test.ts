// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import {  } from 'zone.js/dist/long-stack-trace-zone';
import {  } from 'zone.js/dist/proxy.js';
import {  } from 'zone.js/dist/sync-test';
import {  } from 'zone.js/dist/jasmine-patch';
import {  } from 'zone.js/dist/async-test';
import {  } from 'zone.js/dist/fake-async-test';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
declare const _karma_ : any;
declare const require: any;

//Prevent Karma from running prematurely
_karma_.loaded=function(){}

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);

_karma_.start();
