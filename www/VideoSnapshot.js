/*

Copyright 2014 Sebible Limited

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

var exec = require('cordova/exec');

module.exports = {
	/**
	* Take snapshots of a video. 
	* 
	* Time points will be calculated automatically according to the count of shots specified by user 
	* and the duration of the video. 
	*
	* @param	success		success callback function. Will receive {"result": true, "snapshots": [absolute_path...]}
	* @param	fail		fail callback function with param error object or string
	* @param	options		options object. Possible keys:
	*							source: string, a file url of the source file
	*							count: int, count of snapshots that will be taken, default 1
	*							countPerMinute: int, if specified, count will be calculated according to the duration, 
	*											default 0 (disabled)
	*							timeStamp: bool, add a timestamp at the lower-right corner, default true
	*							textSize: int, timestamp size, default 48
	*							prefix: string, optional text to print before timestamp
	*							quality: int 0<x<100, jpeg quality, default 90
	*
	*/	
	snapshot: function (success, fail, options) {
		//console.log("Trying to open " + JSON.stringify(options));
		exec(success, fail, "VideoSnapshot", "snapshot", [options]);
	},
	snapshotByTime: function (success, fail, options) {
		//console.log("Trying to open " + JSON.stringify(options));
		exec(success, fail, "VideoSnapshot", "snapshotByTime", [options]);
	}
};