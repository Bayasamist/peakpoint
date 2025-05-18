const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

// 🔌 Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
const visaRoutes = require('./routes/visaRoutes');
app.use('/api/visas', visaRoutes);
const contactRoutes = require("./routes/contactRoutes");

app.use("/api/visas", visaRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("Visa Guide API is running");
});

const agentRoutes = require('./routes/agentRoutes');
app.use('/api/agents', agentRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
