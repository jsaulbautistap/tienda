import Pedido from '../models/pedidos.js';
import Producto from '../models/productos.js';
import Cliente from '../models/clientes.js';

const listarPedidos = async (req, res) => {
    try {
        // Buscar todos los pedidos, populando las referencias a Usuario y Producto
        const pedidos = await Pedido.find()
            .populate('cliente', 'nombre apellido email')  // Información del cliente
            .populate('producto.producto', 'nombre precio stock')  // Información del producto
            .exec();

        // Enviar los pedidos como respuesta
        res.status(200).json(pedidos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al listar los pedidos.' });
    }
};

const crearPedido = async (req, res) => {
    try {
        const { cliente, producto , codigo, descripcion} = req.body; 

        // Validar si el cliente existe
        const clienteBDD = await Cliente.findById(cliente);
        if (!clienteBDD) {return res.status(400).json({ msg: 'Cliente no encontrado.' });}

        // Validar si los productos existen y calcular el total
        let total = 0;
        const productosValidos = [];

        for (let i = 0; i < producto.length; i++) { 
            const productoBDD = await Producto.findById(producto[i].producto);
            if (!productoBDD) {return res.status(400).json({ msg: `Producto con ID ${producto[i].producto} no encontrado.` })}

            // Verificar si hay suficiente stock
            if (productoBDD.stock < producto[i].cantidad) {return res.status(400).json({ msg: `No hay suficiente stock para el producto ${productoBDD.nombre}.`})}

            // Calcular el precio total por producto (precio * cantidad)
            total += productoBDD.precio * producto[i].cantidad; 

            // Agregar los productos con la cantidad a una lista para guardar
            productosValidos.push({
                producto: productoBDD._id,
                cantidad: producto[i].cantidad 
            });
            console.log(productosValidos)
        }

        // Crear el pedido
        const nuevoPedido = new Pedido({
            codigo,
            descripcion,
            cliente: clienteBDD._id,
            producto: productosValidos,
            total
        });

        // Guardar el pedido
        await nuevoPedido.save();

        // Actualizar el stock de los productos
        for (let i = 0; i < productosValidos.length; i++) {
            await Producto.findByIdAndUpdate(productosValidos[i].producto, {
                $inc: { stock: -productosValidos[i].cantidad }
            });
        }

        res.status(201).json({ msg: 'Pedido creado exitosamente.', pedido: nuevoPedido });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al crear el pedido.' });
    }
};


export{
    listarPedidos,
    crearPedido
}