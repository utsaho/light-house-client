import React from 'react';
import Navbar from '../Home/Navbar';
import Footer from '../Shared/Footer';

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <h2 className="text-4xl">This is your dashboard</h2>
            <div class="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content">

                </div>
                <div class="drawer-side">
                    <label for="dashboard-drawer" className="drawer-overlay"></label>
                    <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                        <li><a>Sidebar Item 1</a></li>
                        <li><a>Sidebar Item 2</a></li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;