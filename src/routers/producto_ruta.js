import { Router } from 'express';
import {
    listarProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} from '../controllers/productos_controller.js';
import verificarAutenticacion from '../middlewares/autenticacion.js'; 

const router = Router();

// Rutas de productos (protegidas con autenticación)
router.get('/producto', verificarAutenticacion, listarProductos);
router.post('/producto/crear', verificarAutenticacion, crearProducto);
router.put('/producto/act/:id', verificarAutenticacion, actualizarProducto);
router.delete('/producto/del/:id', verificarAutenticacion, eliminarProducto);

export default router;