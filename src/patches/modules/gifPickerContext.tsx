import { BetterDiscord } from '@shared/*';
import { Icon } from '@iconify/react';
import { ContextMenuLabel, ContextMenuWrapper, copyToClipboard } from '@utils/*';
import { CloseAllContextMenus } from '@global/*';
import SettingsStore from '../../global/stores/SettingsStore.ts';

const GIFPickerRender = BetterDiscord.Webpack.getByPrototypeKeys('renderGIF', {
  searchExports: true,
});

export default {
  name: 'GIF Picker Context Menu',
  description: 'Adds copy/open url context menu to GIFs in GIF Picker.',
  ids: undefined, // array of entry ids
  waitFor: [], // filters to wait for.
  apply(finale, patcher) {
    patcher.after(GIFPickerRender.prototype, 'render', (instance, __, ret) => {
      if (!SettingsStore.get('extraContextMenus')) return;

      ret.props.onContextMenu = (event: any) => {
        let url: string = instance?.props?.item?.url ? instance.props.item.url : instance.props.src;
        url.startsWith('//') && (url = 'https:' + url);

        function copyUrl() {
          copyToClipboard(url);
        }

        function openUrl() {
          window.open(url);
        }

        const Menu = (
          <BetterDiscord.ContextMenu.Menu onClose={CloseAllContextMenus}>
            <BetterDiscord.ContextMenu.Item
              leadingAccessory={{
                type: 'icon',
                icon: () => <Icon width={'22'} icon={'mdi:content-copy'} />,
              }}
              label={
                <ContextMenuWrapper>
                  <ContextMenuLabel />
                  <span>Copy GIF URL</span>
                </ContextMenuWrapper>
              }
              id={'yabd-copy-url-gif-picker'}
              action={copyUrl}
            />
            <BetterDiscord.ContextMenu.Item
              leadingAccessory={{
                type: 'icon',
                icon: () => <Icon width={'22'} icon={'mdi:open-in-browser'} />,
              }}
              label={
                <ContextMenuWrapper>
                  <ContextMenuLabel />
                  <span>Open GIF URL</span>
                </ContextMenuWrapper>
              }
              id={'yabd-open-url-gif-picker'}
              action={openUrl}
            />
          </BetterDiscord.ContextMenu.Menu>
        );

        BetterDiscord.ContextMenu.open(event, () => Menu);
      };
    });
  },
};
