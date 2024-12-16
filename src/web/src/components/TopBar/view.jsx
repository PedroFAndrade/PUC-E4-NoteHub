import styles from './topBar.module.css'
import noteHubLogo from '../../img/noteHub.png'
import saveIcon from '../../img/save.svg'

const viewTopBar = (props) => {
    return (
        <div className={styles.body}>
            <img className={styles.logo} src={noteHubLogo} alt="" />
            <span>
                <img className={styles.save} style={props.textNote && props.typeNote === 'text' ? {display: 'block'} : {display: 'none'}} onClick={() => props.editNotes(true)} src={saveIcon} alt="" />
                {/*<img className={styles.person} src={personAcc} alt="" />*/}
            </span>
            
        </div>
    )
}

export default viewTopBar