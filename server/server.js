const express = require("express");
const app = express();

app.get("/api", (req, res)=>{
    res.json({"fruits": ["Apple", "Orange", "Banana"]});
});


app.listen(8080, ()=>{
    console.log("server started on port 8080");
});