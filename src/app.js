// const { hasSubscribers } = require("diagnostics_channel");
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const bcrypt = require("bcryptjs")
require("./db/conn");



const Register = require("./Models/Registers")

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partial_path)

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get ("/", (req,res) => {
    res.render("index")
});
app.get ("/home", (req,res) => {
    res.render("home")
});
app.get("/index", (req,res) => {
    res.render("index")
});
app.get ("/login", (req,res) => {
    res.render("login")
});

app.post("/register", async (req,res) => {
    try{
 
    //  console.log(req.body.fname)
    //  console.log(req.body.email)
    //  console.log(req.body.password)
    //  console.log(req.body.cpassword)
    //  //res.render("index")
        const password = req.body.password;
        const cpassword = req.body.cpassword;
 
        if(password===cpassword){
            const registerEmployee = new Register({
                fname : req.body.fname,
                email : req.body.email,
                password : req.body.password,
                cpassword : req.body.cpassword
            })


            // password hash


            
            const registered = await registerEmployee.save();
            res.status(201).render("home");
       
        }
        else{
            res.send("password are not matching")
        }
    }
    catch (error){
        res.status(400).send(error);
        console.log(error)
    }
});



// login

app.post("/login", async (req,res) => {
    try{
 
        const email = req.body.email;
        const password = req.body.password;
     
 
        const usseremail = await Register.findOne({email:email});
       
        const isMatch = await bcrypt.compare(password,usseremail.password );
        if(isMatch){
            res.status(201).render("home");
        }else{
            res.send("email and password are wrong ")
        }
        // if(password===cpassword){
        //     const registerEmployee = new Register({
        //         fname : req.body.fname,
        //         email : req.body.email,
        //         password : req.body.password,
        //         cpassword : req.body.cpassword
        //     })

        //     const registered = await registerEmployee.save();
        //     res.status(201).render("index");
       
        // }
        // else{
        //     res.send("password are not matching")
        // }
    }
    catch (error){
        console.log(error)
        res.status(400).send("invalid email");
       
    }
});


app.listen(port, () => {
    console.log(`server is connect at port ${port}`);
});