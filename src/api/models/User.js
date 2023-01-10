const {Schema, model}= require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: {type: String, required: true},
    email:{type: String, required: true},
    password: {type: String, required:true},
    isAdmin: {type: Boolean, required: true}
},{
   timestamps : true
});

UserSchema.methods.encryptPassword = async (password) => {
    // console.log(bcrypt,password)
    const salt = await bcrypt.genSalt(10);
    // console.log(await bcrypt.hash(password, salt))
    let pswencrypt= await bcrypt.hash(password, salt)
    return pswencrypt;
};

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = model('User', UserSchema);