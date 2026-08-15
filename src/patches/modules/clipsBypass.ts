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

const udtaBuffer = new Uint8Array([0,0,0,89,109,101,116,97,0,0,0,0,0,0,0,33,104,100,108,114,0,0,0,0,0,0,0,0,109,100,105,114,97,112,112,108,0,0,0,0,0,0,0,0,0,0,0,0,44,105,108,115,116,0,0,0,36,169,116,111,111,0,0,0,28,100,97,116,97,0,0,0,1,0,0,0,0,76,97,118,102,54,49,46,51,46,49,48,51,0,0,46,46,117,117,105,100,161,200,82,153,51,70,77,184,136,240,131,245,122,117,165,239]).buffer;

export async function doClipsBypass(file){
    // const skippedAudioTypes = ['audio/mid','audio/basic','audio/mpegurl','audio/3gp'];
    // const skippedVideoTypes = ['video/3gp',"video/asf",'video/ivf', 'video/mpeg'];
    const {useClipBypass, forceClip, useAudioClipBypass, forceAudioClip, zipClip, clipTimestamp} = SettingsStore.getAll();

    const skippedFileTypes = ['video/3gp',"video/asf",'video/ivf', 'video/mpeg', 'audio/mid','audio/basic','audio/mpegurl','audio/3gp'];
    if(skippedFileTypes.includes(file.file.type)) return file;

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

    let modifiedFile;

    let arrayBuffer = await file.file.arrayBuffer();

    //Video Clip
    if((file.file.size > 20971518 || forceClip) && useClipBypass && file.file.type.startsWith("video/")
        && !skippedFileTypes.includes(file.file.type) && file.file.size <= 209715180){

        modifiedFile = concatArrayBuffers(await ffmpegTransmux(arrayBuffer, file.file.name, ["-i",file.file.name,"-c:v","copy","-c:a","copy","-c:s","mov_text","-dn","-brand","isom/avc1",
            "-movflags","+faststart","-map","0","-map_metadata","-1","-map_chapters","-1","-map","-0:t","-strict","-2",outFileName
        ], outFileName), udtaBuffer);
    }

    if(modifiedFile){
        file.file = modifiedFile;

        //send as a clip
        file.clip = clipData;
    }

    return file;

}


export default {
    name: "Clips Bypass",
    description: "Modify files to be sendable as a clip, changing the file upload limit to 100MB.",
    ids: undefined,
    waitFor: [x => x.addFiles],
    apply(finale, patcher) {
        patcher.instead(finale.modules[0], "addFiles", async (_, [args], originalFunction) => {
            const ffmpeg = FFmpegStore.getFFmpegInstance();
            const {useClipBypass, forceClip, useAudioClipBypass, forceAudioClip, zipClip, clipTimestamp} = SettingsStore.getAll();

            console.log(args);
            if(!args?.files?.length || (!useClipBypass && !useAudioClipBypass && !zipClip)) return originalFunction.apply(_, [args]);

            args.files = args.files.map(currentFile => {

                currentFile = doClipsBypass(currentFile);

                return currentFile;
            });

            return originalFunction.apply(_, [args]);
        });
    }
}