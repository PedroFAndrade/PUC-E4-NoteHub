import style from './text.module.css';
import Delete from '../../img/delete.svg';
import Edit from '../../img/edit.svg';
import Save from '../../img/save.svg';
import Adicionar from '../../img/plus.svg';

const Text = (props) => {
    // Verifica se nenhuma nota está selecionada
    if (!props.textNote && !props.titleNote) {
        return null; // Não renderiza nada
    }

    return (
        <div className={style.container}>
            <div className={style.containerTextArea}>
                {props.typeNote === 'text' ? (
                    <textarea
                        spellCheck={true}
                        id="noteInput"
                        placeholder="Digite sua nota aqui..."
                        value={props.textNote}
                        onChange={(e) => props.setTextNote(e.target.value)}
                        disabled={props.textNote === null}
                    ></textarea>
                ) : props.textNote ? (
                    <div className={style.containerList}>
                        <span>
                            <input
                                type="text"
                                value={props.inputValue}
                                onChange={(e) => props.setInputValue(e.target.value)}
                                placeholder="Adicionar novo item"
                            />
                            <img onClick={() => props.addItem()} src={Adicionar} alt="" />
                        </span>

                        <ul className={style.list}>
                            {Array.isArray(props.textNote) && props.textNote.length > 0
                                ? props.textNote.map((item, index) => (
                                      <li
                                          key={index}
                                          style={{
                                              display: 'flex',
                                              alignItems: 'center',
                                              marginBottom: '10px',
                                          }}
                                      >
                                          <input
                                              type="checkbox"
                                              className={style.checkBox}
                                              checked={item.status}
                                              onChange={(e) => {
                                                  props.editItem(
                                                      index,
                                                      item.name,
                                                      e.target.checked,
                                                      item.edit
                                                  );
                                                  props.setUpdateCheck(e.target.checked);
                                              }}
                                          />
                                          <input
                                              type="text"
                                              defaultValue={item.name}
                                              onBlur={(e) => props.setUpdateValue(e.target.value)}
                                              disabled={!item.edit}
                                          />
                                          {item.edit ? (
                                              <img
                                                  onClick={() =>
                                                      props.editItem(
                                                          index,
                                                          props.updateValue,
                                                          props.updateCheck,
                                                          false
                                                      )
                                                  }
                                                  src={Save}
                                                  alt=""
                                              />
                                          ) : (
                                              <img
                                                  onClick={() =>
                                                      props.editItem(
                                                          index,
                                                          props.updateValue,
                                                          props.updateCheck,
                                                          true
                                                      )
                                                  }
                                                  src={Edit}
                                                  alt=""
                                              />
                                          )}
                                          <img
                                              onClick={() => props.deleteItem(item.name)}
                                              src={Delete}
                                              alt=""
                                          />
                                      </li>
                                  ))
                                : ''}
                        </ul>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default Text;
