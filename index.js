const express = require('express'),
			app = express(),
			pg = require('pg');

app.set('port', (process.env.PORT || 5000));

app.get('/', (req, res) => {
	res.end('Hello, Heroku!');
});

app.get('/secondary', (req, res) => {
	res.end('And here\'s a secondary route.');
});


app.get('/db', (req, res) => {
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('SELECT * FROM test_table', function(err, result) {
			done();
			if (err) {
				throw err;
			}

			res.end(JSON.stringify(result.rows));
		});
	});
});

app.listen(app.get('port'), () => {
	console.log('Node app is running on port', app.get('port'));
});


