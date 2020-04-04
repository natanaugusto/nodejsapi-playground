import chalk from 'chalk'
import mongoose from 'mongoose'
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/example"


const datasourceConnect = () => {
    mongoose.connect(mongoURI, { useUnifiedTopology: true })
    mongoose.connection.on('connected', () => {
        console.log(chalk.green.inverse('MongoDB connection established'))
    })
    mongoose.connection.on('error', (err) => {
        console.err(chalk.red.inverse('%s MongoDB connection error'))
        process.exit()
    })
}

export default datasourceConnect