/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: David Andres Sanchez Umbarila Student ID: 140273228 Date: 12/02/2024
*
********************************************************************************/


const { log } = require("console");
const legoData = require("./modules/legoSets");

legoData.initialize();

const express = require('express'); // "require" the Express module
const path = require('path');
const app = express(); // obtain the "app" object
const HTTP_PORT = process.env.PORT || 8080; // assign a port

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/home.html'));
  });

  app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/about.html'));
  });

app.get('/lego/sets', (req, res) => {
    console.log(req.query.theme);
    if (req.query.theme){
      legoData.getSetsByTheme(req.query.theme)
      .then(themeSets => {
        res.send(themeSets);
      })
      .catch(error => {
          console.error(error);
          res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
      });
    }
    else {
      legoData.getAllSets()
      .then(sets => {
          res.send(sets);
      })
      .catch(error => {
          console.error(error);
          res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
      });
    }
  });

app.get('/lego/sets/:set_num', (req, res) => {
    legoData.getSetByNum(req.params.set_num)
    .then(set => {
      res.send(set);
    })
    .catch(error => {
        console.error(error);
        res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
    });
  });

  app.all('*', (req, res) => { 
    res.status(404).sendFile(path.join(__dirname, '/views/404.html')); 
  }); 

  app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}`));

