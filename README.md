# YABDP4Nitro

*Probably* the best "Nitro plugin" out there. 

YABDP4Nitro is a feature-rich BetterDiscord plugin designed to enhance your Discord experience. This plugin offers various functionality such as customizable screensharing quality, emoji bypasses, profile accents, client themes, and more!

## Table of Contents:
- [Features](#features)
  * [Custom Screenshare, FPS, Bitrate](#fully-customizable-screensharing-quality-fps-and-bitrate)
  * [Emoji Bypasses](#emoji-bypasses)
     + [Upload Emotes](#upload-emotes)
     + [Ghost Mode](#ghost-mode)
     + [Classic Mode](#classic-mode)
   * [Profile](#profile)
     + [Profile Accents for All Users](#profile-accents-for-all-users)
     + [Fake Profile Themes](#fake-profile-themes)
     + [Fake Profile Banners](#fake-profile-banners)
     + [Fake Avatar Decorations](#fake-avatar-decorations)
   * [Miscellaneous](#miscellaneous)
     + [Nitro Client Themes](#nitro-client-themes)
     + [Remove Screenshare Nitro Upsell](#remove-screenshare-nitro-upsell)
- [FAQ (read this before asking!)](#frequently-asked-questions)
- [Reporting Issues](#reporting-issues)
- [Contributing](#contributing)
- [Additional Plugins I Recommend](#recommended-additional-plugins-for-more-nitro-features)
- [License Agreement](#license)
  
## Features

## Fully Customizable Screensharing Quality, FPS, and Bitrate

Stream at any resolution, framerate, and bitrate you want! Who needs Nitro?

![Choosing Quality and FPS Options](https://user-images.githubusercontent.com/54255074/176584683-efe8eac3-8c6c-4100-9b98-0b2592fbb86f.png)

![Another Image](https://user-images.githubusercontent.com/54255074/183275106-cbee28e6-d550-4637-ab06-0cb065c81283.png)

![Bitrate Options](https://user-images.githubusercontent.com/54255074/191619975-64c61dc5-152a-4bec-995c-98661f823b53.png)

## Emoji Bypasses

Allows you to seamlessly use animated emojis and emojis from any server you're in by linking or uploading them!

### Upload Emotes

Automatically uploads the emojis used in your message as an attachment!

![Uploading Demonstration](https://user-images.githubusercontent.com/54255074/191621033-da0db3f6-c5f6-4ba7-9c99-0c8ccf7ed864.gif)
___

### Ghost Mode 
<!-- spoopy!!! -->
Hide the link(s) to any emoji(s) you send by automatically using a "ghost message"! It is a bit more laggy and may be detected as spam by some bots.

![Ghost Mode Image Demonstration](https://user-images.githubusercontent.com/54255074/166120840-50bd98c7-48d0-4772-8d9b-17280e247a02.png)
___

### Classic Mode

When both Ghost Mode and Upload Emotes are disabled, we simply replace the emoji in the message with its' URL. This is "classic mode".
___

#### Usage of the Emoji Bypass

![Emoji Demonstration](https://user-images.githubusercontent.com/54255074/166121643-58b06bc5-c0a5-4e45-a7e9-c135337b7ed0.gif)

## Profile

### Profile Accents for All Users

<img src="https://user-images.githubusercontent.com/54255074/199860419-7e3275e0-fdf5-49cf-a7c3-89f3105d1867.png" alt="visual difference with it on" width="25%"></img><--[New Look] [Original Look]--><img src="https://user-images.githubusercontent.com/54255074/199860495-19312500-3f37-4c3d-a54a-1c04af68e826.png" alt="visual difference with it off" width="25%"></img>

To clarify: What this does is make **all profiles** render with the gradient accent on the **client-side**.

We'll get into profile accents that other users can see in a second.
___

### Fake Profile Themes

Allows profile theming by hiding color information in your bio using invisible 3y3 encoding!<br>
Works effectively exactly the same as FakeProfileThemes on Vencord, but on BetterDiscord!<br>
![Fake Profile Themes Demonstration](https://github.com/riolubruh/YABDP4Nitro/assets/54255074/dcb7b2fb-fdad-4d2d-8d87-b79fcabd8e9a)

Happy theming!

**Note that only users that have either YABDP4Nitro, FakeProfileThemes (Vencord), UnrealProfileThemes (Enmity), or a similar plugin (that decodes 3y3-encoded profile colors) installed will be able to see the profile colors.**
___

### Fake Profile Banners

Uses invisible 3y3 encoding to allow setting profile banners by hiding the image URL in your bio.<br>
Only supports Imgur URLs for security reasons.

![Fake Profile Banners Big Yosher](https://github.com/riolubruh/YABDP4Nitro/assets/54255074/f7edda1f-531b-45b8-bc8b-ee50d5c5cfdb)

To use Fake Profile Banners, go to Settings>Profiles. You should see a new text input and 
"Copy 3y3" button under the Profile Banners section:

![Profile Settings](https://github.com/riolubruh/YABDP4Nitro/assets/54255074/facc8c27-5353-4205-b001-5b9c62375d6e)

<br>
Simply type/paste in an Imgur URL into the input area

( ex: **`https://i.imgur.com/bYGGXnq.gif`** )

Then, click the "Copy 3y3" button to the right of the input area, paste your clipboard into your "About Me" (or bio) and save.

The banner should appear in the "Try It Out" preview to let you know that it is working correctly.

**Note that only other users with YABDP4Nitro installed and enabled will be able to see this.**
___

### Fake Avatar Decorations

Uses invisible 3y3 encoding to allow setting avatar decorations by hiding IDs in your bio.

![avatar decoration demonstration](https://github.com/riolubruh/YABDP4Nitro/assets/54255074/005379d8-5d6f-43e9-8735-b44788560831)

To use Fake Avatar Decorations, go to Settings>Profiles you should see a new button under Avatar Decoration.

![deco-button](https://github.com/riolubruh/YABDP4Nitro/assets/54255074/0b5547e0-2947-4628-a3da-a91f9ee1c933)

Clicking this button will reveal a menu with each of the avatar decorations in a 4x5 grid.

![avatar decorations](https://github.com/riolubruh/YABDP4Nitro/assets/54255074/54597f3e-b115-44dd-9804-3aee5d9c99b3)

Clicking one of these avatar decorations will copy the invisible 3y3-encoded data into your clipboard.
<br>Now follow one or both of the following methods to apply the avatar decoration to your profile:

<details>
 <summary>
 Custom Status 
</summary>
 Now that you have the 3y3 encoded data in your clipboard:
 
 Close settings by pressing Escape or hitting the button labeled ESC in the top right.

 Click on your profile in the bottom left to open this menu:
 
 ![profile](https://github.com/riolubruh/YABDP4Nitro/assets/54255074/2e48a60a-b235-48fd-a93f-b14c6a2ba695)

 Click the button to add/edit your custom status and paste your clipboard into your status.

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

___

## Miscellaneous

### Nitro Client Themes

Allows you to use the Nitro-exclusive gradient client themes by Discord.

![Crimson Moon Nitro Client Theme](https://user-images.githubusercontent.com/54255074/233230492-dbfe7005-e207-41ef-a313-e4e70867a49d.png)

![Nitro Client Theme Options](https://user-images.githubusercontent.com/54255074/233231021-16c06b12-530a-4878-8ee9-60a5a254dd1b.png)
___

### Remove Screenshare Nitro Upsell

Removes the annoying Nitro upsell in the screen share quality menu.

# Frequently Asked Questions
[Go here for the FAQ!](https://github.com/riolubruh/YABDP4Nitro/issues/76)

If your question isn't there **and you think it should be there,** write a comment below that issue. 

If you have any other questions, you may DM me directly if you wish, otherwise you can [make a new Issue](https://github.com/riolubruh/YABDP4Nitro/issues/new) 
with your question, and I'll try to answer it to the best of my abilities.

## Reporting Issues
To report an issue, please open a new issue on the [Issues page](https://github.com/YABDP4Nitro/YABDP4Nitro/issues)
of this GitHub repository with a clear description of the problem and any steps to reproduce it.

## Contributing
If you would like to contribute to the project, there are several ways to do so. You can:
- Submit a bug report or feature request
- Fork the repository and make changes
- Submit a pull request to merge your changes back into the main branch

Thank you for your interest in contributing to YABDP4Nitro!

## Recommended additional plugins for more Nitro features

[FreeStickers by An00nymushun](https://github.com/riolubruh/DiscordFreeStickers) - Unlocked Sticker sending through converting to and uploading as a GIF. (Fixed fork is linked until the [original repository](https://github.com/An00nymushun/DiscordFreeStickers) is fixed)

[SplitLargeMessages by DevilBro](https://github.com/mwittrien/BetterDiscordAddons/tree/master/Plugins/SplitLargeMessages) - Send longer messages!

[SplitLargeFiles by ImTheSquid](https://github.com/riolubruh/SplitLargeFiles) - Send large files by splitting them up into 25 megabyte chunks! YABDP4Nitro-compatible fork created by me.

[DiscordBypasses by Ahlawat](https://github.com/Tharki-God/BetterDiscordPlugins#discordbypasses) - A mixture of different Discord bypasses, including unlocking Experiments.

## License

The plugin is licensed under the NPOSL Version 3 License. You can find it [here](https://github.com/riolubruh/YABDP4Nitro/blob/main/LICENSE.md).

tl;dr: This license grants you the right to:

**Use and Modify**: You can use and modify the original work, such as software code or creative content, without needing to pay royalties.

**Create Derivative Works**: You're allowed to create new works based on the original, like adding features or making improvements.

**Distribute and Share**: You can share copies of the original work and your derivative creations with others, as long as you follow the license rules.

Important things to consider:

**Attribution**: If you modify the original work, you need to keep copyright, patent, and trademark notices intact and provide clear information about your changes.

**No Warranties**: The original work is provided "as is," without any warranty, and the creator is not responsible for any problems or damages you might encounter.

**Limitation of Liability**: The creator is not liable for any damages that might arise from using the original work or your modifications.

**Termination**: If you violate the license terms, your rights can be terminated. Also, if you sue the creator for patent infringement based on the original work, your rights under the license automatically end.
