import {GlobalModules} from "@global/*";
import {wpGetByKeys, wpGetProxy} from "../global/webpack";
import {BetterDiscord} from "@shared/*";
import ShopCollectiblesStore from "../global/stores/ShopCollectiblesStore.tsx";
import {useState, useMemo} from "react";
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

    return <Components.Button onClick={handleClick}>
        Change Avatar Decorations
    </Components.Button>
}

function copyProfileEffect3y3(skuId: string) {
    copyToClipboard(" " + secondsightifyEncodeOnly("/a" + skuId), "3y3 copied to clipboard!");
}

function AvatarDecoration({product}: { product: any }) {
    const [hovered, setHovered] = useState<boolean>(false)
    const skuId = product.sku_id;
    const decorationItem = {...product, skuId: product.sku_id};

    return <div
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => copyProfileEffect3y3(skuId)}
        title={product.productName}
        style={{cursor: 'pointer'}}
    >
        <ProductDisplayer
            isHighlighted={hovered}
            item={decorationItem}
            user={UserStore.getCurrentUser()}
            avatarSize={"SIZE_72"}
        />
    </div>
}

function InvalidProductDisplay({product}: { product: any }) {
    const [hovered, setHovered] = useState<boolean>(false)
    const skuId = product.sku_id;
    const decorationItem = {...product, skuId: product.sku_id};

    return <div
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => copyProfileEffect3y3(skuId)}
        title={product.name}
        style={{cursor: 'pointer'}}
    >
        <ProductDisplayer
            avatarSize={"SIZE_72"}
            isHighlighted={hovered}
            item={decorationItem}
            user={UserStore.getCurrentUser()}
        />
    </div>
}

function Category({skuId, query}: { skuId: string, query: string }) {
    const category = ShopCollectiblesStore.getCategory(skuId);
    const products = ShopCollectiblesStore.getAvatarDecorations(skuId);

    const filteredProducts = useMemo(() => {
        if (!products?.length) return [];
        if (!query.trim()) return products;

        return products.filter(product =>
            product?.productName?.toLowerCase?.()?.includes?.(query.toLowerCase())
        );
    }, [products, query]);

    if (!filteredProducts.length) return null;

    return <div style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--background-base-lower)",
        borderRadius: "10px",
        margin: "5px 0px",
        padding: "8px"
    }}>
        <Components.Text style={{
            fontSize: "16px",
            fontWeight: "bold",
            margin: "0 0 8px 0"
        }}>
            {category?.name}
        </Components.Text>
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))",
            gap: "8px"
        }}>
            {filteredProducts.map(x => <AvatarDecoration
                key={x.sku_id}
                product={x}
            />)}
        </div>
    </div>
}

function QuestCategory({questDecorations, query}: { questDecorations: any[], query: string }) {
    const filteredProducts = useMemo(() => {
        if (!questDecorations?.length) return [];
        if (!query.trim()) return questDecorations;

        return questDecorations.filter(product =>
            product?.messages?.name?.toLowerCase?.()?.includes?.(query.toLowerCase())
        );
    }, [questDecorations, query]);

    if (!filteredProducts.length) return null;

    return <div style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--background-base-lower)",
        borderRadius: "10px",
        margin: "5px 0px",
        padding: "8px"
    }}>
        <Components.Text style={{
            fontSize: "16px",
            fontWeight: "bold",
            margin: "0 0 8px 0"
        }}>
            Quests
        </Components.Text>
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))",
            gap: "8px"
        }}>
            {filteredProducts.map(x => <AvatarDecoration
                key={x.sku_id}
                product={x}
            />)}
        </div>
    </div>
}

function InvalidCategory({category, query}: { category: any, query: string }) {
    const filteredProducts = useMemo(() => {
        if (!category?.products?.length) return [];
        if (!query.trim()) return category.products;

        return category.products.filter((product: any) =>
            product?.name?.toLowerCase?.()?.includes?.(query.toLowerCase())
        );
    }, [category, query]);

    if (!filteredProducts.length) return null;

    return <div style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--background-base-lower)",
        borderRadius: "10px",
        margin: "5px 0px",
        padding: "8px"
    }}>
        <Components.Text style={{
            fontSize: "16px",
            fontWeight: "bold",
            margin: "0 0 8px 0"
        }}>
            {category?.name} (Offsale)
        </Components.Text>
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))",
            gap: "8px"
        }}>
            {filteredProducts.map((product: any) => (
                <InvalidProductDisplay key={product.sku_id} product={product} />
            ))}
        </div>
    </div>
}

function Invalid({query}: { query: string }) {
    const categories = BetterDiscord.Hooks.useStateFromStores(
        [ShopCollectiblesStore],
        () => ShopCollectiblesStore.getInvalids()
            .map(x => ShopCollectiblesStore.getInvalid(x))
            .filter(Boolean)
    );

    if (!categories?.length) return null;

    return <div>
        {categories.map(x => <InvalidCategory
            key={x.id}
            category={x}
            query={query}
        />)}
    </div>
}

function AvatarDecorations() {
    const [query, setQuery] = useState("");

    const Collections = BetterDiscord.Hooks.useStateFromStores(
        [ShopCollectiblesStore],
        () => ShopCollectiblesStore.getCategories()
    );

    const questDecorations = BetterDiscord.Hooks.useStateFromStores(
        [ShopCollectiblesStore],
        () => ShopCollectiblesStore.getQuestAvatarDecorations()
    );

    return <div>
        <Components.SearchInput
            value={query}
            placeholder={"Search decorations..."}
            onChange={(e) => setQuery(e.target.value)}
            style={{
                backgroundColor: "var(--control-secondary-background-default)"
            }}
        />
        {Collections?.map(id => (
            <Category key={id} skuId={id} query={query}/>
        ))}
        <QuestCategory query={query} questDecorations={questDecorations}/>
        <Invalid query={query} />
    </div>
}