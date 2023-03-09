import { Link } from "react-router-dom";


function Navigation({ buttons, countNewRequests, clickStatus }) {
    const leftButtons = buttons.map((button) => {

      if (button.value === "new") {
        return (
          <Link
            key={button.value}
            href="/#"
            className={
              button.value === localStorage.getItem("filter-status")
                ? "active"
                : ""
            }
            data-value={button.value}
            data-role="left-status"
            onClick={clickStatus}
          >
            {button.description}
  
            <div className="badge" id="badge-new">
              {countNewRequests}
            </div>
          </Link>
        );
      } else {
        return (
          <Link
            key={button.value}
            href="/#"
            data-value={button.value}
            data-role="left-status"
            onClick={clickStatus}
            className={
              button.value === localStorage.getItem("filter-status")
                ? "active"
                : ""
            }
          >
            {button.description}
          </Link>
        );
      }
    });
   
    return (
      <div className="left-panel__navigation">
        <div className="left-panel__navigation-title">Заявки</div>
        <ul id="leftStatus">
          <li>{leftButtons}</li>
        </ul>
      </div>
    );
  }
  
  export default Navigation;
