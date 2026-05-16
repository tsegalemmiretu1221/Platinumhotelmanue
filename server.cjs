const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

const DATA_PATH = path.join(__dirname, 'menuData.json');

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'dist', 'images');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Image upload endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    console.log('Image uploaded:', req.file.filename);
    res.json({ url: `images/${req.file.filename}` });
  } else {
    res.status(400).json({ error: 'No image provided' });
  }
});


// Serve static files from the Vite build
const DIST_PATH = path.join(__dirname, 'dist');
if (fs.existsSync(DIST_PATH)) {
  app.use(express.static(DIST_PATH));
  console.log('Serving static files from /dist');
}

// Get menu data
app.get('/api/menu', (req, res) => {
  try {
    if (!fs.existsSync(DATA_PATH)) {
      return res.status(404).json({ error: 'Data file not found' });
    }
    const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read menu data' });
  }
});

// Save menu data and broadcast
app.post('/api/menu', (req, res) => {
  try {
    const data = req.body;
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
    io.emit('menu-updated', data);
    console.log('Menu updated and broadcasted');
    res.json({ success: true });
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({ error: 'Failed to save menu data' });
  }
});

// Fallback for React routing (SPA)
app.use((req, res) => {
  const indexPath = path.join(DIST_PATH, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Frontend not built. Run "npm run build" first.');
  }
});


io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => console.log('Client disconnected'));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

