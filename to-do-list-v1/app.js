//jshint esversion:6

const express = require('express')
const bodyParser = require('body-parser')
const { request } = require('express')
const date = require(__dirname + "/date.js")

console.log(date)



const app = express()
//sempre por abaixo da criação da constante
// seta o ejs como a view engine do projeto

const items = ["Buy Food", "Cook Food", "Eat Food"]
const workItems = []

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

//Get Route root
app.get("/", function (req, res) {
    
    const day = date.getDate()
    //vai olhar dentro da pasta views e procurar o arquivo com o nome "list", caso não seja feito isso vai dar erro
    //isso porque a primeira entrada do objeto é a marcação que está no arquivo list.ejs e "day" é a variavel 
    //que vamos passar de app.js para list.ejs
    res.render("list", { listTitle: day, newListItems: items });
})

app.post("/", function (req, res) {

    const item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work")
    } else {
        items.push(item);
        //aqui ele vai redirecionar para app.get("/") e jogar o item dentro do render evitando renderizar algo que não exista e assim evitando erros 
        res.redirect("/")
    }


})

app.get("/work", function (req, res) {
    
    res.render("list", { listTitle: "Work List", newListItems: workItems })
})

app.get("/about", function (req, res){
    res.render("about")
})

app.post("/work", function (req, res) {
    const item = req.body.newItem;
    workItems.push(item)
    res.redirect("/work")
})

app.listen(3000, function () {
    console.log("Server starter on port 3000")
})