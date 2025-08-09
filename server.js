const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Serve your HTML file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Handle form submission
app.post("/submit", (req, res) => {
    const data = `
Aternos Username: ${req.body.aternosname}
Minecraft Username: ${req.body.minecraftusername}
Building Skill: ${req.body.buildinginfo}
PvP Rating: ${req.body.pvpinfo}
Likes Survival: ${req.body.survivalinfo}
Playing Since: ${req.body.playinginfo}
--------------------------
`;

    fs.appendFileSync("formdata.txt", data, "utf8");
    res.send("✅ Your form has been saved to formdata.txt");
});

// Start server
app.listen(3000, () => console.log("Server running at http://localhost:3000"));
