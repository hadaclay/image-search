const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const url = process.env.MONGOLAB_URI;

function latestSearches(request, response) {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    
    const searches = db.collection('searches');
    searches.find({}, {_id: 0}).limit(10).toArray((err, docs) => {
        if (err) throw err;
        response.json(docs.reverse());
    });
    
    db.close();
  });
}

module.exports = latestSearches;