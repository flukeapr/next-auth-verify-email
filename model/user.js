import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        default: "user",
        require:false
    },
    verify:{
        type: Boolean,
        default: false,
        require:true
    }
   
},{timestamps: true})

const user = mongoose.models.user || mongoose.model("user", userSchema);
export default user