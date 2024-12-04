const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

//Schema pour la collection user
const User = new Schema({
    name: { 
        type: String,
        required: [true, 'Le Nom est requis'],
        trim: true
    },
    email: { 
        type: String, 
        required: [true, 'Le l\'Email est requis'],
        unique: true,
        trim: true
    },
    password: { 
        type: String, 
        required: [true, 'Le Mot de passe est requis' ],
        trim: true
    }
}, {
    //ajoute 2 champs au document createdAt et updateAt
    timestamps: true
}
);

//Hachage du mot de passe avant de le sauvegarder
User.pre('save', function (next) {
    if (!this.isModified('password'))
        return next();
    this.password = bcrypt.hashSync(this.password, 10);

    next();
});


module.exports = mongoose.model('User', User);