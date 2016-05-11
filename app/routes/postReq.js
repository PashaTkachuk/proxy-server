'use strict';

const reqHandler = require('../services/reqHandler');

const PostReqRouter = {
	handleAll: (req, res) => {
        reqHandler.handlePostReq(req.body)
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                res.send(err.message);
            });
    }
};

module.exports = PostReqRouter;