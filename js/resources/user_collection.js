import Backbone from 'backbone';
import UserModel from './user_model';

let UserCollection = Backbone.Collection.extend({

  url: 'https://api.parse.com/1/classes/users',
  model: UserModel,
  parse: function(data) {
    return data.results;
  }

});

export default UserCollection;