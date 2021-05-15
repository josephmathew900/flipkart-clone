const env = require('dotenv');
const express = require('express');

env.config();

const app = express();
app.use(express.json());

app.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Hello from server' });
});

app.post('/data', (req, res, next) => {
  res.status(200).json({
    message: req.body.data,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
