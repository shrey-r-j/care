import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    name :{
        type : String,
        required : true,
    },
    // userId :{
    //     type : String,
    //     required : true,
    // },
    privacyConsent :{
        type : Boolean,
        
    },
    phone :{
        type : String,
        required : true,
    },
    gender : {
        type : String,
        enum : ['Male','Female','Other']   
    },

    birthDate : {
        type : String
    },
    address : {
        type : String
    },
    occupation : {
        type : String
    },
    emergencyContactName : {
        type : String
    },

    emergencyContactNumber : {
        type : String
    },
    insuranceProvider : {
        type : String
    },
    insurancePolicyNumber : {
        type : String
    },
    allergies : {
        type : String
    },
    currentMedication : {
        type : String
    },
    familyMedicalHistory : {
        type : String
    },
    pastMedicalHistory : {
        type : String
    },
    identificationType : {
        type : String
    },
    identificationNumber : {
        type : String
    },
    identificationDocumentId : {
        type : String
    },
    identificationDocumentUrl : {
        type : String
    },
    primaryPhyiscian : {
        type : String
    },
    
});

const Patient = mongoose.model("Patient",patientSchema);

export default Patient;