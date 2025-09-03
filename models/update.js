const mongoose=require ('mongoose');

const updateSchema= new mongoose.Schema(
    {
        location: { type: String, required: true, trim: true },
        cause: { type: String, required: true, trim: true },
        photo: { type: String },
        coordinates:{
            lat:{type:Number},
            lng:{type:Number},
        },
    },
    {timestamps:true}
);
module.exports= mongoose.model('update', updateSchema)
