import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente', 
        required: true
    },
    producto: [{
        producto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Producto',
            required: true
        },
        cantidad: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    total: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Pedido', pedidoSchema);