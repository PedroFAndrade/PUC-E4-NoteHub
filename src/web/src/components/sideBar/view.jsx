import style from './sideBar.module.css';
import Card from '../card/controller';

const viewSideBar = (props) => {
    return (
        <div className={style.body}>
            <div className={style.header}>
                <h3>Suas anotações</h3>
                {/* <img src={plus} alt="Adicionar nova anotação" /> */}
            </div>
            <input 
                type="text" 
                placeholder="Pesquisar nota..." 
                className={style.searchInput}
                value={props.searchTerm} // Define o valor do input
                onChange={props.handleSearchChange} // Atualiza o estado ao digitar
            />
            <div className={style.container}>
                {props.filteredNotes && props.filteredNotes.map(note => (
                    <Card 
                    key={note._id}
                    text={note.title}
                    onClick={() => {
                        props.setTextNote(note.body);
                        props.setNoteID(note._id);
                        props.setSelectedNote(note._id);
                        props.setTypeNote(note.type)
                        props.setTitleNote(note.title) 
                    }}
                    isSelected={props.selectedNote === note._id}
                    />
                ))}
            </div>
        </div>
    );
};

export default viewSideBar;
