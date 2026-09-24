const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static(__dirname));

const CLIENT_ID = 69408;
const CLIENT_SECRET = "nlNtZ2kJNEVjiexajBBcGGjq7Pcg2mTWkuZsk6Ik";
const USER_ID = 38993897;

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

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.listen(3000, () => {
    console.log("Server: http://localhost:3000");
});