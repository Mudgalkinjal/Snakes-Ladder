const authenticateToken = require('./middleware/auth');

app.get('/api/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route' });
});
