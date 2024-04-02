/**
 * @name YABDP4Nitro
 * @author Riolubruh
 * @version 5.2.4
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
			"version": "5.2.4",
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
				WebpackModules,
				DiscordClassModules,
				PluginUpdater
			} = Api;
			return class YABDP4Nitro extends Plugin {
				defaultSettings = {
					"emojiSize": 64,
					"screenSharing": true,
					"emojiBypass": true,
					"ghostMode": true,
					"emojiBypassForValidEmoji": true,
					"PNGemote": true,
					"uploadEmotes": true,
					"uploadStickers": false,
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
					"fakeProfileBanners": true,
					"fakeAvatarDecorations": true,
					"unlockAppIcons": false,
					"profileEffects": true,
					"killProfileEffects": false,
					"avatarDecorations": [],
					"customPFPs": true,
					"experiments": false,
					"userPfpIntegration": true,
					"userBgIntegration": true
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
							new Settings.Dropdown("Size", "The size of the emoji in pixels.", this.settings.emojiSize, [
									{label: "32px (Default small/inline)", value: 32},
									{label: "48px (Recommended, default large)", value: 48},
									{label: "16px", value: 16},
									{label: "24px", value: 24},
									{label: "40px", value: 40},
									{label: "56px", value: 56},
									{label: "64px", value: 64},
									{label: "80px", value: 80},
									{label: "96px", value: 96},
									{label: "128px (Max emoji size)", value: 128},
									{label: "256px (Max GIF emoji size)", value: 256}
								], 
								value => {
									if (isNaN(value)) {
										value = 48;
									}
									this.settings.emojiSize = value
								}, {searchable: true}
							),
							new Settings.Switch("Ghost Mode", "Abuses ghost message bug to hide the emoji url.", this.settings.ghostMode, value => this.settings.ghostMode = value),
							new Settings.Switch("Don't Use Emote Bypass if Emote is Unlocked", "Disable to use emoji bypass even if bypass is not required for that emoji.", this.settings.emojiBypassForValidEmoji, value => this.settings.emojiBypassForValidEmoji = value),
							new Settings.Switch("Use PNG instead of WEBP", "Use the PNG version of emoji for higher quality!", this.settings.PNGemote, value => this.settings.PNGemote = value),
							new Settings.Switch("Upload Emotes as Images", "Upload emotes as image(s) after message is sent. (Overrides linking emotes)", this.settings.uploadEmotes, value => this.settings.uploadEmotes = value),
							new Settings.Switch("Sticker Bypass", "Enable or disable using the sticker bypass. I recommend using An00nymushun's DiscordFreeStickers over this. Animated APNG/WEBP/Lottie Stickers will not animate.", this.settings.stickerBypass, value => this.settings.stickerBypass = value),
							new Settings.Switch("Upload Stickers", "Upload stickers in the same way as emotes.", this.settings.uploadStickers, value => this.settings.uploadStickers = value),
							new Settings.Switch("Force Stickers Unlocked", "Enable to cause Stickers to be unlocked.", this.settings.forceStickersUnlocked, value => this.settings.forceStickersUnlocked = value)
						),
						new Settings.SettingGroup("Profile").append(
							new Settings.Switch("Profile Accents", "When enabled, you will see (almost) all users with the new Nitro-exclusive look for profiles (the sexier look). When disabled, the default behavior is used. Does not allow you to update your profile accent.", this.settings.profileV2, value => this.settings.profileV2 = value),
							new Settings.Switch("Fake Profile Themes", "Uses invisible 3y3 encoding to allow profile theming by hiding the colors in your bio.", this.settings.fakeProfileThemes, value => this.settings.fakeProfileThemes = value),
							new Settings.Switch("Fake Profile Banners", "Uses invisible 3y3 encoding to allow setting profile banners by hiding the image URL in your bio. Only supports Imgur URLs for security reasons.", this.settings.fakeProfileBanners, value => this.settings.fakeProfileBanners = value),
							new Settings.Switch("UserBG Integration", "Downloads and parses the UserBG JSON database so that UserBG banners will appear for you.", this.settings.userBgIntegration, value => this.settings.userBgIntegration = value),
							new Settings.Switch("Fake Avatar Decorations", "Uses invisible 3y3 encoding to allow setting avatar decorations by hiding information in your bio and/or your custom status.", this.settings.fakeAvatarDecorations, value => this.settings.fakeAvatarDecorations = value),
							new Settings.Switch("Fake Profile Effects", "Uses invisible 3y3 encoding to allow setting profile effects by hiding information in your bio.", this.settings.profileEffects, value => this.settings.profileEffects = value),
							new Settings.Switch("Kill Profile Effects", "Hate profile effects? Enable this and they'll be gone. All of them. Overrides all profile effects.", this.settings.killProfileEffects, value => this.settings.killProfileEffects = value),
							new Settings.Switch("Fake Profile Pictures", "Uses invisible 3y3 encoding to allow setting custom profile pictures by hiding an image URL IN YOUR CUSTOM STATUS. Only supports Imgur URLs for security reasons.", this.settings.customPFPs, value => this.settings.customPFPs = value),
							new Settings.Switch("UserPFP Integration", "Imports the UserPFP database so that people who have profile pictures in the UserPFP database will appear with their UserPFP profile picture. There's little reason to disable this.", this.settings.userPfpIntegration, value => this.settings.userPfpIntegration = value)
						),
						new Settings.SettingGroup("Miscellaneous").append(
							new Settings.Switch("Change PremiumType", "This is now optional. Enabling this may help compatibility for certain things or harm it. SimpleDiscordCrypt requires this to be enabled to have the emoji bypass work. Only enable this if you don't have Nitro.", this.settings.changePremiumType, value => this.settings.changePremiumType = value),
							new Settings.Switch("Gradient Client Themes", "Allows you to use Nitro-exclusive Client Themes.", this.settings.clientThemes, value => this.settings.clientThemes = value),
							//new Settings.Switch("Remove Profile Customization Upsell", "Removes the \"Try It Out\" upsell in the profile customization screen and replaces it with the Nitro variant.", this.settings.removeProfileUpsell, value => this.settings.removeProfileUpsell = value),
							new Settings.Switch("Remove Screen Share Nitro Upsell", "Removes the Nitro upsell in the Screen Share quality option menu.", this.settings.removeScreenshareUpsell, value => this.settings.removeScreenshareUpsell = value),
							new Settings.Switch("App Icons", "Unlocks app icons. Warning: enabling this will force \"Change Premium Type\" to be enabled. Buggy.", this.settings.unlockAppIcons, value => this.settings.unlockAppIcons = value),
							new Settings.Switch("Experiments", "Unlocks experiments. Use at your own risk.", this.settings.experiments, value => this.settings.experiments = value)
						)
					])
				}
				
				
				saveAndUpdate(){ //Saves and updates settings and runs functions
					Utilities.saveSettings(this.getName(), this.settings);
					BdApi.Patcher.unpatchAll("YABDP4Nitro");
					Patcher.unpatchAll();
					
					if(this.settings.changePremiumType){
						try{
							if(!(this.originalNitroStatus > 1)){
								this.currentUser.premiumType = 1;
								setTimeout(() => {
									if(this.settings.changePremiumType){
										this.currentUser.premiumType = 1;
									}
								}, 10000);
							}
						}
						catch(err){
							console.log("[YABDP4Nitro]: Error occurred changing premium type.");
							console.error(err);
						}
					}
					
					if(this.settings.CustomFPS == 15) this.settings.CustomFPS = 16;
					if(this.settings.CustomFPS == 30) this.settings.CustomFPS = 31;
					if(this.settings.CustomFPS == 5) this.settings.CustomFPS = 6;
					
					if(document.getElementById("qualityButton")) document.getElementById("qualityButton").remove();
					if(document.getElementById("qualityMenu")) document.getElementById("qualityMenu").remove();
					if(document.getElementById("qualityInput")) document.getElementById("qualityInput").remove();
					
					if(this.settings.ResolutionSwapper){
						try{
							this.buttonCreate(); //Fast Quality Button and Menu
						}catch(err){
							console.error(err);
						}
						try{
							document.getElementById("qualityInput").addEventListener("input", this.updateQuick);
							document.getElementById("qualityInputFPS").addEventListener("input", this.updateQuick);
							if(!this.settings.ResolutionSwapper){
								if(document.getElementById("qualityButton") != undefined) document.getElementById("qualityButton").style.display = 'none';
								if(document.getElementById("qualityMenu") != undefined) document.getElementById("qualityMenu").style.display = 'none';
							}
						}catch(err){
							console.error(err);
						}
					}
					

					if(this.settings.stickerBypass){
						try{
							this.stickerSending()
						}catch(err){
							console.error(err)
						}
					}
					
					if(this.settings.emojiBypass){
						try{
							this.emojiBypass();
							
							if(this.emojiMods == undefined) this.emojiMods = WebpackModules.getByProps("isEmojiFilteredOrLocked");
							
							BdApi.Patcher.instead("YABDP4Nitro", this.emojiMods, "isEmojiFilteredOrLocked", () => {
								return false
							});
							BdApi.Patcher.instead("YABDP4Nitro", this.emojiMods, "isEmojiDisabled", () => {
								return false
							});
							BdApi.Patcher.instead("YABDP4Nitro", this.emojiMods, "isEmojiFiltered", () => {
								return false
							});
							BdApi.Patcher.instead("YABDP4Nitro", this.emojiMods, "isEmojiPremiumLocked", () => {
								return false
							});
							BdApi.Patcher.instead("YABDP4Nitro", this.emojiMods, "getEmojiUnavailableReason", () => {
								return
							});
						}catch(err){
							console.error(err);
						}
					}
					
					if(this.settings.profileV2){
						try{
							BdApi.Patcher.after("YABDP4Nitro", this.userProfileMod, "getUserProfile", (_,args,ret) => {
								if(ret == undefined) return;
								ret.premiumType = 2;
							});
						}catch(err){
							console.error(err);
						}
					}
					
					if(this.settings.screenSharing){
						try{
							this.customVideoSettings(); //Unlock stream buttons, apply custom resolution and fps, and apply stream quality bypasses
						}catch(err){
							console.log("[YABDP4Nitro]: Error occurred during customVideoSettings;()");
							console.error(err);
						}
						try{
							this.videoQualityModule(); //Custom bitrate, fps, resolution module
						}catch(err){
							console.log("[YABDP4Nitro]: Error occurred during videoQualityModule();");
							console.error(err);
						}
					}
					
					if(this.settings.forceStickersUnlocked){
						if(this.stickerSendabilityModule == undefined) this.stickerSendabilityModule = WebpackModules.getByProps("isSendableSticker");
						
						BdApi.Patcher.instead("YABDP4Nitro", this.stickerSendabilityModule, "getStickerSendability", () => {
							return 0
						});
						BdApi.Patcher.instead("YABDP4Nitro", this.stickerSendabilityModule, "isSendableSticker", () => {
							return true
						});
					}
					
					if(this.settings.clientThemes){
						try{
							this.clientThemes();
						}catch(err){
							console.warn("[YABDP4Nitro] " + err);
						}
					}
					
					if(this.settings.fakeProfileThemes){
						try{
							this.decodeAndApplyProfileColors();
							this.encodeProfileColors();
						}catch(err){
							console.log("[YABDP4Nitro]: Error occurred running fakeProfileThemes bypass.");
							console.error(err);
						}
						
					}
					
					/*
					//TODO: find a different way to do this
					
					if(this.settings.removeProfileUpsell){
						BdApi.Patcher.instead("YABDP4Nitro", permissions, "canUsePremiumProfileCustomization", () => {
							return true
						});
					}*/
					
					
					if(this.hasAddedScreenshareUpsellStyle && !this.settings.removeScreenshareUpsell){
						try{
							BdApi.DOM.removeStyle("YABDP4Nitro")
						}catch(err){
							console.warn(err)
						}
					}
					
					
					if(this.settings.removeScreenshareUpsell && !this.hasAddedScreenshareUpsellStyle){
						try{
							BdApi.DOM.addStyle("YABDP4Nitro",`
							[class*="upsellBanner"] {
							  display: none;
							  visibility: hidden;
							}`);
							this.hasAddedScreenshareUpsellStyle = true;
						}catch(err){
							console.error(err);
						}
						
					}
					
					if(this.settings.fakeProfileBanners){
						try{
							this.bannerUrlDecoding();
							this.bannerUrlEncoding(this.secondsightifyEncodeOnly);
							this.bannerUrlDecodingPreview();
						}catch(err){
							console.log("[YABDP4Nitro]: What the fuck happened? fakeProfileBanners");
							console.error(err);
						}
					}
					
					if(this.settings.fakeAvatarDecorations){
						try{
							this.fakeAvatarDecorations(this);
						}catch(err){
							console.log("[YABDP4Nitro]: An error occurred during fakeAvatarDecorations();");
							console.error(err);
						}
					}
					
					if(this.settings.unlockAppIcons){
						this.appIcons();
					}
					
					if(this.settings.profileEffects){
						try{
							this.profileFX(this.secondsightifyEncodeOnly);
						}catch(err){
							console.error(err);
						}
					}
					
					if(this.settings.killProfileEffects){
						try{
							this.killProfileFX();
						}catch(err){
							console.log("[YABDP4Nitro]: Error occured during killProfileFX();");
							console.error(err);
						}
					}
					
					try{
						this.honorBadge();
					}catch(err){
						console.log("[YABDP4Nitro] An error occurred during honorBadge();");
						console.error(err);
					}
					
					if(this.settings.customPFPs){
						try{
							this.customProfilePictureDecoding();
							this.customProfilePictureEncoding(this.secondsightifyEncodeOnly);
						}catch(err){
							console.log("[YABDP4Nitro] An error occurred during customProfilePicture decoding/encoding.");
							console.error(err);
						}
					}
					
					if(this.settings.experiments){
						try{
							this.experiments();
						}catch(err){
							console.log("[YABDP4Nitro] Error occurred in experiments();");
							console.error(err);
						}
					}
					
					if(this.settings.unlockAppIcons || this.settings.changePremiumType || this.settings.experiments){ //account panel breaking shit workaround
						if(this.accountPanelRenderer == undefined) this.accountPanelRenderer = WebpackModules.getAllByProps("default").filter(obj => obj.default.toString().includes("useIsHomeSelected"))[0];
						
						BdApi.Patcher.after("YABDP4Nitro", this.accountPanelRenderer, "default", (_,args,ret) => {
							if(this.settings.unlockAppIcons || this.settings.changePremiumType) ret.props.currentUser.premiumType = 1;
							if(this.settings.experiments) ret.props.currentUser.flags |= 1;
							if(this.settings.ResolutionSwapper && (document.getElementById("qualityButton") == undefined || document.getElementById("qualityInputFPS") == undefined)){
								this.buttonCreate();
								document.getElementById("qualityInput").addEventListener("input", this.updateQuick);
								document.getElementById("qualityInputFPS").addEventListener("input", this.updateQuick);
								if(!this.settings.ResolutionSwapper){
									if(document.getElementById("qualityButton") != undefined) document.getElementById("qualityButton").style.display = 'none';
									if(document.getElementById("qualityMenu") != undefined) document.getElementById("qualityMenu").style.display = 'none';
								}
							}
						});
					}
					
				} //End of saveAndUpdate()
				
				
				experiments(){
					if(this.hasAppliedExperiments) return;
					//Code graciously stolen from https://gist.github.com/MeguminSama/2cae24c9e4c335c661fa94e72235d4c4?permalink_comment_id=4952988#gistcomment-4952988
					try{
						let cache; webpackChunkdiscord_app.push([["wp_isdev_patch"], {}, r => cache=r.c]);
						let UserStore = Object.values(cache).find(m => m?.exports?.default?.getUser).exports.default;
						let actions = Object.values(UserStore._dispatcher._actionHandlers._dependencyGraph.nodes);
						let user = UserStore.getCurrentUser();
						actions.find(n => n.name === "ExperimentStore").actionHandler.CONNECTION_OPEN({
							type: "CONNECTION_OPEN", user: {flags: user.flags |= 1}, experiments: [],
						});
						actions.find(n => n.name === "DeveloperExperimentStore").actionHandler.CONNECTION_OPEN();
						webpackChunkdiscord_app.pop(); user.flags &= ~1; "done";
						this.hasAppliedExperiments = true;
					}catch(err){
						//console.warn(err);
					}
					
				}
				
				
				clientThemes(){
					if(this.clientThemesModule == undefined) this.clientThemesModule = BdApi.Webpack.getModule(BdApi.Webpack.Filters.byProps("isPreview"));
					
					//delete isPreview property so that we can set our own
					delete this.clientThemesModule.isPreview;
					
					//this property basically unlocks the client theme buttons
					Object.defineProperty(this.clientThemesModule, "isPreview", { //Enabling the nitro theme settings
						value: false,
						configurable: true,
						enumerable: true,
						writable: true,
					});
							
					if(this.themesModule == undefined) this.themesModule = WebpackModules.getByProps("saveClientTheme");
					
					if(this.gradientSettingModule == undefined) this.gradientSettingModule = WebpackModules.getByProps("resetPreviewClientTheme");
							
					//Patching saveClientTheme function.
					BdApi.Patcher.instead("YABDP4Nitro", this.themesModule, "saveClientTheme", (_,args) => {
						if(args[0].backgroundGradientPresetId == undefined){
							
							//If this number is -1, that indicates to the plugin that the current theme we're setting to is not a gradient nitro theme.
							this.settings.lastGradientSettingStore = -1; 
							
							//if user is trying to set the theme to the default dark theme
							if(args[0].theme == 'dark'){
								//dispatch settings update to change to dark theme
								this.dispatcher.dispatch({
									type: "SELECTIVELY_SYNCED_USER_SETTINGS_UPDATE",
									changes: {
										appearance: {
											shouldSync: false, //prevent sync to stop discord api from butting in. Since this is not a nitro theme, shouldn't this be set to true? Idk, but I'm not touching it lol.
											settings: {
												theme: 'dark', //default dark theme
												developerMode: true //genuinely have no idea what this does.
											}
										}
									}
								})
								//get rid of gradient theming.
								this.gradientSettingModule.resetPreviewClientTheme();
								return;
							}
							
							//if user is trying to set the theme to the default light theme
							if(args[0].theme == 'light'){
								//dispatch settings update event to change to light theme
								this.dispatcher.dispatch({
									type: "SELECTIVELY_SYNCED_USER_SETTINGS_UPDATE",
									changes: {
										appearance: {
											shouldSync: false,  //prevent sync to stop discord api from butting in
											settings: {
												theme: 'light', //default light theme
												developerMode: true
											}
										}
									}
								})
							}
							return;
						}else{ //gradient themes
							
							//Store the last gradient setting used in settings
							this.settings.lastGradientSettingStore = args[0].backgroundGradientPresetId;
							
							//dispatch settings update event to change to the gradient the user chose
							this.dispatcher.dispatch({
									type: "SELECTIVELY_SYNCED_USER_SETTINGS_UPDATE",
									changes: {
										appearance: {
											shouldSync: false,  //prevent sync to stop discord api from butting in
											settings: {
												theme: args[0].theme, //gradient themes are based off of either dark or light, args[0].theme stores this information
												clientThemeSettings: {
													backgroundGradientPresetId: args[0].backgroundGradientPresetId //preset ID for the gradient theme
												},
												developerMode: true
											}
										}
									}
								});
							
							//update background gradient preset to the one that was just chosen.
							this.gradientSettingModule.updateBackgroundGradientPreset(this.settings.lastGradientSettingStore);
						}
					}); //End of saveClientTheme patch.
					
					
					//If last appearance choice was a nitro client theme
					if(this.settings.lastGradientSettingStore != -1){ 
						
						//This line sets the gradient on plugin save and load.
						this.gradientSettingModule.updateBackgroundGradientPreset(this.settings.lastGradientSettingStore); 
					}
					
					if(this.accountSwitchModule == undefined) this.accountSwitchModule = WebpackModules.getByProps("startSession");
					
					//startSession patch. This function runs upon switching accounts.
					BdApi.Patcher.after("YABDP4Nitro", this.accountSwitchModule, "startSession", () => {
						
						//If last appearance choice was a nitro client theme
						if(this.settings.lastGradientSettingStore != -1){ 
							//Restore gradient on account switch
							this.gradientSettingModule.updateBackgroundGradientPreset(this.settings.lastGradientSettingStore); 
						}
					});
				} //End of clientThemes()
				
				
				customProfilePictureDecoding(){
					if(this.getAvatarUrlModule == undefined) this.getAvatarUrlModule = WebpackModules.getByPrototypes("getAvatarURL").prototype;
					
					BdApi.Patcher.instead("YABDP4Nitro", this.getAvatarUrlModule, "getAvatarURL", (user, [userId, size, shouldAnimate], originalFunction) => {
						
						//userpfp closer integration
						//if we haven't fetched userPFP database yet and it's enabled
						if((!this.fetchedUserPfp || this.userPfps == undefined) && this.settings.userPfpIntegration){
							
							const userPfpJsonUrl = "https://raw.githubusercontent.com/UserPFP/UserPFP/main/source/data.json";
							
							// download userPfp data
							BdApi.Net.fetch(userPfpJsonUrl)
							// parse as json
							.then(res => res.json())
							// store res.avatars in this.userPfps
							.then(res => this.userPfps = res.avatars);
							//set fetchedUserPfp flag to true.
							this.fetchedUserPfp = true;
							
						}
						
						//if userPfp database is not undefined, has been fetched, and is enabled
						if((this.userPfps != undefined && this.fetchedUserPfp) && this.settings.userPfpIntegration){
							//and this user is in the userPfp database,
							if(this.userPfps[user.id] != undefined){
								//return UserPFP profile picture URL.
								return this.userPfps[user.id];
							}
						}
						
						
						if(DiscordModules.UserStatusStore.getActivities(user.id).length > 0){
							//get user activities
							let activities = DiscordModules.UserStatusStore.getActivities(user.id);
							//if user does not have a custom status, return original function.
							if(activities[0].name != "Custom Status") return originalFunction(userId, size, shouldAnimate);
							
							//if user does have a custom status, assign it to customStatus variable.
							let customStatus = activities[0].state;
							//checking if anything went wrong
							if(customStatus == undefined) return originalFunction(userId, size, shouldAnimate);
							//decode any 3y3 text
							let revealedText = this.secondsightifyRevealOnly(String(customStatus));
							//if there is no 3y3 encoded text, return original function.
							if(revealedText == undefined) return originalFunction(userId, size, shouldAnimate);
							
							//This regex matches /P{*} . (Do not fuck with this)
							let regex = /P\{[^}]*\}/i;
							
							//Check if there are any matches in the custom status.
							let matches = revealedText.toString().match(regex);
							//if not, return orig function
							if(matches == undefined) return originalFunction(userId, size, shouldAnimate);
							if(matches == "") return originalFunction(userId, size, shouldAnimate);
							
							//if there is a match, take the first match and remove the starting "P{ and ending "}"
							let matchedText = matches[0].replace("P{", "").replace("}", "");
							
							//look for a file extension. If omitted, fallback to .gif .
							if(!String(matchedText).endsWith(".gif") && !String(matchedText).endsWith(".png") && !String(matchedText).endsWith(".jpg") && !String(matchedText).endsWith(".jpeg") && !String(matchedText).endsWith(".webp")){
								matchedText += ".gif"; //No supported file extension detected. Falling back to a default file extension.
							}
							
							//add this user to the list of users who have thee YABDP4Nitro user badge if we haven't added them already.
							if(!this.badgeUserIDs.includes(user.id)) this.badgeUserIDs.push(user.id);
							
							//return imgur url
							return `https://i.imgur.com/${matchedText}`;
						}
						
						//if user does not have any activities active, return original function.
						return originalFunction(userId, size, shouldAnimate);
					})
				}
				
				
				//Custom PFP profile customization buttons and encoding code.
				async customProfilePictureEncoding(secondsightifyEncodeOnly){
					
					//wait for avatar customization section renderer to be loaded
					await BdApi.Webpack.waitForModule(BdApi.Webpack.Filters.byStrings("USER_SETTINGS_RESET_AVATAR"));
					//store avatar customization section renderer module
					if(this.customPFPSettingsRenderMod == undefined) this.customPFPSettingsRenderMod = WebpackModules.getAllByProps("default").filter((obj) => obj.default.toString().includes("USER_SETTINGS_RESET_AVATAR"))[0];
					
					BdApi.Patcher.after("YABDP4Nitro", this.customPFPSettingsRenderMod, "default", (_,[args],ret) => {
					
						//don't need to do anything if this is the "Try out Nitro" flow.
						if(args.isTryItOutFlow) return;
						
						ret.props.children.props.children.push(
							BdApi.React.createElement("input", {
								id: "profilePictureUrlInput",
								style: {
									width: "30%",
									height: "20%",
									maxHeight: "50%",
									marginTop: "5px",
									marginLeft: "5px"
								},
								placeholder: "Imgur URL"
							})
						);
						
						//Create and append Copy PFP 3y3 button.
						ret.props.children.props.children.push(
							BdApi.React.createElement("button", {
								children: "Copy PFP 3y3",
								className: `${this.buttonClassModule.button} ${this.buttonClassModule.lookFilled} ${this.buttonClassModule.colorBrand} ${this.buttonClassModule.sizeSmall} ${this.buttonClassModule.grow}`,
								id: "profilePictureButton",
								style: {
									marginLeft: "10px",
									whiteSpace: "nowrap"
								},
								onClick: async function(){ //on copy pfp 3y3 button click
								
									//grab text from pfp url input textarea.
									let profilePictureUrlInputValue = String(document.getElementById("profilePictureUrlInput").value);
									
									//empty, skip.
									if(profilePictureUrlInputValue == "") return;
									if(profilePictureUrlInputValue == undefined) return;
									
									//clean up string to encode
									let stringToEncode = "" + profilePictureUrlInputValue
									//clean up URL
									.replace("http://", "") //remove protocol
									.replace("https://", "")
									.replace("i.imgur.com","imgur.com")
									
									let encodedStr = ""; //initialize encoded string as empty string
									stringToEncode = String(stringToEncode); //make doubly sure stringToEncode is a string
									
									//if url seems correct
									if(stringToEncode.toLowerCase().startsWith("imgur.com")){
										
										//Check for album or gallery URL
										if(stringToEncode.replace("imgur.com/","").startsWith("a/") || stringToEncode.replace("imgur.com/","").startsWith("gallery/")){
											//Album URL, what follows is all to get the direct image link, since the album URL is not a direct link to the file.
											
											//Fetch imgur album page
											const parser = new DOMParser();
											stringToEncode = await BdApi.Net.fetch(("https://" + stringToEncode), {
												method: "GET",
												mode: "cors"
											}).then(res => res.text()
											
											/*This next part is interesting, so a code explanation follows:
											* First, we're parsing the HTML of the Imgur Album using the DOM parser we initialized before.
											* Then, find the meta tag in the HTML that has the og:image property
											* Finally, we take the content of the og:image meta tag. This is the direct URL to the file that we want.
											* The need to do this makes it necessary for this function to be async. */
											.then(res => parser.parseFromString(res, "text/html").querySelector('[property="og:image"]').content));
											stringToEncode = stringToEncode.replace("http://", "") //get rid of protocol
											.replace("https://", "")
											.replace("i.imgur.com","imgur.com")
											.split("?")[0]; //remove any URL parameters since we don't want or need them
										}
										//add starting "P{" , remove "imgur.com/" , and add ending "}"
										stringToEncode = "P{" + stringToEncode.replace("imgur.com/","") + "}"
										//finally encode the string, adding a space before it so nothing fucks up
										encodedStr = " " + secondsightifyEncodeOnly(stringToEncode);
										//let the user know what has happened
										Toasts.info("3y3 copied to clipboard!");
										
									//If this is not an Imgur URL, yell at the user.
									}else if(stringToEncode.toLowerCase().startsWith("imgur.com") == false){
										Toasts.warning("Please use Imgur!");
										return
									}
									
									//if somehow none of the previous code ran, this is the last protection against an error. If this runs, something has probably gone horribly wrong.
									if(encodedStr == "") return;
									
									//Do this stupid shit that Chrome forces you to do to copy text to the clipboard.
									const clipboardTextElem = document.createElement("textarea"); //create a textarea
									clipboardTextElem.style.position = 'fixed'; //this is so that the rest of the document doesn't try to format itself to fit a textarea in it
									clipboardTextElem.value = encodedStr; //add the encoded string to the textarea
									document.body.appendChild(clipboardTextElem); //add the textarea to the document
									clipboardTextElem.select(); //focus the textarea?
									clipboardTextElem.setSelectionRange(0, 99999); //select all of the text in the textarea
									document.execCommand('copy'); //finally send the copy command
									document.body.removeChild(clipboardTextElem); //get rid of the evidence	
								} //end copy pfp 3y3 click event
							}) //end of react createElement
						); //end of element push
					}); //end of patch
				} //End of customProfilePictureEncoding()
				
				
				//Apply custom badges.
				honorBadge(){
				
					// Use CSS to select badge elements via aria-label and change them to the correct icon.
					BdApi.DOM.addStyle("YABDP4NitroBadges", `
						a[aria-label="A fellow YABDP4Nitro user!"] img {
							content: url("https://raw.githubusercontent.com/riolubruh/riolubruh.github.io/main/badge.png") !important;
						}

						a[aria-label="YABDP4Nitro Creator!"] img, a[aria-label="YABDP4Nitro Contributor!"] img  {
							content: url("https://i.imgur.com/bYGGXnq.gif") !important;
						}`);
						
					//User profile badge patches
					BdApi.Patcher.after("YABDP4Nitro", this.userProfileMod, "getUserProfile", (_,args,ret) => {
						//bad data checks
						if(ret == undefined) return;
						if(ret.userId == undefined) return;
						if(ret.badges == undefined) return;
						
						const badgesList = []; //list of the currently processed user's badge IDs
						
						for(let i = 0; i < ret.badges.length; i++){ //for each of currently processed user's badges
							badgesList.push(ret.badges[i].id); //add each of this user's badge IDs to badgesList
						}
						
						//if list of users that should have yabdp_user badge includes current user, and they don't already have the badge applied,
						if(this.badgeUserIDs.includes(ret.userId) && !badgesList.includes("yabdp_user")){
							//add the yabdp user badge to the user's list of badges.
							ret.badges.push({
								id: "yabdp_user",
								icon: "2ba85e8026a8614b640c2837bcdfe21b", //Nitro icon, gets replaced later.
								description: "A fellow YABDP4Nitro user!", 
								link: "https://github.com/riolubruh/YABDP4Nitro" //this link opens upon clicking the badge.
							});
						}
						
						//if this user is Riolubruh, and they don't already have the badge applied,
						if(ret.userId == "359063827091816448" && !badgesList.includes("yabdp_creator")){
							//add the yabdp creator badge to riolubruh's list of badges.
							ret.badges.push({
								id: "yabdp_creator",
								icon: "2ba85e8026a8614b640c2837bcdfe21b", //Nitro icon, gets replaced later.
								description: "YABDP4Nitro Creator!",
								link: "https://github.com/riolubruh/YABDP4Nitro" //this link opens upon clicking the badge.
							});
						}
						
						//List of Discord User IDs of people who have made contributions to the plugin
						//Special thanks to the following gamers:
						//							  Weblure,      Kozhura_ubezhishe_player_fly , and    Moeefa 		!
						const specialThanks = ["122072911455453184", 	"760274365853335563"	 , "482224256730791967"];
						
						//if the currently processed user is included in specialThanks, and they don't already have the badge applied,
						if(specialThanks.includes(ret.userId) && !badgesList.includes("yabdp_contributor")){
							//add the yabdp contributor badge to the contributor's list of badges
							ret.badges.push({
								id: "yabdp_contributor",
								icon: "2ba85e8026a8614b640c2837bcdfe21b", //Nitro icon, gets replaced later.
								description: "YABDP4Nitro Contributor!",
								link: "https://github.com/riolubruh/YABDP4Nitro#contributors" //this link opens upon clicking the badge.
							});
						}
						
					}); //End of user profile badge patches
				} //End of honorBadge()
				
				
				secondsightifyRevealOnly(t) {
					if([...t].some(x => (0xe0000 < x.codePointAt(0) && x.codePointAt(0) < 0xe007f))) {
						// 3y3 text detected. Revealing...
						return (t => ([...t].map(x => (0xe0000 < x.codePointAt(0) && x.codePointAt(0) < 0xe007f) ? String.fromCodePoint(x.codePointAt(0) - 0xe0000) : x).join("")))(t)
					}else {
						// no encoded text found, returning
						return
					}
				}
				
				
				secondsightifyEncodeOnly(t) {
					if([...t].some(x => (0xe0000 < x.codePointAt(0) && x.codePointAt(0) < 0xe007f))) {
						// 3y3 text detected. returning...
						return
					}else {
						//3y3 text detected. revealing...
						return (t => [...t].map(x => (0x00 < x.codePointAt(0) && x.codePointAt(0) < 0x7f) ? String.fromCodePoint(x.codePointAt(0)+0xe0000) : x).join(""))(t)
					}
				}
				
				
				//Everything related to Fake Profile Effects.
				async profileFX(secondsightifyEncodeOnly){
					
					//wait for profile effects module
					await BdApi.Webpack.waitForModule(BdApi.Webpack.Filters.byProps("profileEffects", "tryItOutId"));
					
					//try to get profile effects data
					if(this.profileEffects == undefined) this.profileEffects = WebpackModules.getByProps("profileEffects", "tryItOutId").profileEffects;
					
					//if profile effects data hasn't been fetched by the client yet
					if(this.profileEffects.length == 0){
						
						//make the client fetch profile effects
						await WebpackModules.getByProps("fetchUserProfileEffects").fetchUserProfileEffects().then(() => {
							//then wait for the effects to be fetched and store them
							this.profileEffects = WebpackModules.getByProps("profileEffects", "tryItOutId").profileEffects;
						});
					}
					
					let profileEffectIdList = new Array();
					for(let i = 0; i < this.profileEffects.length; i++){
						profileEffectIdList.push(this.profileEffects[i].id);
					}
					
					
					if(this.settings.killProfileEffects) return; //profileFX is mutually exclusive with killProfileEffects (obviously)
					
					BdApi.Patcher.after("YABDP4Nitro", this.userProfileMod, "getUserProfile", (_,args,ret) => {
						//error prevention
						if(ret == undefined) return;
						if(ret.bio == undefined) return;
						
						//reveal 3y3 encoded text. this string will also include the rest of the bio
						let revealedText = this.secondsightifyRevealOnly(ret.bio);
						if(revealedText == undefined) return;
						
						//if profile effect 3y3 is detected
						if(revealedText.includes("/fx")){
							let position = revealedText.indexOf("/fx");
							if(position == undefined) return;
							
							//find the 2 characters after the /fx and parse int
							let effectIndex = parseInt(revealedText.slice(position+3, position+5));
							//ignore invalid data 
							if(isNaN(effectIndex)) return;
							//ignore if the profile effect id does not point to an actual profile effect
							if(profileEffectIdList[effectIndex] == undefined) return;
							//set the profile effect
							ret.profileEffectId = profileEffectIdList[effectIndex];
							
							//if for some reason we dont know what this user's ID is, stop here
							if(args[0] == undefined) return;
							//otherwise add them to the list of users who show up with the YABDP4Nitro user badge
							if(!this.badgeUserIDs.includes(args[0])) this.badgeUserIDs.push(args[0]);
						}
					}); //end of getUserProfile patch.
					
					//override 2023-08_profile_effects experiment to forcibly enable profile effects.
					if(this.experimentsModule == undefined) this.experimentsModule = WebpackModules.getByProps("getExperimentOverrides");
					if(this.experimentsModule.getExperimentOverrides()['2023-08_profile_effects'] == undefined){
						this.dispatcher.dispatch({
							type: "EXPERIMENT_OVERRIDE_BUCKET",
							experimentId: "2023-08_profile_effects",
							experimentBucket: 1
						});
					}
					
					//wait for profile effect section renderer to be loaded.
					await BdApi.Webpack.waitForModule(BdApi.Webpack.Filters.byStrings("openProfileEffectModal"));
					
					//fetch the module now that it's loaded
					if(this.profileEffectSectionRenderer == undefined) this.profileEffectSectionRenderer = WebpackModules.getAllByProps("default").filter((obj) => obj.default.toString().includes("openProfileEffectModal"))[0];
					
					
					//patch profile effect section renderer function to run the following code after the function runs
					BdApi.Patcher.after("YABDP4Nitro", this.profileEffectSectionRenderer, "default", (_, [args], ret) => {
						
						//if this is the tryItOut flow, don't do anything.
						if(args.isTryItOutFlow) return;
						//if(ret.props.hasBackground) return;
						
						ret.props.children.props.children.push( //append Change Effect button
							//self explanatory create react element
							BdApi.React.createElement("button", {
								children: "Change Effect [YABDP4Nitro]",
								className: `${this.buttonClassModule.button} ${this.buttonClassModule.lookFilled} ${this.buttonClassModule.colorBrand} ${this.buttonClassModule.sizeSmall} ${this.buttonClassModule.grow}`,
								size: "sizeSmall__71a98",
								id: "changeProfileEffectButton",
								style: {
									width: "100px",
									height: "32px",
									color: "white",
									marginLeft: "10px"
								},
								onClick: () => {
									if(document.getElementById("profileEffects").style.display == "block")
										document.getElementById("profileEffects").style.display = "none";
									else if(document.getElementById("profileEffects").style.display == "none")
										document.getElementById("profileEffects").style.display = "block";
								}
								
							})
						);
						
						//beginning of profile effect buttons html
						let profileEffectsHTML = `
						<style>
							.riolubruhsSecretStuff {
								width: 20%;
								cursor: pointer;
								margin-top: .5em;
							}
						</style>`;
						
						//for each profile effect
						for(let i = 0; i < this.profileEffects.length; i++){
							//get preview image url
							let previewURL = this.profileEffects[i].config.thumbnailPreviewSrc;
							//encode 3y3
							let encodedText = secondsightifyEncodeOnly("/fx" + i); //fx0, fx1, etc.
							//javascript that runs onclick for each profile effect button
							let copyDecoration3y3 = `const clipboardTextElem = document.createElement("textarea"); clipboardTextElem.style.position = "fixed"; clipboardTextElem.value = " ${encodedText}"; document.body.appendChild(clipboardTextElem); clipboardTextElem.select(); clipboardTextElem.setSelectionRange(0, 99999); document.execCommand("copy"); ZLibrary.Toasts.info("3y3 copied to clipboard!"); document.body.removeChild(clipboardTextElem);`
							//append html to profileEffectsHTML for each button 
							profileEffectsHTML += `<img class="riolubruhsSecretStuff" onclick='${copyDecoration3y3}' src="${previewURL}">${i} `
							//add newline every 4th profile effect
							if((i+1) % 4 == 0){ 
								profileEffectsHTML += "<br>";
							}
						}
						
						//make ret.props.children into an array so i can append another child. 
						//if ret.props.children becomes an array in the future for some reason, remove below line.
						ret.props.children = [ret.props.children];
						
						ret.props.children.push( //append profile effect buttons
							BdApi.React.createElement("div", {
								id: "profileEffects",
								style: {
									width: "100%",
									display: "none",
									color: "white",
									whiteSpace: "nowrap",
									overflow: "visible",
									marginTop: ".5em"
								},
								dangerouslySetInnerHTML: {__html: profileEffectsHTML} //set inner html.
							})
						);
					}); //end patch of profile effect section renderer function
					
				} //End of profileFX()
				
				
				killProfileFX(){ //self explanatory
					BdApi.Patcher.after("YABDP4Nitro", this.userProfileMod, "getUserProfile", (_,args,ret) => {
						if(ret == undefined) return;
						if(ret.profileEffectID == undefined) return;
						//self explanatory
						ret.profileEffectID = undefined; 
					});
				}
				
				
				//Everything related to fake avatar decorations.
				async fakeAvatarDecorations(self){
					if(this.shopModule == undefined) this.shopModule = WebpackModules.getAllByProps("default").filter((obj) => obj.default.toString().includes("useFetchCollectiblesCategoriesAndPurchases"))[0];
					
					let avatarDecorations = self.settings.avatarDecorations;
					
					try{
						BdApi.Patcher.after("YABDP4Nitro", this.shopModule, "default", (_,args,ret) => {
							
							//if there's no data, return
							if(ret.categories == undefined) return;
							
							function handleEachItem(item){
								//if this is not an avatar decoration, skip processing. if it is,
								if(item.asset != undefined){
									//if settings.avatarDecorations is not empty, check if this item is already in settings.avatarDecorations.
									if(self.settings.avatarDecorations != undefined){
										if(self.settings.avatarDecorations.length > 0){
											
											//if this item is already in settings.avatarDecorations, return.
											if(self.settings.avatarDecorations.includes(String(item.asset))) return;
										}
									}
									
									//If this item is not already in settings.avatarDecorations, add the item to settings.avatarDecorations.
									self.settings.avatarDecorations.push(String(item.asset));
									//Save settings.
									Utilities.saveSettings(self.getName(), self.settings);
								}
							}
							function handleEachProduct(product){
								//for each item in the product, send the item to the handleEachItem function
								product.items.forEach((item) => handleEachItem(item));
							}
							function handleEachStoreItem(element){
								//for each product in the store item, send the product to the handleEachProduct function
								element.products.forEach((product) => handleEachProduct(product));
							}
							//for each category, send the category to the handleEachStoreItem function
							ret.categories.forEach((element) => handleEachStoreItem(element))
						}); //end of shopModule patch.
					}catch(err){
						console.log("[YABDP4Nitro] An error occurred while patching the shop module.")
						console.error(err);
					}
					
					
					BdApi.Patcher.after("YABDP4Nitro", self.userProfileMod, "getUserProfile", (_,args,ret) => {
						if(ret == undefined) return;
						if(ret.userId == undefined) return;
						if(self.downloadedUserProfiles.includes(args[0])) return;
						self.downloadedUserProfiles.push(ret.userId);
					});
					
					
					BdApi.Patcher.after("YABDP4Nitro", DiscordModules.UserStore, "getUser", (_,args,ret) => {
						//basic error checking
						if(args == undefined) return;
						if(args[0] == undefined) return;
						if(ret == undefined) return;
						
						if((avatarDecorations == new Array()) || (avatarDecorations == undefined) || (avatarDecorations.length == 0)){
							//Fallback to outdated list in case the user has not downloaded the avatar decoration data.
							avatarDecorations = [
								"a_172fa9da0af8698e37f5e5de76637439", "a_cc83efd93ecd6e41857449c3c0ef9b22", "a_c6b3bc1dc49e5b284dca0b6437831004", "a_e90ebc0114e7bdc30353c8b11953ea41", "a_b98e8b204d59882fb7f9f7c86922c0bf", "a_48ca99fcfa4ecc11acdc323534a0ecbb", "a_21c7a425b490017478a5558f33f33c63", "a_2ca5fb1ecf0dac410b38d76cb4aae7f9", "a_be797b0a0efafd45a9ee49aaedbde4d2", "a_42f43a32539de2f3f30a348dc8a880e1", "a_40d1bf0f84b5042c4777371275294664", "a_129e3e818c8319e031d34d4194cf8ecd", "a_8b7ad8479ad8cc9996b508b75410e2f9", "a_68b9ced89df522993b81a33f43490ef1", "a_ea8e2e628bacdddb1ef18cb382aa454c", "a_e11ac0d3f2b1301173847b84a1a3268f", "a_88f42fb7360d8224a670a50c3496f315", "a_85a8f9ca60cb4328378270a7f13ed7fd", "a_a0fafb7c7ee7f1e5b1442f44f3aa14b7", "a_a46f14932ac02de32f64139d3b9057b8", "a_10b9f886b513b77ccdd67c8784f1a496", "a_fed43ab12698df65902ba06727e20c0e", "a_d3da36040163ee0f9176dfe7ced45cdc", "a_950aea7686c5674b4e2f5df0830d153b", "a_8b0d858b65a81ea0c537091a4650a6d4", "a_faaa56d945e2d0f6c41cf940d122cb9e", "a_9b7b74e72efe1bc5a6beddced3da3c0f", "a_aa2e1c2b3cf05b24f6ec7b8b4141f5fc", "a_911e48f3a695c7f6c267843ab6a96f2f", "a_3c97a2d37f433a7913a1c7b7a735d000", "a_f1b2fd4706ab02b54d3a58f84b3ef564", "a_8ffa2ba9bff18e96b76c2e66fd0d7fa3", "a_d72066b8cecbadd9fc951913ebcc384f", "a_55c9d0354290afa8b7fe47ea9bd7dbcf", "a_c3c09bd122898be35093d0d59850f627", "a_c7e1751e8122f1b475cb3006966fb28c", "a_4c9f2ec29c05755456dbce45d8190ed4", "a_9d67a1cbf81fe7197c871e94f619b04b", "a_29a0533cb3de61aa8179810188f3830d", "a_d650e22f6c4bab4fc0969e9d35edbcb0", "a_db9baf0ba7cf449d2b027c06309dbe8d", "a_fe3c76cac2adf426832a7e495e8329d3", "a_1dbc603c181999b9815cb426dfec71a6", "a_0f5d6c4dd8ae74662ee9c40722a56cbd", "a_7d305bca6cf371df98c059f9d2ef05e4", "a_4936aa6c33a101b593f9607d48d686ec", "a_145dffeb81bcfff96be683fd9f6db20a", "a_5087f7f988bd1b2819cac3e33d0150f5", "a_50939e8f95b0ddfa596809480b0eb3e1", "a_f979ba5f9c2ba83db3149cc02f489f7c", "a_b9a64088e30fd3a6f2456c2e0f44f173", "a_ad4e2cad924bbb3a2fddf5c527370479"
							]
						}
						
						function getRevealedText(self){
							let revealedTextLocal = ""; //init empty string with local scope
							
							//if this user's profile has been downloaded
							if(self.downloadedUserProfiles.includes(args[0])){
								//get the user's profile from the cached user profiles
								let userProfile = self.userProfileMod.getUserProfile(args[0]);
								
								//if their bio is empty, move on to the next check.
								if(userProfile.bio != undefined){
									//reveal 3y3 encoded text
									revealedTextLocal = self.secondsightifyRevealOnly(String(userProfile.bio));
									//if there's no 3y3 text, move on to the next check.
									if(revealedTextLocal != undefined){
										if(String(revealedTextLocal).includes("/a")){
											//return bio with the 3y3 decoded
											return revealedTextLocal;
										}
									}
								}
								
							}
							if(DiscordModules.UserStatusStore.getActivities(args[0]).length > 0){
								//grab user's activities (this includes custom status)
								let activities = DiscordModules.UserStatusStore.getActivities(args[0]);
								//if they don't have a custom status, stop processing.
								if(activities[0].name != "Custom Status") return;
								//otherwise, grab the text from the custom status
								let customStatus = activities[0].state;
								//if something has gone horribly wrong, stop processing.
								if(customStatus == undefined) return;
								//finally reveal 3y3 encoded text
								revealedTextLocal = self.secondsightifyRevealOnly(String(customStatus));
								//return custom status with the 3y3 decoded
								return revealedTextLocal;
							}
						}
						let revealedText = getRevealedText(this);
						//if nothing's returned, or an empty string is returned, stop processing.
						if(revealedText == undefined) return;
						if(revealedText == "") return;
						
						//get position of /a
						let position = revealedText.indexOf("/a");
						if(position == undefined) return;
						
						//Get the next 2 characters after the /a and parse for integer
						/* TODO: The number of avatar decorations is slowly approaching triple-digits. 
						 * Once there are over 99 decorations, this code MUST BE UPDATED. Most likely a Regex match will be used instead.
						 * The same applies to profile effects, however those are being released much slower than decorations are, so it's not as urgent. */
						let assetIndex = parseInt(revealedText.slice(position+2, position+4));
						//if it's NaN, that means there aint a valid number there. stop processing if so.
						if(isNaN(assetIndex)) return;
						
						//if the number after the /a exceeds the number of avatar decorations that the client is aware of, stop processing to prevent errors.
						if(assetIndex > (avatarDecorations.length - 1)) return;
						
						//if this user does not have an avatar decoration, or the avatar decoration data does not match the one in the avatar decorations array,
						if(ret.avatarDecorationData == undefined || ret.avatarDecorationData?.asset != avatarDecorations[assetIndex]){
							//set avatar decoration data to fake avatar decoration
							ret.avatarDecorationData = {
								asset: avatarDecorations[assetIndex],
								sku_id: "1144003461608906824" //dummy sku id
							}
							
							//add user to the list of users to show with the YABDP4Nitro user badge we haven't already.
							if(!this.badgeUserIDs.includes(ret.id)) this.badgeUserIDs.push(ret.id);
						}
					}); //end of getUser patch for avatar decorations
					
					//Wait for avatar decor customization section render module to be loaded.
					await BdApi.Webpack.waitForModule(BdApi.Webpack.Filters.byStrings("useGuildMemberAndUserPendingAvatarDecoration"));
					
					//Avatar decoration customization section render module/function.
					if(this.decorationCustomizationSectionMod == undefined) this.decorationCustomizationSectionMod = WebpackModules.getAllByProps("default").filter((obj) => obj.default.toString().includes("useGuildMemberAndUserPendingAvatarDecoration"))[0];
					
					//Avatar decoration customization section patch
					BdApi.Patcher.after("YABDP4Nitro", this.decorationCustomizationSectionMod, "default", (_,[args],ret) => {
						//don't run if this is the try out nitro flow.
						if(args.isTryItOutFlow) return;
						
						//push change decoration button
						ret.props.children[0].props.children.push(
							BdApi.React.createElement("button", {
								id: "decorationButton",
								children: "Change Decoration [YABDP4Nitro]",
								style: {
									width: "100px",
									height: "50px",
									color: "white",
									borderRadius: "3px",
									marginLeft: "5px",
								},
								className: `${this.buttonClassModule.button} ${this.buttonClassModule.lookFilled} ${this.buttonClassModule.colorBrand} ${this.buttonClassModule.sizeSmall} ${this.buttonClassModule.grow}`,
								onClick: () => {
									//if avatar decorations are hidden, show them, and if they are shown, hide them
									if(document.getElementById("avatarDecorations").style.display == "block")
										document.getElementById("avatarDecorations").style.display = "none"
									else if(document.getElementById("avatarDecorations").style.display == "none")
										document.getElementById("avatarDecorations").style.display = "block";
								}
							})
						);
						
						//beginning of profile decoration buttons html
							let avatarDecorationsHTML = `
							<style>
								.riolubruhsspecialsauce {
									width: 20%;
									cursor: pointer;
								}
							</style>`;
							
						
							//for each avatar decoration
							for(let i = 0; i < avatarDecorations.length; i++){
											
								//text to encode to 3y3
								let encodedText = self.secondsightifyEncodeOnly("/a" + i); // /a0, /a1, etc.
								//javascript that runs onclick for each avatar decoration button
								let copyDecoration3y3 = `const clipboardTextElem = document.createElement("textarea"); clipboardTextElem.style.position = "fixed"; clipboardTextElem.value = " ${encodedText}"; document.body.appendChild(clipboardTextElem); clipboardTextElem.select(); clipboardTextElem.setSelectionRange(0, 99999); document.execCommand("copy"); ZLibrary.Toasts.info("3y3 copied to clipboard!"); document.body.removeChild(clipboardTextElem);`
								//append html to avatarDecorationsHTML for each button 
								avatarDecorationsHTML += `<img class="riolubruhsspecialsauce" onclick='${copyDecoration3y3}' src="https://cdn.discordapp.com/avatar-decoration-presets/` + avatarDecorations[i] + `.png?size=64"> ${i}`
								//add newline every 4th decoration
								if((i+1) % 4 == 0) avatarDecorationsHTML += "<br>"
							}
							
							//make ret.props.children into an array so i can append another child. 
							//if ret.props.children becomes an array in the future for some reason, remove below line.
							ret.props.children = [ret.props.children];
							
							ret.props.children.push( //append avatar decoration buttons
								BdApi.React.createElement("div", {
									id: "avatarDecorations",
									style: {
										width: "100%",
										display: "none",
										color: "white",
										whiteSpace: "nowrap",
										overflow: "visible",
										marginTop: ".5em"
									},
									dangerouslySetInnerHTML: {__html: avatarDecorationsHTML} //set inner html.
								})
							);
							
					}); //end patch of profile decoration section renderer function*/

				} //End of fakeAvatarDecorations()
				

				async UploadEmote(url, channelIdLmao, msg, emoji, runs){
					if(this.Uploader == undefined) this.Uploader = WebpackModules.getByProps("uploadFiles", "upload");
					
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
					
					//Download emote by URL, convert to blob, then convert to File object
					let file = await fetch(url).then(r => r.blob()).then(blobFile => new File([blobFile], (emoji.name + extension)))
					file.platform = 1; // Not exactly sure what this does, but it should be set to 1.
					file.spoiler = false; //not marked as spoiler.
					
					if(this.CloudUploader == undefined)  this.CloudUploader = WebpackModules.getByProps("CloudUpload", "CloudUploadStatus");
					
					//Start file upload
					let fileUp = new this.CloudUploader.CloudUpload({file:file,isClip:false,isThumbnail:false,platform:1}, channelIdLmao, false, 0);
					fileUp.isImage = true;
					
					//Options for the upload
					let uploadOptions = new Object();
					uploadOptions.channelId = channelIdLmao; //Upload to current channel
					uploadOptions.uploads = [fileUp]; //The file from before
					uploadOptions.draftType = 0; // Not sure what this does.
					uploadOptions.options = { stickerIds: [] }; //No stickers in the message
					//Message attached to the upload.
					uploadOptions.parsedMessage = { channelId: channelIdLmao, content: msg[1].content, tts: false, invalidEmojis:[] }
					
					//if this is not the first emoji uploaded
					if(runs > 1){
						//make the message attached to the upload have no text
						uploadOptions.parsedMessage = { channelId: channelIdLmao, content: "", tts: false, invalidEmojis:[] }
					}
					
					try{
						await this.Uploader.uploadFiles(uploadOptions); //finally finish the process of uploading
					}catch(err){
						console.error(err); 
					}
				}


				emojiBypassForValidEmoji(emoji, currentChannelId){ //Made into a function to save space and clean up
					if(this.settings.emojiBypassForValidEmoji){
						if((DiscordModules.SelectedGuildStore.getLastSelectedGuildId() == emoji.guildId) && !emoji.animated && (DiscordModules.ChannelStore.getChannel(currentChannelId.toString()).type <= 0 || DiscordModules.ChannelStore.getChannel(currentChannelId.toString()).type == 11)) {
						//If emoji is from current guild, not animated, and we are actually in a guild channel, cancel emoji bypass
							return true //Returning true cancels emoji bypass
						}
					}
					return false
				}
				
				
				customVideoSettings() { //Unlock stream buttons, apply custom resolution and fps, and apply stream quality bypasses
					if(this.StreamButtons == undefined) this.StreamButtons = WebpackModules.getByProps("ApplicationStreamFPSButtons", "ApplicationStreamResolutionButtons");
					//If you're trying to figure this shit out yourself, I recommend uncommenting the line below.
					//console.log(this.StreamButtons);
					
					
					//If custom resolution is enabled and the resolution is not set to 0,
					if(this.settings.ResolutionEnabled && this.settings.CustomResolution != 0){
						//some of these properties are marked as read only, but they still allow you to delete them
						//so any time you see "delete", what we're doing is bypassing the read-only thing by deleting it and immediately remaking it.
						delete this.StreamButtons.ApplicationStreamResolutions.RESOLUTION_1440;
						//Change 1440p resolution internally to custom resolution
						this.StreamButtons.ApplicationStreamResolutions.RESOLUTION_1440 = this.settings.CustomResolution;
						
						//********************************** Requirements below this point*************************************
						this.StreamButtons.ApplicationStreamSettingRequirements[4].resolution = this.settings.CustomResolution;
						this.StreamButtons.ApplicationStreamSettingRequirements[5].resolution = this.settings.CustomResolution;
						this.StreamButtons.ApplicationStreamSettingRequirements[6].resolution = this.settings.CustomResolution;
						
						
						//************************************Buttons below this point*****************************************
						//Set resolution button value to custom resolution
						this.StreamButtons.ApplicationStreamResolutionButtons[2].value = this.settings.CustomResolution;
						delete this.StreamButtons.ApplicationStreamResolutionButtons[2].label;
						//Set label of resolution button to custom resolution. This one is used in the popup window that appears before you start streaming.
						this.StreamButtons.ApplicationStreamResolutionButtons[2].label = this.settings.CustomResolution.toString();
						
						//Set value of button with suffix label to custom resolution
						this.StreamButtons.ApplicationStreamResolutionButtonsWithSuffixLabel[3].value = this.settings.CustomResolution;
						delete this.StreamButtons.ApplicationStreamResolutionButtonsWithSuffixLabel[3].label;
						//Set label of button with suffix label to custom resolution with "p" after it, ex: "1440p"
						//This one is used in the dropdown kind of menu after you've started streaming
						this.StreamButtons.ApplicationStreamResolutionButtonsWithSuffixLabel[3].label = this.settings.CustomResolution + "p";
					}
					
					//If custom resolution tick is disabled or custom resolution is set to 0,
					if(!this.settings.ResolutionEnabled || this.settings.CustomResolution == 0){
						
						//Reset all values to defaults.
						delete this.StreamButtons.ApplicationStreamResolutions.RESOLUTION_1440
						this.StreamButtons.ApplicationStreamResolutions.RESOLUTION_1440 = 1440;
						this.StreamButtons.ApplicationStreamSettingRequirements[4].resolution = 1440;
						this.StreamButtons.ApplicationStreamSettingRequirements[5].resolution = 1440;
						this.StreamButtons.ApplicationStreamSettingRequirements[6].resolution = 1440;
						this.StreamButtons.ApplicationStreamResolutionButtons[2].value = 1440;
						delete this.StreamButtons.ApplicationStreamResolutionButtons[2].label;
						this.StreamButtons.ApplicationStreamResolutionButtons[2].label = "1440";
						this.StreamButtons.ApplicationStreamResolutionButtonsWithSuffixLabel[3].value = 1440;
						delete this.StreamButtons.ApplicationStreamResolutionButtonsWithSuffixLabel[3].label;
						this.StreamButtons.ApplicationStreamResolutionButtonsWithSuffixLabel[3].label = "1440p";
					}
					
					//Removes stream setting requirements
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
					
					/*Remove each of the stream setting requirements 
					(which basically just tell your client what premiumType / guildPremiumTier you need to access that resolution)
					removing the setting requirements makes it default to thinking that every premiumType can use it.*/
					this.StreamButtons.ApplicationStreamSettingRequirements.forEach(removeQualityParameters);
					function replace60FPSRequirements(x) {
						if(x.fps != 30 && x.fps != 15 && x.fps != 5) x.fps = BdApi.getData("YABDP4Nitro","settings").CustomFPS;
					}
					function restore60FPSRequirements(x) {
						if(x.fps != 30 && x.fps != 15 && x.fps != 5) x.fps = 60;
					}
					
					//If Custom FPS is enabled and does not equal 60,
					if(this.settings.CustomFPSEnabled && this.CustomFPS != 60){
						//remove FPS nitro requirements
						this.StreamButtons.ApplicationStreamSettingRequirements.forEach(replace60FPSRequirements);
						//set suffix label button value to the custom number
						this.StreamButtons.ApplicationStreamFPSButtonsWithSuffixLabel[2].value = this.settings.CustomFPS;
						delete this.StreamButtons.ApplicationStreamFPSButtonsWithSuffixLabel[2].label;
						//set button suffix label with the correct number with " FPS" after it. ex: "75 FPS". This one is used in the dropdown kind of menu
						this.StreamButtons.ApplicationStreamFPSButtonsWithSuffixLabel[2].label = this.settings.CustomFPS + " FPS";
						//set fps button value to the correct number.
						this.StreamButtons.ApplicationStreamFPSButtons[2].value = this.settings.CustomFPS;
						delete this.StreamButtons.ApplicationStreamFPSButtons[2].label;
						//set fps button label to the correct number. This one is used in the popup window that appears before you start streaming.
						this.StreamButtons.ApplicationStreamFPSButtons[2].label = this.settings.CustomFPS;
						this.StreamButtons.ApplicationStreamFPS.FPS_60 = this.settings.CustomFPS;
					}
					
					//If custom FPS toggle is disabled, or custom fps is set to the default of 60,
					if(!this.settings.CustomFPSEnabled || this.CustomFPS == 60){
						//Reset all values to defaults.
						this.StreamButtons.ApplicationStreamSettingRequirements.forEach(restore60FPSRequirements);
						this.StreamButtons.ApplicationStreamFPSButtonsWithSuffixLabel[2].value = 60;
						delete this.StreamButtons.ApplicationStreamFPSButtonsWithSuffixLabel[2].label;
						this.StreamButtons.ApplicationStreamFPSButtonsWithSuffixLabel[2].label = "60 FPS";
						this.StreamButtons.ApplicationStreamFPSButtons[2].value = 60;
						delete this.StreamButtons.ApplicationStreamFPSButtons[2].label;
						this.StreamButtons.ApplicationStreamFPSButtons[2].label = 60;
						this.StreamButtons.ApplicationStreamFPS.FPS_60 = 60;
					}
					
				} //End of customVideoSettings()


				emojiBypass(){
					
					//Upload Emotes Method
					if(this.settings.uploadEmotes) {
						BdApi.Patcher.instead("YABDP4Nitro", DiscordModules.MessageActions, "_sendMessage", (_, msg, send) => {
							const currentChannelId = msg[0];
							let runs = 0; //number of times the uploader has run for this message
							msg[1].validNonShortcutEmojis.forEach(emoji => {
								if(this.emojiBypassForValidEmoji(emoji, currentChannelId)) return; //Unlocked emoji. Skip.
								if(emoji.type == "UNICODE") return; //If this "emoji" is actually a unicode character, it doesn't count. Skip bypassing if so.
								if(emoji.url.startsWith("/assets/")) return; //System emoji. Skip.
								
								if(this.settings.PNGemote) {
									emoji.url = emoji.url.replace('.webp', '.png'); //replace WEBP with PNG if the option is enabled.
								}
								
								//If there is a backslash (\) before the emote we are processing,
								if(msg[1].content.includes("\\<" + emoji.allNamesString.replace(/~\b\d+\b/g, "") + emoji.id + ">")){
									//remove the backslash
									msg[1].content = msg[1].content.replace(("\\<" + emoji.allNamesString.replace(/~\b\d+\b/g, "") + emoji.id + ">"), ("<" + emoji.allNamesString.replace(/~\b\d+\b/g, "") + emoji.id + ">"));
									//and skip bypass for that emote
									return; 
								} 
								
								runs++; // increment number of times the uploader has run for this message.
								
								//remove existing URL parameters and add custom URL parameters for user's size preference. quality is always lossless.
								emoji.url = emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&quality=lossless`; 
								//remove emote from message.
								msg[1].content = msg[1].content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\b\d+\b/g, "")}${emoji.id}>`, "");
								//upload emote
								this.UploadEmote(emoji.url, currentChannelId, msg, emoji, runs);
							});
							if((msg[1].content !== undefined && msg[1].content != "") && runs == 0) {
								send(msg[0], msg[1], msg[2], msg[3]);
							}
						});
					}
					
					//Ghost mode method
					if(this.settings.ghostMode && !this.settings.uploadEmotes) {
						BdApi.Patcher.before("YABDP4Nitro", DiscordModules.MessageActions, "sendMessage", (_, [currentChannelId, msg]) => {
							
							let emojiGhostIteration = 0; // dummy value we add to the end of the URL parameters to make the same emoji appear more than once despite having the same URL.
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
								emojiGhostIteration++; //increment dummy value
								
								const ghostmodetext = "||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|| _ _ _ _ _ "
								
								//if message already has ghostmodetext.
								if(msg.content.includes(ghostmodetext)) {
									//remove processed emoji from the message
									msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\b\d+\b/g, "")}${emoji.id}>`, ""),
									//add to the end of the message
									msg.content += " " + emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&quality=lossless&${emojiGhostIteration} `
									return
								}
								//if message doesn't already have ghostmodetext, remove processed emoji and add it to the end of the message with the ghost mode text
								msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\b\d+\b/g, "")}${emoji.id}>`, ""), msg.content += ghostmodetext + "\n" + emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&quality=lossless `
								return
							})
						});
						return
					}
					
					//Original method
					if(!this.settings.ghostMode && !this.settings.uploadEmotes) {
						BdApi.Patcher.before("YABDP4Nitro", DiscordModules.MessageActions, "sendMessage", (_, [currentChannelId, msg]) => {
							//refer to previous bypasses for comments on what this all is for.
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
						//editing message in classic mode
						BdApi.Patcher.before("YABDP4Nitro", DiscordModules.MessageActions, "editMessage", (_, obj) => {
							let msg = obj[2].content
							if(msg.search(/\d{18}/g) == -1) return;
							if(msg.includes(":ENC:")) return; //Fix jank with editing SimpleDiscordCrypt encrypted messages.
							msg.match(/<a:.+?:\d{18}>|<:.+?:\d{18}>/g).forEach(idfkAnymore => {
								obj[2].content = obj[2].content.replace(idfkAnymore, `https://cdn.discordapp.com/emojis/${idfkAnymore.match(/\d{18}/g)[0]}?size=${this.settings.emojiSize}`)
							})
						});
						return
					}
				} //End of emojiBypass()
				
				
				updateQuick(){ //Function that runs when the resolution/fps quick menu is changed.
					//Refer to customVideoSettings function for comments on what this all does, since this code is just a copy-paste from there.
					const settings = BdApi.getData("YABDP4Nitro","settings");
					parseInt(document.getElementById("qualityInput").value);
					settings.CustomResolution = parseInt(document.getElementById("qualityInput").value);
					parseInt(document.getElementById("qualityInputFPS").value);
					settings.CustomFPS = parseInt(document.getElementById("qualityInputFPS").value);
					if(parseInt(document.getElementById("qualityInputFPS").value) == 15) settings.CustomFPS = 16;
					if(parseInt(document.getElementById("qualityInputFPS").value) == 30) settings.CustomFPS = 31;
					if(parseInt(document.getElementById("qualityInputFPS").value) == 5) settings.CustomFPS = 6;
					const StreamButtons = WebpackModules.getByProps("ApplicationStreamFPSButtons", "ApplicationStreamResolutionButtons");
					if(settings.ResolutionEnabled && settings.CustomResolution != 0){
						delete StreamButtons.ApplicationStreamResolutions.RESOLUTION_1440
						StreamButtons.ApplicationStreamResolutions.RESOLUTION_1440 = settings.CustomResolution;
						StreamButtons.ApplicationStreamSettingRequirements[4].resolution = settings.CustomResolution;
						StreamButtons.ApplicationStreamSettingRequirements[5].resolution = settings.CustomResolution;
						StreamButtons.ApplicationStreamSettingRequirements[6].resolution = settings.CustomResolution;
						StreamButtons.ApplicationStreamResolutionButtons[2].value = settings.CustomResolution;
						delete StreamButtons.ApplicationStreamResolutionButtons[2].label;
						StreamButtons.ApplicationStreamResolutionButtons[2].label = settings.CustomResolution.toString();
						StreamButtons.ApplicationStreamResolutionButtonsWithSuffixLabel[3].value = settings.CustomResolution;
						delete StreamButtons.ApplicationStreamResolutionButtonsWithSuffixLabel[3].label;
						StreamButtons.ApplicationStreamResolutionButtonsWithSuffixLabel[3].label = settings.CustomResolution + "p";
					}
					if(!settings.ResolutionEnabled || (settings.CustomResolution == 0)){
						delete StreamButtons.ApplicationStreamResolutions.RESOLUTION_1440
						StreamButtons.ApplicationStreamResolutions.RESOLUTION_1440 = 1440;
						StreamButtons.ApplicationStreamSettingRequirements[4].resolution = 1440;
						StreamButtons.ApplicationStreamSettingRequirements[5].resolution = 1440;
						StreamButtons.ApplicationStreamSettingRequirements[6].resolution = 1440;
						StreamButtons.ApplicationStreamResolutionButtons[2].value = 1440;
						delete StreamButtons.ApplicationStreamResolutionButtons[2].label;
						StreamButtons.ApplicationStreamResolutionButtons[2].label = "1440";
						StreamButtons.ApplicationStreamResolutionButtonsWithSuffixLabel[3].value = 1440;
						delete StreamButtons.ApplicationStreamResolutionButtonsWithSuffixLabel[3].label;
						StreamButtons.ApplicationStreamResolutionButtonsWithSuffixLabel[3].label = "1440p";
					}
					function replace60FPSRequirements(x) {
						if(x.fps != 30 && x.fps != 15 && x.fps != 5) x.fps = BdApi.getData("YABDP4Nitro","settings").CustomFPS;
					}
					function restore60FPSRequirements(x) {
						if(x.fps != 30 && x.fps != 15 && x.fps != 5) x.fps = 60;
					}
					
					if(settings.CustomFPSEnabled){
						if(this.CustomFPS != 60){
							StreamButtons.ApplicationStreamSettingRequirements.forEach(replace60FPSRequirements);
							StreamButtons.ApplicationStreamFPSButtonsWithSuffixLabel[2].value = settings.CustomFPS;
							delete StreamButtons.ApplicationStreamFPSButtonsWithSuffixLabel[2].label;
							StreamButtons.ApplicationStreamFPSButtonsWithSuffixLabel[2].label = settings.CustomFPS + " FPS";
							StreamButtons.ApplicationStreamFPSButtons[2].value = settings.CustomFPS;
							delete StreamButtons.ApplicationStreamFPSButtons[2].label;
							StreamButtons.ApplicationStreamFPSButtons[2].label = settings.CustomFPS;
							StreamButtons.ApplicationStreamFPS.FPS_60 = settings.CustomFPS;
						}
					}
					if(!settings.CustomFPSEnabled || this.CustomFPS == 60){
						StreamButtons.ApplicationStreamSettingRequirements.forEach(restore60FPSRequirements);
						StreamButtons.ApplicationStreamFPSButtonsWithSuffixLabel[2].value = 60;
						delete StreamButtons.ApplicationStreamFPSButtonsWithSuffixLabel[2].label;
						StreamButtons.ApplicationStreamFPSButtonsWithSuffixLabel[2].label = 60 + " FPS";
						StreamButtons.ApplicationStreamFPSButtons[2].value = 60;
						delete StreamButtons.ApplicationStreamFPSButtons[2].label;
						StreamButtons.ApplicationStreamFPSButtons[2].label = 60;
						StreamButtons.ApplicationStreamFPS.FPS_60 = 60;
					}
				} //End of updateQuick()
				
				
				videoQualityModule(){ //Custom Bitrates, FPS, Resolution
					if(this.videoOptionFunctions == undefined) this.videoOptionFunctions = BdApi.Webpack.getByPrototypeKeys("updateVideoQuality").prototype;
					if(this.settings.CustomBitrateEnabled){
						BdApi.Patcher.before("YABDP4Nitro", this.videoOptionFunctions, "updateVideoQuality", (e) => {
							
							if(this.settings.minBitrate > 0){
								//Minimum Bitrate
								e.framerateReducer.sinkWants.qualityOverwrite.bitrateMin = (this.settings.minBitrate * 1000);
								e.videoQualityManager.qualityOverwrite.bitrateMin = (this.settings.minBitrate * 1000);
								e.videoQualityManager.options.videoBitrateFloor = (this.settings.minBitrate * 1000);
								e.videoQualityManager.options.videoBitrate.min = (this.settings.minBitrate * 1000);
								e.videoQualityManager.options.desktopBitrate.min = (this.settings.minBitrate * 1000);
							}
							
							if(this.settings.maxBitrate > 0){
								//Maximum Bitrate
								e.framerateReducer.sinkWants.qualityOverwrite.bitrateMax = (this.settings.maxBitrate * 1000);
								e.videoQualityManager.qualityOverwrite.bitrateMax = (this.settings.maxBitrate * 1000);
								e.videoQualityManager.options.videoBitrate.max = (this.settings.maxBitrate * 1000);
								e.videoQualityManager.options.desktopBitrate.max = (this.settings.maxBitrate * 1000);
							}
							
							if(this.settings.targetBitrate > 0){
								//Target Bitrate
								e.framerateReducer.sinkWants.qualityOverwrite.bitrateTarget = (this.settings.targetBitrate * 1000);
								e.videoQualityManager.qualityOverwrite.bitrateTarget = (this.settings.targetBitrate * 1000);
								e.videoQualityManager.options.desktopBitrate.target = (this.settings.targetBitrate * 1000);
							}
							
							if(this.settings.voiceBitrate != 128){
								//Audio Bitrate
								e.voiceBitrate = this.settings.voiceBitrate * 1000;
								
								e.conn.setTransportOptions({
									encodingVoiceBitRate: e.voiceBitrate
								});
							}
							
						});
					}
					
					//Video quality bypasses if Custom FPS is enabled.
					if(this.settings.CustomFPSEnabled){
						BdApi.Patcher.before("YABDP4Nitro", this.videoOptionFunctions, "updateVideoQuality", (e) => {
							if(e.stats?.camera !== undefined) return; //if camera is enabled, don't fuck with fps
							
							//Most of this is pretty self-explanatory.
							e.videoQualityManager.options.videoBudget.framerate = this.settings.CustomFPS;
							e.videoQualityManager.options.videoCapture.framerate = this.settings.CustomFPS;
							
							for(const ladder in e.videoQualityManager.ladder.ladder) {
								e.videoQualityManager.ladder.ladder[ladder].framerate = this.settings.CustomFPS;
								//e.videoQualityManager.ladder.ladder[ladder].mutedFramerate = parseInt(this.settings.CustomFPS / 2);
							}
							
							for(const ladder of e.videoQualityManager.ladder.orderedLadder){
								ladder.framerate = this.settings.CustomFPS;
								//ladder.mutedFramerate = parseInt(this.settings.CustomFPS / 2);
							}
							
							e.videoQualityManager.connection.remoteVideoSinkWants = this.settings.CustomFPS;
						});
					}
					
					//If screen sharing bypasses are enabled,
					if(this.settings.screenSharing){
						BdApi.Patcher.before("YABDP4Nitro", this.videoOptionFunctions, "updateVideoQuality", (e) => {
							
							//Ensure video quality parameters match the stream parameters.
							const videoQuality = new Object({
								width: e.videoStreamParameters[0].maxResolution.width,
								height: e.videoStreamParameters[0].maxResolution.height,
								framerate: e.videoStreamParameters[0].maxFrameRate,
							});
							
							//Ensure video budget quality parameters match stream parameters
							e.videoQualityManager.options.videoBudget = videoQuality;
							//Ensure video capture quality parameters match stream parameters
							e.videoQualityManager.options.videoCapture = videoQuality;
							//Ensure pixel budget matches stream resolution.
							e.videoQualityManager.ladder.pixelBudget = (videoQuality.height * videoQuality.width);
							
							
							//What follows is the word 'ladder' repeated way too many times.
							for(const ladder in e.videoQualityManager.ladder.ladder) {
								e.videoQualityManager.ladder.ladder[ladder].width = videoQuality.width * (ladder / 100);
								e.videoQualityManager.ladder.ladder[ladder].height = videoQuality.height * (ladder / 100);
							}
							for(const ladder of e.videoQualityManager.ladder.orderedLadder){
								ladder.width = videoQuality.width * (ladder.wantValue / 100);
								ladder.height = videoQuality.height * (ladder.wantValue / 100);
								ladder.pixelCount = ladder.width * ladder.height;
							}
						});
					}
					
					if(this.settings.videoCodec > 0){ // Video codecs
						BdApi.Patcher.before("YABDP4Nitro", this.videoOptionFunctions, "updateVideoQuality", (e) => {
							
							//This code determines what codec was chosen
							let isCodecH264 = false;
							let isCodecAV1 = false;
							let isCodecVP8 = false;
							let isCodecVP9 = false;
							switch(this.settings.videoCodec){
								case 1:
									isCodecH264 = true;
									break;
								case 2:
									isCodecAV1 = true;
									break;
								case 3:
									isCodecVP8 = true;
									break;
								case 4:
									isCodecVP9 = true;
									break;
							}
							
							
							//This code determines what priorities to set each codec to based on which one was chosen by the user.
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
							
							//and this code sets the priorities based on the outputs of setPriority.
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
				} //End of videoQualityModule()
				
				
				buttonCreate(){ //Creates the FPS and Resolution Swapper
					let qualityButton = document.createElement('button');
					qualityButton.id = 'qualityButton';
					qualityButton.className = `${this.buttonClassModule.lookFilled} ${this.buttonClassModule.colorBrand}`;
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
						document.getElementsByClassName(DiscordClassModules.AccountDetails.container)[0].appendChild(qualityButton);
					}catch(err){
						console.log("YABDP4Nitro: What the fuck happened..? During buttonCreate()");
						console.error(err);
					}

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
					if(this.currentChannelIdMod == undefined) this.currentChannelIdMod = WebpackModules.getByProps("getLastChannelFollowingDestination");
					if(this.stickerSendabilityModule == undefined) this.stickerSendabilityModule = WebpackModules.getByProps("StickerSendability","getStickerSendability","isSendableSticker");
					BdApi.Patcher.instead("YABDP4Nitro", this.stickerSendabilityModule, "getStickerSendability", () => {
						return 0
					});
					BdApi.Patcher.instead("YABDP4Nitro", this.stickerSendabilityModule, "isSendableSticker", () => {
						return true
					});
					
					BdApi.Patcher.instead("YABDP4Nitro", DiscordModules.MessageActions, "sendStickers", (_,b) => {
						let stickerID = b[1][0];
						let stickerURL = "https://media.discordapp.net/stickers/" + stickerID + ".png?size=4096&quality=lossless"
						let currentChannelId = this.currentChannelIdMod.getChannelId();
						
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
					BdApi.Patcher.after("YABDP4Nitro", this.userProfileMod, "getUserProfile", (_,args,ret) => {
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
				
				
				//Everything that has to do with the GUI and encoding of the fake profile colors 3y3 shit.
				//Replaced DOM manipulation with React patching 4/2/2024
				async encodeProfileColors(primary, accent) {
					
					//wait for theme color picker module to be loaded
					await BdApi.Webpack.waitForModule(BdApi.Webpack.Filters.byProps("getTryItOutThemeColors")); 
					
					//wait for color picker renderer module to be loaded
					await BdApi.Webpack.waitForModule(BdApi.Webpack.Filters.byStrings("__invalid_profileThemesSection"));
					
					if(this.colorPickerRendererMod == undefined) this.colorPickerRendererMod = WebpackModules.getAllByProps("default").filter(obj => obj.default.toString().includes("__invalid_profileThemesSection"))[0];
					
					BdApi.Patcher.after("YABDP4Nitro", this.colorPickerRendererMod, "default", (_, args, ret) => {
						
						ret.props.children.props.children.push( //append copy colors 3y3 button
							BdApi.React.createElement("button", {
								id: "copy3y3button",
								children: "Copy Colors 3y3", 
								className: `${this.buttonClassModule.button} ${this.buttonClassModule.lookFilled} ${this.buttonClassModule.colorBrand} ${this.buttonClassModule.sizeSmall} ${this.buttonClassModule.grow}`,
								style: {
									marginLeft: "10px",
									marginTop: "10px"
								},
								onClick: () => {
									let themeColors = null;
									try{
										themeColors = ZLibrary.WebpackModules.getByProps("getTryItOutThemeColors").getAllTryItOut().tryItOutThemeColors
									}catch(err){
										console.warn(err);
									}
									if(themeColors == null){
										try{
											themeColors = ZLibrary.WebpackModules.getByProps("getTryItOutThemeColors").getAllPending().pendingThemeColors;
										}catch(err){
											console.error(err);
										}
									}
									if(themeColors == undefined){
										Toasts.warning("Nothing has been copied. Is the selected color identical to your current color?");
										return
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
									
									//do this stupid shit Chrome makes you do to copy text to the clipboard.
									const clipboardTextElem = document.createElement("textarea");
									clipboardTextElem.style.position = 'fixed';
									clipboardTextElem.value = encodedStr;
									document.body.appendChild(clipboardTextElem);
									clipboardTextElem.select();
									clipboardTextElem.setSelectionRange(0, 99999);
									document.execCommand('copy');
									Toasts.info("3y3 copied to clipboard!");
									document.body.removeChild(clipboardTextElem);
								}
							})
						);
					});
					
				} //End of encodeProfileColors()
				
				
				//Commented to hell and back on 3/6/2024
				bannerUrlDecoding(){ //Decode 3y3 from profile bio and apply fake banners.
					
					//if userBg integration is enabled, and we havent already downloaded & parsed userBg data,
					if(this.settings.userBgIntegration && !this.fetchedUserBg){
						
						//userBg database url.
						const userBgJsonUrl = "https://raw.githubusercontent.com/Discord-Custom-Covers/usrbg/master/dist/usrbg.json";
						
						//download, then parse json
						fetch(userBgJsonUrl).then(res => res.text().then(str => JSON.parse(str).forEach(obj => { 
							this.userBgs[obj.uid] = obj.img; //add each entry to an object with {userId: imgURL} format
						})));
						
						//mark db as fetched so we only fetch it once per load of the plugin
						this.fetchedUserBg = true;
					}
					
					if(this.bannerUrlModule == undefined) this.bannerUrlModule = WebpackModules.getByPrototypes("getBannerURL");
					
					//Patch getUserBannerURL function
					BdApi.Patcher.before("YABDP4Nitro", this.bannerUrlModule, "getUserBannerURL", (_, args) => {
						args[0].canAnimate = true;
					});
					
					//Patch getBannerURL function
					BdApi.Patcher.instead("YABDP4Nitro", this.bannerUrlModule.prototype, "getBannerURL", (user, [args], ogFunction) => {
						let profile = user._userProfile;
						
						//Returning ogFunction with the same arguments that were passed to this function will do the vanilla check for a legit banner.
						if(profile == undefined) return ogFunction(args);
						
						if(this.settings.userBgIntegration){ //if userBg integration is enabled
							//check userBg database for this user
							let userBg = this.userBgs[user.userId];
							
							//if user is in userBg database,
							if(userBg != undefined){
								profile.banner = "funky_kong_is_epic"; //set banner id to fake value
								profile.premiumType = 2; //set this profile to appear with premium rendering
								return userBg; //return userBg banner URL and exit.
							}
						}
						
						//do original function if we don't have the user's bio
						if(profile.bio == undefined) return ogFunction(args);
						
						//reveal 3y3 encoded text, store as parsed
						let parsed = this.secondsightifyRevealOnly(profile.bio);
						//if there is no 3y3 encoded text, return original function
						if(parsed == undefined) return ogFunction(args);
						
						//This regex matches /B{*} . Do not touch unless you know what you are doing.
						let regex = /B\{[^}]*\}/i;
						
						//find banner url in parsed bio
						let matches = parsed.toString().match(regex);
						
						//if there's no matches, return original function
						if(matches == undefined) return ogFunction(args);
						if(matches == "") return ogFunction(args);
						
						//if there is matched text, grab the first match, replace the starting "B{" and ending "}" to get the clean filename
						let matchedText = matches[0].replace("B{", "").replace("}", "");
						
						//Checking for file extension. 
						if(!String(matchedText).endsWith(".gif") && !String(matchedText).endsWith(".png") && !String(matchedText).endsWith(".jpg") && !String(matchedText).endsWith(".jpeg") && !String(matchedText).endsWith(".webp")){
							matchedText += ".gif"; //Fallback to a default file extension if one is not found.
							
						}
						
						//set banner id to fake value
						profile.banner = "funky_kong_is_epic"
						
						//set this profile to appear with premium rendering
						profile.premiumType = 2; 
						
						//add this user to the list of users that show with the YABDP4Nitro user badge if we haven't aleady.
						if(!this.badgeUserIDs.includes(user.userId)) this.badgeUserIDs.push(user.userId);
						
						//return final banner URL.
						return `https://i.imgur.com/${matchedText}`;
						
					}); //End of patch for getBannerURL
					
					if(this.profileRenderer == undefined) this.profileRenderer = WebpackModules.getAllByProps("default").filter((obj) => obj.default.toString().includes("PRESS_PREMIUM_UPSELL"))[0]
					
					BdApi.Patcher.before("YABDP4Nitro", this.profileRenderer, "default", (_,args) => {
						if(args == undefined) return;
						if(args[0]?.displayProfile?.banner == undefined) return;
						
						//if this user's banner is a fake banner
						if(args[0].displayProfile.banner == "funky_kong_is_epic"){
							//don't show upsell
							args[0].showPremiumBadgeUpsell = false;
						}
					});
					
					BdApi.Patcher.after("YABDP4Nitro", this.profileRenderer, "default", (_,args,ret) => {
						if(args == undefined) return;
						if(args[0]?.displayProfile?.banner == undefined) return;
						if(ret == undefined) return;
						if(ret.props?.hasBanner == undefined) return;
						//if this user's banner is a fake banner
						if(args[0].displayProfile.banner == "funky_kong_is_epic"){
							//tell the profile renderer to show them as having a banner.
							ret.props.hasBanner = true;
						}
					});
				} //End of bannerUrlDecoding()
				
				
				//Make buttons in profile customization settings, encode imgur URLs and copy to clipboard
				//Documented/commented and partially rewritten to use React patching on 3/6/2024
				async bannerUrlEncoding(secondsightifyEncodeOnly){
					
					//wait for banner customization renderer module to be loaded
					await BdApi.Webpack.waitForModule(BdApi.Webpack.Filters.byStrings("USER_SETTINGS_PROFILE_BANNER"));
					if(this.profileBannerSectionRenderer == undefined) this.profileBannerSectionRenderer = WebpackModules.getAllByProps("default").filter((obj) => obj.default.toString().includes("USER_SETTINGS_PROFILE_BANNER"))[0];
					
					BdApi.Patcher.after("YABDP4Nitro", this.profileBannerSectionRenderer, "default", (_, args, ret) => {
						
						args[0].showPremiumIcon = false;
						
						//create and append profileBannerUrlInput input element.
						ret.props.children.props.children.push(
							BdApi.React.createElement("input", {
								id: "profileBannerUrlInput",
								placeholder: "Imgur URL",
								style: {
									width: "30%",
									height: "20%",
									maxHeight: "50%",
									marginLeft: "10px",
									marginTop: "5px"
								}
							})
						);
						
						ret.props.children.props.children.push( //append Copy 3y3 button
							//create react element
							
							BdApi.React.createElement("button", {
								id: "profileBannerButton",
								children: "Copy Banner 3y3",
								className: `${this.buttonClassModule.button} ${this.buttonClassModule.lookFilled} ${this.buttonClassModule.colorBrand} ${this.buttonClassModule.sizeSmall} ${this.buttonClassModule.grow}`,
								size: "sizeSmall__71a98",
								style: {
									whiteSpace: "nowrap",
									marginLeft: "10px"
								},
								onClick: async function() { //Upon clicking Copy 3y3 button
									
									//grab text from banner URL input textarea 
									let profileBannerUrlInputValue = String(document.getElementById("profileBannerUrlInput").value);
									
									//if it's empty, stop processing.
									if(profileBannerUrlInputValue == "") return;
									if(profileBannerUrlInputValue == undefined) return;
									
									//clean up string to encode
									let stringToEncode = "" + profileBannerUrlInputValue
									.replace("http://", "") //get rid of protocol
									.replace("https://", "")
									.replace("i.imgur.com","imgur.com"); //change i.imgur.com to imgur.com
									
									let encodedStr = ""; //initialize encoded string as empty string
									
									stringToEncode = String(stringToEncode); //make doubly sure stringToEncode is a string
									
									//if url seems correct
									if(stringToEncode.toLowerCase().startsWith("imgur.com")){
										
										//Check for album or gallery URL
										if(stringToEncode.replace("imgur.com/","").startsWith("a/") || stringToEncode.replace("imgur.com/","").startsWith("gallery/")){
											
											//Album URL, what follows is all to get the direct image link, since the album URL is not a direct link to the file.
											const parser = new DOMParser(); //initialize DOM parser
											
											//Fetch imgur album page
											stringToEncode = await BdApi.Net.fetch(("https://" + stringToEncode), { 
												method: "GET",
												mode: "cors"
											}).then(res => res.text() //use result as text
											
											/*This next part is interesting, so a code explanation follows:
											* First, we're parsing the HTML of the Imgur Album using the DOM parser we initialized before.
											* Then, find the meta tag in the HTML that has the og:image property
											* Finally, we take the content of the og:image meta tag. This is the direct URL to the file that we want.
											* The need to do this makes it necessary for this function to be async.
											*/
											.then(res => parser.parseFromString(res, "text/html").querySelector('[property="og:image"]').content));
											//clean up string to encode
											stringToEncode = stringToEncode.replace("http://", "") //get rid of protocol
											.replace("https://", "") //get rid of protocol
											.replace("i.imgur.com","imgur.com") //change i.imgur.com to imgur.com
											.split("?")[0]; //remove any URL parameters since we don't want or need them
										}
										//add starting "B{" , remove "imgur.com/" , and add ending "}"
										stringToEncode = "B{" + stringToEncode.replace("imgur.com/","") + "}"
										//finally encode the string, adding a space before it so nothing fucks up
										encodedStr = " " + secondsightifyEncodeOnly(stringToEncode);
										//let the user know what has happened
										Toasts.info("3y3 copied to clipboard!");
									
									//If this is not an Imgur URL, yell at the user.
									}else if(stringToEncode.toLowerCase().startsWith("imgur.com") == false){
										Toasts.warning("Please use Imgur!");
										return;
									}
									
									//if somehow none of the previous code ran, this is the last protection against an error. If this runs, something has probably gone horribly wrong.
									if(encodedStr == "") return;
									
									//Do this stupid shit that Chrome forces you to do to copy text to the clipboard.
									const clipboardTextElem = document.createElement("textarea"); //create a textarea
									clipboardTextElem.style.position = 'fixed'; //this is so that the rest of the document doesn't try to format itself to fit a textarea in it
									clipboardTextElem.value = encodedStr; //add the encoded string to the textarea
									document.body.appendChild(clipboardTextElem); //add the textarea to the document
									clipboardTextElem.select(); //focus the textarea?
									clipboardTextElem.setSelectionRange(0, 99999); //select all of the text in the textarea
									document.execCommand('copy'); //finally send the copy command
									document.body.removeChild(clipboardTextElem); //get rid of the evidence
									
								} //end of onClick function
							}) //end of react createElement
						); //end of profileBannerButton element push
						
					}); //end of patched function
					
				} //End of bannerUrlEncoding()
				
				
				bannerUrlDecodingPreview(){
					if(this.profileCustomizationModule == undefined) this.profileCustomizationModule = WebpackModules.getByProps("getTryItOutThemeColors");
					BdApi.Patcher.after("YABDP4Nitro", this.profileCustomizationModule, "getAllPending", (_, args, ret) => {
						let user = this.currentUser;
						let userProfile = this.userProfileMod.getUserProfile(user.id);
						if(userProfile == undefined) return;
						
						let parsed = this.secondsightifyRevealOnly(userProfile.bio);
						if(parsed == undefined) return;
						
						let regex = /B\{[^}]*\}/i;
						let matches = parsed.toString().match(regex);
						if(matches == undefined) return;
						if(matches == "") return;
						let matchedText = matches[0].replace("B{", "").replace("}", "");
						if(!String(matchedText).endsWith(".gif") && !String(matchedText).endsWith(".png") && !String(matchedText).endsWith(".jpg") && !String(matchedText).endsWith(".jpeg") && !String(matchedText).endsWith(".webp") && !String(matchedText).endsWith(".mp4") && !String(matchedText).endsWith(".tiff") && !String(matchedText).endsWith(".avi") && !String(matchedText).endsWith(".webm")){
							matchedText += ".gif"; //No supported file extension detected. 
							//Falling back to default file extension
						}
						ret.pendingBanner = `https://i.imgur.com/${matchedText}`;
					});
				}
				
				
				appIcons(){
					this.settings.changePremiumType = true; //Forcibly enable premiumType. Couldn't find a workaround, sry.
					
					try{
						if(!(this.originalNitroStatus > 1)){
							this.currentUser.premiumType = 1;
							setTimeout(() => {
								if(this.settings.changePremiumType){
									this.currentUser.premiumType = 1;
								}
							}, 10000);
						}
					}
					catch(err){
						console.log("[YABDP4Nitro]: Error occurred changing premium type.");
						console.error(err);
					}
					
					if(this.appIconModule == undefined) this.appIconModule = WebpackModules.getByProps("getCurrentDesktopIcon");
					delete this.appIconModule.isUpsellPreview;
					Object.defineProperty(this.appIconModule, "isUpsellPreview", {
						value: false,
						configurable: true,
						enumerable: true,
						writable: true,
					});
					
					delete this.appIconModule.isEditorOpen;
					Object.defineProperty(this.appIconModule, "isEditorOpen", {
						value: false,
						configurable: true,
						enumerable: true,
						writable: true,
					});
					
					if(this.appIconButtonsModule == undefined) this.appIconButtonsModule = WebpackModules.getAllByProps("default").filter((obj) => obj.default.toString().includes("renderCTAButtons"))[0];
					BdApi.Patcher.before("YABDP4Nitro", this.appIconButtonsModule, "default", (_,args) => {
						args[0].disabled = false; //force buttons clickable
					});
				}
				
				
				onStart() {
					PluginUpdater.checkForUpdate(this.getName(), this.getVersion(), this._config.info.github_raw);
					this.currentUser = WebpackModules.getByProps("getCurrentUser").getCurrentUser();
					this.originalNitroStatus = this.currentUser.premiumType;
					this.previewInitial = BdApi.Webpack.getModule(BdApi.Webpack.Filters.byProps("isPreview")).isPreview;
					this.userBgs = {};
					this.downloadedUserProfiles = [];
					this.badgeUserIDs = [];
					this.fetchedUserBg = false;
					this.fetchedUserPfp = false;
					this.userProfileMod = WebpackModules.getByProps("getUserProfile");
					this.buttonClassModule = WebpackModules.getByProps("lookFilled", "button", "contents");
					this.dispatcher = WebpackModules.getByProps("subscribe", "dispatch");
					this.saveAndUpdate();
				}
				

				onStop() {
					this.currentUser.premiumType = this.originalNitroStatus;
					Patcher.unpatchAll();
					BdApi.Patcher.unpatchAll("YABDP4Nitro");
					if(document.getElementById("qualityButton")) document.getElementById("qualityButton").remove();
					if(document.getElementById("qualityMenu")) document.getElementById("qualityMenu").remove();
					if(document.getElementById("qualityInput")) document.getElementById("qualityInput").remove();
					if(document.getElementById("copy3y3button")) document.getElementById("copy3y3button").remove();
					if(document.getElementById("profileBannerButton")) document.getElementById("profileBannerButton").remove();
					if(document.getElementById("profileBannerUrlInput")) document.getElementById("profileBannerUrlInput").remove();
					if(document.getElementById("decorationButton")) document.getElementById("decorationButton").remove();
					if(document.getElementById("avatarDecorations")) document.getElementById("avatarDecorations").remove();
					if(document.getElementById("changeProfileEffectButton")) document.getElementById("changeProfileEffectButton").remove();
					if(document.getElementById("profileEffects")) document.getElementById("profileEffects").remove();
					if(document.getElementById("profilePictureUrlInput")) document.getElementById("profilePictureUrlInput").remove();
					if(document.getElementById("profilePictureButton")) document.getElementById("profilePictureButton").remove();
					BdApi.DOM.removeStyle("YABDP4Nitro");
					BdApi.DOM.removeStyle("YABDP4NitroBadges");
					this.userBgs = {};
				}
			};
		};
		return plugin(Plugin, Api);
	})(global.ZeresPluginLibrary.buildPlugin(config));
})();
/*@end@*/
