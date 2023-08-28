/**
 * @name YABDP4Nitro
 * @author Riolubruh
 * @version 4.8.2
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
			"version": "4.8.2",
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
			BdApi.UI.showConfirmationModal("Library Missing", `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
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
					"ResolutionSwapper": false,
					"stickerBypass": false,
					"profileV2": false,
					"forceStickersUnlocked": false,
					"changePremiumType": false,
					"videoCodec": 0,
					"clientThemes": true,
					"lastGradientSettingStore": -1,
					"fakeProfileThemes": true,
					//"removeProfileUpsell": true,
					"removeScreenshareUpsell": true,
					"fakeProfileBanners": true
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
								new Settings.Textbox("Voice Audio Bitrate", "Allows you to change the voice bitrate to whatever you want. Does not allow you to go over the voice channel's set bitrate but it does allow you to go much lower. (bitrate in kbps).", this.settings.voiceBitrate,
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
								)
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
						new Settings.SettingGroup("Miscellaneous").append(
							new Settings.Switch("Profile Accents", "When enabled, you will see (almost) all users with the new Nitro-exclusive look for profiles (the sexier look). When disabled, the default behavior is used. Does not allow you to update your profile accent.", this.settings.profileV2, value => this.settings.profileV2 = value),
							new Settings.Switch("Change PremiumType", "This is now optional. Enabling this may help compatibility for certain things or harm it. SimpleDiscordCrypt requires that this be enabled to have emojis work correctly.", this.settings.changePremiumType, value => this.settings.changePremiumType = value),
							new Settings.Switch("Gradient Client Themes", "Allows you to use Nitro-exclusive Client Themes.", this.settings.clientThemes, value => this.settings.clientThemes = value),
							new Settings.Switch("Fake Profile Themes", "Uses invisible 3y3 encoding to allow profile theming by hiding the colors in your bio.", this.settings.fakeProfileThemes, value => this.settings.fakeProfileThemes = value),
							//new Settings.Switch("Remove Profile Customization Upsell", "Removes the \"Try It Out\" upsell in the profile customization screen and replaces it with the Nitro variant.", this.settings.removeProfileUpsell, value => this.settings.removeProfileUpsell = value),
							new Settings.Switch("Remove Screen Share Nitro Upsell", "Removes the Nitro upsell in the Screen Share quality option menu.", this.settings.removeScreenshareUpsell, value => this.settings.removeScreenshareUpsell = value),
							new Settings.Switch("Fake Profile Banners", "Uses invisible 3y3 encoding to allow setting profile banners by hiding the image URL in your bio. Only supports Imgur URLs for security reasons.", this.settings.fakeProfileBanners, value => this.settings.fakeProfileBanners = value)
						)
					])
				}
				
				
				saveAndUpdate(){ //Saves and updates settings and runs functions
					Utilities.saveSettings(this.getName(), this.settings);
					BdApi.Patcher.unpatchAll("YABDP4Nitro");
					Patcher.unpatchAll();
					
					if(this.settings.changePremiumType){
						WebpackModules.getByProps("getCurrentUser").getCurrentUser().premiumType = 1;
						setTimeout(() => {
							if(this.settings.changePremiumType){
								WebpackModules.getByProps("getCurrentUser").getCurrentUser().premiumType = 1;
							}
						}, 10000);
					}
					
					if(this.settings.CustomFPS == 15) this.settings.CustomFPS = 16;
					if(this.settings.CustomFPS == 30) this.settings.CustomFPS = 31;
					if(this.settings.CustomFPS == 5) this.settings.CustomFPS = 6;
					
					this.videoQualityModule(); //Quality Module
					
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

					if(this.settings.stickerBypass){
						this.stickerSending();
					}
					
					if(this.settings.emojiBypass){
						this.emojiBypass();
						let emojiMods = WebpackModules.getByProps("B6", "ZP", "qc");
						BdApi.Patcher.instead("YABDP4Nitro", emojiMods.ZP, "isEmojiFilteredOrLocked", () => {
							return false
						});
						BdApi.Patcher.instead("YABDP4Nitro", emojiMods.ZP, "isEmojiDisabled", () => {
							return false
						});
						BdApi.Patcher.instead("YABDP4Nitro", emojiMods.ZP, "isEmojiFiltered", () => {
							return false
						});
						BdApi.Patcher.instead("YABDP4Nitro", emojiMods.ZP, "isEmojiPremiumLocked", () => {
							return false
						});
						BdApi.Patcher.instead("YABDP4Nitro", emojiMods.ZP, "getEmojiUnavailableReason", () => {
							return
						});
					}
					
					if(this.settings.profileV2 == true){
						const userProfileMod = WebpackModules.getByProps("getUserProfile");
						BdApi.Patcher.after("YABDP4Nitro", userProfileMod, "getUserProfile", (_,args,ret) => {
							if(ret == undefined) return;
							ret.premiumType = 2;
						});
					}
					
					if(this.settings.screenSharing){
						this.customVideoSettings();
					}
					
					if(this.settings.forceStickersUnlocked){
						const stickerSendabilityModule = WebpackModules.getByProps("cO","eb","kl");
						BdApi.Patcher.instead("YABDP4Nitro", stickerSendabilityModule, "cO", () => {
							return 0
						});
						BdApi.Patcher.instead("YABDP4Nitro", stickerSendabilityModule, "kl", () => {
							return true
						});
					}
					
					if(this.settings.clientThemes){
						try{
							const clientthemesmodule = BdApi.Webpack.getModule(BdApi.Webpack.Filters.byProps("isPreview"));
							delete clientthemesmodule.isPreview;
							Object.defineProperty(clientthemesmodule, "isPreview", { //Enabling the nitro theme settings
								value: false,
								configurable: true,
								enumerable: true,
								writable: true,
							});
							
							const shouldSync = WebpackModules.getByProps("shouldSync"); //Disabling syncing the profile theme
							Patcher.instead(shouldSync, "shouldSync", (callback, arg) => {
								if(arg[0] = "appearance"){
									return false
								}else{
									callback.shouldSync(arg);
								}
							});
							
							const themesModule = WebpackModules.getByProps("V1", "ZI");
							const gradientSettingModule = WebpackModules.getByProps("Bf", "X9", "zO");
							
							BdApi.Patcher.before("YABDP4Nitro", themesModule, "ZI", (_,args) => {
								if(args[0].backgroundGradientPresetId != undefined){ //If appearance is changed to a nitro client theme
									this.settings.lastGradientSettingStore = parseInt(args[0].backgroundGradientPresetId); //Store the gradient value
									Utilities.saveSettings(this.getName(), this.settings); //Save the gradient value to file
								}
								if(args[0].backgroundGradientPresetId == undefined){ //If appearance is changed to a non-nitro client theme
									this.settings.lastGradientSettingStore = -1; //Set the gradient value to -1 (disabled)
									Utilities.saveSettings(this.getName(), this.settings); //Save that value to file
								}
								
								themesModule.ZP.updateTheme(args[0].theme); //Change from light to dark theme. It was having issues due to shouldSync being false so we just set it manually if the user changes the Appearance
								
								if(this.settings.lastGradientSettingStore != -1){ //If appearance is changed to a nitro client theme
									gradientSettingModule.zO(this.settings.lastGradientSettingStore); //Apply nitro client theme
								}
								
							});
							
							if(this.settings.lastGradientSettingStore != -1){ //If appearance is changed to a nitro client theme
								gradientSettingModule.zO(this.settings.lastGradientSettingStore); //Restore gradient on plugin load/save
							}
							
							const accountSwitchModule = WebpackModules.getByProps("startSession")
							BdApi.Patcher.after("YABDP4Nitro", accountSwitchModule, "startSession", () => {
								if(this.settings.lastGradientSettingStore != -1){ //If appearance is changed to a nitro client theme
									gradientSettingModule.zO(this.settings.lastGradientSettingStore); //Restore gradient on account switch
								}
							});
							
						}catch(err){
							console.warn(err)
						}
					}
					
					if(this.settings.fakeProfileThemes){
						this.decodeAndApplyProfileColors();
						this.encodeProfileColors();
					}
					
					/*if(this.settings.removeProfileUpsell){
						BdApi.Patcher.instead("YABDP4Nitro", permissions, "canUsePremiumProfileCustomization", () => {
							return true
						});
					}*/
					
					try{
						BdApi.DOM.removeStyle("YABDP4Nitro")
					}catch(err){
						console.log(err)
					}
					
					if(this.settings.removeScreenshareUpsell){
						BdApi.DOM.addStyle("YABDP4Nitro",`
						[class*="upsellBanner"] {
						  display: none;
						  visibility: hidden;
						}`);
					}
					
					if(this.settings.fakeProfileBanners){
						this.bannerUrlDecoding();
						this.bannerUrlEncoding();
						this.bannerUrlDecodingPreview();
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
					
					let fileUp = new CloudUploader.n({file:file,isClip:false,isThumbnail:false,platform:1}, channelIdLmao, false, 0);
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
				
				
				async customVideoSettings() { //Unlock stream buttons, apply custom resolution and fps, and apply stream quality bypasses
					const StreamButtons = WebpackModules.getByProps("LY", "aW", "ws");
					if(this.settings.ResolutionEnabled && this.settings.CustomResolution != 0){
						delete StreamButtons.LY.RESOLUTION_1440
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
					if(!this.settings.ResolutionEnabled || (this.settings.CustomResolution == 0)){
						delete StreamButtons.LY.RESOLUTION_1440
						StreamButtons.LY.RESOLUTION_1440 = 1440;
						StreamButtons.ND[4].resolution = 1440;
						StreamButtons.ND[5].resolution = 1440;
						StreamButtons.ND[6].resolution = 1440;
						StreamButtons.WC[2].value = 1440;
						delete StreamButtons.WC[2].label;
						StreamButtons.WC[2].label = "1440";
						StreamButtons.km[3].value = 1440;
						delete StreamButtons.km[3].label;
						StreamButtons.km[3].label = "1440p";
					}
					function removeQualityParameters(x){
						try{
							delete x.quality
						}catch(err){	
						}
						try{
							delete x.guildPremiumTier
						}catch(err){	
						}
					}
					StreamButtons.ND.forEach(removeQualityParameters)
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
					
					const updateRemoteWantsFramerate = WebpackModules.getByPrototypes("updateRemoteWantsFramerate");
					if(updateRemoteWantsFramerate != undefined){
						let L = updateRemoteWantsFramerate.prototype;
						BdApi.Patcher.instead("YABDP4Nitro", L, "updateRemoteWantsFramerate", () => {
							return
						});
						return
					}
					if(updateRemoteWantsFramerate == undefined){
						await BdApi.Webpack.waitForModule(BdApi.Webpack.Filters.byPrototypeFields("updateRemoteWantsFramerate"));
						const updateRemoteWantsFramerateMod = WebpackModules.getByPrototypes("updateRemoteWantsFramerate").prototype;
						BdApi.Patcher.instead("YABDP4Nitro", updateRemoteWantsFramerateMod, "updateRemoteWantsFramerate", () => {
							return
						});
						
					}
				}


				emojiBypass(){ //Moved to a function to declutter saveAndUpdate
					//Upload Emotes
					if(this.settings.uploadEmotes) {
						BdApi.Patcher.instead("YABDP4Nitro", DiscordModules.MessageActions, "sendMessage", (_, msg, send) => {
							let currentChannelId = WebpackModules.getByProps("getLastChannelFollowingDestination").getChannelId();
							let runs = 0;
							msg[1].validNonShortcutEmojis.forEach(emoji => {
								if(this.emojiBypassForValidEmoji(emoji, currentChannelId)) return;
								if(emoji.type == "UNICODE") return;
								if(emoji.url.startsWith("/assets/")) return;
								if(this.settings.PNGemote) {
									emoji.url = emoji.url.replace('.webp', '.png');
								}
								if(msg[1].content.includes("\\<" + emoji.allNamesString.replace(/~\b\d+\b/g, "") + emoji.id + ">")){
									msg[1].content = msg[1].content.replace(("\\<" + emoji.allNamesString.replace(/~\b\d+\b/g, "") + emoji.id + ">"), ("<" + emoji.allNamesString.replace(/~\b\d+\b/g, "") + emoji.id + ">"));
									return //If there is a backslash (\) before the emoji, skip it.
								} 
								
								runs++;
								emoji.url = emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&quality=lossless`
								msg[1].content = msg[1].content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\b\d+\b/g, "")}${emoji.id}>`, "");
								this.UploadEmote(emoji.url, currentChannelId, msg, emoji, runs);
								return
							});
							if((msg[1].content !== undefined && msg[1].content != "") && runs == 0) {
								send(msg[0], msg[1], msg[2], msg[3]);
							}
							return
						});
					}
					//Emoji bypass with ghost mode
					if(this.settings.ghostMode && !this.settings.uploadEmotes) {
						BdApi.Patcher.before("YABDP4Nitro", DiscordModules.MessageActions, "sendMessage", (_, [, msg]) => {
							let currentChannelId = WebpackModules.getByProps("getLastChannelFollowingDestination").getChannelId();
							let emojiGhostIteration = 0;
							msg.validNonShortcutEmojis.forEach(emoji => {
								if(this.emojiBypassForValidEmoji(emoji, currentChannelId)){
									return
								}
								if(emoji.type == "UNICODE") return;
								if(emoji.url.startsWith("/assets/")){
									return
								}
								if(this.settings.PNGemote) {
									emoji.url = emoji.url.replace('.webp', '.png')
								}
								if(msg.content.includes("\\<" + emoji.allNamesString.replace(/~\b\d+\b/g, "") + emoji.id + ">")){
									msg.content = msg.content.replace(("\\<" + emoji.allNamesString.replace(/~\b\d+\b/g, "") + emoji.id + ">"), ("<" + emoji.allNamesString.replace(/~\b\d+\b/g, "") + emoji.id + ">"));
									return //If there is a backslash before the emoji, skip it.
								} 
								
								//if ghost mode is not required
								if(msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\b\d+\b/g, "")}${emoji.id}>`, "") == "") {
									msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\b\d+\b/g, "")}${emoji.id}>`, emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&quality=lossless `)
									return;
								}
								emojiGhostIteration++;
								let ghostmodetext = "||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|| _ _ _ _ _ "
								if(msg.content.includes(ghostmodetext)) {
									msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\b\d+\b/g, "")}${emoji.id}>`, ""), msg.content += " " + emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&quality=lossless&${emojiGhostIteration} `
									return
								}
								msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\b\d+\b/g, "")}${emoji.id}>`, ""), msg.content += ghostmodetext + "\n" + emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&quality=lossless `
								return
							})
						});
					}else
						//Original method
						if(!this.settings.ghostMode && !this.settings.uploadEmotes) {
							//console.log("Classic Method (No Ghost)")
							BdApi.Patcher.before("YABDP4Nitro", DiscordModules.MessageActions, "sendMessage", (_, [, msg]) => {
								let currentChannelId = WebpackModules.getByProps("getLastChannelFollowingDestination").getChannelId();
								let emojiGhostIteration = 0;
								msg.validNonShortcutEmojis.forEach(emoji => {
									if(this.emojiBypassForValidEmoji(emoji, currentChannelId)) return;
									if(emoji.type == "UNICODE") return;
									if(emoji.url.startsWith("/assets/")) return;
									if(this.settings.PNGemote) {
										emoji.url = emoji.url.replace('.webp', '.png')
									}
									
									if(msg.content.includes("\\<" + emoji.allNamesString.replace(/~\b\d+\b/g, "") + emoji.id + ">")){
										msg.content = msg.content.replace(("\\<" + emoji.allNamesString.replace(/~\b\d+\b/g, "") + emoji.id + ">"), ("<" + emoji.allNamesString.replace(/~\b\d+\b/g, "") + emoji.id + ">"));
										return //If there is a backslash before the emoji, skip it.
									} 
									emojiGhostIteration++;
									msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\b\d+\b/g, "")}${emoji.id}>`, emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&quality=lossless&${emojiGhostIteration} `)
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
					let settings = BdApi.getData("YABDP4Nitro", "settings");
					parseInt(document.getElementById("qualityInput").value);
					settings.CustomResolution = parseInt(document.getElementById("qualityInput").value);
					parseInt(document.getElementById("qualityInputFPS").value);
					settings.CustomFPS = parseInt(document.getElementById("qualityInputFPS").value);
					if(parseInt(document.getElementById("qualityInputFPS").value) == 15) settings.CustomFPS = 16;
					if(parseInt(document.getElementById("qualityInputFPS").value) == 30) settings.CustomFPS = 31;
					if(parseInt(document.getElementById("qualityInputFPS").value) == 5) settings.CustomFPS = 6;
					
					const StreamButtons = WebpackModules.getByProps("LY", "aW", "ws");
					if(settings.ResolutionEnabled && settings.CustomResolution != 0){
						delete StreamButtons.LY.RESOLUTION_1440
						StreamButtons.LY.RESOLUTION_1440 = settings.CustomResolution;
						StreamButtons.ND[4].resolution = settings.CustomResolution;
						StreamButtons.ND[5].resolution = settings.CustomResolution;
						StreamButtons.ND[6].resolution = settings.CustomResolution;
						StreamButtons.WC[2].value = settings.CustomResolution;
						delete StreamButtons.WC[2].label;
						StreamButtons.WC[2].label = settings.CustomResolution.toString();
						StreamButtons.km[3].value = settings.CustomResolution;
						delete StreamButtons.km[3].label;
						StreamButtons.km[3].label = settings.CustomResolution + "p";
					}
					if(!settings.ResolutionEnabled || (settings.CustomResolution == 0)){
						delete StreamButtons.LY.RESOLUTION_1440
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
						if(x.fps != 30 && x.fps != 15 && x.fps != 5) x.fps = settings.CustomFPS;
					}
					function restore60FPSRequirements(x) {
						if(x.fps != 30 && x.fps != 15 && x.fps != 5) x.fps = 60;
					}

					
					if(settings.CustomFPSEnabled){
						if(this.CustomFPS != 60){
							StreamButtons.ND.forEach(replace60FPSRequirements);
							StreamButtons.af[2].value = settings.CustomFPS;
							delete StreamButtons.af[2].label;
							StreamButtons.af[2].label = settings.CustomFPS + " FPS";
							StreamButtons.k0[2].value = settings.CustomFPS;
							delete StreamButtons.k0[2].label;
							StreamButtons.k0[2].label = settings.CustomFPS;
							StreamButtons.ws.FPS_60 = settings.CustomFPS;
						}
					}
					if(!(settings.CustomFPSEnabled)){
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
				
				
				videoQualityModule(){ //Custom Bitrates, FPS, Resolution
					const videoOptionFunctions = WebpackModules.getByProps("S", "Z").Z.prototype;
					const videoModules = WebpackModules.getByPrototypes("_handleVideoStreamId").prototype
					
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
							if(e.stats?.camera !== undefined) return;
							e.videoQualityManager.options.videoBudget.framerate = this.settings.CustomFPS;
							e.videoQualityManager.options.videoCapture.framerate = this.settings.CustomFPS;
							for(const ladder in e.videoQualityManager.ladder.ladder) {
								e.videoQualityManager.ladder.ladder[ladder].framerate = this.settings.CustomFPS;
								e.videoQualityManager.ladder.ladder[ladder].mutedFramerate = parseInt(this.settings.CustomFPS / 2);
							}
							for(const ladder of e.videoQualityManager.ladder.orderedLadder){
								ladder.framerate = this.settings.CustomFPS;
								ladder.mutedFramerate = parseInt(this.settings.CustomFPS / 2);
							}
							e.videoQualityManager.connection.remoteVideoSinkWants = this.settings.CustomFPS;
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
					if(this.settings.videoCodec > 0){ // Video codecs
						BdApi.Patcher.before("YABDP4Nitro", videoOptionFunctions, "updateVideoQuality", (e) => {
							let isCodecH264 = false;
							let isCodecAV1 = false;
							let isCodecVP8 = false;
							let isCodecVP9 = false;
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
						}else{
							qualityMenu.style.visibility = "hidden";
						}
					}
					
					try{
						document.getElementsByClassName("container-YkUktl")[0].appendChild(qualityButton);
					}catch(err){
						console.log("YABDP4Nitro: What the fuck happened..? During buttonCreate()");
						console.error(err);
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
					const stickerSendabilityModule = WebpackModules.getByProps("cO","eb","kl");
					BdApi.Patcher.instead("YABDP4Nitro", stickerSendabilityModule, "cO", () => {
						return 0
					});
					BdApi.Patcher.instead("YABDP4Nitro", stickerSendabilityModule, "kl", () => {
						return true
					});
					
					BdApi.Patcher.instead("YABDP4Nitro", DiscordModules.MessageActions, "sendStickers", (_,b) => {
						let stickerID = b[1][0];
						let stickerURL = "https://media.discordapp.net/stickers/" + stickerID + ".png?size=4096&quality=lossless"
						let currentChannelId = WebpackModules.getByProps("getLastChannelFollowingDestination").getChannelId();
						
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
				
				
				decodeAndApplyProfileColors(){
					const userProfileMod = WebpackModules.getByProps("getUserProfile");
					BdApi.Patcher.after("YABDP4Nitro", userProfileMod, "getUserProfile", (_,args,ret) => {
						if(ret == undefined) return;
						if(ret.bio == null) return;
						const colorString = ret.bio.match(
							/\u{e005b}\u{e0023}([\u{e0061}-\u{e0066}\u{e0041}-\u{e0046}\u{e0030}-\u{e0039}]+?)\u{e002c}\u{e0023}([\u{e0061}-\u{e0066}\u{e0041}-\u{e0046}\u{e0030}-\u{e0039}]+?)\u{e005d}/u,
						);
						if(colorString == null) return;
						let parsed = [...colorString[0]].map((c) => String.fromCodePoint(c.codePointAt(0) - 0xe0000)).join("");
						let colors = parsed
							.substring(1, parsed.length - 1)
							.split(",")
							.map(x => parseInt(x.replace("#", "0x"), 16));
						ret.themeColors = colors;
						ret.premiumType = 2;
					});
				}
				
				
				encodeProfileColors(primary, accent) {
					const themeColorsPickerModule = WebpackModules.getByProps("getTryItOutThemeColors");
					
					function makeCopyButtonAndEncoding(){
						const profileThemeSection = document.getElementsByClassName("sectionContainer-3y2cvf");
						let copyButton = document.createElement("button");
						copyButton.innerText = "Copy 3y3";
						copyButton.className = "button-ejjZWC lookFilled-1H2Jvj colorBrand-2M3O3N sizeSmall-3R2P2p grow-2T4nbg"
						copyButton.id = "copy3y3button"
						copyButton.onclick = function(){
							let themeColors = null;
							try{
								themeColors = themeColorsPickerModule.getAllTryItOut().tryItOutThemeColors
							}catch(err){
								console.warn(err);
							}
							if(themeColors == null){
								try{
									themeColors = themeColorsPickerModule.getAllPending().pendingThemeColors;
								}catch(err){
									console.error(err);
								}
							}
							
							const primary = themeColors[0];
							const accent = themeColors[1];
							let message = `[#${primary.toString(16).padStart(6, "0")},#${accent.toString(16).padStart(6, "0")}]`;
							const padding = "";
							let encoded = Array.from(message)
								.map(x => x.codePointAt(0))
								.filter(x => x >= 0x20 && x <= 0x7f)
								.map(x => String.fromCodePoint(x + 0xe0000))
								.join("");

							let encodedStr = ((padding || "") + " " + encoded);
							
							const clipboardTextElem = document.createElement("textarea");
							clipboardTextElem.style.position = 'fixed';
							clipboardTextElem.value = encodedStr;
							document.body.appendChild(clipboardTextElem);
							clipboardTextElem.select();
							clipboardTextElem.setSelectionRange(0, 99999);
							document.execCommand('copy');
							Toasts.info("Copied to clipboard");
							document.body.removeChild(clipboardTextElem);	
						}
						copyButton.style = "margin-left: 10px;"
						if(profileThemeSection[0] != undefined){
							if(profileThemeSection[0].children.length == 2){
								profileThemeSection[0].appendChild(copyButton);
							}
						}
					}
					BdApi.Patcher.after("YABDP4Nitro", themeColorsPickerModule, "getAllTryItOut", () => {
						try{
							makeCopyButtonAndEncoding();
						}catch(err){
							console.error(err);
						}
					});
					BdApi.Patcher.after("YABDP4Nitro", themeColorsPickerModule, "getAllPending", () => {
						try{
							makeCopyButtonAndEncoding();
						}catch(err){
							console.error(err);
						}
					});
				}
				
				bannerUrlDecoding(){
					const bannerUrlModule = WebpackModules.getAllByProps("Z").filter((obj) => obj.Z.toString().includes("getBannerURL"))[0]
					BdApi.Patcher.after("YABDP4Nitro", bannerUrlModule, "Z", (_, args, ret) => {
						let user = args[0].user;
						let profile = args[0].displayProfile;
						if(profile == undefined) return;
						if(profile._userProfile.banner != undefined) return
						if(profile.bio == undefined) return;
						if(ret.props?.children?.props?.style == undefined) return;
						
						function secondsightify(t) {
							if([...t].some(x => (0xe0000 < x.codePointAt(0) && x.codePointAt(0) < 0xe007f))) {
								// 3y3 text detected. Revealing...
								return (t => ([...t].map(x => (0xe0000 < x.codePointAt(0) && x.codePointAt(0) < 0xe007f) ? String.fromCodePoint(x.codePointAt(0) - 0xe0000) : x).join("")))(t)
							}else {
								//console.log("no encoded text found");
								return
							}
						}
						let parsed = secondsightify(profile.bio);
						if(parsed == undefined) return;
						
						let regex = /B\{[^}]*\}/i;
						let matches = parsed.toString().match(regex);
						if(matches == undefined) return;
						if(matches == "") return;
						let matchedText = matches[0].replace("B{", "").replace("}", "");
						ret.props.children.props.style.backgroundImage = `url(https://i.imgur.com/${matchedText})` 
						args[0].displayProfile.banner = "funky_kong_is_epic" //this can be literally any string, i just like funky kong
					});
				}
				
				
				bannerUrlEncoding(){
					function makeBannerEncodingShit(){
						if(document.getElementById("profileBannerButton") != undefined) return;
						const profileThemeSection = document.getElementsByClassName("buttonsContainer-5mLFN9");
						
						let profileBannerButton = document.createElement("button");
						profileBannerButton.innerText = "Copy 3y3";
						profileBannerButton.className = "button-ejjZWC lookFilled-1H2Jvj colorBrand-2M3O3N sizeSmall-3R2P2p grow-2T4nbg";
						profileBannerButton.id = "profileBannerButton";
						profileBannerButton.style = "margin-left: 10px; margin-top:40px";
						
						let profileBannerUrlInput = document.createElement("input");
						profileBannerUrlInput.id = "profileBannerUrlInput";
						profileBannerUrlInput.style = "width: 30%; height: 20%; max-height: 50%; margin-top: 40px"
						profileBannerUrlInput.placeholder = "Imgur URL";
						
						profileBannerButton.onclick = function(){
							const profileBannerUrlInput = document.getElementById("profileBannerUrlInput");
							let profileBannerUrlInputValue = String(profileBannerUrlInput.value);
							
							if(profileBannerUrlInputValue == "") return;
							if(profileBannerUrlInputValue == undefined) return;
							
							let stringToEncode = "" + profileBannerUrlInputValue
							.replace("http://", "")
							.replace("https://", "")
							.replace("i.imgur.com","imgur.com")
							//console.log(stringToEncode);
							
							function secondsightify(t) {
								if ([...t].some(x => (0xe0000 < x.codePointAt(0) && x.codePointAt(0) < 0xe007f))) {
									console.log("3y3 text detected. Returning...")
									return
								} else {
									// No 3y3 text was found, Encoding...
									return (t => [...t].map(x => (0x00 < x.codePointAt(0) && x.codePointAt(0) < 0x7f) ? String.fromCodePoint(x.codePointAt(0)+0xe0000) : x).join(""))(t)
								}
							}
							
							let encodedStr = ""
							stringToEncode = String(stringToEncode);
							if(stringToEncode.toLowerCase().startsWith("imgur.com")){
								stringToEncode = "B{" + stringToEncode.replace("imgur.com/","") + "}"
								encodedStr = " " + secondsightify(stringToEncode);
								Toasts.info("Copied to clipboard");
							}else if(stringToEncode.toLowerCase().startsWith("imgur.com") == false){
								Toasts.warning("Please use Imgur!");
								return
							}
							
							if(encodedStr == "") return;
							const clipboardTextElem = document.createElement("textarea");
							clipboardTextElem.style.position = 'fixed';
							clipboardTextElem.value = encodedStr;
							document.body.appendChild(clipboardTextElem);
							clipboardTextElem.select();
							clipboardTextElem.setSelectionRange(0, 99999);
							document.execCommand('copy');
							document.body.removeChild(clipboardTextElem);	
						}
						
						if(profileThemeSection[0] != undefined){
							if(profileThemeSection[0].children.length < 3){
								profileThemeSection[0].appendChild(profileBannerUrlInput);
								profileThemeSection[0].appendChild(profileBannerButton);
							}
						}
					}
					const profileCustomizationModule = WebpackModules.getByProps("getTryItOutThemeColors");
					BdApi.Patcher.after("YABDP4Nitro", profileCustomizationModule, "getAllTryItOut", () => {
						try{
							makeBannerEncodingShit();
						}catch(err){
							console.error(err);
						}
					});
					
					BdApi.Patcher.after("YABDP4Nitro", profileCustomizationModule, "getAllPending", () => {
						try{
							makeBannerEncodingShit();
						}catch(err){
							console.error(err);
						}
					});
				} //End of bannerUrlEncoding()
				
				
				bannerUrlDecodingPreview(){
					const profileCustomizationModule = WebpackModules.getByProps("getTryItOutBanner");
					BdApi.Patcher.after("YABDP4Nitro", profileCustomizationModule, "getAllPending", (_, args, ret) => {
						let user = WebpackModules.getByProps("getCurrentUser").getCurrentUser();
						let userProfile = WebpackModules.getByProps("getUserProfile").getUserProfile(user.id);
						if(userProfile == undefined) return;
						function secondsightify(t) {
							if([...t].some(x => (0xe0000 < x.codePointAt(0) && x.codePointAt(0) < 0xe007f))) {
								// 3y3 text detected. Revealing...
								return (t => ([...t].map(x => (0xe0000 < x.codePointAt(0) && x.codePointAt(0) < 0xe007f) ? String.fromCodePoint(x.codePointAt(0) - 0xe0000) : x).join("")))(t)
							}else {
								//console.log("no encoded text found");
								return
							}
						}
						let parsed = secondsightify(userProfile.bio);
						if(parsed == undefined) return;
						
						let regex = /B\{[^}]*\}/i;
						let matches = parsed.toString().match(regex);
						if(matches == undefined) return;
						if(matches == "") return;
						let matchedText = matches[0].replace("B{", "").replace("}", "");
						ret.pendingBanner = `https://i.imgur.com/${matchedText}`;
					});
				}
				
				onStart() {
					this.originalNitroStatus = WebpackModules.getByProps("getCurrentUser").getCurrentUser().premiumType;
					this.previewInitial = BdApi.Webpack.getModule(BdApi.Webpack.Filters.byProps("isPreview")).isPreview;
					this.saveAndUpdate();
				}

				onStop() {
					WebpackModules.getByProps("getCurrentUser").getCurrentUser().premiumType = this.originalNitroStatus;
					Patcher.unpatchAll();
					BdApi.Patcher.unpatchAll("YABDP4Nitro");
					if(document.getElementById("qualityButton")) document.getElementById("qualityButton").remove();
					if(document.getElementById("qualityMenu")) document.getElementById("qualityMenu").remove();
					if(document.getElementById("qualityInput")) document.getElementById("qualityInput").remove();
					if(document.getElementById("copy3y3button")) document.getElementById("copy3y3button").remove();
					if(document.getElementById("profileBannerButton")) document.getElementById("profileBannerButton").remove();
					if(document.getElementById("profileBannerUrlInput")) document.getElementById("profileBannerUrlInput").remove();
				}
			};
		};
		return plugin(Plugin, Api);
	})(global.ZeresPluginLibrary.buildPlugin(config));
})();
/*@end@*/
