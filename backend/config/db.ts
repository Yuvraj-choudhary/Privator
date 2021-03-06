const mongoose = require("mongoose");

async function connectDB() {
    try {
        const connect = await mongoose.connect(process.env.MOGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`Database connection established ${connect.connection.host}`);
    } catch (error: any) {
        console.error(error);
        process.exit();
    }
}

export {connectDB};
