
'use strict';

const Promise = require('bluebird');
const fs = require('fs');

Promise.promisifyAll(fs);

const appDir = process.cwd();
const filePath = `${appDir}/var/tmp`;

const ReqHandlerService = {
    handlePostReq: (reqData) => {
        // Promisification of fs.exist (fs.existsAsync doesn't work as expected)
        return new Promise((resolve, reject) => {
            fs.exists(filePath, (exists) => {
                resolve(exists);
            });
        })
        .then((fileExist) => {
            if (fileExist) {
                //if file exist - read response from file
                return fs.readFileAsync(filePath, 'utf8')
                    .then((data) => {
                        return {response: data, data: reqData};
                    }, (err) => {
                        throw err;
                    });
            } else {
                //if file doesn`t exist - empty response
                return {response: '', data: reqData};
            }
        })
        .then((result) => {
            return fs.writeFileAsync(filePath, result.data)
                .then(() => {
                    return result.response;
                }, (err) => {
                    throw err;
                });
        });
    }
};

module.exports = ReqHandlerService;