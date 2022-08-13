const dbConnect = require('../config/mongodb');


module.exports.index = async (req, res) => {
    try{
       
        let db = await dbConnect();
        let events = db.collection('events');
        let imageDest = 'uploads/default.svg';
        if(req.file){
            imageDest = 'uploads/' + req.file.filename;
        }
    
        let reqData = JSON.parse(req.body.data);
    
        let result = await events.insertOne({
            type: reqData.type,
            name: reqData.name,
            tagline: reqData.tagline,
            schedule: reqData.schedule,
            description: reqData.description,
            event_image: imageDest,
            moderator: reqData.moderator,
            category: reqData.category,
            sub_category: reqData.sub_category,
            rigor_ank: reqData.rigor_rank,
            attendees: reqData.attendees
        });
    
        return res.status(201).json({
            message: 'Event Created!',
            data: {
                event_id: result.insertedId
            }
        });
   
    }catch(err){
        console.log("Error while creating event", err);
    }
} 