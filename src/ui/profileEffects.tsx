import {GlobalModules} from "@global/*";
import {wpGetByKeys} from "../global/webpack";
import {BetterDiscord} from "@shared/*";
import ShopCollectiblesStore from "../global/stores/ShopCollectiblesStore.tsx";

const {Components, React} = BetterDiscord;

const ModalModule = wpGetByKeys(["Modal"]);

export default function OpenDisplayNameStyleModalButton(){
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

function ProfileEffect({}){

}

function ProfileEffects(){
    const Collections = BetterDiscord.Hooks.useStateFromStores([ShopCollectiblesStore], () => ShopCollectiblesStore.getCategories())
    console.log(Collections)

    return <div>

    </div>
}