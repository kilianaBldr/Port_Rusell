const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Shema pour la collection Catway
const catwayShema = new Schema({
    catwayNumber: { 
        type: Number, 
        required: [true, 'Catway Number est requis'], 
        unique: true 
    },
    type: { 
        type: Boolean, 
        required: [true, 'Le type est requis'] 
    },
    catwayState: { 
        type: String, 
        required: true 
    } ,
}, {
    timestamps: true,
}
);

module.exports = mongoose.model('Catway', catwayShema);