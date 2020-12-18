import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LoaderSpinner = () => (
    <div className="text-center my-3 text-muted">
        <FontAwesomeIcon className="mr-2" icon={faSpinner} size="2x" spin />
        Загрузка...
    </div>
);

export default LoaderSpinner;