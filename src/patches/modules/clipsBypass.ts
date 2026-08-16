import {BetterDiscord} from "@shared/*";
import SettingsStore from "../../global/stores/SettingsStore.ts";
import FFmpegStore from "../../global/stores/FFmpegStore.ts";
const {UserStore} = BetterDiscord.Webpack.Stores;

export async function ffmpegTransmux(arrayBuffer: ArrayBuffer,inFileName = "input.mp4",ffmpegArguments: string[],outFileName = "output.mp4"){
    await FFmpegStore.loadFFmpeg();
    const ffmpeg = FFmpegStore.getFFmpegInstance();

    if(!ffmpeg) throw new Error(`Can't mux/encode: ffmpeg is not loaded!`);
    (inFileName == outFileName) && (inFileName = "in_" + inFileName);

    await ffmpeg.writeFile(inFileName,new Uint8Array(arrayBuffer));

    console.log("Approximately equivalent ffmpeg command:");
    console.log("ffmpeg " + ffmpegArguments.join(" "));

    await ffmpeg.exec(ffmpegArguments);
    const data = await ffmpeg.readFile(outFileName);

    ffmpeg.deleteFile(inFileName);
    ffmpeg.deleteFile(outFileName);

    if(data.length == 0) throw new Error("An error occurred during muxing/encoding: Output file ended up empty or doesn't exist, " +
            "likely due to an FFmpeg error. Please check the FFmpeg logs above. " +
            "If you need assistance, please use the support channel in the Discord server.");

    return data.buffer;
}

function concatArrayBuffers(buf1, buf2){
    let newArray = new Uint8Array(buf1.byteLength + buf2.byteLength);
    newArray.set(new Uint8Array(buf1), 0);
    newArray.set(new Uint8Array(buf2), buf1.byteLength);
    return newArray.buffer;
}

const udtaBuffer = Uint8Array.fromBase64("AAAuLnV1aWShyFKZM0ZNuIjwg/V6daXv").buffer;

const FREE_FILE_LIMIT = 20971520; //20MB
const CLIPS_FILE_LIMIT = 104857600; //100MB

export async function doClipsBypass(file){
    const {useClipBypass, forceClip, useAudioClipBypass, forceAudioClip, zipClip, clipTimestamp} = SettingsStore.getAll();

    const skippedFileTypes = ['video/3gp',"video/asf",'video/ivf', 'video/mpeg', 'audio/mid','audio/basic','audio/mpegurl','audio/3gp'];
    if(skippedFileTypes.includes(file.file.type)) return file;

    //bit of explanation: for some reason, the API will not complain if the file is actually MOV but just has ".mp4" at the end,
    //and since the MOV format has support for some more formats, we take advantage of that.
    const movTypes = ["video/flv", "video/ogg", "video/wmv", "video/mov", 'audio/wav', 'audio/aiff', 'audio/x-ms-wma', 'audio/mpeg'];
    let outFileName = movTypes.includes(file.file.type) ? "output.mov" : "output.mp4";

    const clipData = {
        id: 0, //affected by clipTimestamp
        createdAt: 1420070400000, //affected by clipTimestamp
        version: 3,
        applicationName: "",
        applicationId: "1301689862256066560",
        users: [
            UserStore.getCurrentUser().id
        ],
        clipMethod: "manual",
        length: file.file.size,
        thumbnail: "",
        filepath: "",
        name: file.file.name.substring(0, file.file.name.lastIndexOf('.'))
    };

    let modifiedFile = false;

    let arrayBuffer = await file.file.arrayBuffer();

    //Video Clip
    if((file.file.size > FREE_FILE_LIMIT || forceClip) && useClipBypass && file.file.type.startsWith("video/")
        && !skippedFileTypes.includes(file.file.type) && file.file.size <= CLIPS_FILE_LIMIT){
        const ffmpegVideoClipArgs = ["-i",file.file.name,"-c:v","copy","-c:a","copy","-c:s","mov_text","-dn","-brand","isom/avc1",
            "-movflags","+faststart","-map","0","-map_metadata","-1","-map_chapters","-1","-map","-0:t","-strict","-2",outFileName
        ];

        file.file = concatArrayBuffers(await ffmpegTransmux(arrayBuffer, file.file.name, ffmpegVideoClipArgs, outFileName), udtaBuffer);
        file.file = new File([new Uint8Array(file.file)], clipData.name + ".mp4", { type: "video/mp4" });
        modifiedFile = true;
    }
    //Audio Clip
    else if(useAudioClipBypass && (file.file.size > FREE_FILE_LIMIT || forceAudioClip) && (file.file.type.startsWith("audio/") && file.file.size <= CLIPS_FILE_LIMIT)){

        const ffmpegAudioClipArgs = ["-i",file.file.name,"-f","lavfi","-i","color=c=black:s=300x100","-shortest","-fflags","+shortest",
            "-map","0:v?","-map","1:v","-map","0:a","-disposition:v","default","-brand","isom/avc1","-movflags","+faststart",
            "-map_metadata","-1","-dn","-map_chapters","-1","-preset","ultrafast","-c:v","libx264","-c:a","copy","-strict","-2",
            "-tune","stillimage","-r","5","-pix_fmt","yuv420p","-vf","crop=trunc(iw/2)*2:trunc(ih/2)*2","-max_interleave_delta","1",outFileName];

        file.file = concatArrayBuffers(await ffmpegTransmux(arrayBuffer, file.file.name, ffmpegAudioClipArgs, outFileName), udtaBuffer);
        file.file = new File([new Uint8Array(file.file)], clipData.name + ".mp4", { type: "video/mp4" });
        modifiedFile = true;
    }

    console.log(file);
    console.log(file.file);

    modifiedFile && (file.clip = clipData) //send as a clip

    return file;
}

function genericErrorHandler(err, currentFile=undefined) {
    BetterDiscord.UI.showToast("Something went wrong. See console for details.", { type: "error", forceShow: true });
    BetterDiscord.Logger.error(err);
    if(currentFile) {
        BetterDiscord.Logger.info("Current file information for debugging:", currentFile);
        BetterDiscord.Logger.info(`File Type: "${currentFile.file?.type}"`);
    }
}

export default {
    name: "Clips Bypass",
    description: "Modify files to be sendable as a clip, changing the file upload limit to 100MB.",
    ids: undefined,
    waitFor: [x => x.addFiles],
    apply(finale, patcher) {
        console.log(udtaBuffer);
        patcher.instead(finale.modules[0], "addFiles", async (_, [args], originalFunction) => {
            const {useClipBypass, forceClip, useAudioClipBypass, forceAudioClip, zipClip, clipTimestamp} = SettingsStore.getAll();

            console.log('preargs',{...args});
            if(!args?.files?.length || (!useClipBypass && !useAudioClipBypass && !zipClip)) return originalFunction.apply(_, [args]);

            args.files = await Promise.all(args.files.map(async currentFile => {
                try{
                    console.log('awaiting doClipsBypass');
                    currentFile = await doClipsBypass(currentFile);
                    console.log('received file: ', currentFile);

                    return currentFile;
                }catch(err){
                    genericErrorHandler(err, currentFile);
                }

            }));

            console.log('after args',args);
            console.log('args.files',args.files);

            try{
                return originalFunction.apply(_, [args]);
            }catch(err){
                genericErrorHandler(err);
            }
        });
    }
}