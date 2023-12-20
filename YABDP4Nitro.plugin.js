/**
 * @name YABDP4Nitro
 * @author Riolubruh
 * @version 5.1.1
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
			"version": "5.1.1",
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
							new Settings.Switch("Fake Profile Pictures", "Uses invisible 3y3 encoding to allow setting custom profile pictures by hiding an image URL in your bio. Only supports Imgur URLs for security reasons.", this.settings.customPFPs, value => this.settings.customPFPs = value),
							new Settings.Switch("UserPFP Integration", "Imports the UserPFP database so that people who have profile pictures in the UserPFP database will appear with their UserPFP profile picture.", this.settings.userPfpIntegration, value => this.settings.userPfpIntegration = value)
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
						try{this.stickerSending()}catch(err){console.error(err)}
					}
					
					if(this.settings.emojiBypass){
						try{
							this.emojiBypass();
							
							if(this.emojiMods == undefined) this.emojiMods = WebpackModules.getByProps("isEmojiFilteredOrLocked");
							
							BdApi.Patcher.instead("YABDP4Nitro", this.emojiMods, "isEmojiFilteredOrLocked", (_, args, originalFunction) => {
								return false
							});
							BdApi.Patcher.instead("YABDP4Nitro", this.emojiMods, "isEmojiDisabled", (_, args, originalFunction) => {
								return false
							});
							BdApi.Patcher.instead("YABDP4Nitro", this.emojiMods, "isEmojiFiltered", (_, args, originalFunction) => {
								return false
							});
							BdApi.Patcher.instead("YABDP4Nitro", this.emojiMods, "isEmojiPremiumLocked", (_, args, originalFunction) => {
								return false
							});
							BdApi.Patcher.instead("YABDP4Nitro", this.emojiMods, "getEmojiUnavailableReason", (callee, args, originalFunction) => {
								return
							});
						}catch(err){
							console.error(err);
						}
					}
					
					if(this.settings.profileV2 == true){
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
					
					this.badgeUserIDs = [];
					
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
							if(this.profileEffects == undefined) this.profileEffects = WebpackModules.getAllByProps("profileEffects")[1].profileEffects;
							let profileEffectIdList = new Array();
							for(let i = 0; i < this.profileEffects.length; i++){
								profileEffectIdList.push(this.profileEffects[i].id)
							}
							this.profileFX(profileEffectIdList, this.profileEffects, this.secondsightifyEncodeOnly);
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
					//Code graciously stolen from https://gist.github.com/MeguminSama/2cae24c9e4c335c661fa94e72235d4c4?permalink_comment_id=4779787#gistcomment-4779787
					try{
						let cache; webpackChunkdiscord_app.push([["wp_isdev_patch"], {}, r => cache=r.c]);
						let UserStore = Object.values(cache).find(m => m?.exports?.default?.getUsers).exports.default;
						let actions = Object.values(UserStore._dispatcher._actionHandlers._dependencyGraph.nodes);
						let user = UserStore.getCurrentUser();
						actions.find(n => n.name === "ExperimentStore").actionHandler.CONNECTION_OPEN({
							type: "CONNECTION_OPEN", user: {flags: user.flags |= 1}, experiments: [],
						});
						actions.find(n => n.name === "DeveloperExperimentStore").actionHandler.CONNECTION_OPEN();
						webpackChunkdiscord_app.pop(); user.flags &= ~1; "done";
						
						this.hasAppliedExperiments = true;
					}catch(err){
						console.error(err);
					}
					
				}
				
				
				clientThemes(){
					if(this.clientThemesModule == undefined) this.clientThemesModule = BdApi.Webpack.getModule(BdApi.Webpack.Filters.byProps("isPreview"));
					delete this.clientThemesModule.isPreview;
					Object.defineProperty(this.clientThemesModule, "isPreview", { //Enabling the nitro theme settings
						value: false,
						configurable: true,
						enumerable: true,
						writable: true,
					});
							
					if(this.themesModule == undefined) this.themesModule = WebpackModules.getByProps("saveClientTheme");
					
					if(this.gradientSettingModule == undefined) this.gradientSettingModule = WebpackModules.getByProps("resetPreviewClientTheme");
							
					BdApi.Patcher.instead("YABDP4Nitro", this.themesModule, "saveClientTheme", (_,args) => {
						if(args[0].backgroundGradientPresetId == undefined){
							this.settings.lastGradientSettingStore = -1;
							if(args[0].theme == 'dark'){
								this.dispatcher.dispatch({
									type: "SELECTIVELY_SYNCED_USER_SETTINGS_UPDATE",
									changes: {
										appearance: {
											shouldSync: false,
											settings: {
												theme: 'dark',
												developerMode: true
											}
										}
									}
								})
								this.gradientSettingModule.resetPreviewClientTheme();
								return;
							}
									
							if(args[0].theme == 'light'){
								this.dispatcher.dispatch({
									type: "SELECTIVELY_SYNCED_USER_SETTINGS_UPDATE",
									changes: {
										appearance: {
											shouldSync: false,
											settings: {
												theme: 'light',
												developerMode: true
											}
										}
									}
								})
							}
							return;
						}else{
							this.settings.lastGradientSettingStore = args[0].backgroundGradientPresetId;
							this.dispatcher.dispatch({
									type: "SELECTIVELY_SYNCED_USER_SETTINGS_UPDATE",
									changes: {
										appearance: {
											shouldSync: false,
											settings: {
												theme: args[0].theme,
												clientThemeSettings: {
													backgroundGradientPresetId: args[0].backgroundGradientPresetId
												},
												developerMode: true
											}
										}
									}
								})
							this.gradientSettingModule.updateBackgroundGradientPreset(this.settings.lastGradientSettingStore);
						}
					});
							
					if(this.settings.lastGradientSettingStore != -1){ //If appearance is changed to a nitro client theme
						this.gradientSettingModule.updateBackgroundGradientPreset(this.settings.lastGradientSettingStore); //Restore gradient on plugin load/save
					}
					
					if(this.accountSwitchModule == undefined) this.accountSwitchModule = WebpackModules.getByProps("startSession");
					
					BdApi.Patcher.after("YABDP4Nitro", this.accountSwitchModule, "startSession", () => {
						if(this.settings.lastGradientSettingStore != -1){ //If appearance is changed to a nitro client theme
							this.gradientSettingModule.updateBackgroundGradientPreset(this.settings.lastGradientSettingStore); //Restore gradient on account switch
						}
					});
				} //End of clientThemes()
				
				
				customProfilePictureDecoding(){
					if(this.getAvatarUrlModule == undefined) this.getAvatarUrlModule = WebpackModules.getByPrototypes("getAvatarURL").prototype;
					BdApi.Patcher.instead("YABDP4Nitro", this.getAvatarUrlModule, "getAvatarURL", (user,args,originalFunction) => {
						//userpfp closer integration
						if(!this.fetchedUserPfp || this.userPfps == undefined){
							const userPfpJsonUrl = "https://raw.githubusercontent.com/UserPFP/UserPFP/main/source/data.json";
							//download & parse userPfp data
							BdApi.Net.fetch(userPfpJsonUrl).then(res => res.json()).then(res => this.userPfps = res.avatars); 
							this.fetchedUserPfp = true;
						}
						if(this.userPfps != undefined){
							if(this.userPfps[user.id] != undefined){
								return this.userPfps[user.id];
							}
						}
						
						
						if(DiscordModules.UserStatusStore.getActivities(user.id).length > 0){
							let activities = DiscordModules.UserStatusStore.getActivities(user.id);
							if(activities[0].name != "Custom Status") return originalFunction(user,args);
							let customStatus = activities[0].state;
							if(customStatus == undefined) return originalFunction(user,args);
							let revealedText = this.secondsightifyRevealOnly(String(customStatus));
							if(revealedText == undefined) return originalFunction(user,args);
							let regex = /P\{[^}]*\}/i;
							let matches = revealedText.toString().match(regex);
							if(matches == undefined) return originalFunction(user,args);
							if(matches == "") return originalFunction(user,args);
							let matchedText = matches[0].replace("P{", "").replace("}", "");
							if(!String(matchedText).endsWith(".gif") && !String(matchedText).endsWith(".png") && !String(matchedText).endsWith(".jpg") && !String(matchedText).endsWith(".jpeg") && !String(matchedText).endsWith(".webp")){
								matchedText += ".gif"; //No supported file extension detected. Falling back to a default file extension.
							}
							if(!this.badgeUserIDs.includes(user.id)) this.badgeUserIDs.push(user.id);
							return `https://i.imgur.com/${matchedText}`;
						}
						return originalFunction(user,args);
					})
				}
				
				
				customProfilePictureEncoding(secondsightifyEncodeOnly){
					function makePfpEncodingShit(self){
						if(document.getElementById("profilePictureButton") != null) return;
						if(self.containerClassModulePfp == undefined) self.containerClassModulePfp = WebpackModules.getAllByProps("buttonsContainer","removeButton","buttonHighlighted")[1];
						const profileThemeSection = document.getElementsByClassName(self.containerClassModulePfp.buttonsContainer);
						
						let profilePictureButton = document.createElement("button");
						profilePictureButton.innerText = "Copy 3y3";
						profilePictureButton.className = `${self.buttonClassModule.button} ${self.buttonClassModule.lookFilled} ${self.buttonClassModule.colorBrand} ${self.buttonClassModule.sizeSmall} ${self.buttonClassModule.grow}`;
						profilePictureButton.id = "profilePictureButton";
						profilePictureButton.style = "margin-left: 10px; white-space: nowrap";
						
						let profilePictureUrlInput = document.createElement("input");
						profilePictureUrlInput.id = "profilePictureUrlInput";
						profilePictureUrlInput.style = "width: 30%; height: 20%; max-height: 50%; margin-top:5px"
						profilePictureUrlInput.placeholder = "Imgur URL";
						
						profilePictureButton.onclick = async function(){
							const profilePictureUrlInput = document.getElementById("profilePictureUrlInput");
							let profilePictureUrlInputValue = String(profilePictureUrlInput.value);
							
							if(profilePictureUrlInputValue == "") return;
							if(profilePictureUrlInputValue == undefined) return;
							
							let stringToEncode = "" + profilePictureUrlInputValue
							.replace("http://", "")
							.replace("https://", "")
							.replace("i.imgur.com","imgur.com")
							
							let encodedStr = ""
							stringToEncode = String(stringToEncode);
							if(stringToEncode.toLowerCase().startsWith("imgur.com")){
								if(stringToEncode.replace("imgur.com/","").startsWith("a/")){
									//Album URL, use magic to get direct image link.
									const parser = new DOMParser();
									stringToEncode = await BdApi.Net.fetch(("https://" + stringToEncode), {
										method: "GET",
										mode: "cors"
									}).then(res => res.text().then(res => parser.parseFromString(res, "text/html").querySelector('[property="og:image"]').content));
									stringToEncode = stringToEncode.replace("http://", "")
									.replace("https://", "")
									.replace("i.imgur.com","imgur.com")
									.split("?")[0];
								}
								stringToEncode = "P{" + stringToEncode.replace("imgur.com/","") + "}"
								encodedStr = " " + secondsightifyEncodeOnly(stringToEncode);
								Toasts.info("3y3 copied to clipboard!");
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
								profileThemeSection[0].appendChild(profilePictureUrlInput);
								profileThemeSection[0].appendChild(profilePictureButton);
							}
						}
					}
					if(this.profileCustomizationModule == undefined) this.profileCustomizationModule = WebpackModules.getByProps("getTryItOutThemeColors");
					BdApi.Patcher.after("YABDP4Nitro", this.profileCustomizationModule, "getAllTryItOut", () => {
						try{
							makePfpEncodingShit(this);
						}catch(err){
							console.error(err);
						}
					});
					
					BdApi.Patcher.after("YABDP4Nitro", this.profileCustomizationModule, "getAllPending", () => {
						try{
							makePfpEncodingShit(this);
						}catch(err){
							console.error(err);
						}
					});
				} //End of customProfilePictureEncoding()
				
				
				honorBadge(){
					BdApi.Patcher.after("YABDP4Nitro", this.userProfileMod, "getUserProfile", (_,args,ret) => {
						if(ret == undefined) return;
						if(ret.userId == undefined) return;
						if(ret.badges == undefined) return;
						const badgesList = [];
						for(let i = 0; i < ret.badges.length; i++){
							badgesList.push(ret.badges[i].id);
						}
						if(this.badgeUserIDs.includes(ret.userId) && !badgesList.includes("yabdp_user")){
							ret.badges.push({
								id: "yabdp_user",
								icon: "2ba85e8026a8614b640c2837bcdfe21b", //Nitro icon, gets replaced later.
								description: "A fellow YABDP4Nitro user!", 
								link: "https://github.com/riolubruh/YABDP4Nitro"
							});
						}
						if(ret.userId == "359063827091816448" && !badgesList.includes("yabdp_creator")){
							ret.badges.push({
								id: "yabdp_creator",
								icon: "2ba85e8026a8614b640c2837bcdfe21b", //Nitro icon, gets replaced later.
								description: "YABDP4Nitro Creator!",
								link: "https://github.com/riolubruh/YABDP4Nitro"
							});
						}
						const specialThanks = ["122072911455453184", "760274365853335563"];
						if(specialThanks.includes(ret.userId) && !badgesList.includes("yabdp_contributor")){
							ret.badges.push({
								id: "yabdp_contributor",
								icon: "2ba85e8026a8614b640c2837bcdfe21b", //Nitro icon, gets replaced later.
								description: "YABDP4Nitro Contributor!",
								link: "https://github.com/riolubruh/YABDP4Nitro#contributors"
							});
						}
					});
					
					function applyCustomBadgeIcon(self){
						if(self.profileBadgesClass == undefined) self.profileBadgesClass = WebpackModules.getByProps("profileBadges").profileBadges;
						for(const element of document.getElementsByClassName(self.profileBadgesClass) + document.getElementsByClassName(DiscordClassModules.UserModal.profileBadge)){
							const qry = document.querySelectorAll('[aria-label="A fellow YABDP4Nitro user!"]');
							if(qry.length > 0){
								qry.forEach((obj) => {
									const icon = "https://raw.githubusercontent.com/riolubruh/riolubruh.github.io/main/badge.png";
									const badge = obj;
									if(badge.firstChild.src != icon) badge.firstChild.src = icon;
								});		
							}
							const qry2 = document.querySelectorAll('[aria-label="YABDP4Nitro Creator!"]');
							if(qry2.length > 0){
								qry2.forEach((obj) => {
									const icon = "https://i.imgur.com/bYGGXnq.gif";
									const badge = obj;
									if(badge.firstChild.src != icon) badge.firstChild.src = icon;
								});		
							}
							const qry3 = document.querySelectorAll('[aria-label="YABDP4Nitro Contributor!"]');
							if(qry3.length > 0){
								qry3.forEach((obj) => {
									const icon = "https://i.imgur.com/bYGGXnq.gif";
									const badge = obj;
									if(badge.firstChild.src != icon) badge.firstChild.src = icon;
								});		
							}
						}
					}
					
					if(this.profileRenderer == undefined) this.profileRenderer = WebpackModules.getAllByProps("default").filter((obj) => obj.default.toString().includes("CLYDE_SETTINGS"))[0];
					
					BdApi.Patcher.after("YABDP4Nitro", this.profileRenderer, "default", (_,args,ret) => {
						try{
							applyCustomBadgeIcon(this);
						}catch(err){
							console.error(err);
						}
					});
					
					if(this.profileCustomizationModule == undefined) this.profileCustomizationModule = WebpackModules.getByProps("getTryItOutThemeColors");
					BdApi.Patcher.after("YABDP4Nitro", this.profileCustomizationModule, "getAllTryItOut", () => {
						try{
							applyCustomBadgeIcon(this);
						}catch(err){
							console.error(err);
						}
					});
					
					BdApi.Patcher.after("YABDP4Nitro", this.profileCustomizationModule, "getAllPending", () => {
						try{
							applyCustomBadgeIcon(this);
						}catch(err){
							console.error(err);
						}
					});
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
				
				
				profileFX(profileEffectIdList, profileEffects, secondsightifyEncodeOnly){
					if(this.settings.killProfileEffects) return;
					BdApi.Patcher.after("YABDP4Nitro", this.userProfileMod, "getUserProfile", (_,args,ret) => {
						if(ret == undefined) return;
						if(ret.bio == undefined) return;
						
						let revealedText = this.secondsightifyRevealOnly(ret.bio);
						if(revealedText == undefined) return;
						
						if(revealedText.includes("/fx")){
							let position = revealedText.indexOf("/fx");
							if(position == undefined) return;
							let effectIndex = parseInt(revealedText.slice(position+3, position+5));
							if(isNaN(effectIndex)) return;
							if(profileEffectIdList[effectIndex] == undefined) return;
							ret.profileEffectID = profileEffectIdList[effectIndex];
							if(args[0] == undefined) return;
							if(!this.badgeUserIDs.includes(args[0])) this.badgeUserIDs.push(args[0]);
						}
					});
					
					function makeProfileEffectButtons(self){
						if(self.profileFxButtonContainerClass == undefined) self.profileFxButtonContainerClass = WebpackModules.getByProps("buttonsContainer", "newBadge").buttonsContainer;
						
						let profileCustomizationSection = document.getElementsByClassName(self.profileFxButtonContainerClass)[0];
						
						/*if(profileCustomizationSection == undefined){
							if(self.containerClass == undefined) self.containerClass = WebpackModules.getByProps("container", "control", "disabled", "dividerDefault").container;
							profileCustomizationSection = document.getElementsByClassName(self.containerClass)[0];
						}*/
						
						const buttonClassModule = self.buttonClassModule;
						
						let changeProfileEffectButton = `<button id="changeProfileEffectButton" 
						class="${buttonClassModule.button} ${buttonClassModule.lookFilled} ${buttonClassModule.colorBrand} ${buttonClassModule.sizeSmall} ${buttonClassModule.grow}"
						style="background-color: #7289da; width: 100px; height: 32px; color: white; border-radius: 3px;"
						onclick='if(document.getElementById("profileEffects").style.display == "block"){document.getElementById("profileEffects").style.display = "none"}else if(document.getElementById("profileEffects").style.display == "none") document.getElementById("profileEffects").style.display = "block";'>
						Change Effect [YABDP4Nitro]</button>`;
						if(document.getElementById("changeProfileEffectButton") == undefined){
							let profileEffectButton = document.createElement("div");
							profileEffectButton.innerHTML = changeProfileEffectButton;
							//profileCustomizationSection.innerHTML += changeProfileEffectButton;
							profileCustomizationSection.append(profileEffectButton);
							
							let profileEffectsHTML = `<div id="profileEffects" style="display:none; color:white; white-space: nowrap; overflow: visible;">
								<style>
									.riolubruhsSecretStuff {
										width: 20%;
										cursor: pointer;
									}
								</style>`;
							for(let i = 0; i < profileEffects.length; i++){
								let previewURL = profileEffects[i].config.thumbnailPreviewSrc;
								profileEffectsHTML += `<img class="riolubruhsSecretStuff" src="${previewURL}" />${i}`
								if((i+1) % 4 == 0){ //every 4th profile effect
									profileEffectsHTML += "<br>";
								}
							}
							profileEffectsHTML += "</div>";
							let profileEffectsElement = document.createElement("div");
							profileEffectsElement.innerHTML = profileEffectsHTML;
							
							//profileCustomizationSection.innerHTML += profileEffectsHTML;
							profileCustomizationSection.parentElement.append(profileEffectsElement);
							
							let profileEffectButtons = document.getElementsByClassName("riolubruhsSecretStuff");
							
							for(let i = 0; i < profileEffectButtons.length; i++){
								let encodedText = secondsightifyEncodeOnly("/fx" + i);
								let copyDecoration3y3 = `const clipboardTextElem = document.createElement("textarea"); clipboardTextElem.style.position = "fixed"; clipboardTextElem.value = " ${encodedText}"; document.body.appendChild(clipboardTextElem); clipboardTextElem.select(); clipboardTextElem.setSelectionRange(0, 99999); document.execCommand("copy"); ZLibrary.Toasts.info("3y3 copied to clipboard!"); document.body.removeChild(clipboardTextElem);`
								profileEffectButtons[i].outerHTML = profileEffectButtons[i].outerHTML.replace("class", `onclick='${copyDecoration3y3}' class`);
							} 
						}
					}
					
					if(this.profileCustomizationModule == undefined) this.profileCustomizationModule = WebpackModules.getByProps("getTryItOutThemeColors");
					BdApi.Patcher.after("YABDP4Nitro", this.profileCustomizationModule, "getAllTryItOut", () => {
						try{
							makeProfileEffectButtons(this);
						}catch(err){
							console.error(err);
						}
					});
					
					BdApi.Patcher.after("YABDP4Nitro", this.profileCustomizationModule, "getAllPending", () => {
						try{
							makeProfileEffectButtons(this);
						}catch(err){
							console.error(err);
						}
					});
					
				} //End of profileFX()
				
				
				killProfileFX(){
					BdApi.Patcher.after("YABDP4Nitro", this.userProfileMod, "getUserProfile", (_,args,ret) => {
						if(ret == undefined) return;
						if(ret.profileEffectID == undefined) return;
						ret.profileEffectID = undefined;
					});
				}
				
				
				fakeAvatarDecorations(self){
					if(this.shopModule == undefined) this.shopModule = WebpackModules.getAllByProps("default").filter((obj) => obj.default.toString().includes("useFetchCollectiblesCategoriesAndPurchases"))[0];
					
					let avatarDecorations = self.settings.avatarDecorations;
					
					try{
						BdApi.Patcher.after("YABDP4Nitro", this.shopModule, "default", (_,args,ret) => {
							if(ret.categories == undefined) return;
							function handleEachItem(item){
								if(item.asset != undefined){
									if(self.settings.avatarDecorations != undefined){
										if(self.settings.avatarDecorations.length > 0){
											if(self.settings.avatarDecorations.includes(String(item.asset))) return;
										}
									}
									self.settings.avatarDecorations.unshift(String(item.asset));
									Utilities.saveSettings(self.getName(), self.settings);
								}
							}
							function handleEachProduct(product){
								product.items.forEach((item) => handleEachItem(item));
							}
							function handleEachStoreItem(element){
								element.products.forEach((product) => handleEachProduct(product));
							}
							ret.categories.forEach((element) => handleEachStoreItem(element))
						});
					}catch(err){
						console.log("[YABDP4Nitro] An error occurred while patching the shop module.")
						console.error(err);
					}
					
					
					let downloadedUserProfiles = [];
					BdApi.Patcher.after("YABDP4Nitro", self.userProfileMod, "getUserProfile", (_,args,ret) => {
						if(ret == undefined) return;
						if(ret.userId == undefined) return;
						if(downloadedUserProfiles.includes(args[0])) return;
						downloadedUserProfiles.push(ret.userId);
					});
					
					BdApi.Patcher.after("YABDP4Nitro", DiscordModules.UserStore, "getUser", (_,args,ret) => {
						if(args == undefined) return;
						if(args[0] == undefined) return;
						if(ret == undefined) return;
						
						if((avatarDecorations == new Array()) || (avatarDecorations == undefined) || (avatarDecorations.length == 0)){
							//Fallback to potentially outdated list in case the user has not downloaded the avatar decoration data yet.
							avatarDecorations = [
								"a_10b9f886b513b77ccdd67c8784f1a496",//a0
								"a_fed43ab12698df65902ba06727e20c0e",//a1
								"a_d3da36040163ee0f9176dfe7ced45cdc",//a2
								"a_950aea7686c5674b4e2f5df0830d153b",//a3
								"a_8b0d858b65a81ea0c537091a4650a6d4",//a4
								"a_faaa56d945e2d0f6c41cf940d122cb9e",//a5
								"a_9b7b74e72efe1bc5a6beddced3da3c0f",//a6
								"a_aa2e1c2b3cf05b24f6ec7b8b4141f5fc",//a7
								"a_911e48f3a695c7f6c267843ab6a96f2f",//a8
								"a_3c97a2d37f433a7913a1c7b7a735d000",//a9
								"a_f1b2fd4706ab02b54d3a58f84b3ef564",//a10
								"a_8ffa2ba9bff18e96b76c2e66fd0d7fa3",//a11
								"a_d72066b8cecbadd9fc951913ebcc384f",//a12
								"a_55c9d0354290afa8b7fe47ea9bd7dbcf",//a13
								"a_c3c09bd122898be35093d0d59850f627",//a14
								"a_c7e1751e8122f1b475cb3006966fb28c",//a15
								"a_4c9f2ec29c05755456dbce45d8190ed4",//a16
								"a_9d67a1cbf81fe7197c871e94f619b04b",//a17
								"a_29a0533cb3de61aa8179810188f3830d",//a18
								"a_d650e22f6c4bab4fc0969e9d35edbcb0",//a19
								"a_db9baf0ba7cf449d2b027c06309dbe8d",//a20
								"a_fe3c76cac2adf426832a7e495e8329d3",//a21
								"a_1dbc603c181999b9815cb426dfec71a6",//a22
								"a_0f5d6c4dd8ae74662ee9c40722a56cbd",//a23
								"a_7d305bca6cf371df98c059f9d2ef05e4",//a24
								"a_4936aa6c33a101b593f9607d48d686ec",//a25
								"a_145dffeb81bcfff96be683fd9f6db20a",//a26
								"a_5087f7f988bd1b2819cac3e33d0150f5",//a27
								"a_50939e8f95b0ddfa596809480b0eb3e1",//a28
								"a_f979ba5f9c2ba83db3149cc02f489f7c",//a29
								"a_b9a64088e30fd3a6f2456c2e0f44f173",//a30
								"a_ad4e2cad924bbb3a2fddf5c527370479" //a31
							]
						}
						
						function getRevealedText(self){
							let revealedTextLocal = "";
							if(downloadedUserProfiles.includes(args[0])){
								let userProfile = self.userProfileMod.getUserProfile(args[0]);
								if(userProfile.bio == undefined) return;
								revealedTextLocal = self.secondsightifyRevealOnly(String(userProfile.bio));
								if(revealedTextLocal != undefined){
									if(String(revealedTextLocal).includes("/a")){
										return revealedTextLocal;
									}
								}
							}
							if(DiscordModules.UserStatusStore.getActivities(args[0]).length > 0){
								let activities = DiscordModules.UserStatusStore.getActivities(args[0]);
								if(activities[0].name != "Custom Status") return;
								let customStatus = activities[0].state;
								if(customStatus == undefined) return;
								revealedTextLocal = self.secondsightifyRevealOnly(String(customStatus));
								return revealedTextLocal;
							}
						}
						let revealedText = getRevealedText(this);
						if(revealedText == undefined) return;
						if(revealedText == "") return;
						
						let position = revealedText.indexOf("/a");
						if(position == undefined) return;
						let assetIndex = parseInt(revealedText.slice(position+2, position+4));
						if(isNaN(assetIndex)) return;
						
						if(assetIndex > (avatarDecorations.length - 1)) return;
						if(ret.avatarDecorationData == undefined || ret.avatarDecorationData?.asset != avatarDecorations[assetIndex]){
							ret.avatarDecorationData = {
								asset: avatarDecorations[assetIndex],
								sku_id: "1144003461608906824"
							}
							if(!this.badgeUserIDs.includes(ret.id)) this.badgeUserIDs.push(ret.id);
						}
					});
					
					function makeAvatarDecorationShit(secondsightifyEncodeOnly, avatarDecorations, buttonClassModule, self){
						if(self.avatarDecorationButtonsContainerClass == undefined) self.avatarDecorationButtonsContainerClass = WebpackModules.getAllByProps("buttonsContainer", "buttonHighlighted", "removeButton")[3].buttonsContainer;
						let avatarDecorationSection = document.getElementsByClassName(self.avatarDecorationButtonsContainerClass)[0];
						
						if(avatarDecorationSection != undefined){
							if(document.getElementById("decorationButton") == undefined){
								let decorationButtonHTML = `<button id="decorationButton" 
								class="${buttonClassModule.button} ${buttonClassModule.lookFilled} ${buttonClassModule.colorBrand} ${buttonClassModule.sizeSmall} ${buttonClassModule.grow}"
								style="background-color: #7289da; width: 100px; height: 50px; color: white; border-radius: 3px;"
								onclick='if(document.getElementById("avatarDecorations").style.display == "block"){document.getElementById("avatarDecorations").style.display = "none"}else if(document.getElementById("avatarDecorations").style.display == "none") document.getElementById("avatarDecorations").style.display = "block";'>
								Change Decoration [YABDP4Nitro]</button>`
								
								let decorationButtonElement = document.createElement("div");
								decorationButtonElement.innerHTML = decorationButtonHTML;
								
								avatarDecorationSection.append(decorationButtonElement);
								
								if(document.getElementById("avatarDecorations") == undefined){
									let avatarDecorationsHTML = `<div id="avatarDecorations" style="display:none; color:white; white-space: nowrap; overflow: visible;">
										<style>
											.riolubruhsspecialsauce {
												width: 20%;
												cursor: pointer;
											}
										</style>
										`
									for(let i = 0; i < avatarDecorations.length; i++){ //no more copy-pasted html, I can die happy
										avatarDecorationsHTML += `<img class="riolubruhsspecialsauce" src="https://cdn.discordapp.com/avatar-decoration-presets/` + avatarDecorations[i] + `.png?size=64" /> ${i}`
										if((i+1) % 4 == 0) avatarDecorationsHTML += "<br>"
									}
									avatarDecorationsHTML += "</div>";
									let avatarDecorationsElement = document.createElement("div")
									avatarDecorationsElement.innerHTML = avatarDecorationsHTML;
									avatarDecorationSection.parentElement.append(avatarDecorationsElement);
									
									let avatarDecorationsElements = document.getElementsByClassName("riolubruhsspecialsauce");
									
									for(let i = 0; i < avatarDecorationsElements.length; i++){
										let encodedText = secondsightifyEncodeOnly("/a" + i);
										let copyDecoration3y3 = `const clipboardTextElem = document.createElement("textarea"); clipboardTextElem.style.position = "fixed"; clipboardTextElem.value = " ${encodedText}"; document.body.appendChild(clipboardTextElem); clipboardTextElem.select(); clipboardTextElem.setSelectionRange(0, 99999); document.execCommand("copy"); ZLibrary.Toasts.info("3y3 copied to clipboard!"); document.body.removeChild(clipboardTextElem);`
										avatarDecorationsElements[i].outerHTML = avatarDecorationsElements[i].outerHTML.replace("class", `onclick='${copyDecoration3y3}' class`);
									}
								}
							}
						}
					}
					
					if(this.profileCustomizationModule == undefined) this.profileCustomizationModule = WebpackModules.getByProps("getTryItOutThemeColors");
					BdApi.Patcher.after("YABDP4Nitro", this.profileCustomizationModule, "getAllTryItOut", () => {
						try{
							makeAvatarDecorationShit(this.secondsightifyEncodeOnly, avatarDecorations, this.buttonClassModule, this);
						}catch(err){
							console.error(err);
						}
					});
					
					BdApi.Patcher.after("YABDP4Nitro", this.profileCustomizationModule, "getAllPending", () => {
						try{
							makeAvatarDecorationShit(this.secondsightifyEncodeOnly, avatarDecorations, this.buttonClassModule, this);
						}catch(err){
							console.error(err);
						}
					});

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
					
					let file = await fetch(url).then(r => r.blob()).then(blobFile => new File([blobFile], (emoji.name + extension)))
					file.platform = 1;
					file.spoiler = false;
					
					if(this.CloudUploader == undefined)  this.CloudUploader = WebpackModules.getByProps("CloudUpload", "CloudUploadStatus");
					
					let fileUp = new this.CloudUploader.CloudUpload({file:file,isClip:false,isThumbnail:false,platform:1}, channelIdLmao, false, 0);
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
						await this.Uploader.uploadFiles(uploadOptions);
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
				
				
				customVideoSettings() { //Unlock stream buttons, apply custom resolution and fps, and apply stream quality bypasses
					if(this.StreamButtons == undefined) this.StreamButtons = WebpackModules.getByProps("ApplicationStreamFPSButtons", "ApplicationStreamResolutionButtons");
					if(this.settings.ResolutionEnabled && this.settings.CustomResolution != 0){
						delete this.StreamButtons.ApplicationStreamResolutions.RESOLUTION_1440
						this.StreamButtons.ApplicationStreamResolutions.RESOLUTION_1440 = this.settings.CustomResolution;
						this.StreamButtons.ApplicationStreamSettingRequirements[4].resolution = this.settings.CustomResolution;
						this.StreamButtons.ApplicationStreamSettingRequirements[5].resolution = this.settings.CustomResolution;
						this.StreamButtons.ApplicationStreamSettingRequirements[6].resolution = this.settings.CustomResolution;
						this.StreamButtons.ApplicationStreamResolutionButtons[2].value = this.settings.CustomResolution;
						delete this.StreamButtons.ApplicationStreamResolutionButtons[2].label;
						this.StreamButtons.ApplicationStreamResolutionButtons[2].label = this.settings.CustomResolution.toString();
						this.StreamButtons.ApplicationStreamResolutionButtonsWithSuffixLabel[3].value = this.settings.CustomResolution;
						delete this.StreamButtons.ApplicationStreamResolutionButtonsWithSuffixLabel[3].label;
						this.StreamButtons.ApplicationStreamResolutionButtonsWithSuffixLabel[3].label = this.settings.CustomResolution + "p";
					}
					if(!this.settings.ResolutionEnabled || this.settings.CustomResolution == 0){
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
					this.StreamButtons.ApplicationStreamSettingRequirements.forEach(removeQualityParameters);
					function replace60FPSRequirements(x) {
						if(x.fps != 30 && x.fps != 15 && x.fps != 5) x.fps = BdApi.getData("YABDP4Nitro","settings").CustomFPS;
					}
					function restore60FPSRequirements(x) {
						if(x.fps != 30 && x.fps != 15 && x.fps != 5) x.fps = 60;
					}
					
					if(this.settings.CustomFPSEnabled){
						if(this.CustomFPS != 60){
							this.StreamButtons.ApplicationStreamSettingRequirements.forEach(replace60FPSRequirements);
							this.StreamButtons.ApplicationStreamFPSButtonsWithSuffixLabel[2].value = this.settings.CustomFPS;
							delete this.StreamButtons.ApplicationStreamFPSButtonsWithSuffixLabel[2].label;
							this.StreamButtons.ApplicationStreamFPSButtonsWithSuffixLabel[2].label = this.settings.CustomFPS + " FPS";
							this.StreamButtons.ApplicationStreamFPSButtons[2].value = this.settings.CustomFPS;
							delete this.StreamButtons.ApplicationStreamFPSButtons[2].label;
							this.StreamButtons.ApplicationStreamFPSButtons[2].label = this.settings.CustomFPS;
							this.StreamButtons.ApplicationStreamFPS.FPS_60 = this.settings.CustomFPS;
						}
					}
					if(!this.settings.CustomFPSEnabled || this.CustomFPS == 60){
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


				emojiBypass(){ //Moved to a function to declutter saveAndUpdate
					//Upload Emotes
					if(this.settings.uploadEmotes) {
						BdApi.Patcher.instead("YABDP4Nitro", DiscordModules.MessageActions, "_sendMessage", (_, msg, send) => {
							const currentChannelId = msg[0];
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
							});
							if((msg[1].content !== undefined && msg[1].content != "") && runs == 0) {
								send(msg[0], msg[1], msg[2], msg[3]);
							}
						});
					}
					//Emoji bypass with ghost mode
					if(this.settings.ghostMode && !this.settings.uploadEmotes) {
						BdApi.Patcher.before("YABDP4Nitro", DiscordModules.MessageActions, "sendMessage", (_, [currentChannelId, msg]) => {
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
						return
					}
					//Original method
					if(!this.settings.ghostMode && !this.settings.uploadEmotes) {
						BdApi.Patcher.before("YABDP4Nitro", DiscordModules.MessageActions, "sendMessage", (_, [currentChannelId, msg]) => {
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
						return
					}
				} //End of emojiBypass()
				
				
				updateQuick(){ //Function that runs when the resolution/fps quick menu is changed
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
								e.voiceBitrate = (this.settings.voiceBitrate * 1000);
								
								e.conn.setTransportOptions({
									encodingVoiceBitRate: e.voiceBitrate
								})
							}
							
						});
					}
					if(this.settings.CustomFPSEnabled){
						BdApi.Patcher.before("YABDP4Nitro", this.videoOptionFunctions, "updateVideoQuality", (e) => {
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
					if(this.settings.screenSharing){
						BdApi.Patcher.before("YABDP4Nitro", this.videoOptionFunctions, "updateVideoQuality", (e) => {
							const videoQuality = new Object({
								width: e.videoStreamParameters[0].maxResolution.width,
								height: e.videoStreamParameters[0].maxResolution.height,
								framerate: e.videoStreamParameters[0].maxFrameRate,
							});
							e.videoQualityManager.options.videoBudget = videoQuality;
							e.videoQualityManager.options.videoCapture = videoQuality;
							e.videoQualityManager.ladder.pixelBudget = (videoQuality.height * videoQuality.width);
							
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
				
				
				encodeProfileColors(primary, accent) {
					if(this.themeColorsPickerModule == undefined) this.themeColorsPickerModule = WebpackModules.getByProps("getTryItOutThemeColors");
					
					function makeCopyButtonAndEncoding(themeColorsPickerModule, self){
						const sectionContainerClassModule = WebpackModules.getByProps("sectionContainer");
						const profileThemeSection = document.getElementsByClassName(sectionContainerClassModule.sectionContainer);
						let copyButton = document.createElement("button");
						copyButton.innerText = "Copy 3y3";
						copyButton.className = `${self.buttonClassModule.button} ${self.buttonClassModule.lookFilled} ${self.buttonClassModule.colorBrand} ${self.buttonClassModule.sizeSmall} ${self.buttonClassModule.grow}`;
						copyButton.id = "copy3y3button";
						copyButton.style = "margin-left: 10px; margin-top: 10px";
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
						if(profileThemeSection[0] != undefined){
							if(profileThemeSection[0].children.length == 2){
								profileThemeSection[0].appendChild(copyButton);
							}
						}
					}
					BdApi.Patcher.after("YABDP4Nitro", this.themeColorsPickerModule, "getAllTryItOut", () => {
						makeCopyButtonAndEncoding(this.themeColorsPickerModule, this);
						
					});
					BdApi.Patcher.after("YABDP4Nitro", this.themeColorsPickerModule, "getAllPending", () => {
						makeCopyButtonAndEncoding(this.themeColorsPickerModule, this);
					});
				} //End of encodeProfileColors()
				
				
				bannerUrlDecoding(){
					if(this.settings.userBgIntegration){ //download & parse userBg data
						const userBgJsonUrl = "https://raw.githubusercontent.com/Discord-Custom-Covers/usrbg/master/dist/usrbg.json";
						if(this.fetchedUserBg) return; //already fetched userbg database. previous code was probably laggy as fuck sry
						fetch(userBgJsonUrl).then(res => res.text().then(str => JSON.parse(str).forEach(obj => { //download, then parse json
							this.userBgs[obj.uid] = obj.img; //add each entry to an object with {userId: imgURL} format
						})));
						this.fetchedUserBg = true;
					}
					if(this.bannerUrlModule == undefined) this.bannerUrlModule = WebpackModules.getByPrototypes("getBannerURL");
					
					BdApi.Patcher.before("YABDP4Nitro", this.bannerUrlModule, "getUserBannerURL", (_,args) => {
						args[0].canAnimate = true; //fixes nitro banners not animating
					});
					
					BdApi.Patcher.instead("YABDP4Nitro", this.bannerUrlModule.prototype, "getBannerURL", (user, args, ogFunction) => {
						let profile = user._userProfile;
						if(profile == undefined) return ogFunction(user, args);
						
						if(this.settings.userBgIntegration){
							let userBg = this.userBgs[user.userId];
							if(userBg != undefined){
								profile.banner = "funky_kong_is_epic";
								profile.premiumType = 2;
								return userBg;
							}
						}
						
						if(profile.bio == undefined) return ogFunction(user, args);
						
						let parsed = this.secondsightifyRevealOnly(profile.bio);
						if(parsed == undefined) return ogFunction(user, args);
						
						let regex = /B\{[^}]*\}/i;
						let matches = parsed.toString().match(regex);
						if(matches == undefined) return ogFunction(user, args);
						if(matches == "") return ogFunction(user, args);
						let matchedText = matches[0].replace("B{", "").replace("}", "");
						if(!String(matchedText).endsWith(".gif") && !String(matchedText).endsWith(".png") && !String(matchedText).endsWith(".jpg") && !String(matchedText).endsWith(".jpeg") && !String(matchedText).endsWith(".webp")){
							matchedText += ".gif"; //No supported file extension detected. 
							//Falling back to a default file extension
						}
						profile.banner = "funky_kong_is_epic" //this can be literally any string, i just like funky kong
						profile.premiumType = 2;
						if(!this.badgeUserIDs.includes(user.userId)) this.badgeUserIDs.push(user.userId);
						return `https://i.imgur.com/${matchedText}`;
					});
					
					if(this.profileRenderer == undefined) this.profileRenderer = WebpackModules.getAllByProps("default").filter((obj) => obj.default.toString().includes("CLYDE_SETTINGS"))[0];
					
					BdApi.Patcher.before("YABDP4Nitro", this.profileRenderer, "default", (_,args) => {
						if(args == undefined) return;
						if(args[0]?.displayProfile?.banner == undefined) return;
						if(args[0].displayProfile.banner == "funky_kong_is_epic"){
							args[0].showPremiumBadgeUpsell = false;
						}
					});
					
					BdApi.Patcher.after("YABDP4Nitro", this.profileRenderer, "default", (_,args,ret) => {
						if(args == undefined) return;
						if(args[0]?.displayProfile?.banner == undefined) return;
						if(ret == undefined) return;
						if(ret.props?.hasBanner == undefined) return;
						if(args[0].displayProfile.banner == "funky_kong_is_epic"){
							ret.props.hasBanner = true;
						}
					});
				} //End of bannerUrlDecoding()
				
				
				bannerUrlEncoding(secondsightifyEncodeOnly){
					function makeBannerEncodingShit(self){
						if(document.getElementById("profileBannerButton") != undefined) return;
						if(self.containerClassModuleBanner == undefined) self.containerClassModuleBanner = WebpackModules.getAllByProps("buttonsContainer","removeButton","buttonHighlighted")[2];
						
						const profileThemeSection = document.getElementsByClassName(self.containerClassModuleBanner.buttonsContainer);
						const buttonClassModule = self.buttonClassModule;
						
						let profileBannerButton = document.createElement("button");
						profileBannerButton.innerText = "Copy 3y3";
						profileBannerButton.className = `${buttonClassModule.button} ${buttonClassModule.lookFilled} ${buttonClassModule.colorBrand} ${buttonClassModule.sizeSmall} ${buttonClassModule.grow}`;
						profileBannerButton.id = "profileBannerButton";
						profileBannerButton.style = "margin-left: 10px; white-space: nowrap";
						
						let profileBannerUrlInput = document.createElement("input");
						profileBannerUrlInput.id = "profileBannerUrlInput";
						profileBannerUrlInput.style = "width: 30%; height: 20%; max-height: 50%; margin-left:10px; margin-top:5px"
						profileBannerUrlInput.placeholder = "Imgur URL";
						
						profileBannerButton.onclick = async function(){
							const profileBannerUrlInput = document.getElementById("profileBannerUrlInput");
							let profileBannerUrlInputValue = String(profileBannerUrlInput.value);
							
							if(profileBannerUrlInputValue == "") return;
							if(profileBannerUrlInputValue == undefined) return;
							
							let stringToEncode = "" + profileBannerUrlInputValue
							.replace("http://", "")
							.replace("https://", "")
							.replace("i.imgur.com","imgur.com");
							
							let encodedStr = ""
							stringToEncode = String(stringToEncode);
							if(stringToEncode.toLowerCase().startsWith("imgur.com")){
								if(stringToEncode.replace("imgur.com/","").startsWith("a/")){
									//Album URL, use magic to get direct image link.
									const parser = new DOMParser();
									stringToEncode = await BdApi.Net.fetch(("https://" + stringToEncode), {
										method: "GET",
										mode: "cors"
									}).then(res => res.text().then(res => parser.parseFromString(res, "text/html").querySelector('[property="og:image"]').content));
									stringToEncode = stringToEncode.replace("http://", "")
									.replace("https://", "")
									.replace("i.imgur.com","imgur.com")
									.split("?")[0];
								}
								
								stringToEncode = "B{" + stringToEncode.replace("imgur.com/","") + "}"
								encodedStr = " " + secondsightifyEncodeOnly(stringToEncode);
								Toasts.info("3y3 copied to clipboard!");
								
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
					
					if(this.profileCustomizationModule == undefined) this.profileCustomizationModule = WebpackModules.getByProps("getTryItOutThemeColors");
					BdApi.Patcher.after("YABDP4Nitro", this.profileCustomizationModule, "getAllTryItOut", () => {
						try{
							makeBannerEncodingShit(this);
						}catch(err){
							console.error(err);
						}
					});
					
					BdApi.Patcher.after("YABDP4Nitro", this.profileCustomizationModule, "getAllPending", () => {
						try{
							makeBannerEncodingShit(this);
						}catch(err){
							console.error(err);
						}
					});
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
					try{
						BdApi.DOM.removeStyle("YABDP4Nitro");
					}catch(err){
						console.error(err);
					}
					try{
						BdApi.DOM.removeStyle("userPfp");
					}catch(err){
						console.error(err);
					}
					this.userBgs = {};
				}
			};
		};
		return plugin(Plugin, Api);
	})(global.ZeresPluginLibrary.buildPlugin(config));
})();
/*@end@*/
