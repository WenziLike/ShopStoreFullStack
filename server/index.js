require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHeandingMiddleware')
/* ==================================================================== */
const PORT = process.env.PORT || 6868
/* ==================================================================== */
const app = express()
app.use(cors())
app.use(fileUpload({}))
app.use(express.json())
app.use('/api', router)

// Обработка  ошибки
app.use(errorHandler) // обязательно должен регистрироваться в самом конце
/* ==================================================================== */
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
start()