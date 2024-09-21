const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const secretKey = 'your-secret-key';

app.use(express.json());
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = authenticateUser(email, password);
    if (user) {
        const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

function authenticateUser(email, password) {
    const mockUser = { id: 1, email: 'test@example.com', password: 'password' };
    if (email === mockUser.email && password === mockUser.password) {
        return mockUser;
    }
    return null;
}

app.listen(5000, () => {
    console.log('Server running on port 5000');
})