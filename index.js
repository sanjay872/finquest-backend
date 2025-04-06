const mongoose = require('mongoose');
const express = require('express');
const userRoutes = require('./routers/userRoutes');
const aiRoutes = require('./routers/aiRoutes');
const decisionRoutes = require('./routers/decisionRoutes');
const authRoutes = require('./routers/authRoutes'); // new auth routes
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;;

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/decisions', decisionRoutes);
app.use('/api/auth', authRoutes); // new auth routes

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected");

  // Start the server only after connection
  app.listen(PORT, () => console.log("🚀 Server running on port "+PORT));
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});