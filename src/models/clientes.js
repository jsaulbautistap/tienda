import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const clienteSchema = new mongoose.Schema({
    cedula: {
        type: Number,
        unique: true,
        trim: true,
        index: true
    },
    nombre: {
        type: String,
        trim: true
    },
    apellido: {
        type: String,
        trim: true
    },
    ciudad: {
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
   
    direccion: {
        type: String,
        trim: true
    },
    telefono: {
        type: Number,
        trim: true
    },
    fechaNacimiento: {
        type: Date,
        trim: true
    }
}, {
    timestamps: true
});

// Método para encriptar la contraseña de los usuarios
clienteSchema.methods.encryptPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Método para comparar la contraseña ingresada con la encriptada
clienteSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export default mongoose.model('Cliente', clienteSchema);