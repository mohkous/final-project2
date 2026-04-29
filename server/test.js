const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.get('/ping', (req, res) => res.send('pong'));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Simple server listening on port ${PORT}`);
});
