import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// since es modules we need to create filename and dirname manually

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3500;

// Middleware to parse JSON
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/public')));

// Basic route to test the server
app.get('/', (_req, res) => {
  res.send('Backend is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
