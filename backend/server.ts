import express from 'express'
import 'dotenv/config'
import cors from 'cors'
const port = process.env.SERVER_PORT


const app = express()

app.use(cors({
    origin: '*'
}))


app.use(express.json())
app.use((req, res, next) => {
    // console.log(req.path.toUpperCase())
    next()
})


import FormRouter from './routes/form'
app.use('/form', FormRouter)



app.listen(port, () => {
  console.log(`Server Start on Port - ${port}`)
})