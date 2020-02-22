const childProcess = require('child_process')


function packager(){
    this.dash = (input,output,...args)=>{
        console.log("Packaging started");
        //checks if the number args is an object 
        if(args&&typeof args !== 'object'){console.log('args must be of type object');throw(Error("args must be of type object"))}        
        let ffmpegcmd = '',shakacmd = `in=${args[0].output},stream=audio,output=${args[0].output}`
            for (arg of args){
                ffmpegcmd += ` -i ${input?`${input}`:`${arg.input}`} ${arg.format?`-s ${arg.format}`:'' } ${arg.duration?` -t ${arg.duration}`:''}
                ${arg.aspectRatio?` -aspect ${arg.aspectRatio}`:''} ${arg.framerate?` -r ${arg.framerate}`:''} ${arg.bitsPerRawSample?` -bits_per_raw_sample ${arg.bitsPerRawSample}`:''} 
                ${arg.startTime?`-ss ${arg.startTime}`:''} ${arg.aframes?`-aframes ${arg.aframes}`:''} ${arg.quality?`-aq ${arg.quality}`:''} ${arg.sample?`-ar ${arg.sample}`:''} ${arg.channels?`-ac ${arg.channels}`:''}
                ${arg.noAudio?`-an `:''} ${arg.audioCodec?`-acodec ${arg.audioCodec}`:''} ${arg.to?`-to ${arg.to}`:''}
                ${arg.metadata?`-metadata ${arg.metadata}`:''} ${arg.fileSize?`-fs ${arg.fileSize}`:''} ${arg.frames?`-frames ${arg.frames}`:''} ${arg.timestamp?`-timestamp ${arg.timestamp}`:''}
                ${arg.noVideo?` -vn ${arg.noVideo}`:''} ${arg.videoFilters?` -vf ${arg.videoFilters}`:''} ${arg.audioBitrate?` -b:a ${arg.audioBitrate}`:''} ${arg.videoBitrate?` -b:a ${arg.videoBitrate}`:''}
                ${arg.output?arg.output:''}`.replace(/\s+/g, ' ')
                shakacmd += ` in=${arg.output},stream=video,output=${arg.output+'video.mp4'}`
        } 
         
        if(args){
            childProcess.exec(`ffmpeg ${ffmpegcmd}`,(error,stdout,stderr)=>{
                console.log("Creating streamings");
                
                if(error){
                    console.error(error)
                }else{
                    console.log("Streams created successfully")
                    childProcess.exec(`packager ${shakacmd} --mpd_output ${output}.mpd`,(error,stdout,stderr)=>{
                        if(error){
                            console.error(error,stderr)
                        }else{
                            console.log("Packaged successfully")
                        }
                    })
                }

            })
            
        }
    }
    this.hls=(input,output,...args)=>{
        //checks if the number args is an object
        console.info('Creating streams') 
        childProcess.exec('echo seth')

        if(args&&typeof args !== 'object'){console.log('args must be of type object');throw(Error("args must be of type object"))}        
        let ffmpegcmd = '',shakacmd = [`in=${args[0].output},stream=audio,segment_template=${args[0].output}aac/$Number$.aac,playlist_name=${args[0].output.substring(args[0].output.lastIndexOf('/')+1)}aac/main.m3u8,hls_group_id=audio,hls_name=ENGLISH `]
                for (arg of args){
                    ffmpegcmd += ` -i ${input?`${input}`:`${arg.input}`} ${arg.format?`-s ${arg.format}`:'' } ${arg.duration?` -t ${arg.duration}`:''}
                    ${arg.aspectRatio?` -aspect ${arg.aspectRatio}`:''} ${arg.framerate?` -r ${arg.framerate}`:''} ${arg.bitsPerRawSample?` -bits_per_raw_sample ${arg.bitsPerRawSample}`:''} 
                    ${arg.startTime?`-ss ${arg.startTime}`:''} ${arg.aframes?`-aframes ${arg.aframes}`:''} ${arg.quality?`-aq ${arg.quality}`:''} ${arg.sample?`-ar ${arg.sample}`:''} ${arg.channels?`-ac ${arg.channels}`:''}
                    ${arg.noAudio?`-an `:''} ${arg.audioCodec?`-acodec ${arg.audioCodec}`:''} ${arg.to?`-to ${arg.to}`:''}
                    ${arg.metadata?`-metadata ${arg.metadata}`:''} ${arg.fileSize?`-fs ${arg.fileSize}`:''} ${arg.frames?`-frames ${arg.frames}`:''} ${arg.timestamp?`-timestamp ${arg.timestamp}`:''}
                    ${arg.noVideo?` -vn ${arg.noVideo}`:''} ${arg.videoFilters?` -vf ${arg.videoFilters}`:''} ${arg.audioBitrate?` -b:a ${arg.audioBitrate}`:''} ${arg.videoBitrate?` -b:a ${arg.videoBitrate}`:''}
                    ${arg.output?arg.output:''}`.replace(/\s+/g, ' ') 
                    shakacmd.push(`in=${arg.output},stream=video,segment_template=${arg.output}ts/$Number$.ts,playlist_name=${arg.output.substring(arg.output.lastIndexOf('/')+1)}ts/main.m3u8,iframe_playlist_name=${arg.output.substring(arg.output.lastIndexOf('/')+1)}ts/iframe.m3u8`)
            }    

        if(args){
            childProcess.exec(`ffmpeg ${ffmpegcmd}`,(error,stdout)=>{
                if(error){
                    console.error(error)
                }else{
                    console.log("Streams created successfully")
                    let packager = childProcess.spawn('packager',[...shakacmd,`--hls_master_playlist_output`, `${output}.m3u8`])
                    packager.stderr.on('data',(err)=>console.error(`Stderr: ${err}`))
                    packager.stdout.on('data',data=>console.log(`Stdout: ${data}`))
    
                }

            })
            
        }
    }
    this.ffmpeg = (input, output, ...args)=>{
        let ffmpegcmd = ''
            for(arg of args){
                ffmpegcmd += ` -i ${input?`${input}`:`${arg.input}`} ${arg.format?`-s ${arg.format}`:'' } ${arg.duration?` -t ${arg.duration}`:''}
                ${arg.aspectRatio?` -aspect ${arg.aspectRatio}`:''} ${arg.framerate?` -r ${arg.framerate}`:''} ${arg.bitsPerRawSample?` -bits_per_raw_sample ${arg.bitsPerRawSample}`:''} 
                ${arg.startTime?`-ss ${arg.startTime}`:''} ${arg.aframes?`-aframes ${arg.aframes}`:''} ${arg.quality?`-aq ${arg.quality}`:''} ${arg.sample?`-ar ${arg.sample}`:''} ${arg.channels?`-ac ${arg.channels}`:''}
                ${arg.noAudio?`-an `:''} ${arg.audioCodec?`-acodec ${arg.audioCodec}`:''} ${arg.to?`-to ${arg.to}`:''}
                ${arg.metadata?`-metadata ${arg.metadata}`:''} ${arg.fileSize?`-fs ${arg.fileSize}`:''} ${arg.frames?`-frames ${arg.frames}`:''} ${arg.timestamp?`-timestamp ${arg.timestamp}`:''}
                ${arg.noVideo?` -vn ${arg.noVideo}`:''} ${arg.videoFilters?` -vf ${arg.videoFilters}`:''} ${arg.audioBitrate?` -b:a ${arg.audioBitrate}`:''} ${arg.videoBitrate?` -b:a ${arg.videoBitrate}`:''}
                ${arg.output?arg.output:''}`.replace(/\s+/g, ' ')
                }
        childProcess.exec(`ffmpeg ${ffmpegcmd} -y`,(error,stdout,stderr)=>{
            if(error){console.error(error)}else{console.log(stdout, 'Successful created')}
            
        })
        
    }
}
