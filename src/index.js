import '#Config/env.js';
import httpServer from "#Config/http.js";
import connectDB from "#Config/db.js";

const bootstrap = async () => {

    await connectDB(process.env.MONGODB_URL);

    httpServer.listen(process.env.PORT, () => {
        console.log(`Servidor iniciado en el puerto ${process.env.PORT}`);
    })
}

bootstrap();