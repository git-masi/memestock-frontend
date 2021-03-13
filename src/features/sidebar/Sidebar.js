import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentsDollar } from '@fortawesome/free-solid-svg-icons';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';


export default class Sidebar extends Component {

    componentDidMount() {
        collapse();
    }

    render() {

        return (
            <React.Fragment>
              <div className="nav-container">
              <FontAwesomeIcon icon={faChevronCircleLeft} onClick={collapse} className="collapse-sidebar" />
              <FontAwesomeIcon icon={faChevronCircleRight} onClick={uncollapse} className="uncollapse-sidebar" />
                   {/* Sidebar icons and Links */}
                   <div className="sidebar-nav">
                    <ul className="sidebar-list">
                        <li>
                            <NavLink to="/sign-up" className="sidebar-navlink sign-up">Sign Up</NavLink>
                        </li>
                        <li>
                            <NavLink to="/sign-in" className="sidebar-navlink sign-in">Sign In</NavLink>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faCommentsDollar} />
                            <NavLink to="/feed" className="sidebar-navlink">Feed</NavLink>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faChartLine} />
                            <NavLink to="/visualize" className="sidebar-navlink">Visualize</NavLink>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faHistory} />
                            <NavLink to="/history" className="sidebar-navlink">History</NavLink>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faPlusCircle} />
                            <NavLink to="/new-order" className="sidebar-navlink">New Order</NavLink>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faCog} />
                            <NavLink to="/settings" className="sidebar-navlink">Settings</NavLink>
                        </li>
                    </ul>
                </div>
            </div>

            </React.Fragment>


        )

    }

   

}

function collapse() {
document.getElementsByClassName("sidebar-nav")[0].style.display = "none";
document.getElementsByClassName("collapse-sidebar")[0].style.display = "none";
document.getElementsByClassName("uncollapse-sidebar")[0].style.display = "block";
}

function uncollapse() {
    document.getElementsByClassName("sidebar-nav")[0].style.display = "block";
    document.getElementsByClassName("uncollapse-sidebar")[0].style.display = "none";
    document.getElementsByClassName("collapse-sidebar")[0].style.display = "block";
}