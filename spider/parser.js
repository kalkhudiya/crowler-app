const jsdom = require("jsdom");
const jquery = require("jquery");

const DB = require("./db");

class Parser extends DB {
	constructor() {
		super();
		this.tableHead = [];
		this.phoneNumberRegex = new RegExp(/^[+][9][1][ ]\d{10}$/);
		this.zipCodeRegex = new RegExp(/^\d{6}$/);
	}

	getUserObject(html, cb) {
		const {JSDOM} = jsdom;
		const dom = new JSDOM(html);
		const $ = jquery(dom.window);
		if ($("table thead tr").length && $("table tbody tr").length) {
			const clients = [];
			if (this.tableHead.length === 0) {
				this.tableHead = this.getTableHeaders($);
			}
			$("table tbody tr").each((row, value) => {
				const clientObj = {};
				$(value).find("td").each((i, val) => {
					clientObj[this.tableHead[i]] = val.innerHTML;
				});
				if (this.validateClientObject(clientObj)) {
					clients.push(clientObj);
				}
			});
			
			this.insertToDb(clients, (err, done) => {
				if (err && !done) {
					cb(err, null);
				} else {
					const page = this.isNextPageAvailable($);
					if (page === null) {
						this.addIndex();
					}
					cb(null, {
						page
					});
				}
			});
		}
	}

	getTableHeaders(jQryObj) {
		const tableHead = [];
		jQryObj("table thead tr").each((row, value) => {
			jQryObj(value).find("th").each((i, val) => {
				tableHead.push(val.innerHTML.toLowerCase());    
			})
		});
		return tableHead;
	}

	isNextPageAvailable(jQryObj) {
		if (jQryObj('form[method="POST"] button[class="btn btn-primary"]').length) {
			return jQryObj('form[method="POST"] button[class="btn btn-primary"]').prop('value');
		} else {
			return null;
		}
	}

	validateClientObject(obj) {
		return (
			this.phoneNumberRegex.test(obj.phone) &&
			this.zipCodeRegex.test(obj.zip)
		);
	}
}

module.exports = Parser;