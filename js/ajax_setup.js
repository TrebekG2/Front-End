import $ from 'jquery';

const APP_ID  = 'P8SM9vYMpCsowtQFtf1DvWMgqxiMUHQIHOsaJ1le';
const API_KEY = 'yg1w6pGNA5cCJAb1DW1bHQRlUWB5Nr1oPf7bPdrq';

$.ajaxSetup({

  headers: {
    'X-Parse-Application-Id' : APP_ID,
    'X-Parse-REST-API-Key'   : API_KEY,
  }

});