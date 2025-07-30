const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Configure CORS for Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(cors({
  origin: "http://localhost:4200",
  credentials: true
}));

app.use(express.json());

// Trading data
const isins = [
  'XS123456', 'XS224567', 'XS345678', 'XS456789',
  'XS567890', 'XS678901', 'XS789012'
];

// Price generation function
function generatePriceUpdate(isin) {
  const basePrice = 95 + Math.random() * 10; // Base price between 95-105
  const spread = 0.1 + Math.random() * 0.5; // Spread between 0.1-0.6

  return {
    isin: isin,
    bidPrice: Number((basePrice - spread / 2).toFixed(2)),
    askPrice: Number((basePrice + spread / 2).toFixed(2)),
    markPrice: Number((basePrice + (Math.random() - 0.5) * 0.2).toFixed(2)),
    fairPrice: Number((basePrice + (Math.random() - 0.5) * 0.3).toFixed(2)),
    timestamp: new Date()
  };
}

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Send initial connection confirmation
  socket.emit('Connected', socket.id);

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Price streaming service
function startPriceStreaming() {
  setInterval(() => {
    try {
      // Generate updates for 1-3 random ISINs each time
      const updateCount = Math.floor(Math.random() * 3) + 1;
      const selectedIsins = isins.sort(() => 0.5 - Math.random()).slice(0, updateCount);
      
      const priceUpdates = selectedIsins.map(isin => generatePriceUpdate(isin));
      
      // Broadcast to all connected clients
      io.emit('BulkPriceUpdate', priceUpdates);
      
      console.log(`Broadcasted ${priceUpdates.length} price updates at ${new Date().toISOString()}`);
    } catch (error) {
      console.error('Error in price streaming:', error);
    }
  }, 2000 + Math.random() * 3000); // Random interval between 2-5 seconds
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    connectedClients: io.engine.clientsCount
  });
});

// API endpoint to get current prices
app.get('/api/prices', (req, res) => {
  const currentPrices = isins.map(isin => generatePriceUpdate(isin));
  res.json(currentPrices);
});

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`🚀 Pricing Service running on port ${PORT}`);
  console.log(`📊 Socket.IO endpoint: ws://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  
  // Start price streaming after server starts
  setTimeout(startPriceStreaming, 1000);
});
