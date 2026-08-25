import { BetterDiscord } from '@shared/*';
import { getBannerUrl } from '@utils/*';
import SettingsStore from '../../global/stores/SettingsStore.ts';
import { getKey } from '../../global/webpack';
const { React } = BetterDiscord;

export default {
  name: 'fakeBanners',
  description: '3y3 banners',
  ids: undefined,
  waitFor: [
    BetterDiscord.Webpack.Filters.bySource(
      'getSelectedParticipant',
      'CHANNEL_CALL_POPOUT',
      'avatarDecoration',
      'backgroundSrc',
      'getAvatarURL'
    ),
  ],
  apply(finale, patcher) {
    const mod = getKey(finale.modules[0], (x) =>
      x.toString?.().includes?.('getSelectedParticipant')
    );
    patcher.after(mod?.module, mod?.key, (_, [args], ret) => {
      const bannerUrl = getBannerUrl(args.participant.id);
      const callTileBackgroundEnabled = SettingsStore.get('voiceTileBannerBackground');

      if (!bannerUrl || !callTileBackgroundEnabled || !ret) return;

      ret.props.children &&
        (ret.props.children = React.cloneElement(ret.props.children, {
          style: {
            backgroundImage: `url('${bannerUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          },
        }));
    });
  },
};
