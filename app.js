import express from 'express';

const app = express();

app.use(express.json());


app.use(globalErroreHandler);


export default app;
