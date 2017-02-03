'use strict'

const store = require('../../store');

module.exports = {

	type(){
		return 'locationScript';
	},

	digest(currentFrame, message, fbID) {
		if(message[0].payload !== undefined && message[0].title !== 'Attachment Unavailable') {
			store.users[fbID]['data'][currentFrame["responseKey"]] = JSON.stringify(message[0].payload.coordinates);
		} else {
			store.users[fbID]['flags'].push("unknown-input");
		}
	},

	format(currentFrame, message, fbID){

		currentFrame["options"] = [
			{
				"content_type": "location"
			}
		]

		return currentFrame;
	}
}
