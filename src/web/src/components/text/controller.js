import TextModel from './model'
import TextView from './view'

const textController = () => {
    const Model = TextModel()
    
    return(
        <TextView 
        {...Model}
        />
    )
};

export default textController;