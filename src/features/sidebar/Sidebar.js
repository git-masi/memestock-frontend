import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

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
                <i class="fas fa-chevron-circle-left" onClick="collapse()"></i>
                <i class="fas fa-chevron-circle-right" onClick="uncollapse()"></i>
                   {/* Sidebar icons and Links */}
                   <div className="sidebar-nav">
                    <ul className="sidebar-list">
                        <li>
                            <i className="fas fa-comments-dollar"></i>
                            <NavLink to="/feed">Feed</NavLink>
                        </li>
                        <li>
                            <i class="fas fa-chart-line"></i>
                            <NavLink to="/visualize">Visualize</NavLink>
                        </li>
                        <li>
                            <i class="fas fa-history"></i>
                            <NavLink to="/history">History</NavLink>
                        </li>
                        <li>
                            <i class="fas fa-plus-circle"></i>
                            <NavLink to="/new-order">New Order</NavLink>
                        </li>
                        <li>
                            <i class="fas fa-cog"></i>
                            <NavLink to="/settings" className="settings-navlink">Settings</NavLink>
                        </li>
                    </ul>
                </div>
            </div>

            </React.Fragment>


        )

    }

}
