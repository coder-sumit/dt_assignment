const dbConnect = require('../config/mongodb');

// get events controller
module.exports.index = async (req, res) => {
    try {
        let db = await dbConnect();
        let events = db.collection('events');
        // id based endpoint
        if(req.query.id){
        let ObjectID = require('mongodb').ObjectID;
        let id = new ObjectID(req.query.id);
        let data = await events.find({"_id": id}).toArray();
        return res.status(200).json({
            message: "One Event!",
            data
        });
        // pagination based endpoint
    }else{
        let type = req.query.type;
        let limit = parseInt(req.query.limit);
        let page = parseInt(req.query.page);
        // skip count
        let skip;
        if(page<=1){
           skip = 0;
        }else{
            skip = (page-1)*limit;
        }
        let data = await events.find({type: type}).skip(skip).limit(limit).toArray();
        return res.status(200).json({
            message: "Events!",
            data
        });

        
    }
    }catch(err){
        console.log("Error while getting event from db", err);
    }
}