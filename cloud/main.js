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
      console.log('Increment of followee for :' + user.username);
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
      console.log('Increment of follower for :' + user.username);
    },
    error: function(error) {
      throw 'Got an error ' + error.code + ' : ' + error.message;
    }
  })
});

AV.Cloud.afterDelete('_Followee', function(request) {
  user = request.user
  user.decrement('followeeCount');
  user.save(null, {
    success: function(user) {
      console.log('Increment of followee for :' + user.username);
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
      user.decrement('followerCount');
      user.save();
      console.log('Increment of follower for :' + user.username);
    },
    error: function(error) {
      throw 'Got an error ' + error.code + ' : ' + error.message;
    }
  })
});