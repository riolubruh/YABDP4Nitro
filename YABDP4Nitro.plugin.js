/**
 * @name YABDP4Nitro
 * @author Riolubruh
 * @version 4.3.6
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
			"version": "4.3.6",
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
				Utilities
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
					"activityJoiningMode": false,
					"activityBypass": true,
					"customActivityURL": "",
					"customActivity": false
				};
				settings = Utilities.loadSettings(this.getName(), this.defaultSettings);
				getSettingsPanel() {
					return Settings.SettingPanel.build(_ => this.saveAndUpdate(), ...[
						new Settings.SettingGroup("Screen Share Features").append(...[
							new Settings.Switch("High Quality Screensharing", "1080p/source @ 60fps screensharing. There is no reason to disable this.", this.settings.screenSharing, value => this.settings.screenSharing = value),
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
								new Settings.Textbox("Screen Share Audio Source", "[Advanced] Set this number to the PID of an application to stream that application's audio! Applies upon updating the screen share quality/window. (Set to 0 to disable)", this.settings.audioSourcePID,
								value => {
									value = parseInt(value);
									this.settings.audioSourcePID = value;
								})
						]),
						new Settings.SettingGroup("Emojis").append(
							new Settings.Switch("Nitro Emotes Bypass", "Enable or disable using the emoji bypass.", this.settings.emojiBypass, value => this.settings.emojiBypass = value),
							new Settings.Slider("Size", "The size of the emoji in pixels. 48 is the default.", 16, 128, this.settings.emojiSize, size => this.settings.emojiSize = size, { markers: [16, 32, 48, 64, 80, 96, 112, 128], stickToMarkers: true }),
							new Settings.Switch("Ghost Mode", "Abuses ghost message bug to hide the emoji url.", this.settings.ghostMode, value => this.settings.ghostMode = value),
							new Settings.Switch("Don't Use Emote Bypass if Emote is Unlocked", "Disable to use emoji bypass even if bypass is not required for that emoji.", this.settings.emojiBypassForValidEmoji, value => this.settings.emojiBypassForValidEmoji = value),
							new Settings.Switch("Use PNG instead of WEBP", "Use the PNG version of emoji for higher quality!", this.settings.PNGemote, value => this.settings.PNGemote = value),
							new Settings.Switch("Upload Emotes as Images", "Upload emotes as image(s) after message is sent. (Overrides linking emotes) [Warning: this breaks shit currently, such as replies. Use at your own risk.]", this.settings.uploadEmotes, value => this.settings.uploadEmotes = value),
							new Settings.Switch("Sticker Bypass", "Enable or disable using the sticker bypass.", this.settings.stickerBypass, value => this.settings.stickerBypass = value)
						),
						new Settings.SettingGroup("Camera [Beta]").append(
						new Settings.Switch("Enabled", this.settings.CameraSettingsEnabled, value => this.settings.CameraSettingsEnabled = value),
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
							new Settings.Switch("Activity Bypass", "Use this to play Activities! (All users must be running the plugin for it to work correctly!)", this.settings.activityBypass, value => this.settings.activityBypass = value),
							new Settings.Switch("Custom Activity", "Enable this to use a custom URL for an Activity!", this.settings.customActivity, value => this.settings.customActivity = value),
							new Settings.Textbox("Custom Activity URL", "", this.settings.customActivityURL, value => this.settings.customActivityURL = value)
						)
					])
				}

				saveAndUpdate(){ //Saves and updates settings and runs functions
					Utilities.saveSettings(this.getName(), this.settings);
					BdApi.Patcher.unpatchAll("YABDP4Nitro");
					Patcher.unpatchAll();
					
					if(this.settings.CustomFPS == 15) this.settings.CustomFPS = 16;
					if(this.settings.CustomFPS == 30) this.settings.CustomFPS = 31;
					if(this.settings.CustomFPS == 5) this.settings.CustomFPS = 6;
					
					this.videoQualityModule(); //Bitrate Module
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
					//console.log(permissions);
					
					if(this.settings.stickerBypass){
						this.stickerSending();
					}
					
					if(this.settings.emojiBypass){
						this.emojiBypass()
						BdApi.Patcher.instead("YABDP4Nitro", permissions, "canUseAnimatedEmojis", () => {
							return true
						});
						BdApi.Patcher.instead("YABDP4Nitro", permissions, "canUseEmojisEverywhere", () => {
							return true
						});
					}
					
					if(this.settings.stickerBypass || this.settings.emojiBypass || this.settings.screenSharing){
						BdApi.findModuleByProps("getCurrentUser").getCurrentUser().premiumType = 1;
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
						BdApi.Patcher.instead("YABDP4Nitro", permissions, "canStreamHighQuality", () => {
							return true;
						});
						BdApi.Patcher.instead("YABDP4Nitro", permissions, "canStreamMedQuality", () => {
							return true;
						});
					}
					
					if(!this.settings.emojiBypass && !this.settings.stickerBypass && !this.settings.screenSharing){
						BdApi.findModuleByProps("getCurrentUser").getCurrentUser().premiumType = this.originalNitroStatus;
						if(this.originalNitroStatus == (null || undefined)){
							BdApi.Patcher.instead("YABDP4Nitro", permissions, "canUseStickersEverywhere", () => {
								return false;
							});
						}
					}
					
					if(this.settings.activityBypass){
						BdApi.Patcher.instead("YABDP4Nitro", permissions, "canUseActivities", () => {
							return true;
						});
						BdApi.Patcher.instead("YABDP4Nitro", permissions, "canUsePremiumActivities", () => {
							return true;
						});
						this.activities();
					}
				} //End of saveAndUpdate

				async UploadEmote(url, channelIdLmao, msg, emoji, runs) {
					const Uploader = BdApi.findModuleByProps('instantBatchUpload');
					if(url.includes("stickers")){
						const fetchoptions = {
								method: 'GET',
								mode: 'cors',
								headers: {
								'origin':'discord.com'
							}
						};
						let blob = await fetch(('https://cors-anywhere.riolubruh.repl.co/' + url),fetchoptions).then(r => r.blob());
						await blob;
							
						await Uploader.upload({
							channelId: channelIdLmao,
							file: new File([blob], "sticker", {type: "image/png"}),
							draftType: 0,
							message: { content: undefined, invalidEmojis: [], tts: false, channel_id: channelIdLmao},
							hasSpoiler: false,
							filename: "sticker.png"
						});
					}
				
					var extension = ".gif";
					if(!url.includes("stickers")){
						if(!emoji.animated) {
							extension = ".png";
							if(!this.settings.PNGemote) {
								extension = ".webp";
							}
						}
						let file = await fetch(url).then(r => r.blob()).then(blobFile => new File([blobFile], "emote"))
						
						if(runs > 1){
							await Uploader.upload({
							channelId: channelIdLmao,
							file: new File([file], emoji.name),
							draftType: 0,
							message: { content: undefined, invalidEmojis: [], tts: false, channel_id: channelIdLmao },
							hasSpoiler: false,
							filename: emoji.name + extension
						});
						return
						}
					
					await Uploader.upload({
							channelId: channelIdLmao,
							file: new File([file], emoji.name),
							draftType: 0,
							message: { content: msg[1].content, invalidEmojis: [], tts: false, channel_id: channelIdLmao},
							hasSpoiler: false,
							filename: emoji.name + extension
						})
					};
				}

				emojiBypassForValidEmoji(emoji, currentChannelId){ //Made into a function to save space and clean up
					if(this.settings.emojiBypassForValidEmoji){
						BdApi.findModuleByProps("getCurrentUser").getCurrentUser().premiumType = this.originalNitroStatus;
						
						let emojiLocked = BdApi.findModuleByProps("isEmojiFilteredOrLocked").isEmojiFilteredOrLocked(emoji);
						
						if(!emojiLocked){ //If emoji NOT locked, cancel emoji bypass
							BdApi.findModuleByProps("getCurrentUser").getCurrentUser().premiumType = 1;
							return true //Returning true cancels emoji bypass
						}
						if((DiscordModules.SelectedGuildStore.getLastSelectedGuildId() == emoji.guildId) && !emoji.animated && (DiscordModules.ChannelStore.getChannel(currentChannelId.toString()).type <= 0)) {
						//If emoji is from current guild, not animated, and we are actually in a guild channel, cancel emoji bypass
							BdApi.findModuleByProps("getCurrentUser").getCurrentUser().premiumType = 1;
							return true //Returning true cancels emoji bypass
						}
						BdApi.findModuleByProps("getCurrentUser").getCurrentUser().premiumType = 1;
					}
					return false
				}
				
				async customVideoSettings() {
					const StreamButtons = ZLibrary.WebpackModules.getByIndex(664637);
					if(this.settings.ResolutionEnabled){
						if(this.settings.CustomResolution != 0){
							StreamButtons.LY.RESOLUTION_SOURCE = this.settings.CustomResolution;
							StreamButtons.ND[0].resolution = this.settings.CustomResolution;
							StreamButtons.ND[1].resolution = this.settings.CustomResolution;
							StreamButtons.ND[2].resolution = this.settings.CustomResolution;
							StreamButtons.ND[3].resolution = this.settings.CustomResolution;
							StreamButtons.WC[2].value = this.settings.CustomResolution;
							delete StreamButtons.WC[2].label;
							StreamButtons.WC[2].label = this.settings.CustomResolution.toString();
							StreamButtons.km[3].value = this.settings.CustomResolution;
							delete StreamButtons.km[3].label;
							StreamButtons.km[3].label = this.settings.CustomResolution + "p";
						}
					}
					if(!this.settings.ResolutionEnabled || (this.settings.CustomResolution == 0)){
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
							var currentChannelId = BdApi.findModuleByProps("getLastChannelFollowingDestination").getChannelId();
							var runs = 0;
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
								emoji.url = emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&size=${this.settings.emojiSize}`
								b[1].content = b[1].content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\d/g, "")}${emoji.id}>`, "");
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
							var currentChannelId = BdApi.findModuleByProps("getLastChannelFollowingDestination").getChannelId();
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
								if(msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\d/g, "")}${emoji.id}>`, "") == "") {
									msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\d/g, "")}${emoji.id}>`, emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&size=${this.settings.emojiSize} `)
									return;
								}
								let ghostmodetext = "||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|| _ _ _ _ _ "
								if(msg.content.includes(ghostmodetext)) {
									if(msg.content.includes(("https://embed.rauf.wtf/?&image=" + emoji.url.split("?")[0]))) {//Duplicate emoji handling (second duplicate)
										msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\d/g, "")}${emoji.id}>`, ""), msg.content += " " + "https://test.rauf.workers.dev/?&image=" + emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&size=${this.settings.emojiSize} `
										return
									}
									if(msg.content.includes(emoji.url.split("?")[0])) { //Duplicate emoji handling (first duplicate)
										msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\d/g, "")}${emoji.id}>`, ""), msg.content += " " + "https://embed.rauf.wtf/?&image=" + emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&size=${this.settings.emojiSize} `
										return
									}
									msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\d/g, "")}${emoji.id}>`, ""), msg.content += " " + emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&size=${this.settings.emojiSize} `//, console.log(msg.content), console.log("Multiple emojis")
									return
								}
								msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\d/g, "")}${emoji.id}>`, ""), msg.content += ghostmodetext + "\n" + emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&size=${this.settings.emojiSize} `//, console.log(msg.content), console.log("First emoji code ran")
								return
							})
						});
					}else
						//Original method
						if(!this.settings.ghostMode && !this.settings.uploadEmotes) {
							//console.log("Classic Method (No Ghost)")
							BdApi.Patcher.before("YABDP4Nitro", DiscordModules.MessageActions, "sendMessage", (_, [, msg]) => {
								var currentChannelId = BdApi.findModuleByProps("getLastChannelFollowingDestination").getChannelId();
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
										msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\d/g, "")}${emoji.id}>`, ""), msg.content += " " + "https://test.rauf.workers.dev/?&image=" + emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&size=${this.settings.emojiSize} `
										return
									}
									if(msg.content.includes(emoji.url.split("?")[0])) { //Duplicate emoji handling (first duplicate)
										msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\d/g, "")}${emoji.id}>`, ""), msg.content += " " + "https://embed.rauf.wtf/?&image=" + emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&size=${this.settings.emojiSize} `
										return
									}
									msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\d/g, "")}${emoji.id}>`, emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&size=${this.settings.emojiSize} `)//, console.log(msg.content), console.log("no ghost")
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
					
					const StreamButtons = ZLibrary.WebpackModules.getByIndex(664637);
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
					let shareModule = BdApi.Webpack.getModule(BdApi.Webpack.Filters.byPrototypeFields("setSoundshareSource")).prototype;
					//console.log(shareModule);
					if(this.settings.audioSourcePID != 0){
					BdApi.Patcher.before("YABDP4Nitro", shareModule, "setSoundshareSource", (a,b) => {
						if(this.settings.audioSourcePID == 0){
							return
						}
						b[0] = this.settings.audioSourcePID;
					});
					}
				}
				
				videoQualityModule(){ //Custom Bitrates
					let b = BdApi.Webpack.getModule(BdApi.Webpack.Filters.byStrings("audioSSRC"));
					let videoOptionFunctions = b.prototype;
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
							e.videoQualityManager.options.videoBudget.framerate = this.settings.CustomFPS;
							e.videoQualityManager.options.videoCapture.framerate = this.settings.CustomFPS;
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
				}
				
				buttonCreate(){ //Creates the FPS and Resolution Swapper
					var qualityButton = document.createElement('button');
					qualityButton.id = 'qualityButton';
					qualityButton.innerHTML = 'Quality';
					qualityButton.style.zIndex = "2";
					qualityButton.style.bottom = "-30%";
					qualityButton.style.left = "-60%";
					qualityButton.style.height = "14px";
					qualityButton.style.width = "50px";
					qualityButton.className = "buttonColor-3bP3fX button-f2h6uQ lookFilled-yCfaCM colorBrand-I6CyqQ"
					try{
						document.getElementsByClassName("container-YkUktl")[0].appendChild(qualityButton)
						}catch(err){
						console.warn("YABDP4Nitro: What the fuck happened? During buttonCreate()");
						console.log(err);
					};

					var qualityMenu = document.createElement('div');
					qualityMenu.id = 'qualityMenu';
					qualityMenu.style.display = 'none';
					qualityMenu.style.position = "absolute";
					qualityMenu.style.zIndex = "1";
					qualityMenu.style.bottom = "140%";
					qualityMenu.style.left = "-45%";
					qualityMenu.style.height = "20px";
					qualityMenu.style.width = "100px";
					qualityMenu.onclick = function(event){
						event.stopPropagation();
					}
					
					document.getElementById("qualityButton").appendChild(qualityMenu);

					var qualityInput = document.createElement('input');
					qualityInput.id = 'qualityInput';
					qualityInput.type = 'text';
					qualityInput.placeholder = 'Resolution';
					qualityInput.style.width = "33%";
					qualityInput.style.zIndex = "1";
					qualityInput.value = this.settings.CustomResolution;
					qualityMenu.appendChild(qualityInput);
					
					var qualityInputFPS = document.createElement('input');
					qualityInputFPS.id = 'qualityInputFPS';
					qualityInputFPS.type = 'text';
					qualityInputFPS.placeholder = 'FPS';
					qualityInputFPS.style.width = "33%";
					qualityInputFPS.style.zIndex = "1";
					qualityInputFPS.value = this.settings.CustomFPS;
					qualityMenu.appendChild(qualityInputFPS);
					
					qualityButton.onclick = function() {
					  if(qualityMenu.style.display === 'none') {
						qualityMenu.style.display = 'block';
					  } else {
						qualityMenu.style.display = 'none';
					  }
					}
				} //End of buttonCreate()
				
				async stickerSending(){
					let permissions = BdApi.findModuleByProps("canUseCustomBackgrounds");
					BdApi.Patcher.instead("YABDP4Nitro", permissions, "canUseStickersEverywhere", () => {
						return true;
					});
					BdApi.Patcher.instead("YABDP4Nitro", DiscordModules.MessageActions, "sendStickers", (_,b) => {
						let stickerID = b[1][0];
						let stickerURL = "cdn.discordapp.com/stickers/" + stickerID + ".png?size=4096&size=4096"
						this.UploadEmote(stickerURL, b[0]);
					});
				}
				
				activities(){
					let b = ZLibrary.WebpackModules.getByIndex(331792);
					let d = ZLibrary.WebpackModules.getByIndex(124581);
					let c = b.Z._dispatcher;
					BdApi.Patcher.before("YABDP4Nitro", BdApi.React, "createElement", (_,h) => {
						if(h[1]) if(h[1].className) if(h[1].className == "activityItem-1Z9CTr"){
							let test = document.getElementsByClassName("flex-2S1XBF flex-3BkGQD horizontalReverse-60Katr horizontalReverse-2QssvL flex-3BkGQD directionRowReverse-HZatnx justifyStart-2Mwniq alignStretch-Uwowzr noWrap-hBpHBz footer-31IekZ footer-yVEuwO");
							let textField = test[0].firstChild;
							if(textField) if(textField.innerText === "Have feedback? Take the survey"){
								BdApi.getData("YABDP4Nitro", "settings").activityJoiningMode = false;
								let test = document.getElementsByClassName("defaultColor-24IHKz text-sm-normal-3Zj3Iv");
								let togglerElement = textField;
								togglerElement.innerHTML = `<a class="anchor-1MIwyf anchorUnderlineOnHover-2qPutX">Enable joining mode</a>`;
								let asdf = function(){
									let test = document.getElementsByClassName("defaultColor-24IHKz text-sm-normal-3Zj3Iv");
									let togglerElement = textField;
									if(togglerElement.innerHTML == `<a class="anchor-1MIwyf anchorUnderlineOnHover-2qPutX">Disable joining mode</a>`){
										BdApi.getData("YABDP4Nitro", "settings").activityJoiningMode = false;
										togglerElement.innerHTML = `<a class="anchor-1MIwyf anchorUnderlineOnHover-2qPutX">Enable joining mode</a>`;
										ZLibrary.Toasts.info("Cancelled", {timeout: 1000});
										return
									}
									BdApi.getData("YABDP4Nitro", "settings").activityJoiningMode = true;
									togglerElement.innerHTML = `<a class="anchor-1MIwyf anchorUnderlineOnHover-2qPutX">Disable joining mode</a>`;
									ZLibrary.Toasts.info("First, pick the activity that the host is running", {timeout: 3000});
									if(!this.settings.customActivity && (this.settings.customActivityURL != "")) ZLibrary.Toasts.info("Custom URL Enabled: Click any activity", {timeout: 3000});
								}
								textField.onclick = asdf;
							}
						}
					});
					BdApi.Patcher.instead("YABDP4Nitro", d, "Z", (_,N,f) => {
						if(N !== undefined){
							if(N[0].inflatedBundleItem.application.id){
								if(this.settings.activityJoiningMode){ //Join mode enabled
									//First, pick the host's activity (just ask them)
									var intendedActivityId = N[0].inflatedBundleItem.application.id;
									//console.log(N);
									if(!this.settings.customActivity || (this.settings.customActivityURL == "")){
										c.dispatch({
											type: "DEVELOPER_TEST_MODE_AUTHORIZATION_SUCCESS",
											applicationId: "880218394199220334",
											originURL: "https://" + intendedActivityId + ".discordsays.com"
										});
									}
									if(this.settings.customActivity && (this.settings.customActivityURL != "")){
										c.dispatch({
											type: "DEVELOPER_TEST_MODE_AUTHORIZATION_SUCCESS",
											applicationId: "880218394199220334",
											originURL: this.settings.customActivityURL
										});
									}
									//Then, alert the user to hit the join button
									ZLibrary.Toasts.info(`Now hit Join Activity on the host's activity`, {timeout: 3000});
									//Finally, disable join mode
									this.settings.activityJoiningMode = false;
									return
								}
								if(!this.settings.activityJoiningMode){ //Join mode disabled (hosting)
									var intendedActivityId = N[0].inflatedBundleItem.application.id;
									if(!this.settings.customActivity || (this.settings.customActivityURL == "")){
										c.dispatch({
											type: "DEVELOPER_TEST_MODE_AUTHORIZATION_SUCCESS",
											applicationId: "880218394199220334",
											originURL: "https://" + intendedActivityId + ".discordsays.com"
										});
									}
									if(this.settings.customActivity && (this.settings.customActivityURL != "")){
										c.dispatch({
											type: "DEVELOPER_TEST_MODE_AUTHORIZATION_SUCCESS",
											applicationId: "880218394199220334",
											originURL: this.settings.customActivityURL
										});
									}
									let Activity = new Array();
									Activity.channelId = BdApi.findModuleByProps('getVoiceChannelId').getVoiceChannelId();
									if(Activity.channelId === null){
										console.warn("Voice Channel was null. Are you not in a voice channel?");
										return
									}
									Activity.application_id = "880218394199220334";
									Activity.always_free = true;
									Activity.nitro_requirement = false;
									Activity.details = "Test"
									c.dispatch({
										type: "LOCAL_ACTIVITY_UPDATE",
										activity: Activity
									});
									const mouseClickEvents = ['mousedown', 'click', 'mouseup'];
									function simulateMouseClick(element){
									  mouseClickEvents.forEach(mouseEventType =>
										element.dispatchEvent(
										  new MouseEvent(mouseEventType, {
											  view: window,
											  bubbles: true,
											  cancelable: true,
											  buttons: 1
										  })
										)
									  );
									}
									var element = document.getElementsByClassName('modalCloseButton-35fetH close-1mLglB button-f2h6uQ lookBlank-21BCro colorBrand-I6CyqQ grow-2sR_-F')[0];
									simulateMouseClick(element); //Close activity menu
									c.dispatch({
										type: "EMBEDDED_ACTIVITY_OPEN",
										channelId: BdApi.findModuleByProps('getVoiceChannelId').getVoiceChannelId(),
										embeddedActivity: Activity
									});
										
									ZLibrary.Toasts.info("All clients must be running the plugin for this to work!", {timeout: 5000});

								} //End hosting mode code
							}
						}
					});
				} //End of activities()
				
				onStart() {
					this.originalNitroStatus = BdApi.findModuleByProps("getCurrentUser").getCurrentUser().premiumType;
					BdApi.findModuleByProps("getCurrentUser").getCurrentUser().premiumType = 1;
					this.saveAndUpdate();
				}

				onStop() {
					BdApi.findModuleByProps("getCurrentUser").getCurrentUser().premiumType = this.originalNitroStatus;
					Patcher.unpatchAll();
					BdApi.Patcher.unpatchAll("YABDP4Nitro");
					if(document.getElementById("qualityButton")) document.getElementById("qualityButton").remove();
					if(document.getElementById("qualityMenu")) document.getElementById("qualityMenu").remove();
					if(document.getElementById("qualityInput")) document.getElementById("qualityInput").remove();
				}
			};
		};
		return plugin(Plugin, Api);
	})(global.ZeresPluginLibrary.buildPlugin(config));
})();
/*@end@*/
