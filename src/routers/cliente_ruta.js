import { Router } from 'express';
import {
    registroCliente,
    perfilCliente,
    listarClientes
} from '../controllers/clientes_controller.js';
import verificarAutenticacion from '../middlewares/autenticacion.js'; // Asegúrate de ajustar la ruta

const router = Router();

// Rutas protegidas con el middleware de autenticación
router.post('/cliente/registro', verificarAutenticacion,registroCliente);
router.get('/cliente/perfil', verificarAutenticacion, perfilCliente);
router.get('/', verificarAutenticacion, listarClientes);

export default router;