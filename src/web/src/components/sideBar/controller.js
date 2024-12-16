import UseModelSideBar from "./model";
import ViewSideBar from "./view";

const controllerSideBar = () => {
    const modelSideBar = UseModelSideBar()

    return (
        <ViewSideBar 
        {...modelSideBar}
        />
    );
};

export default controllerSideBar;
