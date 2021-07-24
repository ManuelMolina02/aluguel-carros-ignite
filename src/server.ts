import express from 'express';

const app = express();

app.get('/', (request, response) => {
    return response.json({ message: 'e ai do back end' });
});

app.listen(3333, () => console.log('Server is running!'));
