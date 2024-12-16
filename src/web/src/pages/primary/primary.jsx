import TopBar from "../../components/TopBar/controller"
import SideBar from "../../components/sideBar/controller"
import Style from './primary.module.css'
import Text from '../../components/text/controller'
import UserMenu from '../../components/userMenu/view'
import NoteMenu from '../../components/noteMenu/view'

const primary = () => {

    return (
        <div className={Style.containerPrincipal}>
            <TopBar />
            <UserMenu />
            <div className={Style.container}>
                <SideBar />
                <NoteMenu />
                <Text />
            </div>
        </div>
    )
}

export default primary