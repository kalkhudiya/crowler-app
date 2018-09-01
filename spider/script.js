const request = require("request");

const Parser = require("./parser");

class Script extends Parser {
    constructor() {
        super();
        this.url = "https://jointhecrew.in/clients/";
        this.clients = [];
    }

    initSpider(page = null) {
        console.log('request for ' + page);
        const cbFunc = (err, resp, body) => {
            if(typeof resp === "object" && resp.statusCode == 200) {
                this.getUserObject(body, (err, obj) => {
                    if (!err && obj) {
                        if (obj.page) {
                            this.initSpider(obj.page);
                        } else {
                            console.log('Done...!');
                        }
                    } else {
                        console.log("error while fetching url retrying with page ", page);
                        this.initSpider(page);
                    }
                });
            } else {
                console.log("error while fetching url retrying with page ", page);
                this.initSpider(page);
            }
        };
        if (page) {
            request.post({
                url: this.url,
                form: { page }
            }, cbFunc);
        } else {
            request.get(this.url, null, cbFunc);
        }
    }
}

module.exports = Script;