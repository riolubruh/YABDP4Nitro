import {GlobalModules} from "@global/*";
import {wpGetByKeys, wpGetProxy} from "../global/webpack";
import {BetterDiscord} from "@shared/*";
import ShopCollectiblesStore from "../global/stores/ShopCollectiblesStore.tsx";
import {useState} from "react";
import {copyToClipboard, secondsightifyEncodeOnly} from "@utils/*";

const {Components, React, Webpack} = BetterDiscord;
const {UserStore} = Webpack.Stores

const ModalModule = wpGetByKeys(["Modal"]);

const ProductDisplayer = wpGetProxy(Webpack.Filters.byStrings("),{avatarDecorationSrc:", ",avatarSrcOverride:"), {searchExports: true})

export default function OpenAvatarDecorationModalButton() {
    function handleClick() {
        GlobalModules.ModalModule.openModal(props => {
            return <ModalModule.Modal title={"Change Avatar Decorations"} {...props}>
                <AvatarDecorations/>
            </ModalModule.Modal>
        })
    }

    return <Components.Button
        onClick={handleClick}
    >
        Change Avatar Decorations
    </Components.Button>
}

function copyProfileEffect3y3(skuId) {
    copyToClipboard(" " + secondsightifyEncodeOnly("/a" + skuId), "3y3 copied to clipboard!");
}

function AvatarDecoration({product}) {
    const [hovered, setHovered] = React.useState<boolean>(false)
    const skuId = product.sku_id;
    const decorationItem = {...product, skuId: product.sku_id};



    return <div
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => copyProfileEffect3y3(skuId)}
        title={product.productName ? product.productName : product?.messages?.name}
        style={{cursor: "pointer"}}
    >
        <ProductDisplayer isHighlighted={hovered} item={decorationItem} user={UserStore.getCurrentUser()}
                          avatarSize={"SIZE_72"}/>
    </div>
}

function Category({skuId, query}) {
    const category = ShopCollectiblesStore.getCategory(skuId);
    const products = ShopCollectiblesStore.getAvatarDecorations(skuId);

    const filteredProducts = products?.filter?.(product => product?.productName?.toLowerCase?.()?.includes?.(query.toLowerCase()));

    if (!filteredProducts?.length) return null;

    return <div
        style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "var(--background-base-lower)",
            borderRadius: "10px",
            margin: "5px 0px",
            padding: "8px",
            width: "auto"
        }}
    >
        <Components.Text style={{fontSize: "16px", fontWeight: "bold", margin: "0 0 8px 0"}}>
            {category?.name}
        </Components.Text>
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))",
            gap: "8px"
        }}>
            {filteredProducts.map(x => <AvatarDecoration
                key={x.sku_id + x.productName}
                product={x}
            />)}
        </div>
    </div>
}

function QuestCategory({questDecorations, query}) {
    const filteredProducts = questDecorations?.filter?.(product => {console.log(product); return product?.messages?.name?.toLowerCase?.()?.includes?.(query.toLowerCase())});
    console.log('filteredProducts',filteredProducts);
    if (!filteredProducts?.length) return null;

    return <div
        style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "var(--background-base-lower)",
            borderRadius: "10px",
            margin: "5px 0px",
            padding: "8px"
        }}
    >
        <Components.Text style={{fontSize: "16px", fontWeight: "bold", margin: "0 0 8px 0"}}>
            Quests
        </Components.Text>
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))",
            gap: "8px"
        }}>
            {filteredProducts.map(x => <AvatarDecoration
                key={x.sku_id + x.messages.name + String(Math.random() * 10000)}
                product={x}
            />)}
        </div>
    </div>
}

function OffSaleProduct({x}){
    const [hovered, setHovered] = React.useState<boolean>(false);
    const decorationItem = {...x, skuId: x.sku_id};

    return <div
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => copyProfileEffect3y3(x.sku_id)}
        style={{
            cursor: "pointer"
        }}
    >
        <ProductDisplayer avatarSize={"SIZE_72"} isHighlighted={hovered} item={decorationItem}
                          user={UserStore.getCurrentUser()}
                          key={x.sku_id}/>
    </div>

}

function Invalid({key, skuId, query}) {
    const categories = BetterDiscord.Hooks.useStateFromStores([ShopCollectiblesStore], () => ShopCollectiblesStore.getInvalids().map(x => ShopCollectiblesStore.getInvalid(x)))
    console.log(categories);
    // const filteredProducts = categories.filter()

    return categories?.map(x => <div style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--background-base-lower)",
        borderRadius: "10px",
        margin: "5px 0px",
        padding: "8px"
    }}>
        {x.name}
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))",
            gap: "8px"
        }}>
            {x.products.filter(x=>x?.name?.includes?.(query)).map(x => {
                return <OffSaleProduct x={x}/>
            })}
        </div>
    </div>)
}

function AvatarDecorations() {
    const [query, setQuery] = useState("");
    const Collections = BetterDiscord.Hooks.useStateFromStores([ShopCollectiblesStore], () => ShopCollectiblesStore.getCategories());
    const questDecorations = BetterDiscord.Hooks.useStateFromStores([ShopCollectiblesStore], () => ShopCollectiblesStore.getQuestAvatarDecorations());
    const invalids = BetterDiscord.Hooks.useStateFromStores([ShopCollectiblesStore], () => ShopCollectiblesStore.getInvalids());

    console.log(Collections);
    console.log(questDecorations);
    console.log(invalids);

    return <div>
        <Components.SearchInput
            value={query}
            placeholder={"Search..."}
            onChange={(e) => setQuery(e.target.value)}
            style={{
                backgroundColor: `var(--control-secondary-background-default)`
            }}
        />
        {Collections.map(id => (
            <Category key={id} skuId={id} query={query}/>
        ))}
        <QuestCategory query={query} questDecorations={questDecorations}/>
        {invalids.map(id => (
            <Invalid key={id} skuId={id} query={query}/>
        ))}
    </div>
}