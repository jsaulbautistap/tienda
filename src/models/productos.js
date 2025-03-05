import mongoose from "mongoose"



const ProductoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    codigo: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    categoria: {
        type: String,
        required: true,
        enum: ['lácteos', 'verduras', 'frutas', 'carnes', 'bebidas', 'otros'],
        index:true
    },  
    precio:{
        type: Number,
        required: true,
        trim: true
    },
    stock:{
        type: Number,
        required: true,
    },
    fechaIngreso:{
        type: Date,
        required: true,
        default: Date.now()
    },
    proveedor:{
        type: String,
        required: true,
        trim: true
    }

},{
    timestamps: true
})


export default mongoose.model('Producto', ProductoSchema);