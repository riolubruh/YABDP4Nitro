import SettingsStore from "../../global/stores/SettingsStore.ts";

import {BetterDiscord} from "@shared/";

const {UserStore} = BetterDiscord.Webpack.Stores;

const Slider = BetterDiscord.Webpack.getByStrings('initialValue', 'label', 'sortedMarkers', {searchExports: true});

export default {
    id: "stream-context",
    callback(res, props) {
        console.log(res);
        console.log(props);
        const sharpenStreamsEnabled = SettingsStore.get('sharpenStreams');
        const currentUserId = UserStore.getCurrentUser().id;
        const streamingUserId = props?.stream?.ownerId;
        const userSharpnessPreferences = SettingsStore.get('userSharpenPreferences');
        const streamSharpnessPreference = userSharpnessPreferences?.[streamingUserId] ? userSharpnessPreferences?.[streamingUserId] : 0;

        if(!sharpenStreamsEnabled || !props?.stream?.ownerId || props?.stream?.ownerId == currentUserId) return;

        function handleChange(percentSharpness: number){
            // console.log(streamingUserId, percentSharpness);
        }
        function handleSave(percentSharpness: number){
            console.log(`save ${percentSharpness} for ${streamingUserId}`);
            userSharpnessPreferences[streamingUserId] = percentSharpness;
            SettingsStore.set("userSharpenPreferences", userSharpnessPreferences)
        }

        const ContextMenuSlider = <BetterDiscord.ContextMenu.Item
                id={"yabd-sharpness-slider"}
                label={
                    <Slider
                        initialValue={streamSharpnessPreference}
                        label={
                        <BetterDiscord.Components.Text
                            style={{
                                fontSize:'14px',
                                fontWeight:"var(--font-weight-medium)"
                            }}
                        >
                            Sharpness
                        </BetterDiscord.Components.Text>}
                        asValueChanges={handleChange}
                        onValueChange={handleSave}
                    />
                }
        />

        res.props.children.props.children.splice(2,0,ContextMenuSlider);

    }
}