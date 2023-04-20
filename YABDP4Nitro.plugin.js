/**
 * @name YABDP4Nitro
 * @author Riolubruh
 * @version 4.5.2
 * @source https://github.com/riolubruh/YABDP4Nitro
 * @updateUrl https://raw.githubusercontent.com/riolubruh/YABDP4Nitro/main/YABDP4Nitro.plugin.js
 */
/*@cc_on
@if(@_jscript)
	
	// Offer to self-install for clueless users that try to run this directly.
	var shell = WScript.CreateObject("WScript.Shell");
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\\BetterDiscord\\plugins");
	var pathSelf = WScript.ScriptFullName;
	// Put the user at ease by addressing them in the first person
	shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
	if(fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
		shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
	} else if(!fs.FolderExists(pathPlugins)) {
		shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
	} else if(shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
		fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
		// Show the user where to put plugins in the future
		shell.Exec("explorer " + pathPlugins);
		shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
	}
	WScript.Quit();

@else@*/

module.exports = (() => {
	const config = {
		"info": {
			"name": "YABDP4Nitro",
			"authors": [{
				"name": "Riolubruh",
				"discord_id": "359063827091816448",
				"github_username": "riolubruh"
			}],
			"version": "4.5.2",
			"description": "Unlock all screensharing modes, and use cross-server & GIF emotes!",
			"github": "https://github.com/riolubruh/YABDP4Nitro",
			"github_raw": "https://raw.githubusercontent.com/riolubruh/YABDP4Nitro/main/YABDP4Nitro.plugin.js"
		},
		"main": "YABDP4Nitro.plugin.js"
	};

	return !global.ZeresPluginLibrary ? class {
		constructor() {
			this._config = config;
		}
		getName() {
			return config.info.name;
		}
		getAuthor() {
			return config.info.authors.map(a => a.name).join(", ");
		}
		getDescription() {
			return config.info.description;
		}
		getVersion() {
			return config.info.version;
		}
		load() {
			BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
				confirmText: "Download Now",
				cancelText: "Cancel",
				onConfirm: () => {
					require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
						if(error) return require("electron").shell.openExternal("https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
						await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
					});
				}
			});
		}
		start() { }
		stop() { }
	} : (([Plugin, Api]) => {
		const plugin = (Plugin, Api) => {
			const {
				Patcher,
				DiscordModules,
				Settings,
				Toasts,
				Utilities,
				WebpackModules
			} = Api;
			return class YABDP4Nitro extends Plugin {
				defaultSettings = {
					"emojiSize": 64,
					"screenSharing": true,
					"emojiBypass": true,
					"ghostMode": true,
					"emojiBypassForValidEmoji": true,
					"PNGemote": true,
					"uploadEmotes": false,
					"uploadStickers": true,
					"CustomFPSEnabled": false,
					"CustomFPS": 75,
					"ResolutionEnabled": false,
					"CustomResolution": 0,
					"CustomBitrateEnabled": false,
					"minBitrate": -1,
					"maxBitrate": -1,
					"targetBitrate": -1,
					"voiceBitrate": 128,
					"audioSourcePID": 0,
					"CameraSettingsEnabled": false,
					"CameraWidth": 1920,
					"CameraHeight": 1080,
					"ResolutionSwapper": false,
					"stickerBypass": false,
					"profileV2": false,
					"forceStickersUnlocked": false,
					"changePremiumType": false,
					"videoCodec": 0,
					"clientThemes": true,
				};
				settings = Utilities.loadSettings(this.getName(), this.defaultSettings);
				getSettingsPanel() {
					return Settings.SettingPanel.build(_ => this.saveAndUpdate(), ...[
						new Settings.SettingGroup("Screen Share Features").append(...[
							new Settings.Switch("High Quality Screensharing", "1080p/Source @ 60fps screensharing. Enable if you want to use any Screen Share related options.", this.settings.screenSharing, value => this.settings.screenSharing = value),
							new Settings.Switch("Custom Screenshare Resolution", "Choose your own screen share resolution!", this.settings.ResolutionEnabled, value => this.settings.ResolutionEnabled = value),
							new Settings.Textbox("Resolution", "The custom resolution you want (in pixels)", this.settings.CustomResolution,
								value => {
									value = parseInt(value, 10);
									this.settings.CustomResolution = value;
								}),
							new Settings.Switch("Custom Screenshare FPS", "Choose your own screen share FPS!", this.settings.CustomFPSEnabled, value => this.settings.CustomFPSEnabled = value),
							new Settings.Textbox("FPS", "", this.settings.CustomFPS,
								value => {
									value = parseInt(value);
									this.settings.CustomFPS = value;
								}),
								new Settings.Switch("Stream Settings Quick Swapper", "Adds a button that will let you switch your resolution quickly!", this.settings.ResolutionSwapper, value => this.settings.ResolutionSwapper = value),
								new Settings.Switch("Custom Bitrate", "Choose the bitrate for your streams!", this.settings.CustomBitrateEnabled, value => this.settings.CustomBitrateEnabled = value),
								new Settings.Textbox("Minimum Bitrate", "The minimum bitrate (in kbps).", this.settings.minBitrate,
								value => {
									value = parseFloat(value);
									this.settings.minBitrate = value;
								}),
								new Settings.Textbox("Maximum Bitrate", "The maximum bitrate (in kbps).", this.settings.maxBitrate,
								value => {
									value = parseFloat(value);
									this.settings.maxBitrate = value;
								}),
								new Settings.Textbox("Target Bitrate", "The target bitrate (in kbps).", this.settings.targetBitrate,
								value => {
									value = parseFloat(value);
									this.settings.targetBitrate = value;
								}),
								new Settings.Textbox("Voice Audio Bitrate", "Allows you to change the bitrate to whatever you want. Does not allow you to go over the voice channel's set bitrate but it does allow you to go much lower. (bitrate in kbps).", this.settings.voiceBitrate,
								value => {
									value = parseFloat(value);
									this.settings.voiceBitrate = value;
								}),
								new Settings.Dropdown("Preferred Video Codec", "Changes the screen share video codec to the one set.", this.settings.videoCodec, [
									{label: "Default/Disabled", value: 0},
									{label: "H.264", value: 1},
									{label: "AV1", value: 2},
									{label: "VP8", value: 3},
									{label: "VP9", value: 4}], value => this.settings.videoCodec = value, {searchable: true}
								),
								new Settings.Textbox("Screen Share Audio Source", "[Advanced] Set this number to the PID of an application to stream that application's audio. Applies upon updating the screen share quality/window. (Set to 0 to disable)", this.settings.audioSourcePID,
								value => {
									value = parseInt(value);
									this.settings.audioSourcePID = value;
								})
						]),
						new Settings.SettingGroup("Emojis").append(
							new Settings.Switch("Nitro Emotes Bypass", "Enable or disable using the emoji bypass.", this.settings.emojiBypass, value => this.settings.emojiBypass = value),
							new Settings.Textbox("Size", "The size of the emoji in pixels. Valid values: 16, 32, 48, 64, 80, 96, 112, 128, or powers of 2.", this.settings.emojiSize,
								value => {
									value = parseInt(value);
									if (isNaN(value)) {
										value = 64;
									} else if (value > 128) {
										value = Math.pow(2, Math.round(Math.log(value) / Math.log(2))); 
									} else if (![16, 32, 48, 64, 80, 96, 112, 128].includes(value)) {
										value = Math.min.apply(Math, [16, 32, 48, 64, 80, 96, 112, 128].filter(function(x) { return x > value }));
									}
									this.settings.emojiSize = value;
								}
							),
							new Settings.Switch("Ghost Mode", "Abuses ghost message bug to hide the emoji url.", this.settings.ghostMode, value => this.settings.ghostMode = value),
							new Settings.Switch("Don't Use Emote Bypass if Emote is Unlocked", "Disable to use emoji bypass even if bypass is not required for that emoji.", this.settings.emojiBypassForValidEmoji, value => this.settings.emojiBypassForValidEmoji = value),
							new Settings.Switch("Use PNG instead of WEBP", "Use the PNG version of emoji for higher quality!", this.settings.PNGemote, value => this.settings.PNGemote = value),
							new Settings.Switch("Upload Emotes as Images", "Upload emotes as image(s) after message is sent. (Overrides linking emotes)", this.settings.uploadEmotes, value => this.settings.uploadEmotes = value),
							new Settings.Switch("Sticker Bypass", "Enable or disable using the sticker bypass. I recommend using An00nymushun's DiscordFreeStickers over this. Animated APNG/WEBP/Lottie Stickers will not animate.", this.settings.stickerBypass, value => this.settings.stickerBypass = value),
							new Settings.Switch("Upload Stickers", "Upload stickers in the same way as emotes.", this.settings.uploadStickers, value => this.settings.uploadStickers = value),
							new Settings.Switch("Force Stickers Unlocked", "Enable to cause Stickers to be unlocked.", this.settings.forceStickersUnlocked, value => this.settings.forceStickersUnlocked = value)
						),
						new Settings.SettingGroup("Camera").append(
						new Settings.Switch("Enabled", "", this.settings.CameraSettingsEnabled, value => this.settings.CameraSettingsEnabled = value),
						new Settings.Textbox("Camera Resolution Width", "Camera Resolution Width in pixels. (Set to -1 to disable)", this.settings.CameraWidth,
								value => {
									value = parseInt(value);
									this.settings.CameraWidth = value;
								}),
						new Settings.Textbox("Camera Resolution Height", "Camera Resolution Height in pixels. (Set to -1 to disable)", this.settings.CameraHeight,
							value => {
								value = parseInt(value);
								this.settings.CameraHeight = value;
							})
						),
						new Settings.SettingGroup("Miscellaneous").append(
							new Settings.Switch("Profile Accents", "When enabled, you will see (almost) all users with the new Nitro-exclusive look for profiles (the sexier look). When disabled, the default behavior is used. Does not allow you to update your profile accent.", this.settings.profileV2, value => this.settings.profileV2 = value),
							new Settings.Switch("Change PremiumType", "This is now optional. Enabling this may help compatibility for certain things or harm it. SimpleDiscordCrypt requires that this be enabled to have emojis work correctly.", this.settings.changePremiumType, value => this.settings.changePremiumType = value),
							new Settings.Switch("Gradient Client Themes", "Allows you to use Nitro-exclusive Client Themes.", this.settings.clientThemes, value => this.settings.clientThemes = value)
						)
					])
				}
				
				saveAndUpdate(){ //Saves and updates settings and runs functions
					Utilities.saveSettings(this.getName(), this.settings);
					BdApi.Patcher.unpatchAll("YABDP4Nitro");
					Patcher.unpatchAll();
					
					if(this.settings.changePremiumType){
						BdApi.findModuleByProps("getCurrentUser").getCurrentUser().premiumType = 1;
						setTimeout(() => {
							if(this.settings.changePremiumType){
								BdApi.findModuleByProps("getCurrentUser").getCurrentUser().premiumType = 1;
							}
						}, 10000);
					}
					
					if(this.settings.CustomFPS == 15) this.settings.CustomFPS = 16;
					if(this.settings.CustomFPS == 30) this.settings.CustomFPS = 31;
					if(this.settings.CustomFPS == 5) this.settings.CustomFPS = 6;
					
					this.videoQualityModule(); //Quality Module
					this.audioShare(); //Audio PID module
					if(document.getElementById("qualityButton")) document.getElementById("qualityButton").remove();
					if(document.getElementById("qualityMenu")) document.getElementById("qualityMenu").remove();
					if(document.getElementById("qualityInput")) document.getElementById("qualityInput").remove();
					this.buttonCreate(); //Fast Quality Button and Menu
					document.getElementById("qualityInput").addEventListener("input", this.updateQuick);
					document.getElementById("qualityInputFPS").addEventListener("input", this.updateQuick);
					if(!this.settings.ResolutionSwapper){
						if(document.getElementById("qualityButton") != undefined) document.getElementById("qualityButton").style.display = 'none'
						if(document.getElementById("qualityMenu") != undefined) document.getElementById("qualityMenu").style.display = 'none'
					}
					
					let permissions = BdApi.findModuleByProps("canUseCustomBackgrounds");
					BdApi.Patcher.instead("YABDP4Nitro", permissions, "canUseClientThemes", () => {
						return true
					});
					
					if(this.settings.stickerBypass){
						this.stickerSending();
					}
					
					if(this.settings.emojiBypass){
						this.emojiBypass();
						BdApi.Patcher.instead("YABDP4Nitro", permissions, "canUseAnimatedEmojis", () => {
							return true
						});
						BdApi.Patcher.instead("YABDP4Nitro", permissions, "canUseEmojisEverywhere", () => {
							return true
						});
					}
					
					if(this.settings.profileV2 == true){
						BdApi.Patcher.instead("YABDP4Nitro", permissions, "isPremiumAtLeast", () => {
							return true;
						});
					}
					
					if(!this.settings.emojiBypass && (this.originalNitroStatus == (null || undefined))){
						BdApi.Patcher.instead("YABDP4Nitro", permissions, "canUseAnimatedEmojis", () => {
							return false;
						});
						BdApi.Patcher.instead("YABDP4Nitro", permissions, "canUseEmojisEverywhere", () => {
							return false;
						});
					}
					
					if(this.settings.screenSharing){
						if(this.settings.ResolutionEnabled || this.settings.CustomFPSEnabled){
							this.customVideoSettings(); //Apply custom screen share options
						}
						BdApi.Patcher.instead("YABDP4Nitro", permissions, "canStreamMidQuality", () => {
							return true;
						});
						BdApi.Patcher.instead("YABDP4Nitro", permissions, "canStreamMedQuality", () => {
							return true;
						});
						BdApi.Patcher.instead("YABDP4Nitro", permissions, "canStreamHighQuality", () => {
							return true;
						});
						
					}
					
					if(this.settings.forceStickersUnlocked){
						BdApi.Patcher.instead("YABDP4Nitro", permissions, "canUseStickersEverywhere", () => {
							return true
						});
					}
					if(this.settings.clientThemes){
						try{
							let clientthemesmodule = BdApi.Webpack.getModule(BdApi.Webpack.Filters.byProps("isPreview"));
							delete clientthemesmodule.isPreview;
							Object.defineProperty(clientthemesmodule, "isPreview", { //Enabling the nitro theme settings
								value: false,
								configurable: true,
								enumerable: true,
								writable: true,
							});
							const shouldSync = WebpackModules.getByProps("shouldSync"); //Disabling syncing the profile theme
							Patcher.instead(shouldSync, "shouldSync", (callback, arg) => {
								console.log(arg);
								if(arg[0] = "appearance"){
									return false
								}else{
									callback.shouldSync(arg);
								}
							});
						}catch(err){
							console.warn(err)
						}
					}
					
				} //End of saveAndUpdate

				async UploadEmote(url, channelIdLmao, msg, emoji, runs){
					const Uploader = WebpackModules.getByProps("uploadFiles", "upload");
					if(emoji === undefined){
						let emoji;
					}
					if(msg === undefined){
						let msg;
					}
					let extension = ".gif";
					if(!emoji.animated) {
						extension = ".png";
						if(!this.settings.PNGemote) {
							extension = ".webp";
						}
					}
					
					let file = await fetch(url).then(r => r.blob()).then(blobFile => new File([blobFile], (emoji.name + extension)))
					file.platform = 1;
					file.spoiler = false;
					
					const CloudUploader = WebpackModules.getByProps("m","n");
					
					let fileUp = new CloudUploader.n({file:file,platform:1}, channelIdLmao);
					fileUp.isImage = true;
					
					let uploadOptions = new Object();
					uploadOptions.channelId = channelIdLmao;
					uploadOptions.uploads = [fileUp];
					uploadOptions.draftType = 0;
					uploadOptions.options = { stickerIds: [] };
					uploadOptions.parsedMessage = { channelId: channelIdLmao, content: msg[1].content, tts: false, invalidEmojis:[] }
					if(runs > 1){
						uploadOptions.parsedMessage = { channelId: channelIdLmao, content: "", tts: false, invalidEmojis:[] }
					}
					
					try{
						await Uploader.uploadFiles(uploadOptions);
					}catch(err){
						console.error(err);
					}
				}

				emojiBypassForValidEmoji(emoji, currentChannelId){ //Made into a function to save space and clean up
					if(this.settings.emojiBypassForValidEmoji){
						if((DiscordModules.SelectedGuildStore.getLastSelectedGuildId() == emoji.guildId) && !emoji.animated && (DiscordModules.ChannelStore.getChannel(currentChannelId.toString()).type <= 0)) {
						//If emoji is from current guild, not animated, and we are actually in a guild channel, cancel emoji bypass
							return true //Returning true cancels emoji bypass
						}
					}
					return false
				}
				
				async customVideoSettings() {
					const StreamButtons = WebpackModules.getByProps("LY", "aW", "ws");
					if(this.settings.ResolutionEnabled){
						if(this.settings.CustomResolution != 0){
							StreamButtons.LY.RESOLUTION_1440 = this.settings.CustomResolution;
							StreamButtons.ND[4].resolution = this.settings.CustomResolution;
							StreamButtons.ND[5].resolution = this.settings.CustomResolution;
							StreamButtons.ND[6].resolution = this.settings.CustomResolution;
							StreamButtons.WC[2].value = this.settings.CustomResolution;
							delete StreamButtons.WC[2].label;
							StreamButtons.WC[2].label = this.settings.CustomResolution.toString();
							StreamButtons.km[3].value = this.settings.CustomResolution;
							delete StreamButtons.km[3].label;
							StreamButtons.km[3].label = this.settings.CustomResolution + "p";
						}
					}
					if(!this.settings.ResolutionEnabled || (this.settings.CustomResolution == 0)){
						StreamButtons.LY.RESOLUTION_1440 = 1440;
						StreamButtons.ND[4].resolution = 1440;
						StreamButtons.ND[5].resolution = 1440;
						StreamButtons.ND[6].resolution = 1440;
						StreamButtons.WC[2].value = 1440;
						delete StreamButtons.WC[2].label;
						StreamButtons.WC[2].label = "1440p";
						StreamButtons.km[3].value = 1440;
						delete StreamButtons.km[3].label;
						StreamButtons.km[3].label = "1440p";
					}
					
					function replace60FPSRequirements(x) {
						if(x.fps != 30 && x.fps != 15 && x.fps != 5) x.fps = BdApi.getData("YABDP4Nitro","settings").CustomFPS;
					}
					function restore60FPSRequirements(x) {
						if(x.fps != 30 && x.fps != 15 && x.fps != 5) x.fps = 60;
					}
					
					if(this.settings.CustomFPSEnabled){
						if(this.CustomFPS != 60){
							StreamButtons.ND.forEach(replace60FPSRequirements);
							StreamButtons.af[2].value = this.settings.CustomFPS;
							delete StreamButtons.af[2].label;
							StreamButtons.af[2].label = this.settings.CustomFPS + " FPS";
							StreamButtons.k0[2].value = this.settings.CustomFPS;
							delete StreamButtons.k0[2].label;
							StreamButtons.k0[2].label = this.settings.CustomFPS;
							StreamButtons.ws.FPS_60 = this.settings.CustomFPS;
						}
					}
					if(!this.settings.CustomFPSEnabled || this.CustomFPS == 60){
						StreamButtons.ND.forEach(restore60FPSRequirements);
						StreamButtons.af[2].value = 60;
						delete StreamButtons.af[2].label;
						StreamButtons.af[2].label = 60 + " FPS";
						StreamButtons.k0[2].value = 60;
						delete StreamButtons.k0[2].label;
						StreamButtons.k0[2].label = 60;
						StreamButtons.ws.FPS_60 = 60;
					}
					
					if(BdApi.Webpack.getModule(BdApi.Webpack.Filters.byStrings("updateRemoteWantsFramerate"))){
						let L = BdApi.Webpack.getModule(BdApi.Webpack.Filters.byStrings("updateRemoteWantsFramerate")).prototype;
						//console.log(L);
						if(L){
							BdApi.Patcher.instead("YABDP4Nitro", L, "updateRemoteWantsFramerate", () => {
							return
						});
						}
						return
					}else{
						let R = await BdApi.Webpack.waitForModule(BdApi.Webpack.Filters.byStrings("updateRemoteWantsFramerate"));
						if(R){
							BdApi.Patcher.instead("YABDP4Nitro", R, "updateRemoteWantsFramerate", () => {
							return
						});
						}
					}
				}

				async emojiBypass(){ //Moved to a function to declutter saveAndUpdate
					//Upload Emotes
					if(this.settings.uploadEmotes) {
						BdApi.Patcher.instead("YABDP4Nitro", DiscordModules.MessageActions, "sendMessage", (_, b, send) => {
							let currentChannelId = BdApi.findModuleByProps("getLastChannelFollowingDestination").getChannelId();
							let runs = 0;
							b[1].validNonShortcutEmojis.forEach(emoji => {
								if(this.emojiBypassForValidEmoji(emoji, currentChannelId)){
									return
								}
								if(emoji.url.startsWith("/assets/")){
									return
								}
								if(this.settings.PNGemote) {
									emoji.url = emoji.url.replace('.webp', '.png');
								}
								runs++;
								emoji.url = emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&quality=lossless`
								b[1].content = b[1].content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\b\d+\b/g, "")}${emoji.id}>`, "");
								this.UploadEmote(emoji.url, currentChannelId, b, emoji, runs);
								return
							});
							if((b[1].content !== undefined && b[1].content != "") && runs == 0) {
								send(b[0], b[1], b[2], b[3]);
							}
							return
						});
					}
					//Emoji bypass with ghost mode
					if(this.settings.ghostMode && !this.settings.uploadEmotes) {
						BdApi.Patcher.before("YABDP4Nitro", DiscordModules.MessageActions, "sendMessage", (_, [, msg]) => {
							let currentChannelId = BdApi.findModuleByProps("getLastChannelFollowingDestination").getChannelId();
							msg.validNonShortcutEmojis.forEach(emoji => {
								if(emoji.url.startsWith("/assets/")){
									return
								}
								if(this.settings.PNGemote) {
									emoji.url = emoji.url.replace('.webp', '.png')
								}
								if(this.emojiBypassForValidEmoji(emoji, currentChannelId)){
									return
								}
								//if ghost mode is not required
								if(msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\b\d+\b/g, "")}${emoji.id}>`, "") == "") {
									msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\b\d+\b/g, "")}${emoji.id}>`, emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&quality=lossless `)
									return;
								}
								let ghostmodetext = "||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|| _ _ _ _ _ "
								if(msg.content.includes(ghostmodetext)) {
									if(msg.content.includes(("https://embed.rauf.wtf/?&image=" + emoji.url.split("?")[0]))) {//Duplicate emoji handling (second duplicate)
										msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\b\d+\b/g, "")}${emoji.id}>`, ""), msg.content += " " + "https://test.rauf.workers.dev/?&image=" + emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&quality=lossless `
										return
									}
									if(msg.content.includes(emoji.url.split("?")[0])) { //Duplicate emoji handling (first duplicate)
										msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\b\d+\b/g, "")}${emoji.id}>`, ""), msg.content += " " + "https://embed.rauf.wtf/?&image=" + emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&quality=lossless `
										return
									}
									msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\b\d+\b/g, "")}${emoji.id}>`, ""), msg.content += " " + emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&quality=lossless `//, console.log(msg.content), console.log("Multiple emojis")
									return
								}
								msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\b\d+\b/g, "")}${emoji.id}>`, ""), msg.content += ghostmodetext + "\n" + emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&quality=lossless `//, console.log(msg.content), console.log("First emoji code ran")
								return
							})
						});
					}else
						//Original method
						if(!this.settings.ghostMode && !this.settings.uploadEmotes) {
							//console.log("Classic Method (No Ghost)")
							BdApi.Patcher.before("YABDP4Nitro", DiscordModules.MessageActions, "sendMessage", (_, [, msg]) => {
								let currentChannelId = BdApi.findModuleByProps("getLastChannelFollowingDestination").getChannelId();
								msg.validNonShortcutEmojis.forEach(emoji => {
									if(this.settings.PNGemote) {
										emoji.url = emoji.url.replace('.webp', '.png')
									}
									if(emoji.url.startsWith("/assets/")){
										return
									}
									if(this.emojiBypassForValidEmoji(emoji, currentChannelId)){
										return
									}
									if(msg.content.includes(("https://embed.rauf.wtf/?&image=" + emoji.url.split("?")[0]))) {//Duplicate emoji handling (second duplicate)
										msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\b\d+\b/g, "")}${emoji.id}>`, ""), msg.content += " " + "https://test.rauf.workers.dev/?&image=" + emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&quality=lossless `
										return
									}
									if(msg.content.includes(emoji.url.split("?")[0])) { //Duplicate emoji handling (first duplicate)
										msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\b\d+\b/g, "")}${emoji.id}>`, ""), msg.content += " " + "https://embed.rauf.wtf/?&image=" + emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&quality=lossless `
										return
									}
									msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\b\d+\b/g, "")}${emoji.id}>`, emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&quality=lossless `)//, console.log(msg.content), console.log("no ghost")
								})
							});
							//editing message (in classic mode)
							BdApi.Patcher.before("YABDP4Nitro", DiscordModules.MessageActions, "editMessage", (_, obj) => {
								let msg = obj[2].content
								if(msg.search(/\d{18}/g) == -1) return;
								if(msg.includes(":ENC:")) return; //Fix jank with editing SimpleDiscordCrypt encrypted messages.
								msg.match(/<a:.+?:\d{18}>|<:.+?:\d{18}>/g).forEach(idfkAnymore => {
									obj[2].content = obj[2].content.replace(idfkAnymore, `https://cdn.discordapp.com/emojis/${idfkAnymore.match(/\d{18}/g)[0]}?size=${this.settings.emojiSize}`)
								})
							});
						}
					}
				
				updateQuick(){ //Function that runs when the resolution/fps quick menu is changed
					parseInt(document.getElementById("qualityInput").value);
					BdApi.getData("YABDP4Nitro", "settings").CustomResolution = parseInt(document.getElementById("qualityInput").value);
					parseInt(document.getElementById("qualityInputFPS").value);
					BdApi.getData("YABDP4Nitro", "settings").CustomFPS = parseInt(document.getElementById("qualityInputFPS").value);
					if(parseInt(document.getElementById("qualityInputFPS").value) == 15) BdApi.getData("YABDP4Nitro", "settings").CustomFPS = 16;
					if(parseInt(document.getElementById("qualityInputFPS").value) == 30) BdApi.getData("YABDP4Nitro", "settings").CustomFPS = 31;
					if(parseInt(document.getElementById("qualityInputFPS").value) == 5) BdApi.getData("YABDP4Nitro", "settings").CustomFPS = 6;
					
					const StreamButtons = WebpackModules.getByProps("LY", "aW", "ws");
					if(BdApi.getData("YABDP4Nitro", "settings").ResolutionEnabled){
						if(BdApi.getData("YABDP4Nitro", "settings").CustomResolution != 0){
							StreamButtons.LY.RESOLUTION_SOURCE = BdApi.getData("YABDP4Nitro", "settings").CustomResolution;
							StreamButtons.ND[0].resolution = BdApi.getData("YABDP4Nitro", "settings").CustomResolution;
							StreamButtons.ND[1].resolution = BdApi.getData("YABDP4Nitro", "settings").CustomResolution;
							StreamButtons.ND[2].resolution = BdApi.getData("YABDP4Nitro", "settings").CustomResolution;
							StreamButtons.ND[3].resolution = BdApi.getData("YABDP4Nitro", "settings").CustomResolution;
							StreamButtons.WC[2].value = BdApi.getData("YABDP4Nitro", "settings").CustomResolution;
							delete StreamButtons.WC[2].label;
							StreamButtons.WC[2].label = BdApi.getData("YABDP4Nitro", "settings").CustomResolution.toString();
							StreamButtons.km[3].value = BdApi.getData("YABDP4Nitro", "settings").CustomResolution;
							delete StreamButtons.km[3].label;
							StreamButtons.km[3].label = BdApi.getData("YABDP4Nitro", "settings").CustomResolution + "p";
						}
					}
					if(!BdApi.getData("YABDP4Nitro", "settings").ResolutionEnabled || (BdApi.getData("YABDP4Nitro", "settings").CustomResolution == 0)){
						StreamButtons.LY.RESOLUTION_SOURCE = 0;
						StreamButtons.ND[0].resolution = 0;
						StreamButtons.ND[1].resolution = 0;
						StreamButtons.ND[2].resolution = 0;
						StreamButtons.ND[3].resolution = 0;
						StreamButtons.WC[2].value = 0;
						delete StreamButtons.WC[2].label;
						StreamButtons.WC[2].label = "Source";
						StreamButtons.km[3].value = 0;
						delete StreamButtons.km[3].label;
						StreamButtons.km[3].label = "Source";
					}
					
					function replace60FPSRequirements(x) {
						if(x.fps != 30 && x.fps != 15 && x.fps != 5) x.fps = BdApi.getData("YABDP4Nitro", "settings").CustomFPS;
					}
					function restore60FPSRequirements(x) {
						if(x.fps != 30 && x.fps != 15 && x.fps != 5) x.fps = 60;
					}

					
					if(BdApi.getData("YABDP4Nitro", "settings").CustomFPSEnabled){
						if(this.CustomFPS != 60){
							StreamButtons.ND.forEach(replace60FPSRequirements);
							StreamButtons.af[2].value = BdApi.getData("YABDP4Nitro", "settings").CustomFPS;
							delete StreamButtons.af[2].label;
							StreamButtons.af[2].label = BdApi.getData("YABDP4Nitro", "settings").CustomFPS + " FPS";
							StreamButtons.k0[2].value = BdApi.getData("YABDP4Nitro", "settings").CustomFPS;
							delete StreamButtons.k0[2].label;
							StreamButtons.k0[2].label = BdApi.getData("YABDP4Nitro", "settings").CustomFPS;
							StreamButtons.ws.FPS_60 = BdApi.getData("YABDP4Nitro", "settings").CustomFPS;
						}
					}
					if(!(BdApi.getData("YABDP4Nitro", "settings").CustomFPSEnabled)){
						StreamButtons.ND.forEach(restore60FPSRequirements);
						StreamButtons.af[2].value = 60;
						delete StreamButtons.af[2].label;
						StreamButtons.af[2].label = 60 + " FPS";
						StreamButtons.k0[2].value = 60;
						delete StreamButtons.k0[2].label;
						StreamButtons.k0[2].label = 60;
						StreamButtons.ws.FPS_60 = 60;
					}
				}
				
				audioShare(){
					const shareModule = WebpackModules.getByPrototypes("setSoundshareSource").prototype
					if(this.settings.audioSourcePID != 0){
					BdApi.Patcher.before("YABDP4Nitro", shareModule, "setSoundshareSource", (a,b) => {
						console.log(b);
						if(this.settings.audioSourcePID == 0){
							return
						}
						b[0] = this.settings.audioSourcePID;
					});
					}
				}
				
				videoQualityModule(){ //Custom Bitrates
					const b = ZLibrary.WebpackModules.getByProps("S", "Z")
					const videoOptionFunctions = b.Z.prototype;
					if(this.settings.CustomBitrateEnabled){
						BdApi.Patcher.before("YABDP4Nitro", videoOptionFunctions, "updateVideoQuality", (e) => {
							//Minimum Bitrate
							e.framerateReducer.sinkWants.qualityOverwrite.bitrateMin = (this.settings.minBitrate * 1000);
							e.videoQualityManager.qualityOverwrite.bitrateMin = (this.settings.minBitrate * 1000);
							
							
							//Maximum Bitrate
							e.framerateReducer.sinkWants.qualityOverwrite.bitrateMax = (this.settings.maxBitrate * 1000);
							e.videoQualityManager.qualityOverwrite.bitrateMax = (this.settings.maxBitrate * 1000);
							
							
							//Target Bitrate
							e.framerateReducer.sinkWants.qualityOverwrite.bitrateTarget = (this.settings.targetBitrate * 1000);
							e.videoQualityManager.qualityOverwrite.bitrateTarget = (this.settings.targetBitrate * 1000);
							
							//Bonus: Audio Bitrate
							e.voiceBitrate = (this.settings.voiceBitrate * 1000);
						});
					}
					if(this.settings.CustomFPSEnabled){
						BdApi.Patcher.before("YABDP4Nitro", videoOptionFunctions, "updateVideoQuality", (e) => {
							//console.log(e);
							e.videoQualityManager.options.videoBudget.framerate = e.videoStreamParameters[0].maxFrameRate;
							e.videoQualityManager.options.videoCapture.framerate = e.videoStreamParameters[0].maxFrameRate;
							for(const ladder in e.videoQualityManager.ladder.ladder) {
								e.videoQualityManager.ladder.ladder[ladder].framerate = e.videoStreamParameters[0].maxFrameRate;
								e.videoQualityManager.ladder.ladder[ladder].mutedFramerate = parseInt(e.videoStreamParameters[0].maxFrameRate / 2);
							}
							for(const ladder of e.videoQualityManager.ladder.orderedLadder){
								  ladder.framerate = e.videoStreamParameters[0].maxFrameRate;
								  ladder.mutedFramerate = parseInt(e.videoStreamParameters[0].maxFrameRate / 2);
							}
						});
					}
					if(this.settings.ResolutionEnabled || this.settings.CustomFPSEnabled){
						BdApi.Patcher.before("YABDP4Nitro", videoOptionFunctions, "updateVideoQuality", (e) => {
							const videoQuality = new Object({
								width: e.videoStreamParameters[0].maxResolution.width,
								height: e.videoStreamParameters[0].maxResolution.height,
								framerate: e.videoStreamParameters[0].maxFrameRate,
							});
							e.videoQualityManager.options.videoBudget = videoQuality;
							e.videoQualityManager.options.videoCapture = videoQuality;
							e.videoQualityManager.ladder.pixelBudget = (e.videoStreamParameters[0].maxResolution.height * e.videoStreamParameters[0].maxResolution.width);
						});
					}
					if(this.settings.CameraSettingsEnabled){ //If Camera Patching On
						BdApi.Patcher.after("YABDP4Nitro", videoOptionFunctions, "updateVideoQuality", (e) => {
							if(e.stats !== undefined){ //Error prevention
								if(e.stats.camera !== undefined){ //Is camera enabled?
									if(e.videoStreamParameters[0] !== undefined){
										e.videoStreamParameters[0].maxPixelCount = (this.settings.CameraHeight * this.settings.CameraWidth);
										if(e.videoStreamParameters[0].maxResolution.height){
										if(this.settings.CameraHeight >= 0){ //Height in pixels
											e.videoStreamParameters[0].maxResolution.height = this.settings.CameraHeight;
										}}
										if(e.videoStreamParameters[0].maxResolution.width){
										if(this.settings.CameraWidth >= 0){ //Width in pixels
											e.videoStreamParameters[0].maxResolution.width = this.settings.CameraWidth;
										}}
									}
									if(e.videoStreamParameters[1] !== undefined){
										if(this.settings.CameraHeight >= 0){ //Height in pixels
											e.videoStreamParameters[1].maxResolution.height = this.settings.CameraHeight;
										}
										
										if(this.settings.CameraWidth >= 0){ //Width in pixels
											e.videoStreamParameters[1].maxResolution.width = this.settings.CameraWidth;
										}
									e.videoStreamParameters[1].maxPixelCount = (this.settings.CameraHeight * this.settings.CameraWidth);
									}
									//---- VQM Bypasses ----//
									if(this.settings.CameraWidth >= 0){
										e.videoQualityManager.options.videoCapture.width = this.settings.CameraWidth;
										e.videoQualityManager.options.videoBudget.width = this.settings.CameraWidth;
									}
									if(this.settings.CameraHeight >= 0){
										e.videoQualityManager.options.videoCapture.height = this.settings.CameraHeight;
										e.videoQualityManager.options.videoBudget.height = this.settings.CameraHeight;
									}
									e.videoQualityManager.ladder.pixelBudget = (this.settings.CameraHeight * this.settings.CameraWidth);
									 
								}
							}
						});	
					}
					if(this.settings.videoCodec > 0){ // Video codecs
						BdApi.Patcher.before("YABDP4Nitro", videoOptionFunctions, "updateVideoQuality", (e) => {
							let isCodecH264 = false;
							let isCodecAV1  = false;
							let isCodecVP8  = false;
							let isCodecVP9  = false;
							switch(this.settings.videoCodec){
								case 1:
									//console.log("case 1 -> isCodecH264");
									isCodecH264 = true;
									break;
								case 2:
									//console.log("case 2 -> isCodecAV1");
									isCodecAV1 = true;
									break;
								case 3:
									//console.log("case 3 -> isCodecVP8");
									isCodecVP8 = true;
									break;
								case 4:
									//console.log("case 4 -> isCodecVP9");
									isCodecVP9 = true;
									break;
							}
							
							let currentHighestNum = 1;
							function setPriority(codec){
								switch(codec){
									case 0:
									if(isCodecH264){
										return 1;
										break;
									}else{
										currentHighestNum += 1;
										return currentHighestNum;
									}
									break;
									
								case 1:
									if(isCodecAV1){
										return 1;
										break;
									}else{
										currentHighestNum += 1;
										return currentHighestNum;
									}
									break;
								case 2:
									if(isCodecVP8){
										return 1;
										break;
									}else{
										currentHighestNum += 1;
										return currentHighestNum;
									}
									break;
								case 3:
									if(isCodecVP9){
										return 1;
										break;
									}else{
										currentHighestNum += 1;
										return currentHighestNum;
									}
									break;
								}
								
							}
							
							if(e.codecs != undefined && e.codecs[1]?.decode != undefined){
								e.codecs[2].decode = isCodecH264; //H.264
								e.codecs[2].encode = isCodecH264;
								e.codecs[2].priority = parseInt(setPriority(0));
								
								e.codecs[1].decode = isCodecAV1; //AV1
								e.codecs[1].encode = isCodecAV1;
								e.codecs[1].priority = parseInt(setPriority(1));
								
								e.codecs[3].decode = isCodecVP8; //VP8
								e.codecs[3].encode = isCodecVP8;
								e.codecs[3].priority = parseInt(setPriority(2));
								
								e.codecs[4].decode = isCodecVP9; //VP9
								e.codecs[4].encode = isCodecVP9;
								e.codecs[4].priority = parseInt(setPriority(3));
							}
							
							
						});
					}
				}
				
				buttonCreate(){ //Creates the FPS and Resolution Swapper
					let qualityButton = document.createElement('button');
					qualityButton.id = 'qualityButton';
					qualityButton.className = "lookFilled-1H2Jvj colorBrand-2M3O3N";
					qualityButton.innerHTML = '<p style="display: block-inline; margin-left: -6%; margin-top: -4.5%;">Quality</p>';
					qualityButton.style.position = "relative";
					qualityButton.style.zIndex = "2";
					qualityButton.style.bottom = "-33%";
					qualityButton.style.left = "-50%";
					qualityButton.style.height = "15px";
					qualityButton.style.width = "48px";
					qualityButton.style.verticalAlign = "middle";
					qualityButton.style.textAlign = "left";
					qualityButton.style.borderTopLeftRadius = "5px";
					qualityButton.style.borderTopRightRadius = "4px";
					qualityButton.style.borderBottomLeftRadius = "4px";
					qualityButton.style.borderBottomRightRadius = "4px";
					
					qualityButton.onclick = function(){
					  if(qualityMenu.style.visibility == "hidden") {
						qualityMenu.style.visibility = "visible";
					  }else {
						qualityMenu.style.visibility = "hidden";
					  }
					}
					
					try{
						document.getElementsByClassName("container-YkUktl")[0].appendChild(qualityButton);
						}catch(err){
						console.warn("YABDP4Nitro: What the fuck happened	? During buttonCreate()");
						console.log(err);
					};

					let qualityMenu = document.createElement('div');
					qualityMenu.id = 'qualityMenu';
					qualityMenu.style.visibility = 'hidden';
					qualityMenu.style.position = "relative";
					qualityMenu.style.zIndex = "1";
					qualityMenu.style.bottom = "410%";
					qualityMenu.style.left = "-59%";
					qualityMenu.style.height = "20px";
					qualityMenu.style.width = "100px";
					qualityMenu.onclick = function(event){
						event.stopPropagation();
					}
					
					document.getElementById("qualityButton").appendChild(qualityMenu);

					let qualityInput = document.createElement('input');
					qualityInput.id = 'qualityInput';
					qualityInput.type = 'text';
					qualityInput.placeholder = 'Resolution';
					qualityInput.style.width = "33%";
					qualityInput.style.zIndex = "1";
					qualityInput.value = this.settings.CustomResolution;
					qualityMenu.appendChild(qualityInput);
					
					let qualityInputFPS = document.createElement('input');
					qualityInputFPS.id = 'qualityInputFPS';
					qualityInputFPS.type = 'text';
					qualityInputFPS.placeholder = 'FPS';
					qualityInputFPS.style.width = "33%";
					qualityInputFPS.style.zIndex = "1";
					qualityInputFPS.value = this.settings.CustomFPS;
					qualityMenu.appendChild(qualityInputFPS);
				} //End of buttonCreate()
				
				async stickerSending(){
					const permissions = BdApi.findModuleByProps("canUseCustomBackgrounds");
					BdApi.Patcher.instead("YABDP4Nitro", permissions, "canUseStickersEverywhere", () => {
						return true;
					});
					
					BdApi.Patcher.instead("YABDP4Nitro", DiscordModules.MessageActions, "sendStickers", (_,b) => {
						let stickerID = b[1][0];
						let stickerURL = "https://media.discordapp.net/stickers/" + stickerID + ".png?size=4096&quality=lossless"
						let currentChannelId = BdApi.findModuleByProps("getLastChannelFollowingDestination").getChannelId();
						
						if(this.settings.uploadStickers){
							let emoji = new Object();
							emoji.animated = false;
							emoji.name = b[0];
							let msg = [undefined,{content: ""}]
							this.UploadEmote(stickerURL, currentChannelId, [undefined,{content:""}], emoji)
							return
						}
						if(!this.settings.uploadStickers){
							let messageContent = {content: stickerURL, tts: false, invalidEmojis:[], validNonShortcutEmojis:[]}
							DiscordModules.MessageActions.sendMessage(currentChannelId, messageContent, undefined, {})
						}
					});
				}
				
				onStart() {
					this.originalNitroStatus = BdApi.findModuleByProps("getCurrentUser").getCurrentUser().premiumType;
					this.previewInitial = BdApi.Webpack.getModule(BdApi.Webpack.Filters.byProps("isPreview")).isPreview;
					this.saveAndUpdate();
				}

				onStop() {
					BdApi.findModuleByProps("getCurrentUser").getCurrentUser().premiumType = this.originalNitroStatus;
					Patcher.unpatchAll();
					BdApi.Patcher.unpatchAll("YABDP4Nitro");
					if(document.getElementById("qualityButton")) document.getElementById("qualityButton").remove();
					if(document.getElementById("qualityMenu")) document.getElementById("qualityMenu").remove();
					if(document.getElementById("qualityInput")) document.getElementById("qualityInput").remove();
					BdApi.Webpack.getModule(BdApi.Webpack.Filters.byProps("isPreview")).isPreview = this.previewInitial;
				}
			};
		};
		return plugin(Plugin, Api);
	})(global.ZeresPluginLibrary.buildPlugin(config));
})();
/*@end@*/
