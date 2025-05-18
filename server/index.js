const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

// 🔌 Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
const userApplicationRoutes = require('./routes/userApplicationRoutes');
const visaRoutes = require('./routes/visaRoutes');
const contactRoutes = require("./routes/contactRoutes");
const agentRoutes = require('./routes/agentRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/user-application', userApplicationRoutes);
app.use("/api/visas", visaRoutes);
app.use("/api/contact", contactRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/auth', authRoutes);

app.get("/", (req, res) => {
  res.send("Visa Guide API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
