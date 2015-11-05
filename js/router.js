import Backbone from 'backbone';
import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import Cookies from 'js-cookie';

import TestComponent from './components/test_component';
import SignupPage from './components/signup_component';


let Router = Backbone.Router.extend({

  routes: {

    ''      :'redirect',
    'signup':'signup',
    'login' : 'testlogin'

  },

  start() {
    Backbone.history.start();
  },

  goto (route) {
    this.navigate ( route ,{trigger: true});
  },

  redirect () {
    this.goto('login' , {trigger : true , replace : true});
  },

  home () {
    ReactDom.render(
      <TestComponent/>,
      document.querySelector('.app')
    );
  },

  signup () {
    ReactDom.render(
      <SignupPage 
        onCancelClick={ () =>this.goto('')}
        onSubmitClick={ () =>{
          let newUserName = document.querySelector('.newUserName').value;
          let newUserID   = document.querySelector('.newUserID').value;
          let newPass     = document.querySelector('.passcode').value;
          let newEmail    = document.querySelector('.emailAdd').value;
          console.log(newUserName);
          console.log(newUserID); 
          console.log(newPass);
          console.log(newEmail);
        }
        }/>, document.querySelector('.app')
    );
  },

  testlogin () {

    let request = $.ajax({

      url: 'https://api.parse.com/1/classes/users',
      headers: {
        'X-Parse-Application-Id': 'P8SM9vYMpCsowtQFtf1DvWMgqxiMUHQIHOsaJ1le',
        'X-Parse-REST-API-Key': 'yg1w6pGNA5cCJAb1DW1bHQRlUWB5Nr1oPf7bPdrq'
      },
      method: 'GET'
    });


    request.then((data) => {
      // console.log('data:', data);

      Cookies.set('users', data);

      console.log(Cookies.getJSON());

    });


    ReactDom.render (
      <TestComponent
        users = {Cookies.getJSON()}/>,
      document.querySelector('.app')
    );
  
  },




  // We will get back token and add to headers

  // signup () {

  //   let request = $.ajax({

  //     url: 'http://localhost:3000/signup',
  //     method: 'POST',
  //     data: {
  //       user: {
  //         username: {data.username},
  //         password: {data.password},
  //         name: '',
  //         email: ''
  //       }
  //     }

  //   });

  // },

  // login () {

  //   let request = $.ajax({

  //     url: 'http://localhost:3000/login',
  //     method: 'POST',
  //     data: {
  //       user: {
  //         username: {data.username},
  //         password: {data.password},
  //       }
  //     }

  //   });

  // }


});

export default Router;