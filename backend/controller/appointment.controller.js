import Appointment from "../models/appointment.js"

export const createAppointment = async (req,res)=>{
    try {
        const {
            userId,
            primaryPhysician,
            schedule,
            reason,
            note,
            status
        } = req.body;
        const na = new Appointment({
            userId,
            primaryPhysician,
            schedule,
            reason,
            note,
            status
        });
        await na.save();
        const id = na._id;
        return res.status(201).json({message : "Appointment created",na,id});
    } catch (error) {
                return res.status(500).json(err);

    }
}

export const getInfo = async(req,res)=>{
    // console.log(req);
    const apid = req.query.appointmentId;
    try{
        if(!apid){
            res.status(400).send('Error: Appointment ID not provided.');
        }
        else{
            const appointment = await Appointment.findById(apid);
            if(appointment){
                res.send({appointment}); 
            }
            else{
                res.status(400).send('Error: Appointment not found.');  
            }
        }
    }
    catch(error){
        return res.send(error);
    }
}