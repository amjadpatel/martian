import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//Create Ration model


const RationSchema = new Schema({
    type: { type: String, enum :['Water','Food'] ,required: true },
    packet_content: { type: String },
    pack_id: { type: String, enum :['F1','W1'],required: true },
    calories: { type: Number},
    packet_exp_date: { type: Date},
    qty_ltr: { type: Number},
    

});

export default mongoose.model('Ration', RationSchema);
