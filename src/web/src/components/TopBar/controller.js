import TopBarModel from './model'
import TopBarView from './view'

const textController = () => {
    const Model = TopBarModel()
    
    return(
        <TopBarView 
        {...Model}
        />
    )
};

export default textController;