const express = require("express")
const app = express()
const cors = require('cors');

const database = require("./config/database");
const dotenv = require("dotenv");
dotenv.config();
database.connect();

app.use(cors({
  origin: 'https://kaushalam-project.vercel.app/' // Replace with your frontend URL
}));

app.use(express.json());

const auth =  require("./routes/auth")
const task =  require("./routes/task")
app.use("/api/v1",auth)
app.use("/api/v2",task)
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
