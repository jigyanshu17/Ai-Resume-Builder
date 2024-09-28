import mongoose from 'mongoose';
const resumeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    firstName: String,
    lastName: String,
    jobTitle: String,
    address: String,
    phone: String,
    email: String,
    themeColor: String,
    summary: String,
    experience: [
      {
        title: String,
        companyName: String,
        city: String,
        state: String,
        startDate: String,
        endDate: String,
        currentlyWorking: Boolean,
        workSummary: String
      }
    ],
    education: [
      {
        universityName: String,
        startDate: String,
        endDate: String,
        degree: String,
        major: String,
        description: String
      }
    ],
    skills: [
      {
        name: String,
        rating: Number
      }
    ]
  }, { timestamps: true });
  
  module.exports = mongoose.model('Resume', resumeSchema);
  