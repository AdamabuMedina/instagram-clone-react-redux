import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loader = () => (
    <div className="text-center my-3 text-muted">
        <FontAwesomeIcon icon={faSpinner} className="mr-2" size="2x" spin/>
        Загрузка
    </div>
)

export default Loader