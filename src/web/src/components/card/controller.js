import UseModelCard from "./model";
import ViewCard from "./view";

const controllerCard = (text, onClick, isSelected) => {

    const modelCard = UseModelCard(text, onClick, isSelected)

    return (
        <ViewCard 
        {...modelCard}
        />
    );
};

export default controllerCard;