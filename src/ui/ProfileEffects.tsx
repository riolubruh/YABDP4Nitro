import {GlobalModules} from "@global/*";
import {wpGetByKeys} from "../global/webpack";
import {BetterDiscord} from "@shared/*";
import ShopCollectiblesStore from "../global/stores/ShopCollectiblesStore.tsx";
import {copyToClipboard, secondsightifyEncodeOnly} from "@utils/*";
import SettingsStore from "../global/stores/SettingsStore.ts";

const {Components, React} = BetterDiscord;
const {useState} = React;

const ModalModule = wpGetByKeys(["Modal"]);

export default function OpenProfileEffectModalButton() {
    function handleClick() {
        GlobalModules.ModalModule.openModal(props => {
            return <ModalModule.Modal title={"Change Profile Effect"} {...props}>
                <ProfileEffects/>
            </ModalModule.Modal>
        })
    }

    return <Components.Button
        onClick={handleClick}
    >
        Change
    </Components.Button>
}

function CustomSkuTextInput({skuId, setSkuId}){
    const [customSkuTextBox, setCustomSkuTextBox] = useState("");

    function onChange(e){
        setCustomSkuTextBox(e);
    }

    function onKeyDown(e){
        if(e.keyCode == 13 || e.key == "Enter") return copyProfileEffect3y3(skuId ?? customSkuTextBox);
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

function copyProfileEffect3y3(skuId) {
    copyToClipboard(" " + secondsightifyEncodeOnly("fx" + skuId), "3y3 copied to clipboard!");
}

function ProfileEffect({product, setSkuId}) {

    const skuId = product.sku_id;
    const src = product.thumbnailPreviewSrc;
    const title = product.title;

    return <img
        onClick={() => {
            setSkuId(skuId);
            copyProfileEffect3y3(skuId);
        }}
        src={src}
        title={title}
        style={{
            width: "22.5%",
            cursor: "pointer",
            marginBottom: "0.5em",
            marginLeft: "0.5em",
            backgroundColor: "var(--background-base-lower)",
            display: "inline-block",
        }}
    />
}

function Category({skuId, query, setSkuId}) {
    const category = ShopCollectiblesStore.getCategory(skuId);
    const products = ShopCollectiblesStore.getProfileEffects(skuId)

    const filteredProducts = products?.filter?.(product => product?.title?.toLowerCase?.()?.includes?.(query.toLowerCase()) || product?.accessibilityLabel?.toLowerCase?.()?.includes?.(query.toLowerCase()));

    return <div
        style={{
            display: "inline-block",
            backgroundColor: "var(--background-base-lower)",
            borderRadius: "10px",
            margin: "5px 0px",

        }}
    >
        {filteredProducts?.length ? <Components.Text style={{fontSize: "16px", fontWeight:"bold", margin: "10px 8px"}}>
            {category?.name}
        </Components.Text> : null}
        {filteredProducts?.map(x => <ProfileEffect
            product={x}
            setSkuId={setSkuId}
        />)}
    </div>
}

function ProfileEffects() {
    const [query, setQuery] = useState("");
    const [skuId, setSkuId] = useState("");
    const Collections = BetterDiscord.Hooks.useStateFromStores([ShopCollectiblesStore], () => ShopCollectiblesStore.getCategories());
    const advancedProfileCustomization = SettingsStore.get("advancedProfileCustomization");

    return <div>
        {advancedProfileCustomization ? <CustomSkuTextInput setSkuId={setSkuId} skuId={skuId}/> : null}
        <Components.SearchInput
            defaultValue={query}
            placeholder={"Search..."}
            onChange={(e) => setQuery(e.target.value)}
            style={{
                backgroundColor: `var(--control-secondary-background-default)`
            }}
        />
        {Collections.map(id => {
            return <Category skuId={id} query={query} setSkuId={setSkuId}/>
        })}
    </div>
}