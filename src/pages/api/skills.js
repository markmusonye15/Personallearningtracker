// pages/api/skills.js
export default async function handler(req, res) {
  try {
    // Example: Fetch data from a database or external API
    const { method, body } = req;

    switch (method) {
      case "GET":
        // Return mock data (replace with your database logic)
        res.status(200).json([{ id: 1, name: "React" }]);
        break;

      case "POST":
        // Save data (replace with your database logic)
        console.log("Received data:", body);
        res.status(201).json({ success: true, data: body });
        break;

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
