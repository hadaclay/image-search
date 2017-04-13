const mongodb = require('mongodb');
const GoogleImages = require('google-images');

const MongoClient = mongodb.MongoClient;
const client = new GoogleImages(process.env.CSE_ID, process.env.GOOGLE_API_KEY);

const url = process.env.MONGOLAB_URI;

function imageSearch(request, response) {
  const searchString = request.params.search;
  const offset = +request.query.offset || 1;
  
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    
    const searches = db.collection('searches');
    searches.insert({"term": searchString,
                     "when": new Date(Date.now()).toISOString()
    });
    db.close();
  });
  
  client.search(searchString, {page: offset})
    .then(images => {
      const imageJSON = images.map(image => {
        return {"url": image.url, "snippet": image.description,
                "thumbnail": image.thumbnail.url};
      });
      response.json(imageJSON);
    });
}

module.exports = imageSearch;