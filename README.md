# YABDP4Nitro

# THANKS FOR 1000+ STARS !!

*Probably* the best "Nitro plugin" out there. 

YABDP4Nitro is a feature-rich BetterDiscord plugin designed to enhance your Discord experience. This plugin offers various functionality such as customizable screensharing quality, emoji bypasses, profile accents, client themes, and more!

### <a href="https://riolubruh.github.io/autoDownload/?file=https://raw.githubusercontent.com/riolubruh/YABDP4Nitro/main/YABDP4Nitro.plugin.js" target="_blank" rel="noopener noreferrer">Download Link</a>

Raw File Link: [YABDP4Nitro.plugin.js](https://raw.githubusercontent.com/riolubruh/YABDP4Nitro/main/YABDP4Nitro.plugin.js)

*"Discord" and "Nitro" are trademarks of Discord Inc. This project is not affiliated with Discord Inc. <br>
See full trademark notice [here.](#trademark-notice)*

## Table of Contents:
- [Features](#features)
  * [Streaming Features](#streaming-features)
     + [Custom Screenshare, FPS, Bitrate](#fully-customizable-screensharing-quality-fps-and-bitrate)
     + [Stream Sharpness](#stream-sharpness)
  * [Emoji Bypasses](#emoji-bypasses)
     + [Upload Emotes](#upload-emotes)
     + [Ghost Mode](#ghost-mode)
     + [Classic Mode](#classic-mode)
     + [Hyperlink / Vencord-like Mode](#hyperlink--vencord-like-mode)
       - [Fake Inline Hyperlink Emojis](#fake-inline-hyperlink-emojis)
   * [Profile](#profile)
     + [Profile Accents for All Users](#profile-accents-for-all-users)
     + [Fake Profile Themes](#fake-profile-themes)
     + [Fake Profile Banners](#fake-profile-banners)
     + [Fake Avatar Decorations](#fake-avatar-decorations)
     + [Fake Profile Effects](#fake-profile-effects)
     + [Fake Profile Pictures](#fake-profile-pictures)
     + [Fake Nameplates](#fake-nameplates)
     + [Fake Display Name Styles](#fake-display-name-styles)
   * [Clips 100MB Limit Bypasses](#clips)
     + [Video Files](#videos)
     + [Audio Files](#audio)
     + [Other Files](#zipclips-any-file)
     + [Loading FFmpeg.js](#loading-ffmpegjs)
   * [Miscellaneous](#miscellaneous)
     + [Nitro Client Themes](#nitro-client-themes)
     + [Remove Screenshare Nitro Upsell](#remove-screenshare-nitro-upsell)
     + [In-App Icons](#in-app-icons)
- [FAQ & Installation (read this before asking!)](#frequently-asked-questions)
- [Reporting Issues](#reporting-issues)
- [Contributing](#contributing)
- [Special Thanks](#contributors)
- [Additional Plugins I Recommend](#recommended-additional-plugins-for-more-nitro-features)
- [License Agreement](#license)
- [Discord Server](#discord-server)
- [Trademark Notice](#trademark-notice)
- [Donate](#donate)

  
## Features

## Streaming Features

Customizable stream options and enhancements to the streaming experience.

_________________________________________________________________________________________________________________

### Fully Customizable Screensharing Quality, FPS, and Bitrate

Stream at any resolution, framerate, and bitrate you want! Who needs Nitro?

![Choosing Quality and FPS Options](https://github.com/user-attachments/assets/db173a32-0eb9-4744-96e6-f0ab122b0d03)

![Another Image](https://user-images.githubusercontent.com/54255074/183275106-cbee28e6-d550-4637-ab06-0cb065c81283.png)

![Bitrate Options](https://github.com/user-attachments/assets/b04b7685-0e55-4b40-ad0d-cad043dab229)

_________________________________________________________________________________________________________________

### Stream Sharpness

A fully customizable, per-user stream sharpness slider!

<img width="211" height="84" alt="Sharpness Slider Image" src="https://github.com/user-attachments/assets/62f9c117-e4ce-486a-b85f-77cb015ab049" />

This lets you combat the somewhat blurry look of streams by applying a sharpness filter.

To do so, ensure the feature is enabled, then simply right-click on a stream you are viewing and adjust it!

Video Demonstration (you likely have to fullscreen to properly see the effect):
<video src="https://github.com/user-attachments/assets/39d2b736-3bc8-488d-bb48-015abf5593ed">

This feature cannot adjust the sharpness of your own stream nor can it add the sharpness user for other users.<br>
It is purely client-side.
_________________________________________________________________________________________________________________

## Emoji Bypasses

Allows you to seamlessly use animated emojis and emojis from any server you're in by linking or uploading them!

_________________________________________________________________________________________________________________

### Upload Emotes

Automatically uploads the emojis used in your message as an attachment!

![Uploading Demonstration](https://user-images.githubusercontent.com/54255074/191621033-da0db3f6-c5f6-4ba7-9c99-0c8ccf7ed864.gif)

_________________________________________________________________________________________________________________

### Ghost Mode 
<!-- spoopy!!! -->
Hide the link(s) to any emoji(s) you send by automatically using a "ghost message"! It is a bit more laggy and may be detected as spam by some bots.

![Ghost Mode Image Demonstration](https://user-images.githubusercontent.com/54255074/166120840-50bd98c7-48d0-4772-8d9b-17280e247a02.png)

_________________________________________________________________________________________________________________

### Hyperlink / Vencord-Like Mode

Puts the emoji into a hyperlink like Vencord fakemojis.

![vencord-like demo gif](https://github.com/user-attachments/assets/15df9ce9-cb2d-4ada-9070-2fd80e47db0e)

#### Fake Inline Hyperlink Emojis

The Fake Inline Hyperlink Emojis option will replace these hyperlinks with fake emojis on the client side.

Disabled:

![inline_off](https://github.com/user-attachments/assets/10e96b02-57ae-4346-bcf9-b8b9d758e918)

Enabled:

![inline_on](https://github.com/user-attachments/assets/86668cb7-2c69-4788-9b35-5c8e4d2dd5f9)

_________________________________________________________________________________________________________________

### Classic Mode

Simply replaces the emoji in the message with its' URL. This is "classic mode".

_________________________________________________________________________________________________________________

#### Usage of the Emoji Bypass

![Emoji Demonstration](https://user-images.githubusercontent.com/54255074/166121643-58b06bc5-c0a5-4e45-a7e9-c135337b7ed0.gif)

_________________________________________________________________________________________________________________

## Profile

### Profile Accents for All Users

<img src="https://user-images.githubusercontent.com/54255074/199860419-7e3275e0-fdf5-49cf-a7c3-89f3105d1867.png" alt="visual difference with it on" width="25%"></img><--[New Look] [Original Look]--><img src="https://user-images.githubusercontent.com/54255074/199860495-19312500-3f37-4c3d-a54a-1c04af68e826.png" alt="visual difference with it off" width="25%"></img>

To clarify: What this does is make **all profiles** render with the gradient accent on the **client-side**.

We'll get into profile accents that other users can see in a second.
_________________________________________________________________________________________________________________

### Fake Profile Themes

Allows profile theming by hiding color information in your bio using invisible 3y3 encoding!<br>
Works effectively exactly the same as FakeProfileThemes on Vencord, but on BetterDiscord!

![Fake Profile Themes Demonstration](https://github.com/riolubruh/YABDP4Nitro/assets/54255074/dcb7b2fb-fdad-4d2d-8d87-b79fcabd8e9a)

Happy theming!

**Note that only users that have either YABDP4Nitro, FakeProfileThemes (Vencord), UnrealProfileThemes (Enmity), or a similar plugin (that decodes 3y3-encoded profile colors) installed will be able to see the profile colors.**

_________________________________________________________________________________________________________________

### Fake Profile Banners

Uses invisible 3y3 encoding to allow setting profile banners by hiding the image URL in your bio.<br>
Only supports Imgur URLs for security reasons.

![Fake Profile Banners Big Yosher](https://github.com/riolubruh/YABDP4Nitro/assets/54255074/f7edda1f-531b-45b8-bc8b-ee50d5c5cfdb)

To use Fake Profile Banners, go to Settings>Profiles. You should see a new text input and 
"Copy Banner 3y3" button under the Profile Banners section:

![Banner Tutorial Sceenshot](https://github.com/user-attachments/assets/c0f5620b-af4a-48e9-b196-1e41f8d09f33)

Simply type/paste in an Imgur URL into the input area

( ex: **`https://i.imgur.com/bYGGXnq.gif`** )

Then, click the "Copy 3y3" button to the right of the input area, paste your clipboard into your "About Me" (or bio) and save.

The banner should appear in the "Try It Out" preview to let you know that it is working correctly.

**Note that only other users with YABDP4Nitro installed and enabled will be able to see this.**
_________________________________________________________________________________________________________________

### Fake Avatar Decorations

Uses invisible 3y3 encoding to allow setting avatar decorations by hiding IDs in your bio or custom status.

![avatar decoration demonstration](https://github.com/riolubruh/YABDP4Nitro/assets/54255074/005379d8-5d6f-43e9-8735-b44788560831)

To use Fake Avatar Decorations, go to Settings>Profiles you should see a new button under Avatar Decoration.

![deco-button](https://github.com/riolubruh/YABDP4Nitro/assets/54255074/0b5547e0-2947-4628-a3da-a91f9ee1c933)

Clicking this button will reveal a menu with each of the avatar decorations in a grid.

![avatar decorations](https://github.com/user-attachments/assets/eff51466-6d05-4ab3-99f5-1308c04a9876)


Clicking one of these avatar decorations will copy the invisible 3y3-encoded data into your clipboard.
<br>Now follow one or both **(for the best effect, do both!)** of the following methods to apply the avatar decoration to your profile:


<details>
 <summary>
 Custom Status 
</summary>
 Now that you have the 3y3 encoded data in your clipboard:
 
 Close settings by pressing Escape or hitting the button labeled ESC in the top right.

 Click on your profile in the bottom left to open this menu:
 
 ![profile](https://github.com/riolubruh/YABDP4Nitro/assets/54255074/2e48a60a-b235-48fd-a93f-b14c6a2ba695)

 Click the button to add/edit your custom status and paste your clipboard into your status.

 **Note that if you are using the Custom Status method only, it will only appear for other YABDP4Nitro users when you are online.**

 You should now see the avatar decoration appear around your profile picture!
</details>

<details>
 <summary>
 About Me / Profile Bio
</summary>
 Now that you have the 3y3 encoded data in your clipboard:
 <br>Paste your clipboard into the About Me section of your profile.

 Demonstration:
 
 ![decoration demonstration](https://github.com/riolubruh/YABDP4Nitro/assets/54255074/b91fcd6e-389f-4adf-aa92-054d3e18d524)

 **Note: If your Avatar Decoration is in the About Me section of your profile, it will only appear for other users *after* they have opened your profile at least once.**
 
</details>

<br>
Any other user of YABDP4Nitro with Fake Avatar Decorations enabled will now be able to see your avatar decoration.

_________________________________________________________________________________________________________________

## Fake Profile Effects

Uses invisible 3y3 encoding to allow setting profile effects by hiding IDs in your bio.

![profile effect example](https://github.com/riolubruh/YABDP4Nitro/assets/54255074/d9a2b6a4-dcdb-4fef-9310-5af30dffbfe6)

To use Fake Profile Effects, first go to Settings>Profiles; you should see a Profile Effect section:

![Profile Effect section](https://github.com/user-attachments/assets/22b7473b-b1ad-4c7a-9cf4-922a8fd133a8)

Clicking the new "Change Effect \[YABDP4Nitro\]" button should reveal a menu with all of the available profile effects: 

![profile effect section opened](https://github.com/user-attachments/assets/101ff527-6811-457b-ae80-dc55cd9e88b3)

<br>(The menu will automatically populate with any new profile effects that Discord may add in the future.)

Clicking one of these profile effects will copy the invisible 3y3-encoded data into your clipboard.
<br>Now all you have to do is paste your clipboard into the "About Me" section of your profile and click Save Changes!

![profile effects settings demonstration](https://github.com/riolubruh/YABDP4Nitro/assets/54255074/7b2f8340-be41-4155-a0b5-77d37220d278)

Any other user of YABDP4Nitro with Fake Profile Effects enabled will now be able to see your profile effect!

_________________________________________________________________________________________________________________

## Fake Profile Pictures

Uses invisible 3y3 encoding to allow setting custom profile pictures by hiding an image URL in your status.
<br>Only supports Imgur URLs for security reasons.

![fake-pfp demonstration](https://github.com/riolubruh/YABDP4Nitro/assets/54255074/07745802-005a-40b1-9655-b1cb8e0ecfa6)

To use Fake Profile Pictures, first go to Settings>Profiles; you should see a new input & button:

![fake pfp setting section](https://github.com/riolubruh/YABDP4Nitro/assets/54255074/99adab5d-5d69-4e1d-ae84-f094b2cb782e)

Now paste an Imgur URL (ex: `https://i.imgur.com/bYGGXnq.gif`) into the box and click the "Copy 3y3" to the right!

![fakepfp demo](https://github.com/riolubruh/YABDP4Nitro/assets/54255074/a7aba7b6-f947-4b2a-b2c2-696692ce7abc)

Assuming nothing goes wrong, you should see "3y3 copied to clipboard!" appear at the bottom of the window.

Now, close Settings and click your profile in the bottom left of the window.
<br>You should see the following:

![profile](https://github.com/user-attachments/assets/ecb441fe-a5af-4bfb-a08e-e0fe4be42065)


Choose the option to set your custom status, and paste your clipboard anywhere into your custom status.

You should now see your profile picture change to the desired image!

Note that only other others of the plugin will be able to see your fake profile picture.

**Note: Because this uses Custom Status, you must be appearing Online, Idle, or Do Not Disturb for this to work!**

_________________________________________________________________________________________________________________

## Fake Nameplates

Uses invisible 3y3 encoding to allow setting fake nameplates by hiding the information in your custom status and/or bio.

To use Fake Nameplates, enable it and go into Profile Settings. A button should appear in the Nameplates section:

![nameplates button](https://github.com/user-attachments/assets/78c5b88a-d04e-49e6-86e3-b13e769c03a0)

Clicking the button will reveal a modal like this:

![nameplates modal](https://github.com/user-attachments/assets/cd952a04-3c76-4cb0-9d3a-2b58af6e5254)

Click on your desired nameplate. You will see a message that says "3y3 copied to clipboard!"

Finally, paste the 3y3 in your custom status and/or bio.

Pasting it in your custom status means it will appear as expected in the user / friends list when you are online.<br>
Pasting it in your bio means that people will be able to see it when you are offline if they click your profile.

For the best effect, pasting it in both is recommended.

Demonstration:<br>
![Fake Nameplates Demo](https://github.com/user-attachments/assets/5c64dbb0-1241-4a13-a454-9fb4cc634aad)

_________________________________________________________________________________________________________________

## Fake Display Name Styles

Uses invisible 3y3 encoding to allow setting fake display name styles by hiding the information in your custom status and/or bio.

To use Fake Display Name Styles, enable it and go to profile settings, then click Change Style under Display Name Styles:<br>
<img width="747" height="185" alt="Display Name Styles section" src="https://github.com/user-attachments/assets/0da9d80a-c5c2-4b56-900c-3f2a4953da47" />

You should get the standard Display Name Styles modal, except with one button labeled "Copy 3y3" added.<br>
<img width="802" height="695" alt="Discord_3AUxtnyf0t" src="https://github.com/user-attachments/assets/ee86da69-ba58-48b5-8de8-5b2b7637112c" /><br>
Once you have chosen your desired style, click Copy 3y3. This will copy invisible characters to your clipboard.

Next, go to your custom status, and paste the invisible characters into it.

Demonstration:<br>
![Fake Display Name Styles Demo](https://github.com/user-attachments/assets/6339ea71-f52b-40a9-ac1a-c4740c683d69)

_________________________________________________________________________________________________________________

## Clips

### Videos

![Clips Kung Fu Panda Example](https://github.com/user-attachments/assets/b140c90a-4688-4e91-b696-97f01d314e5c)

Increases the file upload limit for video files to 100 MB by sending them as "Discord Clip"s.

It works by first using FFmpeg.WASM to transmux to "isom"-branded MP4 without re-encoding (unless it's already an "isom"-branded MP4),
and then appending a special tag that the Discord API specifically checks for to the file in order for it to be considered "valid".

The plugin does everything automatically, so all you'll need to do is upload the video as you usually would, and enjoy the higher 100MB file limit!

_________________________________________________________________________________________________________________

### Audio

![Audio Clips Example](https://github.com/user-attachments/assets/2ff4c762-fe0b-48c0-a450-ff2259c31d61)

Increases the file upload limit for audio files to 100 MB by sending them as "Discord Clip"s.

Using FFmpeg.WASM, the audio is muxed into a new video file with a new video track filled with empty/black frames,
and then a special tag that the Discord API specifically checks for is appended to the file in order for it to be considered "valid".

The plugin does everything automatically, just like as for videos!

_________________________________________________________________________________________________________________

### ZipClips (Any File)

![ZipClip_Example](https://github.com/user-attachments/assets/edc8277c-f6ec-4f7c-a7ca-ad1ed531ea41)

Increases the file upload limit for *any* file to 100 MB by sending them as "Discord Clip"s.

How does it work? We make a polyglot file which functions as both a valid clip (MP4 video file with proper tags and branding) **AND** an archive (zip, 7z, rar, etc.).

To use it, simply send any file between 10MB and 100MB with the option enabled in settings.

To extract the file, remove the `.mp4` from the file name and open it in 7-Zip, WinRAR, etc.

In 7-Zip, it's a bit more of a hassle since it doesn't automatically recognize it as an archive, so you need to specifically tell it which type it is, ex:

![7zip_method1](https://github.com/user-attachments/assets/d569b105-b197-4476-9d1e-d7e7497502d8)

Alternatively you can navigate to the containing folder, right-click the file, press `Open Inside #` and pick the second option, ex:

![7zip_method2_step1](https://github.com/user-attachments/assets/fd40b301-b8f2-482e-8733-8e83208d8cdf)
<br>
![7zip_method2_step2](https://github.com/user-attachments/assets/12f558db-150b-4a91-bef3-6f268f5dd961)

In WinRAR, simply remove the `.mp4` from the file name and open it as you usually would!

![winrar](https://github.com/user-attachments/assets/4df0d760-837a-4e92-8fcd-bd5824be48a3)

If your file is already an archive (7z, zip, rar, tar, gz, bz2), it will simply add the archive to the special video file.

Otherwise, it will ***create a new zip that contains your file automatically!*** 
<br><sub>(Note: No compression will be done since it would just take too long. If you want compression, zip the file yourself.)</sub>

_________________________________________________________________________________________________________________

### Loading FFmpeg.js

By default, FFmpeg.js (necessary for Clips, Audio Clips, and ZipClips to function) will be **downloaded automatically** if necessary. However, this is a _bit_ of a waste of bandwidth, and not entirely reliable. Luckily, there _is_ an alternative option! 

If you download the necessary files (easiest way is to [download the full repo](https://github.com/riolubruh/YABDP4Nitro/archive/refs/heads/main.zip)) and extract the `ffmpeg` folder into your BetterDiscord plugins folder as shown:<br>
<img width="644" height="172" alt="image" src="https://github.com/user-attachments/assets/91af1da6-8ae3-4739-9cd0-0946dd98b99a" />

it will automatically be able to detect this and will load them from there instead.

This makes the loading of FFmpeg.js more reliable, faster, and less wasteful.

This also allows you to override the files to whatever you please, if you wanted to do so for some reason.

_________________________________________________________________________________________________________________

## Miscellaneous

### Nitro Client Themes

Allows you to use the Nitro-exclusive gradient client themes by Discord.

![Crimson Moon Nitro Client Theme](https://user-images.githubusercontent.com/54255074/233230492-dbfe7005-e207-41ef-a313-e4e70867a49d.png)

![Nitro Client Theme Options](https://user-images.githubusercontent.com/54255074/233231021-16c06b12-530a-4878-8ee9-60a5a254dd1b.png)

_________________________________________________________________________________________________________________

### Remove Screenshare Nitro Upsell

Removes the annoying Nitro upsell in the screen share quality menu.

![Discord_voeTC4w6lE](https://github.com/user-attachments/assets/57c5a6cf-8c29-49eb-8171-857e91f9d163)
![Discord_2s1O1PplCu](https://github.com/user-attachments/assets/ce84f0f5-776a-4f61-b184-05925fef25a0)

_________________________________________________________________________________________________________________

### In-App Icons

Nitro In-App icons are unlocked.

![App Icons](https://github.com/user-attachments/assets/810dfa79-3b73-420d-a795-1fe9e6780bc2)

_________________________________________________________________________________________________________________


# Frequently Asked Questions
[Go here for the FAQ and installation instructions!](https://github.com/riolubruh/YABDP4Nitro/issues/76)

If your question isn't there **and you think it should be there,** write a comment below that issue. 

If you have any other questions, you may DM me directly if you wish, otherwise you can [make a new Issue](https://github.com/riolubruh/YABDP4Nitro/issues/new) 
with your question, and I'll try to answer it to the best of my abilities.

_________________________________________________________________________________________________________________

## Reporting Issues
To report an issue, please open a new issue on the [Issues page](https://github.com/YABDP4Nitro/YABDP4Nitro/issues)
of this GitHub repository with a clear description of the problem and any steps to reproduce it.

_________________________________________________________________________________________________________________

## Contributing
If you would like to contribute to the project, there are several ways to do so. You can:
- Submit a bug report or feature request
- Fork the repository and make changes
- Submit a pull request to merge your changes back into the main branch

Thank you for your interest in contributing to YABDP4Nitro!

_________________________________________________________________________________________________________________

## Contributors
Significant contributions to the plugin will earn you a special **YABDP4Nitro Contributor Badge** (that you can brag about to your friends)!

Special thanks to:
- Weblure for making [multiple code contributions](https://github.com/riolubruh/YABDP4Nitro/commits?author=Weblure)!
- Kozhura_ubezhishe_player_fly for creating and designing the [**YABDP4Nitro User Badge**](https://raw.githubusercontent.com/riolubruh/riolubruh.github.io/main/badge_hires.png)!
- Moeefa for [committing a bugfix](https://github.com/riolubruh/YABDP4Nitro/commits?author=Moeefa)!
- HunBun for being the brains behind the Discord Clips Bypass!
- Arven for teaching me how to use `BdApi.Webpack.getMangled`, giving code for improved module filters, and teaching me about some filter options I didn't know about.

Thank you all so much for your effort in making this plugin great!

_________________________________________________________________________________________________________________

## Recommended additional plugins for more Nitro features

[FreeStickers by An00nymushun](https://github.com/riolubruh/DiscordFreeStickers) - Unlocked Sticker sending through converting to and uploading as a GIF. (Fixed fork is linked since the [original repository](https://github.com/An00nymushun/DiscordFreeStickers) is abandoned)

[SplitLargeMessages by DevilBro](https://github.com/mwittrien/BetterDiscordAddons/tree/master/Plugins/SplitLargeMessages) - Send longer messages!

_________________________________________________________________________________________________________________

## License

The plugin is licensed under the NPOSL Version 3 License. You can find it [here](https://github.com/riolubruh/YABDP4Nitro/blob/main/LICENSE.md).

This software is provided on an "AS IS" BASIS and WITHOUT WARRANTY, either express or implied, including, without limitation, the warranties of non-infringement, merchantability or fitness for a particular purpose. THE ENTIRE RISK AS TO THE QUALITY OF THIS SOFTWARE IS WITH YOU. This DISCLAIMER OF WARRANTY constitutes an essential part of this License. No license to the Original Work is granted by this License except under this disclaimer.

_________________________________________________________________________________________________________________

## Discord Server

Please read [this README](#readme) and [the FAQ / Installation Instructions](https://github.com/riolubruh/YABDP4Nitro/issues/76) before joining just to ask stupid questions that 100 people have already asked before. It's really annoying.

https://discord.gg/EFmGEWAUns

_________________________________________________________________________________________________________________

## Trademark Notice

*"Discord," "Nitro," and related trademarks are the property of Discord Inc.  
This project is not affiliated with, endorsed by, or monetarily benefiting from Discord Inc.  
It does not provide official Discord Nitro services or features.*

_________________________________________________________________________________________________________________

## Donate

If you want to show your love for the plugin or my other open-source works, it would really mean the world to me if you put a few bucks in the tip jar!
Very few people actually donate, so I see and appreciate every last one.

*This project is licensed under NPOSL-3.0, which prohibits the licensor from deriving revenue from the software or related services.<br>
By donating, you agree that funds are non-refundable and grant no rights to software or services.<br>
Donations are voluntary and do not affect software access or functionality.<br>
All donation rewards and acknowledgements are entirely opt-in and do not serve any functional purpose.*

*Donations to this project do not support Discord Inc. or its services.*

Methods of donations without fees are obviously preferred. See more info below.

_________________________________________________________________________________________________________________

### P2P

Using a P2P payment processor will ensure that 100% of your donation will be received and none will be taken by transaction fees (unless you choose to use an instant transfer).


### Venmo

<a href="https://venmo.com/riolubruh" target='_blank'><img style="height:40px;" src="https://github.com/user-attachments/assets/cbea3de4-e504-45c4-94fa-9d38d2d371f7"></a><br>
[Fees Info](https://venmo.com/resources/our-fees/)

### Cashapp

<a href="https://cash.app/$riolubruh" target='_blank'><img style="height:36px;" src="https://github.com/user-attachments/assets/ecc3aa78-4ba3-4b5b-93a6-3ba3a9fbb3c9"></a><br>
[Fees Info](https://cash.app/legal/us/en-us/cashappterms#stored-balance-disclosures)

QR Code:

<a href="https://cash.app/$riolubruh" target='_blank'><img height='200' src="https://github.com/user-attachments/assets/745f778b-82e1-4cb8-93ca-f96d0fd10fc2"></a>

_________________________________________________________________________________________________________________

### Payment Processor(s) with no fee

GitHub Sponsors is the only one I've found so far.

#### GitHub Sponsors

Only downside is you have to use a credit or debit card.

https://github.com/sponsors/riolubruh

_________________________________________________________________________________________________________________

### Payment Processors with a fee


Using one of these will subtract some fee, either taking the fee from you or from me (usually from me).

#### Ko-fi

Routed through PayPal, so [same fee as PayPal](https://www.paypal.com/us/digital-wallet/paypal-consumer-fees#ReceivingDonations).

<a href='https://ko-fi.com/N4N5L05NP' target='_blank'><img style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi2.png?v=3' border='0' alt='Send me some dosh at ko-fi.com' /></a>

#### PayPal

I will be able to see your full name and email if PayPal is used.<br>
Although I won't do anything with it, if this makes you uncomfortable, consider using something else.

Donation fee of 2.89% of payment + $0.49 ( + 1.5% if you're not in the United States + currency conversion if applicable) taken from me.

<a style="height:36px;" href="https://www.paypal.com/donate/?hosted_button_id=U5PZFBNGKSGFQ" target="_blank" rel="noreferrer noopener"><img style="height:36px;" src='https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif'></a><br>
[Fees Info](https://www.paypal.com/us/digital-wallet/paypal-consumer-fees#ReceivingDonations)

_________________________________________________________________________________________________________________

### Cryptocurrency
___

100% anonymous. Not sure if I set it up correctly, shoot me a DM if I screwed this up.<br>
Some fees are involved with these, but if you're actually using this, you already knew that.

#### BTC Address

`bc1qyzrd2x4gvq86pe6hujd5uxw3j5cqhpdcyhn8d3`

#### Monero Address

`48oSWZ9uJz1CCPS3dde8nEjT6JZ7zaLH7XEXffkK9gLVdb5QtjcwByr4F3cbnMf6KySPw2mw7LAzcHnwXo1YYWYr1aS1p2D`






