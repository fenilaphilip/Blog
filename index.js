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
    console.log("from home : " + JSON.stringify(postList));
    res.render("index.ejs", { allPost: postList});
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.get("/view/:id", (req, res, next) => {
    var id = req.params.id;
    console.log('The id: ' + id);
    console.log("from view : " + JSON.stringify(postList));
    res.render("view.ejs",{ story: postList[id]});
    next();
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});