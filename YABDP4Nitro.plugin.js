/**
 * @name YABDP4Nitro
 * @author Riolubruh
 * @version 4.1.4
 * @source https://github.com/riolubruh/YABDP4Nitro
 * @updateUrl https://raw.githubusercontent.com/riolubruh/YABDP4Nitro/main/YABDP4Nitro.plugin.js
 */
/*@cc_on
@if (@_jscript)
	
	// Offer to self-install for clueless users that try to run this directly.
	var shell = WScript.CreateObject("WScript.Shell");
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\\BetterDiscord\\plugins");
	var pathSelf = WScript.ScriptFullName;
	// Put the user at ease by addressing them in the first person
	shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
	if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
		shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
	} else if (!fs.FolderExists(pathPlugins)) {
		shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
	} else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
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
			"version": "4.1.4",
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
						if (error) return require("electron").shell.openExternal("https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
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
				PluginUtilities
			} = Api;
			return class YABDP4Nitro extends Plugin {
				defaultSettings = {
					"emojiSize": 48,
					"screenSharing": true,
					"emojiBypass": true,
					"ghostMode": true,
					"emojiBypassForValidEmoji": true,
					"PNGemote": true,
					"uploadEmotes": false,
					"CustomFPSEnabled": false,
					"CustomFPS": 60,
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
					"CameraFPS": 60
				};
				settings = PluginUtilities.loadSettings(this.getName(), this.defaultSettings);
				getSettingsPanel() {
					return Settings.SettingPanel.build(_ => this.saveAndUpdate(), ...[
						new Settings.SettingGroup("Screen Share Features").append(...[
							new Settings.Switch("High Quality Screensharing", "1080p/source @ 60fps screensharing. There is no reason to disable this.", this.settings.screenSharing, value => this.settings.screenSharing = value),
							new Settings.Switch("Custom Screenshare FPS", "Choose your own screen share FPS!", this.settings.CustomFPSEnabled, value => this.settings.CustomFPSEnabled = value),
							new Settings.Textbox("FPS", "", this.settings.CustomFPS,
								value => {
									value = parseInt(value, 10);
									this.settings.CustomFPS = value;
								}),
							new Settings.Switch("Custom Screenshare Resolution", "Choose your own screen share resolution!", this.settings.ResolutionEnabled, value => this.settings.ResolutionEnabled = value),
							new Settings.Textbox("Resolution", "The custom resolution you want (in pixels)", this.settings.CustomResolution,
								value => {
									value = parseInt(value, 10);
									this.settings.CustomResolution = value;
								}),
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
							new Settings.Switch("Ghost Mode", "Abuses ghost message bug to hide the emoji url. Will not appear to work to those on the Android app.", this.settings.ghostMode, value => this.settings.ghostMode = value),
							new Settings.Switch("Don't Use Emote Bypass if Emote is Unlocked", "Disable to use emoji bypass even if bypass is not required for that emoji.", this.settings.emojiBypassForValidEmoji, value => this.settings.emojiBypassForValidEmoji = value),
							new Settings.Switch("Use PNG instead of WEBP", "Use the PNG version of emoji for higher quality!", this.settings.PNGemote, value => this.settings.PNGemote = value),
							new Settings.Switch("Upload Emotes as Images", "Upload emotes as image(s) after message is sent. (Overrides linking emotes) [Warning: this breaks shit currently, such as replies. Use at your own risk.]", this.settings.uploadEmotes, value => this.settings.uploadEmotes = value)
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
							}),
						new Settings.Textbox("Camera FPS", "", this.settings.CameraFPS,
							value => {
								value = parseInt(value);
								this.settings.CameraFPS = value;
							})
						)
					])
				}


				async UploadEmote(url, channelIdLmao, msg, emoji, runs) {
					const Uploader = BdApi.findModuleByProps('instantBatchUpload');
					var extension = ".gif";
					if (!emoji.animated) {
						extension = ".png";
						if (!this.settings.PNGemote) {
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
					});
				}


				emojiBypassForValidEmoji(emoji, currentChannelId) { //Made into a function to save space and clean up
					if (this.settings.emojiBypassForValidEmoji) {
						if ((DiscordModules.SelectedGuildStore.getLastSelectedGuildId() == emoji.guildId) && !emoji.animated && ((DiscordModules.ChannelStore.getChannel(currentChannelId).type <= 0) == true)) {
							return true
						}
					}
				}

				StreamFPSButtons() {
					const StreamButtons = BdApi.findModuleByProps("ApplicationStreamFPSButtons");
					StreamButtons.ApplicationStreamResolutions
					if (this.settings.CustomFPSEnabled) this.customFPS();
					StreamButtons.ApplicationStreamSettingRequirements.forEach(this.patchFPSButtons);
				}

				customFPS() {
					const StreamButtons = BdApi.findModuleByProps("ApplicationStreamFPSButtons");
					StreamButtons.ApplicationStreamFPS.FPS_60 = this.settings.CustomFPS;
					StreamButtons.ApplicationStreamFPSButtons[2].value = this.settings.CustomFPS;
					delete StreamButtons.ApplicationStreamFPSButtons[2].label;
					StreamButtons.ApplicationStreamFPSButtons[2].label = this.settings.CustomFPS;
					StreamButtons.ApplicationStreamFPSButtonsWithSuffixLabel[2].value = this.settings.CustomFPS;
					StreamButtons.ApplicationStreamSettingRequirements.forEach(this.replace60FPSRequirements);
				}

				replace60FPSRequirements(x) {
					if (x.fps != 30 && x.fps != 15 && x.fps != 5) x.fps = BdApi.findModuleByProps("ApplicationStreamFPSButtons").ApplicationStreamFPS.FPS_60;
				}

				restoreFPS() {
					const StreamButtons = BdApi.findModuleByProps("ApplicationStreamFPSButtons");
					StreamButtons.ApplicationStreamFPS.FPS_60 = 60;
					StreamButtons.ApplicationStreamFPSButtons[2].value = 60;
					delete StreamButtons.ApplicationStreamFPSButtons[2].label;
					StreamButtons.ApplicationStreamFPSButtons[2].label = 60;
					StreamButtons.ApplicationStreamFPSButtonsWithSuffixLabel[2].value = 60;
					StreamButtons.ApplicationStreamSettingRequirements.forEach(this.restore60FPSRequirements);
				}

				restore60FPSRequirements(x) {
					if (x.fps != 30 && x.fps != 15 && x.fps != 5) x.fps = 60;
				}

				patchFPSButtons(x) {
					x.userPremiumType = undefined;
					x.guildPremiumTier = undefined;
				}

				customResolution() {
					const StreamButtons = BdApi.findModuleByProps("ApplicationStreamFPSButtons");
					//ResolutionButtons
					StreamButtons.ApplicationStreamResolutionButtons[3].value = this.settings.CustomResolution;
					delete StreamButtons.ApplicationStreamResolutionButtons[3].label;
					StreamButtons.ApplicationStreamResolutionButtons[3].label = this.settings.CustomResolution;
					if (this.settings.CustomResolution == 0) StreamButtons.ApplicationStreamResolutionButtons[3].label = "Source";

					//ResolutionButtonsExtended
					StreamButtons.ApplicationStreamResolutionButtonsExtended[2].value = this.settings.CustomResolution;
					delete StreamButtons.ApplicationStreamResolutionButtonsExtended[2].label;
					StreamButtons.ApplicationStreamResolutionButtonsExtended[2].label = this.settings.CustomResolution;
					if (this.settings.CustomResolution == 0) StreamButtons.ApplicationStreamResolutionButtonsExtended[2].label = "Source";

					//ResolutionButtonsWithSuffixLabel
					StreamButtons.ApplicationStreamResolutionButtonsWithSuffixLabel[3].value = this.settings.CustomResolution;
					delete StreamButtons.ApplicationStreamResolutionButtonsWithSuffixLabel[3].label;
					StreamButtons.ApplicationStreamResolutionButtonsWithSuffixLabel[3].label = (this.settings.CustomResolution + 'p');
					if (this.settings.CustomResolution == 0) StreamButtons.ApplicationStreamResolutionButtonsWithSuffixLabel[3].label = "Source";

					//ApplicationStreamResolutions
					StreamButtons.ApplicationStreamResolutions.RESOLUTION_SOURCE = this.settings.CustomResolution;

					//SettingRequirements
					StreamButtons.ApplicationStreamSettingRequirements[0].resolution = this.settings.CustomResolution;
					StreamButtons.ApplicationStreamSettingRequirements[1].resolution = this.settings.CustomResolution;
					StreamButtons.ApplicationStreamSettingRequirements[2].resolution = this.settings.CustomResolution;
					StreamButtons.ApplicationStreamSettingRequirements[3].resolution = this.settings.CustomResolution;
					
					let b = BdApi.Webpack.getBulk({filter: ((BdApi.Webpack.Filters.byProps("BaseConnectionEvent"))), first: false});
					let videoOptionFunctions = b[0][1].default.prototype;
					BdApi.Patcher.before("YABDP4Nitro", videoOptionFunctions, "updateVideoQuality", (e) => {
						e.videoQualityManager.options.videoCapture.height = this.settings.customResolution;
						e.videoQualityManager.options.videoBudget.height = this.settings.customResolution;
					});
				}

				saveAndUpdate() {
					PluginUtilities.saveSettings(this.getName(), this.settings);
					if (this.settings.emojiBypass) {
						//Upload Emotes
						if (this.settings.uploadEmotes) {
							Patcher.unpatchAll(DiscordModules.MessageActions);
							BdApi.Patcher.unpatchAll("YABDP4Nitro", DiscordModules.MessageActions);
							BdApi.Patcher.instead("YABDP4Nitro", DiscordModules.MessageActions, "sendMessage", (_, b, send) => {
								var currentChannelId = BdApi.findModuleByProps("getLastChannelFollowingDestination").getChannelId();
								var runs = 0;
								b[1].validNonShortcutEmojis.forEach(emoji => {
									if (emoji.url.startsWith("/assets/")) return;
									if (this.settings.PNGemote) {
										emoji.url = emoji.url.replace('.webp', '.png');
									}
									if (this.emojiBypassForValidEmoji(emoji, currentChannelId)) { return }
									runs++;
									emoji.url = emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&size=${this.settings.emojiSize}`
									b[1].content = b[1].content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\d/g, "")}${emoji.id}>`, "");
									this.UploadEmote(emoji.url, currentChannelId, b, emoji, runs);
									return
								});
								if ((b[1].content != undefined || b[1].content != "") && runs == 0) {
									send(currentChannelId, b[1], _, b[3]);
								}
								return
							});
						}
						//If Ghost Mode is enabled do this shit
						if (this.settings.ghostMode && !this.settings.uploadEmotes) {
							BdApi.Patcher.unpatchAll("YABDP4Nitro", DiscordModules.MessageActions);
							Patcher.unpatchAll(DiscordModules.MessageActions);
							Patcher.before(DiscordModules.MessageActions, "sendMessage", (_, [, msg]) => {
								var currentChannelId = BdApi.findModuleByProps("getLastChannelFollowingDestination").getChannelId()
								msg.validNonShortcutEmojis.forEach(emoji => {
									if (emoji.url.startsWith("/assets/")) return;
									if (this.settings.PNGemote) {
										emoji.url = emoji.url.replace('.webp', '.png')
									}
									if (this.emojiBypassForValidEmoji(emoji, currentChannelId)) {
										return
									}
									//if no ghost mode required
									if (msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\d/g, "")}${emoji.id}>`, "") == "") {
										msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\d/g, "")}${emoji.id}>`, emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&size=${this.settings.emojiSize} `)
										return;
									}
									let ghostmodetext = "||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|| _ _ _ _ _ "
									if (msg.content.includes(ghostmodetext)) {
										if (msg.content.includes(("https://embed.rauf.wtf/?&image=" + emoji.url.split("?")[0]))) {//Duplicate emoji handling (second duplicate)
											msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\d/g, "")}${emoji.id}>`, ""), msg.content += " " + "https://test.rauf.workers.dev/?&image=" + emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&size=${this.settings.emojiSize} `
											return
										}
										if (msg.content.includes(emoji.url.split("?")[0])) { //Duplicate emoji handling (first duplicate)
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
						}
						else
						//Original method
						if (!this.settings.ghostMode && !this.settings.uploadEmotes) {
							BdApi.Patcher.unpatchAll("YABDP4Nitro", DiscordModules.MessageActions)
							Patcher.unpatchAll(DiscordModules.MessageActions)
							//console.log("Classic Method (No Ghost)")
							Patcher.before(DiscordModules.MessageActions, "sendMessage", (_, [, msg]) => {
								var currentChannelId = BdApi.findModuleByProps("getLastChannelFollowingDestination").getChannelId()
								msg.validNonShortcutEmojis.forEach(emoji => {
									if (this.settings.PNGemote) {
										emoji.url = emoji.url.replace('.webp', '.png')
									}
									if (emoji.url.startsWith("/assets/")) return;
									if (this.emojiBypassForValidEmoji(emoji, currentChannelId)) { return }
									if (msg.content.includes(("https://embed.rauf.wtf/?&image=" + emoji.url.split("?")[0]))) {//Duplicate emoji handling (second duplicate)
										msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\d/g, "")}${emoji.id}>`, ""), msg.content += " " + "https://test.rauf.workers.dev/?&image=" + emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&size=${this.settings.emojiSize} `
										return
									}
									if (msg.content.includes(emoji.url.split("?")[0])) { //Duplicate emoji handling (first duplicate)
										msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\d/g, "")}${emoji.id}>`, ""), msg.content += " " + "https://embed.rauf.wtf/?&image=" + emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&size=${this.settings.emojiSize} `
										return
									}
									msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\d/g, "")}${emoji.id}>`, emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&size=${this.settings.emojiSize} `)//, console.log(msg.content), console.log("no ghost")
								})
							});
							//editing message (in classic mode)
							Patcher.before(DiscordModules.MessageActions, "editMessage", (_, obj) => {
								let msg = obj[2].content
								if (msg.search(/\d{18}/g) == -1) return;
								if (msg.includes(":ENC:")) return; //Fix jank with editing SimpleDiscordCrypt encrypted messages.
								msg.match(/<a:.+?:\d{18}>|<:.+?:\d{18}>/g).forEach(idfkAnymore => {
									obj[2].content = obj[2].content.replace(idfkAnymore, `https://cdn.discordapp.com/emojis/${idfkAnymore.match(/\d{18}/g)[0]}?size=${this.settings.emojiSize}`)
								})
							});
						}
					}
					if (!this.settings.emojiBypass) Patcher.unpatchAll(DiscordModules.MessageActions)
					if (!this.settings.uploadEmotes) BdApi.Patcher.unpatchAll("YABDP4Nitro", DiscordModules.MessageActions)

					//Stupid Settings Prevention (TM) (Copyright 2069 Riolubruh)
					if ((this.settings.CustomResolution / 0) != Infinity || this.settings.CustomResolution == undefined || this.settings.CustomResolution < 0) this.settings.CustomResolution = 0;
					if (((this.settings.CustomFPS / 0) != Infinity || this.settings.CustomFPS == undefined || this.settings.CustomFPS <= -1) && this.settings.CustomFPS != 0) this.settings.CustomFPS = 60;
					if (this.settings.CustomFPS == 15) this.settings.CustomFPS = 16;
					if (this.settings.CustomFPS == 30) this.settings.CustomFPS = 31;
					if (this.settings.CustomFPS == 5) this.settings.CustomFPS = 6;
					
					//Apply screen share options
					if (this.settings.screenSharing) this.StreamFPSButtons();
					if (this.settings.ResolutionEnabled) this.customResolution();

					//Restore screen share options to default
					if (!this.settings.ResolutionEnabled) {
						this.settings.CustomResolution = 0;
						this.customResolution();
					}
					if (!this.settings.CustomFPSEnabled) {
						this.restoreFPS();
					}
					this.videoQualityModule();
					this.audioShare();
				}
				
				audioShare(){
					let a = BdApi.Webpack.getBulk({filter: ((BdApi.Webpack.Filters.byPrototypeFields("setSoundshareSource"))), first: false});
					let shareModule = a[0][0].prototype;
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
					let b = BdApi.Webpack.getBulk({filter: ((BdApi.Webpack.Filters.byProps("BaseConnectionEvent"))), first: false});
					let videoOptionFunctions = b[0][1].default.prototype;
					if(this.settings.CustomBitrateEnabled){
						BdApi.Patcher.before("YABDP4Nitro", videoOptionFunctions, "updateVideoQuality", (e) => {
							//console.log(e);
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
						
						BdApi.Patcher.before("YABDP4Nitro", videoOptionFunctions, "updateVideoQuality", (e) => {
							
							//Is the camera active and screen share not enabled?
							if(e.mediaEngineConnectionId == "Native-0" && !(e.stats.camera != undefined) && (e.stats.rtp.outbound.length < 3)){
								
							if(!((e.videoStreamParameters[0] == undefined) || (e.videoStreamParameters[1] == undefined))){ //Error stopper
							e.videoStreamParameters[0].maxPixelCount = (this.settings.CameraHeight * this.settings.CameraWidth);
							e.videoStreamParameters[1].maxPixelCount = (this.settings.CameraHeight * this.settings.CameraWidth);
							}
							
								let c = BdApi.Webpack.getBulk({filter: ((BdApi.Webpack.Filters.byPrototypeFields("applyQualityConstraints"))), first: false});
								let qualityModule2 = c[0][1].prototype;
								BdApi.Patcher.after("YABDP4Nitro", qualityModule2, "applyQualityConstraints", (_,Arguments) => {
								var e = new Array;
								//console.log(Arguments);
								e.remoteSinkWantsPixelCount = (this.settings.CameraHeight * this.settings.CameraWidth);
								e.remoteSinkWantsMaxFramerate = this.settings.CameraFPS;
								return {constraints: e}
								});
						
								if(this.settings.CameraHeight >= 0){ //Height in pixels
									e.videoStreamParameters[0].maxResolution.height = this.settings.CameraHeight;
									e.videoStreamParameters[1].maxResolution.height = this.settings.CameraHeight;
								}
								if(this.settings.CameraWidth >= 0){ //Width in pixels
									e.videoStreamParameters[0].maxResolution.width = this.settings.CameraWidth;
									e.videoStreamParameters[1].maxResolution.width = this.settings.CameraWidth;
								}
								if(this.settings.CameraFPS >= 0){ //FPS
									e.videoStreamParameters[0].maxFrameRate = this.settings.CameraFPS;
									e.videoStreamParameters[1].maxFrameRate = this.settings.CameraFPS;
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
						});	
					}
				}
				
				onStart() {
					this.originalNitroStatus = DiscordModules.UserStore.getCurrentUser().premiumType;
					this.saveAndUpdate();
					DiscordModules.UserStore.getCurrentUser().premiumType = 1;
				}

				onStop() {
					DiscordModules.UserStore.getCurrentUser().premiumType = this.originalNitroStatus;
					Patcher.unpatchAll();
					BdApi.Patcher.unpatchAll("YABDP4Nitro");
					this.restoreFPS();
				}
			};
		};
		return plugin(Plugin, Api);
	})(global.ZeresPluginLibrary.buildPlugin(config));
})();
/*@end@*/