import $ from 'jquery';
import _ from 'underscore';
import moment from 'moment';
import Router from './router';

import './ajax_setup';

let appElement = document.querySelector('.app');

let router = new Router(appElement);

router.start();