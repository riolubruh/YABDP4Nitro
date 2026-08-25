import { GlobalModules } from '@global/*';
import { wpGetByKeys, wpWaitWithTimeout } from '../global/webpack';
import { BetterDiscord } from '@shared/*';
import ShopCollectiblesStore from '../global/stores/ShopCollectiblesStore.tsx';
import { copyToClipboard, secondsightifyEncodeOnly } from '@utils/*';
import SettingsStore from '../global/stores/SettingsStore.ts';

const { React, Components } = BetterDiscord;
const { Suspense } = React;
const { useMemo, useState } = React;

const ModalModule = wpGetByKeys(['Modal']);

const Nameplate = React.lazy(async () => ({
  default: await wpWaitWithTimeout(BetterDiscord.Webpack.Filters.bySource('.x5CoXR),className:'), {
    timeout: 10000,
    declaration: (x) => String(x).includes('.x5CoXR),className:'),
  }),
}));

const { UserStore } = BetterDiscord.Webpack.Stores;

export default function OpenNameplateModalButton() {
  function handleClick() {
    GlobalModules.ModalModule.openModal((props) => {
      return (
        <ModalModule.Modal title={'Change Nameplate'} {...props}>
          <Nameplates />
        </ModalModule.Modal>
      );
    });
  }

  return <Components.Button onClick={handleClick}>Change</Components.Button>;
}

function copyNameplate3y3({ skuId, palette }) {
  copyToClipboard(
    ' ' + secondsightifyEncodeOnly(`n{${skuId},${palette}}`),
    '3y3 copied to clipboard!'
  );
}

function AdvancedNameplateTextInput({ skuId, setSkuId, palette, setPalette }) {
  const [customSkuTextBox, setCustomSkuTextBox] = useState('');
  const [customPaletteTextBox, setCustomPaletteTextBox] = useState('');

  function onKeyDown(e) {
    if (e.keyCode == 13 || e.key == 'Enter')
      return copyNameplate3y3({
        skuId: skuId ?? customSkuTextBox,
        palette: palette ?? customPaletteTextBox,
      });
    else {
      setCustomSkuTextBox(skuId ?? customSkuTextBox);
      setCustomPaletteTextBox(palette ?? customPaletteTextBox);
      setSkuId(null);
      setPalette(null);
    }
  }

  return (
    <div style={{ marginBottom: '8px' }}>
      <Components.TextInput
        placeholder={'Custom SKU ID... (enter to copy)'}
        defaultValue={skuId ?? customSkuTextBox}
        value={skuId ?? customSkuTextBox}
        onKeyDown={onKeyDown}
        onChange={(e) => setCustomSkuTextBox(e)}
      />
      <Components.TextInput
        placeholder={'Palette... (enter to copy)'}
        defaultValue={palette ?? customPaletteTextBox}
        value={palette ?? customPaletteTextBox}
        onKeyDown={onKeyDown}
        onChange={(e) => setCustomPaletteTextBox(e)}
      />
    </div>
  );
}

function Nameplate3y3({ product, setPalette, setSkuId }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        setPalette(product.palette);
        setSkuId(product.sku_id);
        copyNameplate3y3({ skuId: product.sku_id, palette: product.palette });
      }}
      style={{
        marginBottom: '10px',
      }}
      title={product.productName}
    >
      <Nameplate
        section={'purchase'}
        currentUser={UserStore.getCurrentUser()}
        nameplate={{
          skuId: product.sku_id,
          asset: product.asset,
          label: product.label,
          palette: product.palette,
        }}
        canUsePremiumCollectibles={true}
        isSelected={hovered}
      ></Nameplate>
    </div>
  );
}

function NameplateCategory({ skuId, query, setSkuId, setPalette }) {
  const category = ShopCollectiblesStore.getCategory(skuId);
  if (!category) return null;
  const products = ShopCollectiblesStore.getNameplates(skuId);

  const filteredProducts = useMemo(() => {
    if (!products?.length) return [];
    if (!query.trim()) return products;

    return products.filter((product) =>
      product?.productName?.toLowerCase?.()?.includes?.(query.toLowerCase())
    );
  }, [products, query]);

  return filteredProducts.length ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--background-base-lower)',
        borderRadius: '10px',
        margin: '5px 0px',
        padding: '8px',
      }}
    >
      {filteredProducts.length ? <Components.Text>{category.name}</Components.Text> : null}
      {filteredProducts.map((x) => (
        <Nameplate3y3 product={x} setSkuId={setSkuId} setPalette={setPalette} />
      ))}
    </div>
  ) : null;
}

function Nameplates() {
  const [query, setQuery] = useState('');
  const [skuId, setSkuId] = useState('');
  const [palette, setPalette] = useState('');
  const advancedProfileCustomization = SettingsStore.get('advancedProfileCustomization');
  const Collections = BetterDiscord.Hooks.useStateFromStores([ShopCollectiblesStore], () =>
    ShopCollectiblesStore.getCategories()
  );

  return (
    <Suspense
      fallback={
        <div>
          This could be infinite loading situation, Please load the normal profile effects button
        </div>
      }
    >
      {advancedProfileCustomization ? (
        <AdvancedNameplateTextInput
          palette={palette}
          setPalette={setPalette}
          skuId={skuId}
          setSkuId={setSkuId}
        />
      ) : null}
      <Components.SearchInput
        placeholder={'Search nameplates...'}
        defaultValue={query}
        onChange={(e) => setQuery(e)}
      />

      {Collections.map((x) => (
        <NameplateCategory skuId={x} query={query} setSkuId={setSkuId} setPalette={setPalette} />
      ))}
    </Suspense>
  );
}
