import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    mrn: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    age: Number,
    sex: { type: String, enum: ["Female", "Male", "Other"] },
    phone: String,
    city: String,
    district: String,
    bloodGroup: String,
    allergies: [String],
    homeFacilityId: { type: mongoose.Schema.Types.ObjectId, ref: "Facility" },
  },
  { timestamps: true }
);

export const Patient = mongoose.model("Patient", patientSchema);
