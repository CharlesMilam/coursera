Websites = new Mongo.Collection("websites");

// basic security for websites collection
Websites.allow({
  insert: function(userId, doc) {
    if (Meteor.user()) {
      if (userId != doc.createdById) {
        return false;
      }
      else {
        return true;
      }
    }
    else {
      return false;
    }
  },
  update: function(userId, doc) {
    if (Meteor.user()) {
      return true
    }
    else {
      return false;
    }
  }
}); // end collections security

// index for use by easy search
WebsitesIndex = new EasySearch.Index({
  collection: Websites,
  fields: ['createdByName', 'title', 'description'],
  engine: new EasySearch.Minimongo({
    sort: function()
      {
        return {'upVote': -1, 'title': 1 };
      }
  })
});
