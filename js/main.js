import $ from 'jquery';
import _ from 'underscore';
import moment from 'moment';
import Router from './router';



console.log('Hello, World');


let appElement = document.querySelector('.app');

let router = new Router(appElement);

router.start();