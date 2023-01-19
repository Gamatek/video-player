const express = require("express");
const config = require("./config.json");

const app = express();
app.use("/public", express.static(`${__dirname}/public`));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render(`${__dirname}/public/index.ejs`);
});

app.listen(config.port, () => {
    console.log(`App running on port ${config.port}`);
});