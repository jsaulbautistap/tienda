import moongose from 'mongoose'

moongose.set('strictQuery', true)


const connection = async () =>{
    try{
        const {connection} = await moongose.connect(process.env.DT_URI_LOCAL)
        console.log(`base de datos conectado a ${connection.host} en el puerto ${connection.port}`)

    }catch (error){
        console.log(error)

    }
}

export default connection


