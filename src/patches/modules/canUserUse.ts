import SettingsStore from '../../global/stores/SettingsStore.ts';
import { BetterDiscord } from '@shared/*';

const bypassMap: Record<string, string> = {
  emojisEverywhere: 'emojiBypass',
  animatedEmojis: 'emojiBypass',
  appIcons: 'unlockAppIcons',
  clientThemes: 'clientThemes',
  soundboardEverywhere: 'soundmojiEnabled',
};

const canUserUse = BetterDiscord.Webpack.getMangled(
  BetterDiscord.Webpack.Filters.bySource('.getFeatureValue(', 'isPremium'),
  {
    canUserUse: (x) => typeof x === 'function' && x.toString?.().includes?.('.getFeatureValue('),
  },
  { mapDeclarations: true }
);

export default {
  name: 'canUserUse',
  description: 'Unlocks nitro-locked features based on settings.',
  apply(finale: any, patcher: any) {
    patcher.instead(canUserUse, 'canUserUse', (_, [feature, user], originalFunction) => {
      const settingKey = bypassMap[feature.name];
      if (settingKey && SettingsStore.get(settingKey)) return true;
      return originalFunction(feature, user);
    });
  },
};
