import Backbone from 'backbone';
import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import Cookies from 'js-cookie';

import TestComponent from './components/test_component';
import AddFormComponent from './components/add_question';
import SignupPage from './components/signup_component';

import UserModel from './resources/user_model';
import UserCollection from './resources/user_collection';

import QuestionModel from './resources/question_model';
import QuestionCollection from './resources/question_collection';


let Router = Backbone.Router.extend({

  routes: {

    '' : 'redirect',
    'login' : 'testlogin',
    'signup':'signup',
    'addquestion' : 'showAddQuestion'

  },

  start() {
    Backbone.history.start();
  },

  goto (route) {
    this.navigate ( route ,{trigger: true});
  },

  redirect () {

    this.goto('signup' , {trigger : true , replace : true});

  },

  // home () {

  //   ReactDom.render(

  //     <TestComponent/>,
  //     document.querySelector('.app')

  //   );

  // },


  signup () {
    ReactDom.render(
      <SignupPage 
        onCancelClick={ () =>this.goto('')}
        onSubmitClick={ () =>{
          let newUserName = document.querySelector('.newUserName').value;
          let newUserID   = document.querySelector('.newUserID').value;
          let newPass     = document.querySelector('.passcode').value;
          let newEmail    = document.querySelector('.emailAdd').value;
        
          let request = $.ajax({
            url :'https://nameless-plains-2123.herokuapp.com/signup',
            method:'POST',
             
            data:{
              name     :newUserName,
              password :newPass,
              username :newUserID,
              email    :newEmail
            }
          });

          request.then((data) => {
            Cookies.set('users', data);
            console.log(Cookies.getJSON('users'));
            alert(' NEW USER ADDED IN RAILS SUCCESSFULLY');
            this.goto('');
          });

        }}/>, document.querySelector('.app')
    );
  },

  testlogin () {

  
    // let request = $.ajax({

    //   url: 'http://localhost:3000/signup',
    //   method: 'POST',
    //     user: {
    //       username: {data.username},
    //       password: {data.password},
    //       name: '',
    //       email: ''
    //     }

    //  });

    // request.then((data) => {
    //     console.log('data:', data);

    //     Cookies.set('users', data);

    //     console.log(Cookies.getJSON('users'));
    // });


    this.userCollection = new UserCollection();

    this.userCollection.fetch().then( () => {

      ReactDom.render (
      <TestComponent
        users = {this.userCollection.toJSON()}/>,
      document.querySelector('.app')
      );

    });


    

    
    // const DUMMY_DATA = [
    //   {
    //     objectId: '1',
    //     name: 'Boyzie',
    //     password: 'mathis'
    //   },{
    //     objectId: '2',
    //     name: 'Shals',
    //     password: 'paddy'
    //   },{
    //     objectId: '3',
    //     name: 'Andrew',
    //     password: 'faircloth'
    //   }
    // ];     
  
  },

  showAddQuestion () {

    ReactDom.render (
      <AddFormComponent
      onSubmitQuestion = {(question, answer, category) => {
        let newQuestion = new QuestionModel({
          question: question,
          answer: answer,
          category: category
        });
        
        newQuestion.save().then(()=> {
          console.log('new question has been added');
          alert('thank you. your question has been added');
          this.goto('addquestion');
        });
      }}/>,
      document.querySelector('.app')
    );


  },


  // We will get back token and add to headers

  // signup () {

  //   let request = $.ajax({

  //     url: 'http://localhost:3000/signup',
  //     method: 'POST',
//       {
//         username: {data.username},
//         password: {data.password},
//         name: '',
//         email: ''
//       }

  //   });


          // WILL NEED TO ADD HEADERS HERE WITH AJAX SETUP
          // headers: {Access-Token: {} }

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