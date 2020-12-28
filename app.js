const express = require('express');
const app = express();
const path = require('path'); 
const request = require('request');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/results', (req,res)=> {

	let query = req.query.search;

	request('https://api.themoviedb.org/3/search/movie?api_key=604e8e5325eb55b0fceeff3c637e0a7f&query='+query, (error, response, body) => {
		if(error) {
            console.log(error);
        }

        let data = JSON.parse(body);
        res.render('movies', {data:data, searchQuery:query});

    });


	
});	

app.get('/', (req, res) => {
	res.render('search');
})
app.get('/search', (req,res) => {
	res.render('search');
});

app.listen(3000, ()=>{
	console.log('Search started at port 3000');
});