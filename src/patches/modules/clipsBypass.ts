import {BetterDiscord} from "@shared/*";
import SettingsStore from "../../global/stores/SettingsStore.ts";
import FFmpegStore from "../../global/stores/FFmpegStore.ts";
import {zipSync} from "fflate";
const {UserStore} = BetterDiscord.Webpack.Stores;

export async function ffmpegTransmux(arrayBuffer: ArrayBuffer,inFileName = "input.mp4",ffmpegArguments: string[],outFileName = "output.mp4"){
    await FFmpegStore.ensureFFmpeg();
    const ffmpeg = FFmpegStore.getFFmpegInstance();

    if(!ffmpeg) throw new Error(`Can't mux/encode: ffmpeg is not loaded!`);
    (inFileName == outFileName) && (inFileName = "in_" + inFileName);

    (arrayBuffer) && await ffmpeg.writeFile(inFileName,new Uint8Array(arrayBuffer));

    BetterDiscord.Logger.log("Approximately equivalent ffmpeg command:");
    BetterDiscord.Logger.log("ffmpeg " + ffmpegArguments.join(" "));

    await ffmpeg.exec(ffmpegArguments);
    const data = await ffmpeg.readFile(outFileName);

    (inFileName) && ffmpeg.deleteFile(inFileName);
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
        id: 0n,
        createdAt: 0,
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

    switch(clipTimestamp){
        default:
        case 0: //January 1st, 2015
            clipData.id = 0n;
            clipData.createdAt = 1420070400000;
            break;
        case 1: //Current Time
            clipData.id = (BigInt(Date.now()) - 1420070400000n) << 22n;
            clipData.createdAt = Date.now();
            break;
        case 2: //Last Modified Date
            clipData.id = (BigInt(file.file.lastModified) - 1420070400000n) << 22n;
            clipData.createdAt = file.file.lastModified;
            break;
    }

    let modifiedFile = false;

    //Video Clip
    if((file.file.size > FREE_FILE_LIMIT || forceClip) && useClipBypass && file.file.type.startsWith("video/")
        && !skippedFileTypes.includes(file.file.type) && file.file.size <= CLIPS_FILE_LIMIT){
        const ffmpegVideoClipArgs = ["-i",file.file.name,"-c:v","copy","-c:a","copy","-c:s","mov_text","-dn","-brand","isom/avc1",
            "-movflags","+faststart","-map","0","-map_metadata","-1","-map_chapters","-1","-map","-0:t","-strict","-2",outFileName
        ];

        const arrayBuffer = await file.file.arrayBuffer();
        const videoBuffer = concatArrayBuffers(await ffmpegTransmux(arrayBuffer, file.file.name, ffmpegVideoClipArgs, outFileName), udtaBuffer);
        file.file = new File([new Uint8Array(videoBuffer)], clipData.name + ".mp4", { type: "video/mp4" });
        modifiedFile = true;
    }
    //Audio Clip
    else if(useAudioClipBypass && (file.file.size > FREE_FILE_LIMIT || forceAudioClip) && (file.file.type.startsWith("audio/") && file.file.size <= CLIPS_FILE_LIMIT)){

        const ffmpegAudioClipArgs = ["-i",file.file.name,"-f","lavfi","-i","color=c=black:s=300x100","-shortest","-fflags","+shortest",
            "-map","0:v?","-map","1:v","-map","0:a","-disposition:v","default","-brand","isom/avc1","-movflags","+faststart",
            "-map_metadata","-1","-dn","-map_chapters","-1","-preset","ultrafast","-c:v","libx264","-c:a","copy","-strict","-2",
            "-tune","stillimage","-r","5","-pix_fmt","yuv420p","-vf","crop=trunc(iw/2)*2:trunc(ih/2)*2","-max_interleave_delta","1",outFileName];

        const arrayBuffer = await file.file.arrayBuffer();
        const videoBuffer = concatArrayBuffers(await ffmpegTransmux(arrayBuffer, file.file.name, ffmpegAudioClipArgs, outFileName), udtaBuffer)
        file.file = new File([new Uint8Array(videoBuffer)], clipData.name + ".mp4", { type: "video/mp4" });
        modifiedFile = true;
    }
    //ZipClip
    else if(file.file.size >= FREE_FILE_LIMIT && file.file.size <= CLIPS_FILE_LIMIT && zipClip) {
        const clipMaFFmpegArgs = ["-f","lavfi","-i","color=c=black:s=128x96:duration=1","-f","lavfi",
            "-i","anullsrc=r=44100:cl=mono","-shortest","-fflags","+shortest",
            "-brand","isom/avc1","-movflags","+faststart","-map_metadata","-1",
            "-preset","ultrafast","-vframes","5","-c:v","mjpeg","output.mp4"];
        const archiveMimeTypes = ['x-7z-compressed','x-bzip','x-bzip2','x-rar-compressed','x-tar','gzip','x-gzip','zip','x-zip-compressed'];

        const videoArrayBuffer = await ffmpegTransmux(undefined,"",clipMaFFmpegArgs,"output.mp4");

        const clipMaBuffer = concatArrayBuffers(videoArrayBuffer, udtaBuffer);
        if(!clipMaBuffer) return file;

        if(archiveMimeTypes.includes(file.file.type.replace('application/',''))) {
            const arrayBuffer = await file.file.arrayBuffer();
            const newArrBuf = concatArrayBuffers(clipMaBuffer, arrayBuffer);
            file.file = new File([new Uint8Array(newArrBuf)], file.file.name + ".mp4", { type: "video/mp4" });
            clipData.name = file.file.name;

        }else{
            let fileExtension = file.file.name.substring(file.file.name.lastIndexOf('.') + 1);
            let fileToZip = {};
            fileToZip[file.file.name] = await file.file.bytes();

            const zipFile = zipSync(fileToZip, {level: 6}).buffer;
            const zipClipArrayBuffer = concatArrayBuffers(clipMaBuffer,zipFile);

            clipData.name = (fileExtension.match(/z?\d+/)) ? file.file.name + ".zip" : clipData.name += ".zip";
            file.file = new File([new Uint8Array(zipClipArrayBuffer)], clipData.name + ".mp4", { type: "video/mp4" });
        }

        modifiedFile = true;
    }

    modifiedFile && (file.clip = clipData) //send as a clip

    return file;
}

function genericErrorHandler(err, currentFile=undefined) {
    BetterDiscord.UI.showToast("Something went wrong. See console for details.", { type: "error", forceShow: true });
    BetterDiscord.Logger.error(err);
    if(currentFile) {
        BetterDiscord.Logger.info("Current file information for debugging:", currentFile);
        BetterDiscord.Logger.info(`File Type: "${currentFile?.file?.type}"`);
    }
}

export default {
    name: "Clips Bypass",
    description: "Modify files to be sendable as a clip, changing the file upload limit to 100MB.",
    ids: undefined,
    waitFor: [x => x.addFiles],
    apply(finale, patcher) {
        patcher.instead(finale.modules[0], "addFiles", async (_, [args], originalFunction) => {
            const {useClipBypass, useAudioClipBypass, zipClip} = SettingsStore.getAll();

            if(!args?.files?.length || (!useClipBypass && !useAudioClipBypass && !zipClip)) return originalFunction.apply(_, [args]);

            args.files = await Promise.all(args.files.map(async currentFile => {
                try{
                    currentFile = await doClipsBypass(currentFile) ?? currentFile;
                }catch(err){
                    genericErrorHandler(err, currentFile);
                }
                return currentFile;
            }));

            return originalFunction.apply(_, [args]);
        });
    }
}