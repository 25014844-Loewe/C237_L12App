const express = require('express');
const app = express();

app.set('view engine', 'ejs');

// This line allows Express to read the data sent from your form
app.use(express.urlencoded({ extended: true }));

// Simple list to store our sessions (restarts when the server restarts)
let sessions = [
    { position: 'GS', goals: 8, total: 10 },
    { position: 'GA', goals: 5, total: 9 }
];

// 1. Home Page - Shows the list of past sessions
app.get('/', (req, res) => {
    res.render('index', { sessions: sessions });
});

// 2. Add Page - Shows the simple form
app.get('/add', (req, res) => {
    res.render('add');
});

// 3. Handle Form Submission
app.post('/add', (req, res) => {
    // Grab data from the form
    const newSession = {
        position: req.body.position,
        goals: req.body.goals,
        total: req.body.total,
        feedback: req.body.feedback
    };

    // Add it to the top of our list
    sessions.unshift(newSession);

    // Go back to the home page to see it
    res.redirect('/');
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});