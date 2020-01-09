Cordova Video Snapshot
======================

A cordova plugin for generating video snapshots.

Platforms
---------

* Android
* IOS

Installation
------------

Install with `cordova plugin` or `plugman`. The javascript module will be injected automatically.

npm   install  com.sebible.cordova.videosnapshot

or

cordova plugin add com.sebible.cordova.videosnapshot

or

cordova plugin add  https://github.com/jeryM/cordova-videosnapshot.git

Usage
-----

`window.sebible.videosnapshot.snapshot(success, fail, options)`

in typeScript/ionic2  can use :

`declare let sebible:any;`

Take snapshots of a video. 

Time points will be calculated automatically according to the count of shots specified by user 
and the duration of the video. 

All processing is done on worker threads so no blocking on the javascript thread and it's pretty fast!


* **success**    	success callback function. Will receive {"result": true, "snapshots": [absolute_path...]}
* **fail**		fail callback function with param error object or string
* **options**		options object. Possible keys:
    *							source: string, a file url of the source file
    *							count: int, count of snapshots that will be taken, default 1
    *							countPerMinute: int, if specified, count will be calculated according to the duration, default 0 (disabled)
    *							timeStamp: bool, add a timestamp at the lower-right corner, default true
    *							textSize: int, relative timestamp size, default (48 * video_width / 1280)
    *							prefix: string, optional text to print before timestamp
    *							quality: int 0<x<100, jpeg quality, default 90
	*							timePoint: time in video default 1 (second)

Example
-------

    function success(result) {
        if (result && result.result) {
            for (var i in result.snapshots) {
                var absfilepath = result.snapshots[i];
                // Do whatever you want with absfilepath
                // Maybe assign to a img
                // $("<img>").attr("src", absfilepath).appendTo("body");
            }
        }
    }
    
    function fail(err) {
        console.log(err);
    }
    
    // This generates 3 snapshots of the source video no matter what its duration is (with timestamps printed at the lower right)
    var options = {
        source: "file:///mnt/sdcard/DCIM/Camera/0.mp4",
        count: 3,
        timeStamp: true
    }
    
    sebible.videosnapshot.snapshot(success, fail, options);
    
    // This generates 3 snapshots for every minute of the source video (with timestamps as well).
    var options2 = {
        source: "file:///mnt/sdcard/DCIM/Camera/0.mp4",
        countPerMinute: 3,
        timeStamp: true
    }
    
    sebible.videosnapshot.snapshot(success, fail, options2);
	
	`snapshotByTime`
	let options = {
          source: self.currentVideo.src,
          timePoint:timePoint+4.5, //second
          timeStamp: false
        };
        sebible.videosnapshot.snapshotByTime(function (result) {
          if (result && result.result) {
            let absfilepath = "file://"+result.snapshots[0];
            //absfilepath=/storage/emulated/0/Pictures/filename_mp4-snapshot1.jpg
            addImg.src = absfilepath;
            self.currentVideo.parentElement.appendChild(addImg);
            let toScreenshotTimeout = setTimeout( ()=>{
                clearTimeout(toScreenshotTimeout);
                //console.log("toScreenshotTimeout");
                self.currentVideo.style.display = "none";
                addImg.style.display = "inline";

                //self.currentVideo.style.height = "0px";// 方式二,占用的空间大小和video是一样的
                //addImg.style.height = "100%";

              //方式三
              //addImg.style.zIndex = "1";
              //self.currentVideo.style.zIndex = "-1";

                addImg = null;
                //Common.toScreenshot();
            },4000);

            let toScreenshotTimeout2 = setTimeout( ()=>{
              clearTimeout(toScreenshotTimeout2);
              //console.log("toScreenshotTimeout2");
              Common.toScreenshot();
            },4500);

            //Common.toScreenshot();
          }
        }, function (err) {
          console.log(err);
        }, options);

License 
-------

Apache 2.0