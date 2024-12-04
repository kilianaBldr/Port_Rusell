const mongoose = require('mongoose');

const clientOptions = {
    dbName            : 'apinode'
};

exports.initClientDbConnection = async () => {
    try {
        await mongoose.connect(process.env.URL_MANGO, clientOptions)
        console.log('Connection MangoDB effectué');
    }catch (error) {
        console.log("Erreur de connexion MongoDB :", error);
        throw error;
    }
}