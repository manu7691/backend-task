const express = require('express');
const request = require('request-promise-native');
const app = express();

function getRequest(location, page){
    // Headers required by Github API
    const options = {headers: {'User-Agent': 'request'}};
    // Url to make request on Github API
    let urlGitHub = `https://api.github.com/search/users?q=location:${encodeURI(location)}&sort=repositories&page=${page}&per_page=100`;
    return request.get(urlGitHub, options);
}

app.get('/top-contributors/:location', function (req, res) {
    const query = req.query;
    const location = req.params.location;
    // TOP
    let top = ('top' in query) ? query.top : null;
    top = (top == 100 || top == 150) ? req.query.top : 50; // Top 50 by default
    const page = 1;
    let finalRequest = [getRequest(location, page)];
    if(top == 150){
        finalRequest.push(getRequest(location, page * 2));
    }
    Promise.all(finalRequest)
    .then(response => {
        let usersList = [];
        for(let page of response){
            let users = (JSON.parse(page)).items;
            users.map(user => usersList.push(user.login));
        }
        if(top != 100){
            usersList = usersList.slice(0, top);
        }
        res.send(usersList);
    }).catch(err => res.send(err));
});

app.get('*', function (req, res) {
    res.send('Server - ExpressJS')
});

app.listen(3000, function () {
    console.log('Backend Server listening on port 3000!')
});

module.exports = app; // For testing purposes