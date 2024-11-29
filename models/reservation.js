const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Shéma pour la collection reservation
const reservationShema = new Schema({
    catwayNumber: { 
        type: Schema.Types.ObjectId,
        ref: "Catway",
        required: [true]
    },
    clientName: { 
        type: String,
        required: [true, 'Le Nom du Client est requis']
    },
    boatName: { 
        type: String, 
        required: [true, 'Le Nom du Bâteaux est requis']
    },
    checkIn: { 
        type: Date, 
        required: [true, 'Le Date d\'entrée est requis']
    },
    checkOut: { 
        type: Date, 
        required: [true, 'Le Date de sortie est requis' ]
    },
} , {
    timestamp: true,
}
);

module.exports = mongoose.model('Reservation', reservationShema);