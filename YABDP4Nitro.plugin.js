/**
 * @name YABDP4Nitro
 * @author Riolubruh
 * @version 4.0.1
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
            "version": "4.0.1",
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
        start() {}
        stop() {}
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
					"PNGemote" : true,
					"uploadEmotes": false,
                };
                settings = PluginUtilities.loadSettings(this.getName(), this.defaultSettings);
                getSettingsPanel() {
                    return Settings.SettingPanel.build(_ => this.saveAndUpdate(), ...[
                        new Settings.SettingGroup("Features").append(...[
                            new Settings.Switch("High Quality Screensharing", "1080p/source @ 60fps screensharing. There is no reason to disable this.", this.settings.screenSharing, value => this.settings.screenSharing = value)
                        ]),
                        new Settings.SettingGroup("Emojis").append(
                            new Settings.Switch("Nitro Emotes Bypass", "Enable or disable using the emoji bypass.", this.settings.emojiBypass, value => this.settings.emojiBypass = value),
                            new Settings.Slider("Size", "The size of the emoji in pixels. 48 is the default.", 16, 128, this.settings.emojiSize, size=>this.settings.emojiSize = size, {markers:[16,32,48,64,80,96,112,128], stickToMarkers:true}), //made slider wider and have more options
							new Settings.Switch("Ghost Mode", "Abuses ghost message bug to hide the emoji url. Will not appear to work to those on the Android app.", this.settings.ghostMode, value => this.settings.ghostMode = value),
							new Settings.Switch("Don't Use Emote Bypass if Emote is Unlocked", "Disable to use emoji bypass even if bypass is not required for that emoji.", this.settings.emojiBypassForValidEmoji, value => this.settings.emojiBypassForValidEmoji = value),
							new Settings.Switch("Use PNG instead of WEBP", "Use the PNG version of emoji for higher quality!", this.settings.PNGemote, value => this.settings.PNGemote = value),
							new Settings.Switch("Upload Emotes as Images", "Upload emotes as image(s) after message is sent. (Overrides linking emotes) [Warning: this breaks shit currently, such as replies. Use at your own risk.]", this.settings.uploadEmotes, value => this.settings.uploadEmotes = value)
						) 
                    ])
                }
				
				
				async UploadEmote(url, channelIdLmao, msg, emoji, runs) {
					const Uploader = BdApi.findModuleByProps('instantBatchUpload');
					var extension = ".gif";
					if(!emoji.animated){
						extension = ".png";
					}
					if(!this.settings.PNGemote){
						extension = ".webp";
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
						message: { content: msg.content, invalidEmojis: [], tts: false, channel_id: channelIdLmao },
						hasSpoiler: false,
						filename: emoji.name + extension
					});
				}
				
				emojiBypassForValidEmoji(emoji, currentChannelId){ //Made into a function to save space and clean up
					if(this.settings.emojiBypassForValidEmoji){
						/*
						if(!DiscordModules.EmojiInfo.isEmojiFilteredOrLocked(emoji)){ //This part seemingly just broke for some reason, likely a Discord update.
						console.log("NOTFilteredOrLocked");
						return true
						}*/
						if((DiscordModules.SelectedGuildStore.getLastSelectedGuildId() == emoji.guildId) && !emoji.animated && ((DiscordModules.ChannelStore.getChannel(currentChannelId).type <= 0) == true)){
							return true
						}
					}
				}
				
				async StreamFPSButtons() {
					const StreamFPSButtons = BdApi.findModuleByProps("ApplicationStreamFPSButtons");
					StreamFPSButtons.ApplicationStreamSettingRequirements.forEach(this.patchButtons);
				}
				
				patchButtons(x){
					//console.log(x);
					x.userPremiumType = 0;
					x.guildPremiumTier = 0
				}
				
				emojiPicker(){
					const EmojiPicker = BdApi.findModuleByProps(['useEmojiSelectHandler']);
					Patcher.after(EmojiPicker, 'useEmojiSelectHandler', (_, args, ret) => {
                            const { onSelectEmoji, closePopout, selectedChannel } = args[0];
                            const self = this;

                            return function (data, state) {
                                if (state.toggleFavorite) return ret.apply(this, arguments);

                                const emoji = data.emoji;
                                const isFinalSelection = state.isFinalSelection;
								
                                   self.selectEmoji({ emoji, isFinalSelection, onSelectEmoji, closePopout, selectedChannel, disabled: false });
                                }
                            }
				)};
				
				selectEmoji({ emoji, isFinalSelection, onSelectEmoji, closePopout, selectedChannel, disabled }) {
                        if (disabled) {
                            const perms = this.hasEmbedPerms(selectedChannel);
                            if (!perms && this.settings.missingEmbedPerms == 'nothing') return;
                            if (!perms && this.settings.missingEmbedPerms == 'showDialog') {
                                BdApi.showConfirmationModal(
                                    "Missing Image Embed Permissions",
                                    [`It looks like you are trying to send an Emoji using Freemoji but you dont have the permissions to send embeded images in this channel. You can choose to send it anyway but it will only show as a link.`], {
                                    confirmText: "Send Anyway",
                                    cancelText: "Cancel",
                                    onConfirm: () => {
                                        if (this.settings.sendDirectly) {
                                            MessageUtilities.sendMessage(selectedChannel.id, { content: this.getEmojiUrl(emoji) });
                                        } else {
                                            onSelectEmoji(emoji, isFinalSelection);
                                        }
                                    }
                                });
                                return;
                            }
                            if (this.settings.sendDirectly) {
                                MessageUtilities.sendMessage(SelectedChannelStore.getChannelId(), { content: this.getEmojiUrl(emoji) });
                            } else {
                                onSelectEmoji(emoji, isFinalSelection);
                            }
                        } else {
                            onSelectEmoji(emoji, isFinalSelection);
                        }

                        if (isFinalSelection) closePopout();
                    }
				
                saveAndUpdate() {
                    PluginUtilities.saveSettings(this.getName(), this.settings)
					if(this.settings.screenSharing) this.StreamFPSButtons();
                    if (this.settings.emojiBypass) {
						this.emojiPicker();
						if(this.settings.uploadEmotes){
								Patcher.unpatchAll(DiscordModules.MessageActions);
								BdApi.Patcher.unpatchAll("YABDP4Nitro", DiscordModules.MessageActions);
								BdApi.Patcher.instead("YABDP4Nitro",DiscordModules.MessageActions, "sendMessage", (_, [, msg], send) => {
								var currentChannelId = BdApi.findModuleByProps("getLastChannelFollowingDestination").getChannelId()
								var runs = 0;
								msg.validNonShortcutEmojis.forEach(emoji => {
								if (emoji.url.startsWith("/assets/")) return;
								if (this.settings.PNGemote){
										emoji.url = emoji.url.replace('.webp', '.png');
								}
								if(this.emojiBypassForValidEmoji(emoji, currentChannelId)){return}
								runs++;
								emoji.url = emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&size=${this.settings.emojiSize}`
								msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\d/g, "")}${emoji.id}>`, "");
								this.UploadEmote(emoji.url, currentChannelId, msg, emoji, runs);
								return
								});
								if((msg.content != undefined || msg.content != "") && runs == 0){
									send(currentChannelId, msg);
								}
							return	
							});
							return
							}
						if(this.settings.ghostMode && !this.settings.uploadEmotes) { //If Ghost Mode is enabled do this shit
							BdApi.Patcher.unpatchAll("YABDP4Nitro", DiscordModules.MessageActions)
							Patcher.unpatchAll(DiscordModules.MessageActions)
							//console.log("Ghost Mode enabled.")
							Patcher.before(DiscordModules.MessageActions, "sendMessage", (_, [, msg]) => {
							var currentChannelId = BdApi.findModuleByProps("getLastChannelFollowingDestination").getChannelId()
                            msg.validNonShortcutEmojis.forEach(emoji => {
								
							if (this.settings.PNGemote){
								emoji.url = emoji.url.replace('.webp', '.png')
								}
							if (emoji.url.startsWith("/assets/")) return;
							if(this.emojiBypassForValidEmoji(emoji, currentChannelId)){
								return
								}
								//if no ghost mode required
								if (msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\d/g, "")}${emoji.id}>`, "") == ""){
									msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\d/g, "")}${emoji.id}>`, emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&size=${this.settings.emojiSize} `)
									return;
								}
								let ghostmodetext = "||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|| _ _ _ _ _ "
								if (msg.content.includes(ghostmodetext)){
									if(msg.content.includes(("https://embed.rauf.wtf/?&image=" + emoji.url.split("?")[0]))){//Duplicate emoji handling (second duplicate)
									msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\d/g, "")}${emoji.id}>`, ""), msg.content += " " + "https://test.rauf.workers.dev/?&image=" + emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&size=${this.settings.emojiSize} `
									return
									}
									if(msg.content.includes(emoji.url.split("?")[0])){ //Duplicate emoji handling (first duplicate)
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
						if(!this.settings.ghostMode && !this.settings.uploadEmotes) { //If ghost mode is disabled do shitty original method
						BdApi.Patcher.unpatchAll("YABDP4Nitro",DiscordModules.MessageActions)
						Patcher.unpatchAll(DiscordModules.MessageActions)
						//console.log("Classic Method (No Ghost)")
                        Patcher.before(DiscordModules.MessageActions, "sendMessage", (_, [, msg]) => {
							var currentChannelId = BdApi.findModuleByProps("getLastChannelFollowingDestination").getChannelId()
                            msg.validNonShortcutEmojis.forEach(emoji => {
								if (this.settings.PNGemote){
								emoji.url = emoji.url.replace('.webp', '.png')
								}
								if (emoji.url.startsWith("/assets/")) return;
								if(this.emojiBypassForValidEmoji(emoji, currentChannelId)){return}
								if(msg.content.includes(("https://embed.rauf.wtf/?&image=" + emoji.url.split("?")[0]))){//Duplicate emoji handling (second duplicate)
									msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\d/g, "")}${emoji.id}>`, ""), msg.content += " " + "https://test.rauf.workers.dev/?&image=" + emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&size=${this.settings.emojiSize} `
									return
								}
								if(msg.content.includes(emoji.url.split("?")[0])){ //Duplicate emoji handling (first duplicate)
									msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\d/g, "")}${emoji.id}>`, ""), msg.content += " " + "https://embed.rauf.wtf/?&image=" + emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&size=${this.settings.emojiSize} `
									return
								}
                                msg.content = msg.content.replace(`<${emoji.animated ? "a" : ""}${emoji.allNamesString.replace(/~\d/g, "")}${emoji.id}>`, emoji.url.split("?")[0] + `?size=${this.settings.emojiSize}&size=${this.settings.emojiSize} `)//, console.log(msg.content), console.log("no ghost")
                            })
                        });
                        //for editing message also
                        Patcher.before(DiscordModules.MessageActions, "editMessage", (_,obj) => {
                            let msg = obj[2].content
                            if (msg.search(/\d{18}/g) == -1) return;
							if (msg.includes(":ENC:")) return; //Fix jank with editing SimpleDiscordCrypt encrypted messages.
                            msg.match(/<a:.+?:\d{18}>|<:.+?:\d{18}>/g).forEach(idfkAnymore=>{
                                obj[2].content = obj[2].content.replace(idfkAnymore, `https://cdn.discordapp.com/emojis/${idfkAnymore.match(/\d{18}/g)[0]}?size=${this.settings.emojiSize}`)
                            })
                        });
                    }
					}
                    if(!this.settings.emojiBypass) Patcher.unpatchAll(DiscordModules.MessageActions)
					if(!this.settings.uploadEmotes) BdApi.Patcher.unpatchAll("YABDP4Nitro", DiscordModules.MessageActions)
				}
                onStart() {
					this.saveAndUpdate()
					console.log(DiscordModules.UserStore.getCurrentUser().premiumType)
                }

                onStop() {
                    Patcher.unpatchAll();
					BdApi.Patcher.unpatchAll("YABDP4Nitro");
                }
            };
        };
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
/*@end@*/