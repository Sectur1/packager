# PackagerJS

A package that edits and packages your HLS and DASH videos 

## Getting Started

Make sure [FFMpeg](https://ffmpeg.org/download.html) and [Shaka Packager](https://google.github.io/shaka-packager/html/documentation.html#getting-shaka-packager) are installed and add to your path

## Instalation
```
npm install packager --save
```

## Usage
```js
const packager = require("packager")

const videopackager = new packager()
//To create DASH contents
videopackager().dash([{input:"/path/to/inputfile.mkv",duration:"59",output:'/path/to/outputfile.mp4'}],'/path/to/outputDASHManifest.mpd')

// To skip creating the steams and jump generate the manifest
// Note input files must be mp4
videopackager().dash([{input:"/path/to/inputfile.mp4",output:'/path/to/outputfile.mp4'}],'/path/to/outputDASHManifest.mpd',false)

//To create HLS contents
videopackager().hls([{input:"/path/to/inputfile.mkv",duration:"59",output:'/path/to/outputfile.mp4'}],'/path/to/outputHLSManifest.m3u8')

// To skip creating the steams and jump generate the manifest
// Note input files must be mp4
videopackager().dash([{input:"/path/to/inputfile.mp4",output:'/path/to/outputfile.mp4'}],'/path/to/outputHLSManifest.m3u8',false)

//Multiply video streams can be created to and edited with FFMPEG 
p.ffmpeg([{input:'/path/to/video.mp4',duration:'10',
size:'144x360',duration:'10',aspectRatio:'4:3',framerate:'10',output:'/path/to/outvideo.mp4'},
{input:'/path/to/video.mp4',duration:'10',startTime:'10',
size:'720x360',duration:'10',aspectRatio:'4:3',framerate:'10',output:'/path/to/video.mp4'}]
)


```
## Built With

* [Shaka Packager](https://google.github.io/shaka-packager) - The packaging library used
* [FFMPEG](https://ffmpeg.org/download.html) - The library used

## Contributing

[GitHub]https://github.com/Sectur1/pakager)

## Authors

* **Seth Samuel** - [GitHub](https://github.com/Sectur1) [Twitter](https://twitter.com/SethSamuel12)


## License

This project is licensed under the MIT License 

## Options
| Video stream options     | Use                                                                              |
| -----------------------  | -------------------------------------------------------------------------------- |
| input                    | The input (This can be on the input parameter to signify 1 stream or per stream) |
| size                     | The video's size for eg "720x360"                                                |
| duration                 | The duration of the video eg "50" or "1:50"                                      |
| aspectRatio              | The video's aspect eg"16:9"                                                      |
| frameRate                | The video's framerate eg "24" or "60"                                            |
| bitsPerRawSample         | The video's Bit Per Sample                                                       |
| startTime                | Offset time to the start the video                                               |
| noVideo                  | To disenable the video                                                           |
| videoFilters             | FFMPEG's video filter                                                            |
| videoBitRate             | The video's bitrate                                                              |

| Audio options              | Use                                                                            |
| ------------------------   | ------------------------------------------------------------------------------ |
| aframes                    | Number of audio frames to output                                               |
| quality                    | Codec specific audio quality                                                   |
| sample                     | Audio sample rate in Hz                                                        |
| channels                   | Audio channels in number                                                       |
| noAudio                    | Disenables audio                                                               |
| audioCodec                 | Audio codec to use                                                             |
| volume                     | Sets the audio volume. It defaults to 256                                      |
| audiFilters                | FFMPEG's audio filter                                                          |

| General options            | Use                                                                            |
| -------------------------- | ------------------------------------------------------------------------------ |
| metadata                   | File metadata                                                                  |
| fileSize                   | Force file size                                                                |
| frames                     | Number of frames to output eg 1 for a picture                                  |
| timestamp                  | When the video was created defaults to now                                     |
| to                         | Stop transcoding at set time eg 1:50                                           |
