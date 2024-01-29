import express from "express";
import bodyParser from "body-parser";

const port = 3000;
const app = express();
var postList = [];


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/create", (req, res) => {
   postList.push(req.body);
    console.log(postList);
    res.redirect("/home")
   
});


app.get("/home", (req, res) => {
    res.render("index.ejs", { allPost: postList});
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});


app.get("/view", (req, res) => {
    res.render("view.ejs");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});