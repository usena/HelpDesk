import mongoose from 'mongoose';

const faqSchema = mongoose.Schema({
  question: {type: String},
  answer: {type: String}
}, {
    timestamps: true
});

export default mongoose.model('FAQ', faqSchema);
