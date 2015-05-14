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
    error: function(user, error) {
      throw 'Got an error ' + error.code + ' : ' + error.message;
    }
  })
});

AV.Cloud.afterSave('_Follower', function(request) {
  user = request.user
  user.increment('followerCount');
  user.save(null, {
    success: function(user) {
      console.log('Increment of follower for :' + user.username);
    },
    error: function(user, error) {
      throw 'Got an error ' + error.code + ' : ' + error.message;
    }
  })
});
