import {GlobalModules} from "@global/*";
import {BetterDiscord} from "@shared/*";
import {wpGetByKeys, wpWait} from "../global/webpack";
import ShopCollectiblesStore from "../global/stores/ShopCollectiblesStore.tsx";
import {copyToClipboard, secondsightifyEncodeOnly} from "@utils/*";
import SettingsStore from "../global/stores/SettingsStore.ts";

const {React, Components} = BetterDiscord;
const {useMemo, useState} = React;

const ModalModule = wpGetByKeys(["Modal"]);

const ProfileFrameElem = React.lazy(async () => ({ default: await wpWait(BetterDiscord.Webpack.Filters.bySource('let{profileFrame:'), {declaration: x => String(x).includes('let{profileFrame:')})}))

export default function OpenProfileFramesModalButton(){
    function handleClick() {
        GlobalModules.ModalModule.openModal(props => {
            return <ModalModule.Modal title={"Change Profile Frame"} size={"lg"} {...props}>
                <ProfileFrames/>
            </ModalModule.Modal>
        })
    }

    return <Components.Button
        onClick={handleClick}
    >
        Change
    </Components.Button>
}


function copyProfileFrame3y3({skuId}){
    copyToClipboard(" " + secondsightifyEncodeOnly(`pf${skuId}`), "3y3 copied to clipboard!");
}

function CustomSkuTextInput({skuId, setSkuId}){
    const [customSkuTextBox, setCustomSkuTextBox] = useState("");

    function onChange(e){
        setCustomSkuTextBox(e);
    }

    function onKeyDown(e){
        if(e.keyCode == 13 || e.key == "Enter") return copyProfileFrame3y3({skuId: skuId ?? customSkuTextBox});
        else {
            setCustomSkuTextBox(skuId ?? customSkuTextBox);
            setSkuId(null);
        }
    }

    return <div style={{marginBottom: "8px"}}>
        <Components.TextInput
            placeholder={"Custom SKU ID... (enter to copy)"}
            defaultValue={skuId ?? customSkuTextBox}
            value={skuId ?? customSkuTextBox}
            onKeyDown={onKeyDown}
            onChange={onChange}
        />
    </div>
}

function ProfileFrame({product, setSkuId}){
    const [hovered, setHovered] = React.useState(false);
    return <div
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
        onClick={() => {
            copyProfileFrame3y3({skuId: product.sku_id})
            setSkuId(product.sku_id);
        }}
        title={product.productName}
    >
        <ProfileFrameElem
            profileFrame={{
                ...product,
                overflowBottom: product.overflow_bottom,
                overflowTop: product.overflow_top,
                overflowHorizontal: product.overflow_horizontal,
                innerWidth: product.inner_width,
                skuId: product.sku_id
            }}
            section={"purchase"}
            isSelected={hovered}
            canUsePremiumCollectibles={true}
            style={{
                height: "175px",
                width: "175px",
                cursor: "pointer",
            }}
        />

    </div>
}

function ProfileFrameCategory({skuId, query, setSkuId}){
    const category = ShopCollectiblesStore.getCategory(skuId);
    if(!category) return null;
    const products = ShopCollectiblesStore.getProfileFrames(skuId);
    const filteredProducts = useMemo(() => {
        if (!products?.length) return [];
        if (!query.trim()) return products;

        return products.filter(product =>
            product?.productName?.toLowerCase?.()?.includes?.(query.toLowerCase())
        );
    }, [products, query]);


    return filteredProducts.length ? <div
        style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "var(--background-base-lower)",
            borderRadius: "10px",
            margin: "5px 0px",
            padding: "8px"
        }}
    >
        {filteredProducts.length ? <Components.Text>{category.name}</Components.Text> : null}
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))",
            gap: "8px"
        }}>
            {filteredProducts.map(x => <ProfileFrame product={x} setSkuId={setSkuId}/>)}
        </div>
    </div> : null;
}

function ProfileFrames(){
    const [query, setQuery] = useState("");
    const [skuId, setSkuId] = useState("");
    const Collections = BetterDiscord.Hooks.useStateFromStores([ShopCollectiblesStore], () => ShopCollectiblesStore.getCategories());
    const advancedProfileCustomization = SettingsStore.get("advancedProfileCustomization");

    return <div>
        {advancedProfileCustomization ? <CustomSkuTextInput setSkuId={setSkuId} skuId={skuId} /> : null}
        <Components.SearchInput
            placeholder={"Search nameplates..."}
            defaultValue={query}
            onChange={(e) => setQuery(e)}
        />

        {Collections.map(x=><ProfileFrameCategory skuId={x} query={query} setSkuId={setSkuId}/>)}
    </div>
}