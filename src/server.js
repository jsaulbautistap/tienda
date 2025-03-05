import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'


import routerUsuario from './routers/usuarios_ruta.js'
import routerCliente from './routers/cliente_ruta.js'
import routerProducto from './routers/producto_ruta.js'
import routerPedido from './routers/pedido_ruta.js'



const app = express()
dotenv.config()


app.set('port',process.env.port || 3000)
app.use(cors())


app.use(express.json())



// RUTA 

app.use('/api',routerUsuario)
app.use('/api',routerCliente)
app.use('/api',routerProducto)
app.use('/api',routerPedido)

export default app

