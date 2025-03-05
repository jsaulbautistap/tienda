import { Router } from 'express';
import {
    listarPedidos,
    crearPedido
} from '../controllers/pedidos_controller.js';
import verificarAutenticacion from '../middlewares/autenticacion.js'; // Asegúrate de ajustar la ruta

const router = Router();

// Rutas protegidas con el middleware de autenticación
router.get('/pedidos', verificarAutenticacion, listarPedidos);
router.post('/pedido/crear', verificarAutenticacion, crearPedido);

export default router;