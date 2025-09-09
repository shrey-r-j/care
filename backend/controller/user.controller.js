import Patient from "../models/patient.js";
import jwt from "jsonwebtoken";

export const create = async(req,res)=>{
    try{
        const {name,email,phone} = req.body;
        const exist = await Patient.findOne({email});
        if(exist){
            return res.send("User already exist");
        }
        const newUser = new Patient({
            name:name,
            email : email,
            phone :phone,
        })
        await newUser.save();
        const token = jwt.sign({email},process.env.JWT_KEY);
        return res.status(201).json({message : "User created" , token,newUser});
    }
    catch(err){
        return res.status(500).json(err);
    }
}

export const getUser = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        const user = await Patient.findOne({ email: decoded.email });
        // console.log(user);
        const ID = user.id;
        if (user) {
            return res.status(200).json({ message: "User found", ID });
        }

        return res.status(404).json({ message: "User not found" });

    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const register = async (req, res) => {
  try {
    const {
    //   userId,
      email,
      gender,
      birthDate,
      address,
      occupation,
      emergencyContactName,
      emergencyContactNumber,
      insuranceProvider,
      insurancePolicyNumber,
      allergies,
      currentMedication,
      familyMedicalHistory,
      pastMedicalHistory,
      identificationType,
      identificationNumber,
      identificationDocumentId,
      identificationDocumentUrl,
      primaryPhysician,
      privacyConsent,
    } = req.body;

    // if (!userId) {
    //   return res.status(400).json({ message: "User ID is required" });
    // }

    // find patient by ID
    const patient = await Patient.findOne({email});
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // update fields
    patient.gender = gender || patient.gender;
    patient.birthDate = birthDate || patient.birthDate;
    patient.address = address || patient.address;
    patient.occupation = occupation || patient.occupation;
    patient.emergencyContactName = emergencyContactName || patient.emergencyContactName;
    patient.emergencyContactNumber = emergencyContactNumber || patient.emergencyContactNumber;
    patient.insuranceProvider = insuranceProvider || patient.insuranceProvider;
    patient.insurancePolicyNumber = insurancePolicyNumber || patient.insurancePolicyNumber;
    patient.allergies = allergies || patient.allergies;
    patient.currentMedication = currentMedication || patient.currentMedication;
    patient.familyMedicalHistory = familyMedicalHistory || patient.familyMedicalHistory;
    patient.pastMedicalHistory = pastMedicalHistory || patient.pastMedicalHistory;
    patient.identificationType = identificationType || patient.identificationType;
    patient.identificationNumber = identificationNumber || patient.identificationNumber;
    patient.identificationDocumentId = identificationDocumentId || patient.identificationDocumentId;
    patient.identificationDocumentUrl = identificationDocumentId
      ? identificationDocumentUrl || `/uploads/${identificationDocumentId}`
      : patient.identificationDocumentUrl;
    patient.primaryPhysician = primaryPhysician || patient.primaryPhysician;
    patient.privacyConsent = privacyConsent ?? patient.privacyConsent;

    await patient.save();

    res.status(200).json({
      message: "Patient updated successfully",
      patient,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Failed to update patient" });
  }
};



