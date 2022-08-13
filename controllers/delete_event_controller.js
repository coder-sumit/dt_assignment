const dbConnect = require('../config/mongodb');
const path = require('path');
const fs = require('fs');

module.exports.index = async (req, res) => {
    try {
        // get db 
        let db = await dbConnect();
        let events = db.collection('events');

        // get id from params
        let ObjectID = require('mongodb').ObjectId;
        let id = new ObjectID(req.params.id);

         // find object 
         let data = await events.find({ "_id": id }).toArray();
         // remove file from uploads
         if(data[0].event_image != 'uploads/default.svg'){
         let imageFilePath = path.join(__dirname, '..', data[0].event_image);
         fs.unlink(imageFilePath, function (err) {
             if (err) { console.log(err); }
         });
        }

        // delete object
        let result = await events.deleteOne({ "_id": id });

        return res.status(202).json({
            message: "deleted successfully!"
        });
    } catch (err) {
        console.log("Error while deleting event", err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}