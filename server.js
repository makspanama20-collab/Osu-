const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.static(__dirname));

const CLIENT_ID = 69408;
const CLIENT_SECRET = "nlNtZ2kJNEVjiexajBBcGGjq7Pcg2mTWkuZsk6Ik";
const USER_ID = 38993897;

// Головна сторінка
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// API профілю
app.get("/api/profile", async (req, res) => {
  try {
    const tokenRes = await fetch("https://osu.ppy.sh/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "client_credentials",
        scope: "public"
      })
    });

    const token = await tokenRes.json();

    const userRes = await fetch(
      `https://osu.ppy.sh/api/v2/users/${USER_ID}/osu`,
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`
        }
      }
    );

    const user = await userRes.json();
    res.json(user);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});