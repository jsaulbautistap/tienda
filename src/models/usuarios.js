import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const usuarioSchema = new mongoose.Schema({
    
    nombre: {
        type: String,
        trim: true
    },
    apellido: {
        type: String,
        trim: true
    },
   
    email: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

// Método para encriptar la contraseña de los usuarios
usuarioSchema.methods.encryptPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Método para comparar la contraseña ingresada con la encriptada
usuarioSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export default mongoose.model('Usuario', usuarioSchema);