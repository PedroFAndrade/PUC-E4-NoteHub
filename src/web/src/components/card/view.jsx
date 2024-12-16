import style from './card.module.css';
import Delete from '../../img/delete.svg'

const card = (props) => {

    return (
        <div 
        className={style.container} 
        onClick={props.onClick} 
        style={ {backgroundColor: props.isSelected ? '#FFA31A' : ''}} 
        onDoubleClick={() => props.setIsEditing(true)}
        >   
        {props.isEditing ?
            <input className={style.inputEditable}
            type="text"
            value={props.titleNote}
            onChange={props.handleChange}
            onBlur={() => {props.setIsEditing(false); props.editNotes(false, true)}}
            ref={props.inputRef}
            />
        :
            <input className={style.inputNotEditable}
            type="text"
            value={props.text}
            />
    }
            
            <img src={Delete} alt="" onClick={() => {props.deleteNotes(props.cardID)}} 
            />
        </div>
    )
}

export default card;