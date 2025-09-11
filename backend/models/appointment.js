import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  schedule: Date,
  status: String, // You may want to use enum here
  primaryPhysician: String,
  reason: String,
  note: String,
  cancellationReason: { type: String, default: null },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient", // Reference to Patient model
    required: true
  }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;


