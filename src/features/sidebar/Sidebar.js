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
        // this.collapse();
    }

    render() {


    function collapse() {
        document.getElementsByClassName("sidebar-nav")[0].display = "none";
        document.getElementsByClassName("fa-chevron-circle-left")[0].display = "none";
    }

    function uncollapse() {
        document.getElementsByClassName("sidebar-nav")[0].display = "block";
        document.getElementsByClassName("fa-chevron-circle-left")[0].display = "block";
    }

        return (
            <React.Fragment>
              <div className="nav-container">
              <FontAwesomeIcon icon={faChevronCircleLeft} onClick="collapse()" />
              <FontAwesomeIcon icon={faChevronCircleRight} onClick="uncollapse()" />
                   {/* Sidebar icons and Links */}
                   <div className="sidebar-nav">
                    <ul className="sidebar-list">
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
