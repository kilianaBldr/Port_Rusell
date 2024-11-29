const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

//Schema pour la collection user
const userShema = new Schema({
    name: { 
        type: String,
        required: [true, 'Le Nom est requis']
    },
    email: { 
        type: String, 
        required: [true, 'Le l\'Email est requis'],
        unique: true 
    },
    password: { 
        type: String, 
        required: [true, 'Le Mot de passe est requis' ]
    }
}, {
    //ajoute 2 champs au document createdAt et updateAt
    timestamps: true
}
);

//Hachage du mot de passe avant de le sauvegarder
userShema.pre('save', function (next) {
    if (!this.isModified('password'))
        return next();
    this.password = bcrypt.hashSync(this.password, 10);

    next();
});


module.exports = mongoose.model('User', userShema);