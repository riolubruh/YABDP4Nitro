import {GlobalModules} from "@global/*";
import {getKey, wpGetByKeys, wpGetByStrings, wpGetProxy} from "../global/webpack";
import {BetterDiscord} from "@shared/*";
import {useMemo, useState} from "react";
import ShopCollectiblesStore from "../global/stores/ShopCollectiblesStore.tsx";
import {copyToClipboard, secondsightifyEncodeOnly} from "@utils/*";
const {React, Components} = BetterDiscord;

const ModalModule = wpGetByKeys(["Modal"]);

const Nameplate = wpGetProxy(BetterDiscord.Webpack.Filters.bySource(".x5CoXR),className:"), {raw:true});//getKey(BetterDiscord.Webpack.getBySource(".x5CoXR),className:", {raw:true}).declarations, BetterDiscord.Webpack.Filters.bySource(".x5CoXR),className:"));

export default function OpenNameplateModalButton(){
    function handleClick() {
        GlobalModules.ModalModule.openModal(props => {
            return <ModalModule.Modal title={"Change Nameplate"} {...props}>
                <Nameplates/>
            </ModalModule.Modal>
        })
    }

    return <Components.Button
        onClick={handleClick}
    >
        Change Nameplate
    </Components.Button>
}

function copyNameplate3y3({skuId, palette}){
    console.log(skuId, palette);
    copyToClipboard(" " + secondsightifyEncodeOnly(`n{${skuId},${palette}}`), "3y3 copied to clipboard!");
}

function Nameplate3y3(product){
    const [hovered, setHovered] = React.useState(false);
    return <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => copyNameplate3y3({skuId: product.sku_id, palette: product.palette})}
    >
        <Nameplate.declarations.Y section={"purchased"} nameplate={product} canUsePremiumCollectibles={true} isSelected={hovered}></Nameplate.declarations.Y>
    </div>
}

function NameplateCategory({skuId, query}){
    const category = ShopCollectiblesStore.getCategory(skuId);
    if(!category) return null;
    const products = ShopCollectiblesStore.getNameplates(skuId);

    const filteredProducts = useMemo(() => {
        if (!products?.length) return [];
        if (!query.trim()) return products;

        return products.filter(product =>
            product?.productName?.toLowerCase?.()?.includes?.(query.toLowerCase())
        );
    }, [products, query]);

    return <div>
        {filteredProducts.length ? <Components.Text>{category.name}</Components.Text> : null}
        {filteredProducts.map(x => <Nameplate3y3 product={x}/>)}
    </div>
}

function Nameplates(){
    const [query, setQuery] = useState("");
    const Collections = BetterDiscord.Hooks.useStateFromStores([ShopCollectiblesStore], () => ShopCollectiblesStore.getCategories());
    console.log(Nameplate);


    return <div>
        <Components.SearchInput
            placeholder={"Search nameplates..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />

        {Collections.map(x=><NameplateCategory skuId={x} query={query}/>)}



    </div>
}