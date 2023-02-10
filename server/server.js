import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connect from './database/mongodb.js';
import TransactionsAPI from './routes/TransactionsAPI.js';
import AuthAPI from './routes/AuthApi.js'
import passport from 'passport';
import passportConfig from './config/passport.js';

const PORT = 4000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passportConfig(passport);


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/transaction', TransactionsAPI);
app.use('/auth', AuthAPI);

await connect();

app.listen(PORT, () => {
    console.log('Server is running at http://localhost:4000');
});