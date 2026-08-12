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

const categories = ShopCollectiblesStore.getCategories();

function ProfileEffect({}){

}

function ProfileEffects(){
    console.log(categories);

    return <div>

    </div>
}