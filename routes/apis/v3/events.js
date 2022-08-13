const express = require('express');
const router = express.Router();


// get all controllers
const getEventController = require('../../../controllers/get_event_controllers');
const postEventController = require('../../../controllers/post_event_controller');
const putEventController = require('../../../controllers/put_event_controller');
const deleteEventController = require('../../../controllers/delete_event_controller');

// set up multer
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../..', 'uploads'));
    },
    filename: function (req, file, cb) {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniquePrefix +  path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('event_image');


// handle routes
router.get('/', getEventController.index);
router.post('/',upload, postEventController.index);
router.put('/:id', upload, putEventController.index);
router.delete('/:id', deleteEventController.index);


module.exports = router; 