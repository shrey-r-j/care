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

        if (user) {
            return res.status(200).json({ message: "User found", user });
        }

        return res.status(404).json({ message: "User not found" });

    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
};