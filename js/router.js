// --- LIBRARIES AND PROGRAMS ---
import Backbone from 'backbone';
import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import Cookies from 'js-cookie';


// --- REACT COMPONENTS ---
import TestComponent from './components/test_component';
import AddFormComponent from './components/add_question';
import SignupPage from './components/signup_component';
import SigninPage from './components/signIn_component';
import UserLandingComponent from './components/user_landing';
import CreateDeckComponent from './components/create_deck';
import HomePage from './components/home_component';
import ViewDeckComponent from './components/view_deck';
import EditCardForm from './components/edit_card';


// --- UN-NEEDED BACKBONE COMPONENTS ---
import UserModel from './resources/user_model';
import UserCollection from './resources/user_collection';
import QuestionModel from './resources/question_model';
import QuestionCollection from './resources/question_collection';



// --- ROUTER BACKBONE CONSTRUCTOR ---

let Router = Backbone.Router.extend({

  routes: {

    ''                 : 'home',
    'signup'           : 'signup',
    'nonExistant'      : 'redirect',
    'addquestion/:id'  : 'showAddQuestion',
    // 'userLanding'      : 'showUserLanding',
    'user/:name'       : 'showSpecificUser',
    'editcard/:id'     : 'showEditCard',
    'viewdeck/:id'     : 'showViewDeck',
    'signin'           : 'signin',
    'logout'           : 'logout'

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
        onSubmitClick={ () => {
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
                username     : data.username,
                id           : data.id
                // add other data
              }
            });

            let userObject = Cookies.getJSON('users');
            //console.log(userObject)

            this.goto(`user/${userObject.name}`);
            // this.goto(`user/${data.username}`)

          }).fail(() => {
            alert('INVALID INFORMATION..TRY AGAIN');
          });

        }}/>, document.querySelector('.app')
    );
  },

  signin () {
    ReactDom.render(
      <SigninPage 
        onClickRegister={() =>this.goto('signup')}
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
                access_token : data.access_token,
                username     : data.username,
                id           : data.id
              }
            });

            let userObject = Cookies.getJSON('users');
            this.goto(`user/${userObject.name}`);
            
          }).fail( () => {
              alert('INCORRECT USER NAME OR PASSWORD..TRY AGAIN');
              document.querySelector('.UserID').value = '';
              document.querySelector('.password').value='';
            });
        }
    }/>, document.querySelector('.app')

    );
  },
 logout(){
  //let userObject = Cookies.getJSON('users')
  Cookies.remove('users')
  $.ajaxSetup ({
      headers: {
        access_token: null
      }
   });
  this.goto('')
 },

// //USED ???
//   showUserLanding () {

//     let request = $.ajax({
//       url :'https://nameless-plains-2123.herokuapp.com/deck',
//       method:'GET'
//     });

//     request.then((data) => {
//       Cookies.set('decks', data);
//       // console.log(Cookies.getJSON('decks'));
//       // this.goto('userLanding');
//       $.ajaxSetup ({
//         headers: {
//           access_token: data.access_token
//         }
//       });
//     });

//     ReactDom.render (
//       <div>
//         <UserLandingComponent
//           decks = {Cookies.getJSON('decks')}
//           onViewClick = {(id) => this.goto(`viewdeck/${id}`)}/>
//         <CreateDeckComponent
//           onSubmitNewDeck = {() => {
//             let newDeckTitle = document.querySelector('.new-deck-title-input').value;
//             alert('A new deck has been created');
       
//             let request = $.ajax({
//               url :'https://nameless-plains-2123.herokuapp.com/deck/create',
//               method:'POST',
//               data: {
//                 title     : newDeckTitle
//               }
//             });
//             request.then((data) => {
//               Cookies.set('return', data);
//               console.log(Cookies.getJSON('return'));
//               // alert(' NEW DECK HAS BEEN CREATED AND GIVEN A TITLE');
//               this.goto('userLanding');


//               $.ajaxSetup ({
//                 headers: {
//                   access_token: data.access_token
//                 }
//               });

//             });          

//         }}/>
//       </div>, document.querySelector('.app')
//     ); 

//   },


  showSpecificUser (name) {

    // need to pass id or name to this function
    // request decks by user id

    let baseUrl = 'https://nameless-plains-2123.herokuapp.com/deck/';
    // let thisId = `${id}`;
    //let userObject = Cookies.getJSON('users');
 


    let request = $.ajax({
      url :`${baseUrl}`,
      method:'GET'
    });

    request.then((data) => {
      Cookies.set('decks', data);
      console.log(Cookies.getJSON('decks'));


      $.ajaxSetup ({
        headers: {
          access_token: data.access_token
        }
      });
    });

    let userObject = Cookies.getJSON('users');

    ReactDom.render (
      <div>
        <UserLandingComponent
          onLogoutClick={()=> this.goto('logout')}
          users ={Cookies.getJSON('users')}
          decks= {Cookies.getJSON('decks')}
          onViewClick = {(id) => this.goto(`viewdeck/${id}`)}
          onDeleteClick = {(id) => {
            let userObject = Cookies.getJSON('users');
            let baseUrl = 'https://nameless-plains-2123.herokuapp.com/deck/';
            let action = 'destroy';
            let thisId = `${id}`;

            console.log(`${thisId}`);

            let request = $.ajax({
              url: `${baseUrl}${action}`,
              method: 'DELETE',
              data:{
                deck_id: `${thisId}`
              }
              });
            
            request.then((data) => {
              Cookies.set('delete', data);
              console.log(Cookies.getJSON(data));
              window.location.reload();
              this.goto(`user/${userObject.name}`);

              $.ajaxSetup ({
                headers: {
                  access_token: data.access_token
                }
              });
            });
          }}/>
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
              Cookies.set('decks', data);
              console.log(Cookies.getJSON('decks'));
              // alert(' NEW DECK HAS BEEN CREATED AND GIVEN A TITLE');
              let decksObject = Cookies.getJSON('decks');
              this.goto(`viewdeck/${decksObject.id}`);

              $.ajaxSetup ({
                headers: {
                  access_token: data.access_token
                }
              });

            });          

        }}/>
      </div>, document.querySelector('.app')
    ); 

  },

  showViewDeck (id) {

    let baseUrl = 'https://nameless-plains-2123.herokuapp.com/deck/';
    let thisId = `${id}`;
    let endofurl = '/cards';

    // console.log(`${baseUrl}${id}/cards`);

    let request = $.ajax({
      url: `${baseUrl}${thisId}/cards`,
      method:'GET',
    });


    request.then((data) => {
      Cookies.set('cards', data);

      console.log(Cookies.getJSON('cards'));

      $.ajaxSetup ({
        headers: {
          access_token: data.access_token
        }
      });
    });

    let newCard = `addquestion/${id}`;
    let userObject = Cookies.getJSON('users');

    let cardObject = Cookies.getJSON('cards');
    let editCard = `editcard/${id}`;
  

    ReactDom.render(
      <ViewDeckComponent
        cards = {Cookies.getJSON('cards')}
        onBackClick ={()=>{this.goto(`user/${userObject.name}`)}}
        onCardClick = {(id) => {
          
          let baseUrl = 'https://nameless-plains-2123.herokuapp.com/card/';
          let thisId = `${id}`;
          let endofurl = '/edit';

          let request = $.ajax({
            url: `${baseUrl}${id}/edit`,
            method: 'GET'
          });

          request.then((data) => {
            Cookies.set('card', data);
            console.log(Cookies.getJSON('card'));
          }); 

          this.goto(`editcard/${id}`);

        }}
        onAddClick = {(id) => {this.goto(newCard)}}/>,
      document.querySelector('.app')
    );


  },

  showEditCard (id) {

    let baseUrl = 'https://nameless-plains-2123.herokuapp.com/card/';
    let thisId = `${id}`;
    let endofurl = '/edit';

    let request = $.ajax({
      url: `${baseUrl}${id}/edit`,
      method: 'GET'
    });

    request.then((data) => {
      Cookies.set('card', data);
      console.log(Cookies.getJSON('card'));
    });


    let cardObject = Cookies.getJSON('card');
    console.log(cardObject);

    ReactDom.render (

      <EditCardForm
      cardData = {Cookies.getJSON('card')}
      onBackClick = {() => this.goto(`viewdeck/${cardObject.deck_id}`)}
      onSubmitClick = {(question, answer, category) => {
        
        let baseUrl = 'https://nameless-plains-2123.herokuapp.com/card/';
        let thisId = `${id}`;
        let endofurl = '/edit';

        let request = $.ajax({
          url :`${baseUrl}${thisId}/${endofurl}`,
          method:'POST',
          data: {
            question   : question,
            answer     : answer,
            category   : category}
          });

        request.then((data) => {
            Cookies.set('newcard', data);
            console.log(Cookies.getJSON('newcard'));
          }); 

        }}/>,
      document.querySelector('.app')
    );


  },


  showAddQuestion (id) {

    ReactDom.render (
      <AddFormComponent
      onBackClick = {() => this.goto(`viewdeck/${id}`)}
      onSubmitQuestion = {(question, answer, category) => {
        
        let newQuestion = document.querySelector('.question-input').value;
        let newAnswer = document.querySelector('.answer-input').value;
        let newCategory = document.querySelector('.category-input').value;

        let baseUrl = 'https://nameless-plains-2123.herokuapp.com/deck/';
        let thisId = `${id}`;
        let endofurl = '/cards';

        // console.log(`${baseUrl}${id}/cards`);

        let request = $.ajax({
          url: `${baseUrl}${id}/cards`,
          method:'POST',
          data: {
            question   : newQuestion,
            answer     : newAnswer,
            category   : newCategory}
        });

        request.then((data) => {
          Cookies.set('newcard', data);
          console.log(Cookies.getJSON('newcard'));
          this.goto(`viewdeck/${id}`);

          $.ajaxSetup({
            headers: {
              access_token: data.access_token
            }
          });

        });

      }}/>,
      document.querySelector('.app')
    );


  },


});

export default Router;