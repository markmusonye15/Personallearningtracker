// // pages/api/skills.js
// export default async function handler(req, res) {
//   try {
//     // Example: Fetch data from a database or external API
//     const { method, body } = req;

//     switch (method) {
//       case "GET":
//         // Return mock data (replace with your database logic)
//         res.status(200).json([{ id: 1, name: "React" }]);
//         break;

//       case "POST":
//         // Save data (replace with your database logic)
//         console.log("Received data:", body);
//         res.status(201).json({ success: true, data: body });
//         break;

//       default:
//         res.setHeader("Allow", ["GET", "POST"]);
//         res.status(405).end(`Method ${method} Not Allowed`);
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// }

// api/skills/index.js
const express = require("express");
const router = express.Router();
const cors = require("cors");

// Enable CORS
router.use(cors({ origin: "*" }));

// Mock database (replace with a real database)
let skills = [
  { id: 1, name: "React" },
  { id: 2, name: "Node.js" },
];

// GET /api/skills
router.get("/", (req, res) => {
  res.json(skills);
});

// POST /api/skills
router.post("/", (req, res) => {
  const newSkill = { id: skills.length + 1, ...req.body };
  skills.push(newSkill);
  res.status(201).json(newSkill);
});

module.exports = router;