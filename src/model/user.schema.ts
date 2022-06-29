import mongoose from "mongoose";
import toJson from '@meanie/mongoose-to-json';

const Schema = mongoose.Schema;
const model = mongoose.model;


const smokeLocation = new Schema({
    x: { type: String, required:true },
    y: { type: String, required:true }
});

const smoke = new Schema({
    when:{
        type: Date,
        required:true,
    },
    where: {
        type: smokeLocation,
        required: true,
    }   
});


const user = new Schema(
    {
        userName: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        smoke : {
            type: [smoke],
            default: [],
            required: true
        }
    },
    {
        timestamps: true
    }
)

// add plugin that converts mongoose to json
user.plugin(toJson);
smoke.plugin(toJson);
smokeLocation.plugin(toJson);

export const User = model('User', user, 'User');
