const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,'Please add a name'],
        unique : true,
        trim : true,
        maxLength : [50,"Name can not be more than 50 characters"],
    },
    address : {
        type : String,
        required : [true,'Please add an address']
    },
    district : {
        type : String,
        required : [true,'Please add a district']
    },
    province : {
        type : String,
        required : [true,'Please add a province']
    },
    postalcode : {
        type : String,
        required : [true,'Please add a postalcode'],
        maxLength : [5,'Postal code can not be more than 5 digits']
    },
    tel : {
        type : String,
    },
    region : {
        type : String,
        required : [true,'Please add a Region']
    },
});

module.exports = mongoose.model('Hospital',HospitalSchema);