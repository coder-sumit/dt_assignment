const dbConnect = require('../config/mongodb');
const fs = require('fs');
const path = require('path');

module.exports.index = async (req, res) => {
    try {
        // get db and collection
        let db = await dbConnect();
        let events = db.collection('events');
        // get object id from params
        let ObjectID = require('mongodb').ObjectID;
        let id = new ObjectID(req.params.id);
        // find object 
        let data = await events.find({ "_id": id }).toArray();
        // remove old file from uploads
        if(data[0].event_image != 'uploads/default.svg' && data[0].event_image){
        let imageFilePath = path.join(__dirname, '..', data[0].event_image);
        fs.unlink(imageFilePath, function (err) {
            if (err) { console.log(err); }
        });
        }

        // update object
        let imageDest = 'uploads/default.svg';
        if (req.file) {
            imageDest = 'uploads/' + req.file.filename;
        }

        let reqData = JSON.parse(req.body.data);
        let result = await events.updateOne({ "_id": id }, {
            $set: {
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
            }
        });

        return res.status(200).json({
            message: "Updated Successfully",
            data: {
                event_id: id
            }
        });
    } catch (err) {
        console.log("Error while updating", err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }

}