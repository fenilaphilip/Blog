import express from "express";
import bodyParser from "body-parser";

const port = 3000;
const app = express();
const currentYear = new Date().getFullYear();
var postList = [];


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/blogPost", (req, res) => {
    //console.log("userRequested " + JSON.stringify(req.body));
    switch (req.body.option) {
        case "create":
            postList.push({
                heading: req.body.heading,
                content: req.body.content
            });
            var id = postList.length - 1;
            res.redirect(`/edit?id=${id}`)
            break;
        case "edit":
            // console.log("Editing id "+req.body.id)
            var id = req.body.id;
            postList[id] = {
                heading: req.body.heading,
                content: req.body.content
            };
            res.redirect(`/edit?id=${id}`);
            break;
        case "delete":
            var id = req.body.id;
            postList.splice(id, 1);
            // console.log("updated postList: " + JSON.stringify(postList));
            res.render("index.ejs", {
                allPost: postList,
                year: currentYear
            });
            break;
    }
});


app.get("/home", (req, res) => {
    //console.log("from home : " + JSON.stringify(postList));
    res.render("index.ejs", {
        allPost: postList,
        year: currentYear
    });
});

app.get("/create", (req, res) => {
    res.render("create.ejs",{ year: currentYear});
});

app.get("/edit", (req, res) => {
    var id = req.query.id;
    console.log("id = " + id);
    // console.log("postList = "+JSON.stringify(postList))
    //console.log("Editing "+ JSON.stringify(postList[id]));
    res.render("create.ejs", { story: postList[id], id: id ,
        year: currentYear});
});

app.get("/view", (req, res) => {
    var id = req.query.id;
    //console.log('The id: ' + id);
    res.render("view.ejs", { story: postList[id], id: id ,
        year: currentYear });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});