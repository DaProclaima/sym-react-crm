/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import Navbar from "./js/components/Navbar";
import HomePage from "./js/pages/Homepage";
import { HashRouter, Switch, Route, withRouter, Redirect } from 'react-router-dom';
import CustomersPage from "./js/pages/CustomersPage";
// import CustomersPageWithPagination from "./js/pages/CustomerPageWithPagination";
import InvoicesPage from "./js/pages/ InvoicesPage";
import LoginPage from "./js/pages/LoginPage";
import AuthAPI from "./js/services/authAPI";
import AuthContext from "./js/contexts/authContext";
import PrivateRoute from "./js/components/PrivateRoute";


// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

AuthAPI.setup();

// rs shortcut
const App = () => {
    const [ isAuthenticated, setIsAuthenticated ] = useState(AuthAPI.isAuthenticated())
    // console.log(isAuthenticated)

    const NavbarWithRouter = withRouter(Navbar);


    return(
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated
        }}>
            <HashRouter>
                <NavbarWithRouter />
                <main className="container pt-5">
                    <Switch>
                        {/* mind to put the most detailed route the highest in list */}
                        <Route path={"/login"} component={LoginPage} />
                        <PrivateRoute path={"/customers"} component={CustomersPage} />
                        {/*<Route path={"/customers"} render={(props) => {*/}
                        {/*    return isAuthenticated && <CustomersPage {...props} /> || <Redirect to={"/login"} />*/}
                        {/*}}/> */}
                        <PrivateRoute path={"/invoices"} component={InvoicesPage} />
                        <Route path={"/"} component={HomePage}/>
                    </Switch>
                </main>
            </HashRouter>
        </AuthContext.Provider>
    )
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);
