import Cliente from "../models/clientes.js";


const perfilCliente = async (req,res) => {


    delete req.usuarioBDD.token
    delete req.usuarioBDD._id
    delete req.usuarioBDD.createdAt
    delete req.usuarioBDD.updatedAt
    delete req.usuarioBDD.__v
    res.status(200).json(req.usuarioBDD)

}

const listarClientes = async (req, res) => {
    try {
        // Obtener solo el nombre y el correo electrónico de todos los clientes
        const clientes = await Cliente.find().select("nombre email");
        res.status(200).json(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al listar clientes" });
    }
};

// Este metodo solo lo utilizo para crear los clientes de la tienda, no se implementa en el frontend
// (●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)
const registroCliente = async (req, res) => {
    try {
        const { cedula, nombre, apellido, ciudad, email, direccion, telefono, fechaNacimiento } = req.body;

        // Validar todos los campos llenos
        if (Object.values(req.body).includes("")) {
            return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
        }

        // Verificar email y cedula (opcional, dependiendo de tus necesidades)
        if (await Cliente.findOne({ email })) {
            return res.status(400).json({ msg: "Lo sentimos, el email ya ha sido registrado" });
        }
        if (await Cliente.findOne({ cedula })) {
            return res.status(400).json({ msg: "Lo sentimos, la cedula ya ha sido registrada" });
        }

        // Crear la instancia del cliente
        const nuevoCliente = new Cliente({
            cedula,
            nombre,
            apellido,
            ciudad,
            email,
            direccion,
            telefono,
            fechaNacimiento,
        });

        // Guardar en BDD
        await nuevoCliente.save();

        // Imprimir el mensaje
        res.status(201).json({ msg: "Cliente registrado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al registrar el cliente" });
    }
};
// (●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)


export {
    registroCliente,
    perfilCliente,
    listarClientes
}