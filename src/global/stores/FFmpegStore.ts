import {BetterDiscord} from "@shared/";
const {Logger, Net, UI} = BetterDiscord;
import {fs, _path} from "../../index.tsx";

const BASE_URL = `https://raw.githubusercontent.com/riolubruh/YABDP4Nitro/refs/heads/main/ffmpeg/`;

export default new class FFmpegStore extends BetterDiscord.Utils.Store {
    private ffmpeg: any;
    private loaded: boolean = false;

    constructor() {
        super();
    }

    async ensureFFmpeg(){
        if(this.loaded) return;
        const defineTemp = window.global.define;

        let ffmpegScript = document.getElementById("ffmpegScript");
        if(ffmpegScript) {
            ffmpegScript.remove();
        }
        delete window.FFmpegWASM;

        function tryFetchFromDisk(filename, encoding){
            const basepath = _path().join(BdApi.Plugins.folder, "ffmpeg");
            let filepath = _path().join(basepath, filename);
            try{
                if(fs().existsSync(filepath)){
                    let file = fs().readFileSync(filepath, encoding);
                    Logger.info(`Fetch from disk for file ${filename} succeeded.`);
                    return file;
                }
                else return false;
            }catch(err){
                Logger.warn("Tried to read " + filename + " from disk but an error occurred.");
                Logger.warn(err);
            }
        }

        async function fetchFFmpeg(filename){
            const res = await Net.fetch(BASE_URL + filename, { timeout: 100000 });
            if(res.ok && res.status == 200){
                return res;
            }else{
                Logger.error(res);
                throw new Error(filename + " failed to fetch.");
            }
        }

        async function fetchBlobUrl(filename){
            try{
                let blobUrl;
                let file = tryFetchFromDisk(filename, "");
                if(file) blobUrl = URL.createObjectURL(new Blob([file]));
                else blobUrl = URL.createObjectURL(await (await fetchFFmpeg(filename)).blob());
                return blobUrl;
            }catch(err){
                Logger.error("An error occurred while fetching " + filename);
                throw err;
            }
        }

        let ffmpegWorkerURL, ffmpegCoreURL, ffmpegURL, ffmpegCoreWasmURL;
        try {

            //load 814.ffmpeg.js (ffmpeg worker)
            ffmpegWorkerURL = await fetchBlobUrl("814.ffmpeg.js");

            //load FFmpeg.js as text
            let ffmpegSrc;
            try{
                let file = tryFetchFromDisk("ffmpeg.js", "utf8");
                if(file) ffmpegSrc = file;
                else ffmpegSrc = await (await fetchFFmpeg("ffmpeg.js")).text();
            }catch(err){
                Logger.error("An error occurred while fetching ffmpeg.js");
                throw err;
            }

            //patch worker URL in the source of ffmpeg.js (why is this a problem lmao)
            ffmpegSrc = ffmpegSrc.replace(`new URL(e.p+e.u(814),e.b)`, `"${ffmpegWorkerURL.toString()}"`);
            //blob ffmpeg
            ffmpegURL = URL.createObjectURL(new Blob([ffmpegSrc]));

            // for some reason, for ffmpeg.js to work we need to set global define to undefined temporarily.
            // since for a brief moment it is undefined, any function that uses it may throw an error during that window.
            window.global.define = undefined;

            //load external JS as a script
            await new Promise((load, err) => {
                const ffmpegScriptElem = document.createElement("script");
                ffmpegScriptElem.id = "ffmpegScript";
                ffmpegScriptElem.src = ffmpegURL;
                ffmpegScriptElem.onload = load;
                ffmpegScriptElem.onerror = err;
                document.head.appendChild(ffmpegScriptElem);
            });

            window.global.define = defineTemp;

            //load ffmpeg core
            ffmpegCoreURL = await fetchBlobUrl("ffmpeg-core.js");

            ffmpegCoreWasmURL = await fetchBlobUrl("ffmpeg-core.wasm");

            if(window.FFmpegWASM && ffmpegCoreURL && ffmpegCoreWasmURL && ffmpegWorkerURL) {
                this.ffmpeg = new window.FFmpegWASM.FFmpeg();

                await this.ffmpeg.load({
                    coreURL: ffmpegCoreURL,
                    wasmURL: ffmpegCoreWasmURL
                });
                Logger.info("FFmpeg load success!");
                this.loaded = true;
                this.ffmpeg.on("log", ({ message }) => {
                    console.log(message);
                });
            }else{
                Logger.info("FFmpegWASM", window.FFmpegWASM);
                Logger.info("ffmpegCoreURL", ffmpegCoreURL);
                Logger.info("ffmpegCoreWasmURL", ffmpegCoreWasmURL);
                Logger.info("ffmpegWorkerURL",ffmpegWorkerURL);
                throw new Error("One or more of the necessary components failed to load.");
            }
        } catch(err) {
            UI.showToast("An error occured trying to load FFmpeg.wasm. Check console for details.", { type: "error", forceShow: true });
            Logger.info("FFmpeg failed to load. The clips bypass will not work without this unless the file is already the correct format! Include above and below error messages (if they exist) when reporting!");
            Logger.error(err);
        } finally {
            //Ensure we return window.global.define to its regular state just in case we errored during the short window where it has to be set to undefined.
            window.global.define = defineTemp;
            //revoke blob urls since we dont actually need them anymore
            if(ffmpegURL) URL.revokeObjectURL(ffmpegURL);
            if(ffmpegCoreURL) URL.revokeObjectURL(ffmpegCoreURL);
            if(ffmpegCoreWasmURL) URL.revokeObjectURL(ffmpegCoreWasmURL);
            if(ffmpegWorkerURL) URL.revokeObjectURL(ffmpegWorkerURL);
        }
    } //End of loadFFmpeg()

    unload(){
        if(this.loaded){
            this.ffmpeg.terminate();
            this.ffmpeg = undefined;
        }
        const ffmpegScript = document.getElementById("ffmpegScript");
        (ffmpegScript) && (ffmpegScript.remove());
        if(window.FFmpegWASM) delete window.FFmpegWASM;
        this.loaded = false;
    }

    getFFmpegInstance(){
        return this.ffmpeg;
    }
}
