//import {FFmpeg} from "@ffmpeg/ffmpeg"; //does not work
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import {BetterDiscord} from "@shared/";

const BASE_URL = `https://raw.githubusercontent.com/riolubruh/YABDP4Nitro/refs/heads/main/ffmpeg`;

export default new class FFmpegStore extends BetterDiscord.Utils.Store {
    private ffmpeg: FFmpeg = new FFmpeg();
    private loaded: boolean = false;

    constructor() {
        super();
    }

    async loadFFmpeg(){
        if(this.loaded) return;

        await this.ffmpeg.load({
            coreURL: await toBlobURL(`${BASE_URL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${BASE_URL}/ffmpeg-core.wasm`, 'application/wasm'),
        })
        this.loaded = true;
    }

    getFFmpegInstance(){
        return this.ffmpeg;
    }


}
