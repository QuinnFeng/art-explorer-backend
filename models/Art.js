const UserSchema = new mongoose.Schema({
    id: {
        type: number,
        required: true,
        unique: true,
    },
    title:{
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    iiif_url: {
        type: String,
        required: true,
    },
});