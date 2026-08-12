import {GlobalModules} from "@global/*";
import {wpGetByKeys, wpGetProxy} from "../global/webpack";
import {BetterDiscord} from "@shared/*";
import ShopCollectiblesStore from "../global/stores/ShopCollectiblesStore.tsx";
import {useState} from "react";
import {copyToClipboard, secondsightifyEncodeOnly} from "@utils/*";

const {Components, React} = BetterDiscord;

const ModalModule = wpGetByKeys(["Modal"]);

const ProductDisplayer = wpGetProxy(BetterDiscord.Webpack.Filters.bySource(".A.colors.INTERACTIVE_TEXT_ACTIVE,width:40"))

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

function AvatarDecoration({product}) {
    const [hovered, setHovered] = React.useState<boolean>(false)
    const skuId = product.sku_id;
    const src = "https://cdn.discordapp.com/avatar-decoration-presets/" + product.asset + ".webp?size=128"
    const title = product.label;

    function copyProfileEffect3y3(skuId) {
        copyToClipboard(" " + secondsightifyEncodeOnly("/a" + skuId), "3y3 copied to clipboard!");
    }

    return <div style={{display: "flex", width: "32px", height: "32px"}}
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
    >
            <ProductDisplayer.A key={`based-da-${product.sku_id}`} skuId={product.sku_id} isCardHovered={hovered}/>
    </div>

    /*<img
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
    />*/
}

function Category({skuId, query}) {
    const category = ShopCollectiblesStore.getCategory(skuId);
    const products = ShopCollectiblesStore.getAvatarDecorations(skuId)

    const filteredProducts = products?.filter?.(product => product?.label?.toLowerCase?.()?.includes?.(query.toLowerCase()));

    return <div
        style={{
            display: "flex",
            backgroundColor: "var(--background-base-lower)",
            borderRadius: "10px",
            margin: "5px 0px",
            width: "100%",
        }}
    >
        {filteredProducts?.length ? <Components.Text style={{fontSize: "16px", fontWeight:"bold", margin: "10px 8px"}}>
            {category?.name}
        </Components.Text> : null}
        {filteredProducts?.map(x => <AvatarDecoration
            product={x}
        />)}
    </div>
}

function QuestCategory({questDecorations, query}) {

    const filteredProducts = questDecorations?.filter?.(product => product?.label?.toLowerCase?.()?.includes?.(query.toLowerCase()));

    return <div
        style={{
            display: "inline-block",
            backgroundColor: "var(--background-base-lower)",
            borderRadius: "10px",
            margin: "5px 0px",
        }}
    >
        {filteredProducts?.length ? <Components.Text style={{fontSize: "16px", fontWeight:"bold", margin: "10px 8px"}}>
            Quests
        </Components.Text> : null}
        {filteredProducts?.map(x => <AvatarDecoration
            product={x}
        />)}
    </div>
}

function AvatarDecorations() {
    const [query, setQuery] = useState("");
    const Collections = BetterDiscord.Hooks.useStateFromStores([ShopCollectiblesStore], () => ShopCollectiblesStore.getCategories());
    const questDecorations = BetterDiscord.Hooks.useStateFromStores([ShopCollectiblesStore], () => ShopCollectiblesStore.getQuestAvatarDecorations());

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
        <QuestCategory query={query} questDecorations={questDecorations}/>

    </div>
}