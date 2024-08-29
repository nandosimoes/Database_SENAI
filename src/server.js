
require('dotenv').config();
const express = require("express");
const userRouter = require("./router/userRouter"); 
const productRouter = require("./router/productRouter");
const clientRouter = require("./router/clientRouter");
const sequelize = require("./config/config");
const app = express();
const porta = 8080;

app.use(express.json());
app.use('/api/user', userRouter); 
app.use('/api/product', productRouter); 
app.use('/api/client', clientRouter);  
app.get('/healthcheck', (req, res) => {

    return res.status(200).json({
        msg: 'Estamos vivos!',
        alive: true
    });
});

    sequelize
    .authenticate()
    .then(() => {
        console.log("Conexão estabelecida com sucesso");
        return sequelize.sync();
    })
    .then(() => {
        app.listen(process.env.PORT == null ? 8080 : process.env.PORT,  () => {
            console.log(`Rodando no servidor na porta ${porta}`);
        });
    })
    .catch((error) => {
        console.error("Erro ao se conectar com o banco", error);
    })
 