import Backbone from 'backbone';
import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import Cookies from 'js-cookie';


import TestComponent from './components/test_component';
import AddFormComponent from './components/add_question';
import SignupPage from './components/signup_component';

import SigninPage from './components/signIn_component';

import UserLandingComponent from './components/user_landing';
import CreateDeckComponent from './components/create_deck';
import HomePage from './components/home_component';
import Landing from './components/landing_component';
// import EditDeckForm from './components/edit_deck';

import UserModel from './resources/user_model';
import UserCollection from './resources/user_collection';

import QuestionModel from './resources/question_model';
import QuestionCollection from './resources/question_collection';


let Router = Backbone.Router.extend({

  routes: {

    ''             : 'home',
    'login'        : 'testlogin',
    'signup'       : 'signup',
    'landing'      : 'landing',
    'nonExistant'  :'redirect',
    'addquestion'  : 'showAddQuestion',
    'userLanding'  : 'showUserLanding',
    'editdeck/:id' : 'showEditDeck',
    'viewdeck/:id' : 'showViewDeck',
    'signin'       : 'signin',

  },

  start() {
    Backbone.history.start();
  },

  goto (route) {
    this.navigate ( route ,{trigger: true});
  },

  redirect () {

    this.goto('userLanding' , {trigger : true , replace : true});

  },

   home () {
    ReactDom.render(
      <HomePage
      onSigninClick={()=>this.goto('signin')}
      onRegisterClick={()=>this.goto('signup')}/>,
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

            $.ajaxSetup ({
              headers: {
                access_token : data.access_token,
                name         : data.name,
                username     : data.username
                // add other data
              }
            });

            this.goto('userLanding');
            // this.goto(`user/${data.username}`)

          }).fail(() => {
            $('.app').html('USER ID TAKEN. PLEASE TRY A DIFFERENT USER NAME');
          });

        }}/>, document.querySelector('.app')
    );
  },

  signin () {
    ReactDom.render(
      <SigninPage 
        onCancelClick={ () =>this.goto('')}
        onClickSignin={ () =>{
          let newUserName = document.querySelector('.UserID').value;
          let newPass     = document.querySelector('.password').value;

          let request = $.ajax({
            url :'https://nameless-plains-2123.herokuapp.com/login',
            method:'POST',
            data:{
              username     :newUserName,
              password     :newPass
            }
          });
          
          request.then((data) => {
            Cookies.set('users', data);
            console.log(Cookies.getJSON('users'));

            $.ajaxSetup({
              headers:{
                access_token: data.access_token,
                username: data.username
              }
            });
            //console.log(access_token);
            this.goto('userLanding');
          }).fail( () => {
              alert('INCORRECT USER NAME OR PASSWORD..TRY AGAIN');
              document.querySelector('.UserID').value = '';
              document.querySelector('.password').value='';
            });
        }
    }/>, document.querySelector('.app')
    );
  },

  showUserLanding () {

    const DUMMY_DECKS = [
      {
        deckId: '1',
        title: 'Sports Deck',
        topic: 'sports stuff'
      },{
        deckId: '2',
        title: 'Movies Deck',
        topic: 'movies stuff'
      },{
        deckId: '3',
        title: 'Games Deck',
        topic: 'games stuff'
      }
    ];

    console.log(DUMMY_DECKS);


    // let request = $.ajax({
    //   url :'https://nameless-plains-2123.herokuapp.com/decks',
    //   method:'GET'
    // });

    // request.then((data) => {
    //   Cookies.set('decks', data);
    //   console.log(Cookies.getJSON('decks'));
    //   this.goto('');
    // });


    // $.ajaxSetup ({
    //   headers: {
    //     access_token: data.access_token
    //   }
    // });

    // --- REPLACE DUMMY DATA WITH THIS ---
    // decks = {Cookies.getJSON('decks')}
    // --- REPLACE DUMMY DATA WITH THIS ---

    ReactDom.render (
      <div>
        <UserLandingComponent
          decks = {DUMMY_DECKS}
          onViewClick = {(id) => this.goto(`viewdeck/${id}`)}/>
        <CreateDeckComponent
          onSubmitNewDeck = {() => {
            let newDeckTitle = document.querySelector('.new-deck-title-input').value;
            alert('A new deck has been created');
       
            let request = $.ajax({
              url :'https://nameless-plains-2123.herokuapp.com/deck/create',
              method:'POST',
              data: {
                title     : newDeckTitle
              }
            });

            request.then((data) => {
              Cookies.set('return', data);
              // console.log(Cookies.getJSON('return'));
              // alert(' NEW DECK HAS BEEN CREATED AND GIVEN A TITLE');
              this.goto('');

            });


            $.ajaxSetup ({
              headers: {
                access_token: data.access_token
              }
            });

        }}/>
      </div>, document.querySelector('.app')
    ); 

  },

  showViewDeck (id) {

    // ReactDom.render(
    //   <ViewDeckComponent
    //     deck = {Cookies.getJSON('return'}
    //     onEditClick = {() => {this.goto(`editdeck/${id}`}/>,
    //   document.querySelector('.app')
    // );

  },

  showEditDeck (id) {

    // let editDeck = 


    // let request = $.ajax({

    //   url :'https://nameless-plains-2123.herokuapp.com/question',
    //   method:'POST',
    //   data: {
    //     question   : newQuestion.question,
    //     answer     : newQuestion.answer,
    //     category   : newQuestion.category}
    // });


    // ReactDom.render (

    //   <EditDeckForm/>,
    //   document.querySelector('.app')
    // );


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

        // let request = $.ajax({
        //   url :'https://nameless-plains-2123.herokuapp.com/question',
        //   method:'POST',
        //   data: {
        //     question   : newQuestion.question,
        //     answer     : newQuestion.answer,
        //     category   : newQuestion.category}
        // });

        // request.then((data) => {
        //   Cookies.set('return', data);
        //   console.log(Cookies.getJSON('return'));
        //   alert(' NEW USER ADDED IN RAILS SUCCESSFULLY');
        //   this.goto('');
        // });

      }}/>,
      document.querySelector('.app')
    );


  },

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