# YABDP4Nitro

_Probably_ the best "Nitro plugin" out there.

YABDP4Nitro is a feature-rich BetterDiscord plugin designed to enhance your Discord experience.
This plugin offers various functionality such as customizable screensharing quality, emoji bypasses, profile accents, client themes, and more!

### <a href="https://riolubruh.github.io/autoDownload/?file=https://raw.githubusercontent.com/riolubruh/YABDP4Nitro/main/YABDP4Nitro.plugin.js" target="_blank" rel="noopener noreferrer">Download Link</a>

Raw File Link: [YABDP4Nitro.plugin.js](https://raw.githubusercontent.com/riolubruh/YABDP4Nitro/main/YABDP4Nitro.plugin.js)

_"Discord" and "Nitro" are trademarks of Discord Inc. This project is not affiliated with Discord Inc. <br>
See full trademark notice [here.](#trademark-notice)_

## Table of Contents:

- [About](#about-yabdp4nitro)
- [Features](#features)
    - [Streaming Features](#streaming-features)
        - [Custom Screenshare, FPS, Bitrate](#fully-customizable-screensharing-quality-fps-and-bitrate)
        - [Stream Sharpness](#stream-sharpness)
    - [Emoji Bypasses](#emoji-bypasses)
        - [Upload Emotes](#upload-emotes)
        - [Classic Mode](#classic-mode)
        - [Hyperlink / Vencord-like Mode](#hyperlink--vencord-like-mode)
            - [Fake Inline Hyperlink Emojis](#fake-inline-hyperlink-emojis)
    - [Profile](#profile)
        - [Profile Accents for All Users](#profile-accents-for-all-users)
        - [Fake Profile Themes](#fake-profile-themes)
        - [Fake Profile Banners](#fake-profile-banners)
        - [Fake Avatar Decorations](#fake-avatar-decorations)
        - [Fake Profile Effects](#fake-profile-effects)
        - [Fake Profile Pictures](#fake-profile-pictures)
        - [Fake Nameplates](#fake-nameplates)
        - [Fake Display Name Styles](#fake-display-name-styles)
        - [Fake Profile Frames](#fake-profile-frames)
    - [Clips 100MB Limit Bypasses](#clips)
        - [Video Files](#videos)
        - [Audio Files](#audio)
        - [Other Files](#zipclips-any-file)
        - [Loading FFmpeg.js](#loading-ffmpegjs)
    - [Miscellaneous](#miscellaneous)
        - [Nitro Client Themes](#nitro-client-themes)
        - [Remove Screenshare Nitro Upsell](#remove-screenshare-nitro-upsell)
        - [In-App Icons](#in-app-icons)
        - [Extra Context Menus and Options](#extra-context-menus-and-options)
        - [Custom Camera Background](#custom-camera-background)
- [FAQ & Installation (read this before asking!)](#frequently-asked-questions)
- [Reporting Issues](#reporting-issues)
- [Contributing](#contributing)
- [Special Thanks](#contributors)
- [Additional Plugins I Recommend](#recommended-additional-plugins-for-more-nitro-features)
- [License Agreement](#license)
- [Discord Server](#discord-server)
- [Trademark Notice](#trademark-notice)
- [Donate](#donate)

## About YABDP4Nitro

YABDP4Nitro was created in November 2021 as a fork of the [original abandoned NitroPerks plugin](https://github.com/respecting/NitroPerks) by someone called "[respecting](https://github.com/respecting)"/"[lemons](https://github.com/lem6ns)"
after it was almost entirely broken by a combination of crappy code and numerous Discord updates.<br>
This project also went under the name NitroPerks at the time.

In June 2022, this project was renamed from NitroPerks to YABDP4Nitro (which is an acyonym for _Yet Another BetterDiscord Plugin for Nitro_)
for a couple of reasons. Firstly, it had gone through so many changes that it was already effectively an entirely separate codebase.
Secondly, I wanted to distance it from the original NitroPerks and any of its forks since at this point the original name
was only really holding the project back. It would often get compared to the original NitroPerks
which had a pretty bad reputation due to the aforementioned shitty and broken code. So I chose the name YABDP4Nitro,
a name so (intentionally) bad that nobody would mistake it for anything except its own thing.

Since then, it has been known as YABDP4Nitro and offers much much more than the original project ever did.

YABDP4Nitro is designed to make Discord better for people that can't afford Nitro or just aren't willing to give their money to Discord.

The most important aspect of this project is this:

This plugin is **free software**, and will _always_ be free, with _**no strings attached.**_<br>

## Features

## Streaming Features

Customizable stream options and enhancements to the streaming experience.

---

### Fully Customizable Screensharing Quality, FPS, and Bitrate

Stream at any resolution, framerate, and bitrate you want! Who needs Nitro?

![Choosing Quality and FPS Options](https://github.com/user-attachments/assets/05a7775b-e123-403f-85c5-1bc8c296f028)

<img width="579" height="443" alt="Discord_eMdf2Xnk9e" src="https://github.com/user-attachments/assets/20f6f672-0b46-445d-a3cd-e68abbe900b1" />
<img width="583" height="219" alt="Discord_5D8zQNXDxw" src="https://github.com/user-attachments/assets/ddd88edf-1745-4a4b-b094-e794c71d85bc" />

---

### Stream Sharpness

A fully customizable, per-user stream sharpness slider!

<img width="205" height="74" alt="image" src="https://github.com/user-attachments/assets/58628770-7cfc-44c0-852c-8103752686d8" />

This lets you combat the somewhat blurry look of streams by applying a sharpness filter.

To do so, ensure the feature is enabled, then simply right-click on a stream you are viewing and adjust it!

Video Demonstration (you likely have to fullscreen to properly see the effect):
<video src="https://github.com/user-attachments/assets/39d2b736-3bc8-488d-bb48-015abf5593ed">

This cannot adjust the sharpness of your own stream nor can it add sharpness to your stream for other users.<br>
It is purely client-side.

---

## Emoji Bypasses

Allows you to seamlessly use animated emojis and emojis from any server you're in by linking or uploading them!

---

### Upload Emotes

Automatically uploads the emojis used in your message as an attachment!

<img width="745" height="576" alt="Uploading Demonstration" src="https://github.com/user-attachments/assets/2c161ca1-ba02-4a5d-8967-c21ba1e824b3" />

---

### Hyperlink / Vencord-Like Mode

Puts the emoji into a hyperlink like Vencord fakemojis.

![vencord-like demo gif](https://github.com/user-attachments/assets/15df9ce9-cb2d-4ada-9070-2fd80e47db0e)

#### Fake Inline Hyperlink Emojis

The Fake Inline Hyperlink Emojis option will replace these hyperlinks with fake emojis on the client side.

Disabled:

![inline_off](https://github.com/user-attachments/assets/10e96b02-57ae-4346-bcf9-b8b9d758e918)

Enabled:

![inline_on](https://github.com/user-attachments/assets/86668cb7-2c69-4788-9b35-5c8e4d2dd5f9)

---

### Classic Mode

Simply replaces the emoji in the message with its' URL.

<img width="744" height="274" alt="Discord_je1QmEkqUh" src="https://github.com/user-attachments/assets/9c31443f-dc30-460b-97e6-525aacfc2209" />

---

## Profile

### Profile Accents for All Users

<img src="https://github.com/user-attachments/assets/39b13606-7341-42e0-9f36-37aeaa99072b" alt="visual difference with it on" width="25%"></img><--[New Look] [Original Look]--><img src="https://github.com/user-attachments/assets/5aab0b47-d271-4bcc-9ce7-3a67721c147c" alt="visual difference with it off" width="25%"></img>

To clarify: What this does is make **all profiles** render with the gradient accent on the **client-side**.

We'll get into profile accents that other users can see in a second.

---

### Fake Profile Themes

Allows profile theming by hiding color information in your bio using invisible 3y3 encoding!<br>
Works effectively exactly the same as FakeProfileThemes on Vencord, but on BetterDiscord!

<img width="1049" height="726" alt="Fake Profile Themes Demonstration" src="https://github.com/user-attachments/assets/e86cbe19-b042-4d52-918c-d08cf86ad48f" />

**For per-server profile themes**: you can put the 3y3 code in the per-server pronouns field.
<br>Please note you may only have one 3y3 code in the pronouns field at a time.

Happy theming!

**Note that only users that have either YABDP4Nitro, FakeProfileThemes (Vencord), UnrealProfileThemes (Enmity), or a similar plugin (that decodes 3y3-encoded profile colors) installed will be able to see the profile colors.**

---

### Fake Profile Banners

Uses invisible 3y3 encoding to allow setting profile banners by hiding the image URL in your bio.<br>
Only supports Imgur URLs for security reasons.

![Fake Profile Banners Big Yosher](https://github.com/riolubruh/YABDP4Nitro/assets/54255074/f7edda1f-531b-45b8-bc8b-ee50d5c5cfdb)

To use Fake Profile Banners, go to Settings>Edit Profiles. In the YABDP4Nitro tab, find the Banner Imgur URL text area and
"Copy Banner 3y3" button under the Profile Banners section:

<img width="201" height="123" alt="Banner Tutorial Sceenshot" src="https://github.com/user-attachments/assets/b5991426-c743-40e8-b8db-2af8543cf6c8" />

Simply type/paste in an Imgur URL into the input area

( ex: **`https://i.imgur.com/bYGGXnq.gif`** )

Then, click the "Copy 3y3" button to the right of the input area, paste your clipboard into your "About Me" (or bio) and save.

The banner should appear in the "Try It Out" preview to let you know that it is working correctly.

**For per-server fake banners**: you can put the 3y3 code in the per-server pronouns field.
<br>Please note you may only have one 3y3 code in the pronouns field at a time.

**Note that only other users with YABDP4Nitro installed and enabled will be able to see this.**

---

### Fake Avatar Decorations

Uses invisible 3y3 encoding to allow setting avatar decorations by hiding IDs in your bio or custom status.

![avatar decoration demonstration](https://github.com/riolubruh/YABDP4Nitro/assets/54255074/005379d8-5d6f-43e9-8735-b44788560831)

To use Fake Avatar Decorations, go to Settings>Edit Profiles. In the YABDP4Nitro tab, click the button under Avatar Decoration.

<img width="215" height="88" alt="decoration button" src="https://github.com/user-attachments/assets/a6670fc3-a916-4e63-a08c-9de4c7e95cd2" />

Clicking this button will reveal a menu with each of the avatar decorations in a grid.

<img width="480" height="800" alt="avatar decorations" src="https://github.com/user-attachments/assets/ee593f3e-4d31-453b-bcec-cbf472df862a" />

Clicking one of these avatar decorations will copy the invisible 3y3-encoded data into your clipboard.
<br>Now follow one or both **(for the best effect, do both!)** of the following methods to apply the avatar decoration to your profile:

<details>
 <summary>
 Custom Status 
</summary>
 Now that you have the 3y3 encoded data in your clipboard,

click the button to add
<br>
<img width="407" height="338" alt="add custom status" src="https://github.com/user-attachments/assets/afca57c5-9a1c-4d54-aa24-5d12a65b8d43" />
<br>
or edit
<br>
<img width="386" height="322" alt="image" src="https://github.com/user-attachments/assets/23494137-b948-42e9-b417-a6b9f91fde99" />

your custom status, then paste (Ctrl+V) your clipboard into it and save.

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

 <img width="1203" height="913" alt="decoration demonstration" src="https://github.com/user-attachments/assets/6b01761f-cebf-4674-807d-0bbf0824381c" />

**Note: If your Avatar Decoration is in the About Me section of your profile, it will only appear for other users _after_ they have opened your profile at least once.**

**For Nitro users only:** You can also set this per-server using the per-server bio.

</details>

<br>
Any other user of YABDP4Nitro with Fake Avatar Decorations enabled will now be able to see your avatar decoration.

---

## Fake Profile Effects

Uses invisible 3y3 encoding to allow setting profile effects by hiding IDs in your bio.

![profile effect example](https://github.com/riolubruh/YABDP4Nitro/assets/54255074/d9a2b6a4-dcdb-4fef-9310-5af30dffbfe6)

To use Fake Profile Effects, first go to Settings>Edit Profile and open the YABDP4Nitro tab.

![Profile Effect section](https://github.com/user-attachments/assets/124312d1-870b-4030-9845-033ec6fc934a)

Clicking the "Change" button under Profile Effect should reveal a menu with all of the available profile effects:

![profile effect section opened](https://github.com/user-attachments/assets/0dd56af5-fe8a-4e26-80a0-2d6dfb0631df)

<br>(The menu will automatically populate with any new profile effects that Discord may add in the future.)

Clicking one of these profile effects will copy the invisible 3y3-encoded data into your clipboard.
<br>Now all you have to do is paste your clipboard into the "About Me" section of your profile and click Save Changes!

<img width="1202" height="810" alt="profile effects settings demonstration" src="https://github.com/user-attachments/assets/840770ec-eebc-4b4f-892d-d2a8f9383f9f" />

**For Nitro users only:** You can also set this per-server using the per-server bio.

Any **other user of YABDP4Nitro** with Fake Profile Effects enabled will now be able to see your profile effect!

---

## Fake Profile Pictures

Uses invisible 3y3 encoding to allow setting custom profile pictures by hiding an image URL in your status.
<br>Only supports Imgur URLs for security reasons.

![fake-pfp demonstration](https://github.com/riolubruh/YABDP4Nitro/assets/54255074/07745802-005a-40b1-9655-b1cb8e0ecfa6)

To use Fake Profile Pictures, first go to Settings>Editor Profiles and open the YABDP4Nitro tab.<br>
You should see a PFP Imgur URL textarea and a Copy PFP 3y3 button.

<img width="202" height="121" alt="fake pfp setting section" src="https://github.com/user-attachments/assets/2eb63d7c-d271-418b-9ddc-c57fb0522f24" />

Now paste an Imgur URL (ex: `https://i.imgur.com/bYGGXnq.gif`) into the box and click the "Copy PFP 3y3" button!

Assuming nothing goes wrong, you should see "3y3 copied to clipboard!" appear at the bottom of the window.

Now, go and paste your clipboard into your Custom Status:

󠁐󠁻󠁢󠁙󠁇󠁇󠁘󠁮󠁱󠁽<img width="1202" height="761" alt="pfp demo" src="https://github.com/user-attachments/assets/c7f3d4b2-c97d-4216-a035-53ea36af0d06" />

**Note that only other others of the plugin will be able to see your fake profile picture.**

**Note: Because this uses Custom Status, you must be appearing Online, Idle, or Do Not Disturb for this to work!**

**For per-server fake profile pictures**: you can put the 3y3 code in the per-server pronouns field.
<br>Please note you may only have one 3y3 code in the pronouns field at a time.

---

## Fake Nameplates

Uses invisible 3y3 encoding to allow setting fake nameplates by hiding the information in your custom status and/or bio.

To use Fake Nameplates, enable it and go into Profile Settings. Open the YABDP4Nitro tab and find the Nameplate button:

<img width="207" height="72" alt="nameplates button" src="https://github.com/user-attachments/assets/31ba7746-d7a0-48a0-a590-a3f1527ee8fc" />

Clicking the button will reveal a modal like this:

<img width="480" height="746" alt="nameplates modal" src="https://github.com/user-attachments/assets/c3bf28de-9d2a-47a9-a0ce-56232d1821e4" />

Click on your desired nameplate. You will see a message that says "3y3 copied to clipboard!"

Finally, paste the 3y3 in your custom status and/or bio.

Pasting it in your custom status means it will appear as expected in the user / friends list when you are online.<br>
Pasting it in your bio means that people will be able to see it when you are offline if they click your profile.

For the best effect, pasting it in both is recommended.

**For Nitro users only:** You can also set this per-server using the per-server bio.

Demonstration:<br>
<img width="1201" height="761" alt="Fake Nameplates Demo" src="https://github.com/user-attachments/assets/31e86c1b-8aa2-4b29-aa32-b156101a644f" />

**Please note that only other users with the plugin will be able to see it.**

---

## Fake Display Name Styles

Uses invisible 3y3 encoding to allow setting fake display name styles by hiding the information in your custom status and/or bio.

To use Fake Display Name Styles, enable it and go to profile settings, open the YABDP4Nitro tab, then find the Change button under Display Name Style:<br>
<img alt="Display Name Styles section" src="https://github.com/user-attachments/assets/347a1e43-a8c8-4f18-b5c1-6264a30a43b9" />

You should get this modal:<br>
<img width="481" height="535" alt="Discord_10IZYYB9lZ" src="https://github.com/user-attachments/assets/71ca6783-bab3-44ea-997c-d67bd58e114c" /><br>
Once you have chosen your desired style, click Copy 3y3. This will copy invisible characters to your clipboard.

Next, go to your custom status, and paste the invisible characters into it.

Demonstration:<br>
<img width="1202" height="762" alt="Fake Display Name Styles Demo" src="https://github.com/user-attachments/assets/75b8172c-f6e6-4002-8a9d-5ea7fd818c85" />

**Please note that only other users with the plugin will be able to see it.**

---

## Fake Profile Frames

Uses invisible 3y3 encoding to allow setting fake profile frames by hiding the information in your bio.

To use Fake Profile Frames, enable it and go to profile settings, open the YABDP4Nitro tab, then click the Change button under Profile Frames:

<img width="420" height="97" alt="image" src="https://github.com/user-attachments/assets/08bb9960-23e2-43cc-93c7-26c720649a47" />

This will open a modal with a list of all available profile frames. Click the profile frame that you want, and you should see a "3y3 copied to clipboard!" message.

Then, paste your clipboard into your profile bio and save.

Demonstration:<br>
<img width="1202" height="735" alt="Discord_d0xJ5N93Fj" src="https://github.com/user-attachments/assets/bab89f7f-5fd8-45b9-82f9-f1b7d6ecdf71" />

**Please note that only other users with the plugin will be able to see it.**

**For Nitro users only:** You can also set this per-server using the per-server bio.

---

## Clips

### Videos

![Clips Kung Fu Panda Example](https://github.com/user-attachments/assets/b140c90a-4688-4e91-b696-97f01d314e5c)

Increases the file upload limit for video files to 100 MB by sending them as "Discord Clip"s.

It works by first using FFmpeg.WASM to transmux to "isom"-branded MP4 without re-encoding (unless it's already an "isom"-branded MP4),
and then appending a special tag that the Discord API specifically checks for to the file in order for it to be considered "valid".

The plugin does everything automatically, so all you'll need to do is upload the video as you usually would, and enjoy the higher 100MB file limit!

---

### Audio

![Audio Clips Example](https://github.com/user-attachments/assets/2ff4c762-fe0b-48c0-a450-ff2259c31d61)

Increases the file upload limit for audio files to 100 MB by sending them as "Discord Clip"s.

Using FFmpeg.WASM, the audio is muxed into a new video file with a new video track filled with empty/black frames,
and then a special tag that the Discord API specifically checks for is appended to the file in order for it to be considered "valid".

The plugin does everything automatically, just like as for videos!

If your audio file has an embedded cover image, it will use the cover image for the video!

![Audio Clips Example](https://github.com/user-attachments/assets/95874e2d-1a7e-4fbb-a8a3-a66e1b24a77a)

---

### ZipClips (Any File)

![ZipClip_Example](https://github.com/user-attachments/assets/edc8277c-f6ec-4f7c-a7ca-ad1ed531ea41)

Increases the file upload limit for _any_ file to 100 MB by sending them as "Discord Clip"s.

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

Otherwise, it will _**create a new zip that contains your file automatically!**_
<br><sub>(Note: No compression will be done since it would just take too long. If you want compression, zip the file yourself.)</sub>

---

### Loading FFmpeg.js

By default, FFmpeg.js (necessary for Clips, Audio Clips, and ZipClips to function) will be **downloaded automatically** if necessary. However, this is a _bit_ of a waste of bandwidth, and not entirely reliable. Luckily, there _is_ an alternative option!

If you download the necessary files (easiest way is to [download the full repo](https://github.com/riolubruh/YABDP4Nitro/archive/refs/heads/main.zip)) and extract the `ffmpeg` folder into your BetterDiscord plugins folder as shown:<br>
<img width="644" height="172" alt="image" src="https://github.com/user-attachments/assets/91af1da6-8ae3-4739-9cd0-0946dd98b99a" />

it will automatically be able to detect this and will load them from there instead.

This makes the loading of FFmpeg.js more reliable, faster, and less wasteful.

This also allows you to override the files to whatever you please, if you wanted to do so for some reason.

---

## Miscellaneous

### Nitro Client Themes

Allows you to use the Nitro-exclusive gradient client themes by Discord.

<img width="1352" height="857" alt="Crimson Moon Nitro Client Theme" src="https://github.com/user-attachments/assets/f29582be-669f-4787-b724-974b2d41371b" />

<img width="681" height="181" alt="Nitro Client Theme Options" src="https://github.com/user-attachments/assets/44538ebe-d79b-453f-a438-c47a78cc4b91" />

---

### Remove Screenshare Nitro Upsell

Removes the annoying Nitro upsell in the screen share quality menu.

<img width="952" height="150" alt="upsell" src="https://github.com/user-attachments/assets/dde41faa-4bdd-4b36-9d08-914cb08a14cf" />

---

### In-App Icons

Nitro In-App icons are unlocked.

<img width="712" height="223" alt="App Icons" src="https://github.com/user-attachments/assets/ed0aca6c-a122-476e-b4b0-39513c04cee4" />

---

### Extra Context Menus and Options

Adds random extra right-click (context) menus and options in context menus.

When enabled:

GIFs in the GIF picker will have a context menu allowing you to copy and open the GIF's url: <br>
<img width="257" height="190" alt="gif copy url open url image" src="https://github.com/user-attachments/assets/012a2b90-ea3f-4b6b-af66-2b16841d90e2" />

You can also now download all attachments in a message by right-clicking it:<br>
<img width="231" height="618" alt="download all attachments image" src="https://github.com/user-attachments/assets/761044f6-35bb-4273-b47a-2d7fb02fe62d" />

You also now right-click a user in the blocked/ignored user list and open the user context menu from there:<br>
<img width="698" height="374" alt="image" src="https://github.com/user-attachments/assets/3b0a5945-9cb6-428a-a682-578be2603a04" />

---

### Custom Camera Background

Lets you use a custom background when using Discord's forgotten camera feature!

First, you have to provide a URL in the YABDP4Nitro plugin settings under Miscellaneous:

<img width="589" height="176" alt="image" src="https://github.com/user-attachments/assets/871d8078-48c9-4fba-ab5f-656ef5309b9c" />

Then, simply choose the video background:

<img width="725" height="817" alt="image" src="https://github.com/user-attachments/assets/e570d832-a41c-4203-a237-d576231cf8cf" />

and turn on your camera!

<img width="869" height="656" alt="Discord_THkqpnShlh" src="https://github.com/user-attachments/assets/ce445eb1-78d1-4811-9924-5fcc43f9536c" />

---

# Frequently Asked Questions

[Go here for the FAQ and installation instructions!](https://github.com/riolubruh/YABDP4Nitro/issues/76)

If your question isn't there **and you think it should be there,** write a comment below that issue.

If you have any other questions, you may DM me directly if you wish, otherwise you can [make a new Issue](https://github.com/riolubruh/YABDP4Nitro/issues/new)
with your question, and I'll try to answer it to the best of my abilities.

---

## Reporting Issues

To report an issue, please open a new issue on the [Issues page](https://github.com/YABDP4Nitro/YABDP4Nitro/issues)
of this GitHub repository with a clear description of the problem and any steps to reproduce it.

---

## Contributing

If you would like to contribute to the project, there are several ways to do so. You can:

- Submit a bug report or feature request
- Fork the repository and make changes
- Submit a pull request to merge your changes back into the main branch

Thank you for your interest in contributing to YABDP4Nitro!

---

## Contributors

Significant contributions to the plugin will earn you a special **YABDP4Nitro Contributor Badge** (that you can brag about to your friends)!

Special thanks to:

- Weblure for making [multiple code contributions](https://github.com/riolubruh/YABDP4Nitro/commits?author=Weblure)!
- Kozhura_ubezhishe_player_fly for creating and designing the [**YABDP4Nitro User Badge**](https://raw.githubusercontent.com/riolubruh/riolubruh.github.io/main/badge_hires.png)!
- Moeefa for [committing a bugfix](https://github.com/riolubruh/YABDP4Nitro/commits?author=Moeefa)!
- HunBun for being the brains behind the Discord Clips Bypass!
- Arven for teaching me how to use `BdApi.Webpack.getMangled`, giving code for improved module filters, and teaching me about some filter options I didn't know about.

Thank you all so much for your effort in making this plugin great!

---

## Recommended additional plugins for more Nitro features

[FreeStickers by An00nymushun](https://github.com/riolubruh/DiscordFreeStickers) - Unlocked Sticker sending through converting to and uploading as a GIF. (Fixed fork is linked since the [original repository](https://github.com/An00nymushun/DiscordFreeStickers) is abandoned)

[SplitLargeMessages by DevilBro](https://github.com/mwittrien/BetterDiscordAddons/tree/master/Plugins/SplitLargeMessages) - Send longer messages!

---

## License

The plugin is licensed under the OSL Version 3 License. You can find it [here](https://opensource.org/license/osl-3-0-php).

This software is provided on an "AS IS" BASIS and WITHOUT WARRANTY, either express or implied, including, without limitation, the warranties of non-infringement, merchantability or fitness for a particular purpose. THE ENTIRE RISK AS TO THE QUALITY OF THIS SOFTWARE IS WITH YOU. This DISCLAIMER OF WARRANTY constitutes an essential part of this License. No license to the Original Work is granted by this License except under this disclaimer.

---

## Discord Server

Please read [this README](#readme) and [the FAQ / Installation Instructions](https://github.com/riolubruh/YABDP4Nitro/issues/76) before joining just to ask stupid questions that 100 people have already asked before. It's really annoying.

https://discord.gg/HfFxUbgsBc

---

## Trademark Notice

_"Discord," "Nitro," and related trademarks are the property of Discord Inc.  
This project is not affiliated with, endorsed by, or monetarily benefiting from Discord Inc.  
It does not provide official Discord Nitro services or features._

---

## Donate

If you want to show your love for the plugin or my other open-source works, it would really mean the world to me if you put a few bucks in the tip jar!
Very few people actually donate, so I see and appreciate every last one.

By donating, you agree that funds are non-refundable and grant no rights to software or services.<br>
Donations are voluntary and do not affect software access or functionality.<br>
All donation rewards and acknowledgements are entirely opt-in and do not serve any functional purpose.

_Donations to this project do not support Discord Inc. or its services._

Methods of donations without fees are obviously preferred. See more info below.

---

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

---

### Payment Processor(s) with no fee

GitHub Sponsors is the only one I've found so far.

#### GitHub Sponsors

Only downside is you have to use a credit or debit card.

https://github.com/sponsors/riolubruh

---

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
