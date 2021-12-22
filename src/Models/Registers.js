const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const employeeSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: [true,'Please Enter your Name'],
        trim:true,
        maxLength: [100, 'Product Name Cannot Exeed 100 Characters']
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail,"please enter your email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true,'Please Enter password'],
        maxLength: [15, 'Password Cannot Exeed 15 Characters']
    },
    cpassword: {
        type: String,
        required: [true,'Please Enter password'],
        maxLength: [15, 'Password Cannot Exeed 15 Characters']
    },
})



//bcryptjs

employeeSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
  
    this.password = await bcrypt.hash(this.password,10);
  
    this.cpassword = undefined;
});


// module.exports = mongoose.model('Product',productSchema);

const Register = new mongoose.model("Register",employeeSchema);

module.exports = Register;