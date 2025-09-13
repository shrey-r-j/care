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

export const getAll = async (req,res)=>{
    try {
        
        const appointments = await Appointment.find({});
        const counts = {
      pending: appointments.filter(app => app.status === "pending").length,
      cancelled: appointments.filter(app => app.status === "cancelled").length,
      scheduled: appointments.filter(app => app.status === "scheduled").length,
    };
        return res.status(200).send({message : "All appointments ",appointments,counts});

    } catch (error) {
    return res.status(500).send({ error: error.message });
    }
}

export const updateAppointment = async(req,res)=>{
    try {
        // const ap_id = req.body.appointmentId;
        const {appointmentId ,userId,schedule,primaryPhysician,reason,note,cancellationReason,status} = req.body;
        console.log(cancellationReason);

        const old = await Appointment.findById(appointmentId);
        if(status === "scheduled"){
            old.primaryPhysician = primaryPhysician ;
            old.schedule = schedule ;
            old.reason = reason ;
            old.note = note ;
            old.status = "scheduled" ;
                    await old.save();

        }
        else if(status === "cancelled"){
            old.schedule = schedule ;
            old.cancellationReason = cancellationReason;
            old.status = "cancelled"
                    await old.save();

        }
        return res.send(old);
    } catch (error) {
        
    }
}