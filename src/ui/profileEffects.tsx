import {GlobalModules} from "@global/*";
import {wpGetByKeys} from "../global/webpack";
import {BetterDiscord} from "@shared/*";
import ShopCollectiblesStore from "../global/stores/ShopCollectiblesStore.tsx";
import {useState} from "react";

const {Components, React} = BetterDiscord;

const ModalModule = wpGetByKeys(["Modal"]);

export default function OpenProfileEffectModalButton(){
    function handleClick(){
        GlobalModules.ModalModule.openModal(props => {
            return <ModalModule.Modal title={"Change Profile Effect"} {...props}>
                <ProfileEffects/>
            </ModalModule.Modal>
        })
    }

    return <Components.Button
        onClick={handleClick}
    >
        Change Profile Effect
    </Components.Button>
}

function ProfileEffect({product, query}){

    const skuId = product.sku_id;
    const src = product.thumbnailPreviewSrc;
    const title = product.title;

    function copyProfileEffect3y3(skuId){
        console.log(skuId);
    }
    return <img
        onClick={() => copyProfileEffect3y3(skuId)}
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

function Category({skuId, query}){
    console.log(query);
    const category = ShopCollectiblesStore.getCategory(skuId);
    const products = ShopCollectiblesStore.getProfileEffects(skuId)
    console.log("products",products);
    const filteredProducts = products?.filter?.(product => product?.title?.toLowerCase?.()?.includes?.(query.toLowerCase()) || product?.accessibilityLabel?.toLowerCase?.()?.includes?.(query.toLowerCase()));
    console.log('filteredProducts',filteredProducts);

    return <div
        style={{
            display: "inline-block"
        }}
    >
        {filteredProducts?.length ? <Components.Text>
            {category?.name}
        </Components.Text> : null}
        {filteredProducts?.map(x => <ProfileEffect
            product={x}
        />)}
    </div>
}

function ProfileEffects(){
    const [query, setQuery] = useState("");
    const Collections = BetterDiscord.Hooks.useStateFromStores([ShopCollectiblesStore], () => ShopCollectiblesStore.getCategories());

    console.log(Collections);

    return <div>
        <Components.SearchInput
            value={query}
            placeholder={"Search..."}
            onChange={(e) => setQuery(e.target.value)}
            style={{
                backgroundColor: `var(--control-secondary-background-default)`
            }}
        />
        {Collections.map(id => {
            return <Category skuId={id} query={query}/>
        })}
    </div>
}