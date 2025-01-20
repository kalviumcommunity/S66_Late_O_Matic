const express = require('express');
const app = express();
app.get("/ping",function(req,res){
    res.send("pong");
})
const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

