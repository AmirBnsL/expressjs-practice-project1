import express from 'express';
import taskRouter from './routers/tasks';
const app = express();
const port = 3000;

app.use(express.json());
app.use('/tasks',taskRouter);

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});


app.get('/', (req, res,next) => {
    console.log('GET request');
    res.send('GET request');
    next();
});

app.get('/', (req, res) => {
    console.log('this bubbled back here');
    res.status(200);
});
app.post('/tasks', (req, res) => {
    
});
