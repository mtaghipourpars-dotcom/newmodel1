import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 3000);

// Serve static assets from demo/ at root and at /demo
app.use('/demo', express.static(path.join(__dirname, 'demo')));
app.use('/data', express.static(path.join(__dirname, 'data')));
app.use('/docs', express.static(path.join(__dirname, 'docs')));
app.use(express.static(path.join(__dirname, 'demo')));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', app: 'PVPT Executive Demo', mode: 'DEMO_SYNTHETIC' });
});

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'demo', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`PVPT server running on http://0.0.0.0:${PORT}`);
});
