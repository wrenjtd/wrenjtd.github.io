const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
    origin: ["https://wrenjtd.github.io"],
   
};


app.use(cors(corsOptions) );

app.get("/api", (req, res)=>{
    res.json({"fruits": ["Apple", "Orange", "Bananas"]});
});


app.listen(8080, ()=>{
    console.log("server started on port 8080");
});

