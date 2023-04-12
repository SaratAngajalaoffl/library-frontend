import ClipLoader from "react-spinners/ClipLoader";

import classes from "./LoadingComponent.module.css";

const LoadingComponent = ({ fill }) => {
    if (fill) {
        return (
            <div className={classes.fill_container}>
                <ClipLoader />
            </div>
        );
    }

    return <ClipLoader />;
};

export default LoadingComponent;
