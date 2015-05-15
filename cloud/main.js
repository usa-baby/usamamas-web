require("cloud/app.js");
// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

AV.Cloud.afterSave('_Followee', function(request) {
  user = request.user
  user.increment('followeeCount');
  user.save(null, {
    success: function(user) {
//      console.log('Increment of followee for :' + user);
    },
    error: function(error) {
      throw 'Got an error ' + error.code + ' : ' + error.message;
    }
  })
});

AV.Cloud.afterSave('_Follower', function(request) {
  userId = request.object.get('user').id
  var query = new AV.Query(AV.User);
  query.get(userId, {
    success: function(user) {
      user.increment('followerCount');
      user.save();
//      console.log('Increment of follower for :' + user);
    },
    error: function(error) {
      throw 'Got an error ' + error.code + ' : ' + error.message;
    }
  })
});

AV.Cloud.afterDelete('_Followee', function(request) {
  user = request.user
  user.increment('followeeCount', -1);
  user.save(null, {
    success: function(user) {
//      console.log('decrement of followee for :' + user);
    },
    error: function(error) {
      throw 'Got an error ' + error.code + ' : ' + error.message;
    }
  })
});

AV.Cloud.afterDelete('_Follower', function(request) {
  userId = request.object.get('user').id
  var query = new AV.Query(AV.User);
  query.get(userId, {
    success: function(user) {
      user.increment('followerCount', -1);
      user.save();
//      console.log('decrement of follower for :' + user);
    },
    error: function(error) {
      throw 'Got an error ' + error.code + ' : ' + error.message;
    }
  })
});