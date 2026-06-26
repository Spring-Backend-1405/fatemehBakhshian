import 'dotenv/config';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config('./.env');

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running, swagger local address is: http://localhost:${port}/api-docs `);
});
