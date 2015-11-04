import Backbone from 'backbone';
import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import Cookies from 'js-cookie';

import TestComponent from './components/test_component';
import AddFormComponent from './components/add_question';


let Router = Backbone.Router.extend({

  routes: {

    '' : 'redirect',
    'login' : 'testlogin',
    'addquestion' : 'showAddQuestion'

  },

  start() {

    Backbone.history.start();

  },

  goto (route) {

    this.navigate ( route ,{trigger: true});

  },


  redirect () {

    this.goto('addquestion' , {trigger : true , replace : true});

  },

  // home () {

  //   ReactDom.render(

  //     <TestComponent/>,
  //     document.querySelector('.app')

  //   );

  // },


  testlogin () {

    // let request = $.ajax({

    //   url: 'https://api.parse.com/1/classes/users',
    //   headers: {
    //     'X-Parse-Application-Id': 'P8SM9vYMpCsowtQFtf1DvWMgqxiMUHQIHOsaJ1le',
    //     'X-Parse-REST-API-Key': 'yg1w6pGNA5cCJAb1DW1bHQRlUWB5Nr1oPf7bPdrq'
    //   },
    //   method: 'GET'
    // });


    // request.then((data) => {
    //   console.log('data:', data);

    //   Cookies.set('users', data);

    //   console.log(Cookies.getJSON());

    // });

    
    const DUMMY_DATA = [
      {
        objectId: '1',
        name: 'Boyzie',
        password: 'mathis'
      },{
        objectId: '2',
        name: 'Shals',
        password: 'paddy'
      },{
        objectId: '3',
        name: 'Andrew',
        password: 'faircloth'
      }
    ]; 


    ReactDom.render (
      <TestComponent
        users = {DUMMY_DATA}/>,
      document.querySelector('.app')
    );
  
  },

  showAddQuestion () {

    ReactDom.render (
      <AddFormComponent/>,
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