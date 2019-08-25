
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials')


app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then((beers) => { 
      res.render('beers', {beers})
    }) 
    .catch(error => {
      console.log(error)
    })
  });
  
  app.get('/random', (req, res, next) => {
    punkAPI.getRandom()
    .then((random) => { 
      console.log(random.name)
      res.render('random', {random})
    })
    .catch(error => {
      console.log(error)
    })
});

app.listen(3000);
