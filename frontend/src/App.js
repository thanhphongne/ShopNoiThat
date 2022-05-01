import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './component/layout/Header/Header';
import WebFont from 'webfontloader';
import React, { useState, useEffect } from 'react';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions';
import { useSelector } from 'react-redux';
import Profile from './component/User/Proflie';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import Payment from './component/Cart/Payment';
import Success from './component/Cart/Success';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import MyOrders from './component/Order/MyOrders'
import OrderDetails from './component/Order/OrderDetails'
import Dashboard from './component/Admin/Dashboard'
import LoginAdmin from './component/Admin/LoginAdmin'
import ProductList from './component/Admin/ProductList'
import NewProduct from './component/Admin/NewProduct';
import CreateUser from './component/Admin/CreateUser';
import UpdateProduct from './component/Admin/UpdateProduct';
import OrderList from './component/Admin/OrderList';
import ProcessOrder from './component/Admin/ProcessOrder';
import UsersList from './component/Admin/UsersList';
import UpdateUser from './component/Admin/UpdateUser';
import ProductReviews from './component/Admin/ProductReviews';
import NewBill from './component/Admin/NewBill';
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import NotFound from "./component/layout/NotFound/NotFound";
import LoginShipper from './component/Shipper/LoginShipper'
import MyShipOrder from './component/Shipper/MyShipOrder'
import ProcessShipOrder from './component/Shipper/ProcessShipOrder'
import BillList from './component/Admin/BillList'
import UpdateBill from './component/Admin/UpdateBill';

function App() {
    const { isAuthenticated, user } = useSelector((state) => state.user);

    const [stripeApiKey, setStripeApiKey] = useState("");

    async function getStripeApiKey() {
        const { data } = await axios.get("/api/v1/stripeapikey");

        setStripeApiKey(data.stripeApiKey);
    }

    useEffect(() => {
        WebFont.load({
        google: {
            families: ["Roboto", "Droid Sans", "Chilanka"],
        },
        });

        store.dispatch(loadUser());

        getStripeApiKey();
    }, []);

    window.addEventListener("contextmenu", (e) => e.preventDefault());

    return (
        <Router>
        {(!user || user.role==='Khách hàng') && <Header />}

        {isAuthenticated && <UserOptions user={user} />}

        {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path="/process/payment" component={Payment} />
            </Elements>
        )}

        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/product/:id" component={ProductDetails} />
            <Route exact path="/products" component={Products} />
            <Route path="/products/:keyword" component={Products} />

            <Route exact path="/search" component={Search} />

            <Route exact path="/contact" component={Contact} />

            <Route exact path="/about" component={About} />

            <ProtectedRoute exact path="/account" component={Profile} />

            <ProtectedRoute exact path="/me/update" component={UpdateProfile} />

            <ProtectedRoute
            exact
            path="/password/update"
            component={UpdatePassword}
            />

            <Route exact path="/password/forgot" component={ForgotPassword} />

            <Route exact path="/password/reset/:token" component={ResetPassword} />

            <Route exact path="/login" component={LoginSignUp} />
            <Route exact path="/admin" component={LoginAdmin} />
            <Route exact path="/shipper" component={LoginShipper} />
            <ProtectedRoute exact path="/shipper/myorders" component={MyShipOrder} />
            <ProtectedRoute
            exact
            path="/shipper/order/:id"
            component={ProcessShipOrder}
            />

            <Route exact path="/cart" component={Cart} />

            <ProtectedRoute exact path="/shipping" component={Shipping} />

            <ProtectedRoute exact path="/success" component={Success} />

            <ProtectedRoute exact path="/orders" component={MyOrders} />

            <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />

            <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

            <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/dashboard"
            component={Dashboard}
            />
            <ProtectedRoute
            exact
            path="/admin/products"
            isAdmin={true}
            component={ProductList}
            />
            <ProtectedRoute
            exact
            path="/admin/product"
            isAdmin={true}
            component={NewProduct}
            />
            <ProtectedRoute
            exact
            path="/admin/user"
            isAdmin={true}
            component={CreateUser}
            />

            <ProtectedRoute
            exact
            path="/admin/bill"
            isAdmin={true}
            component={NewBill}
            />
            <ProtectedRoute
            exact
            path="/admin/bill/:id"
            isAdmin={true}
            component={UpdateBill}
            />
            <ProtectedRoute
            exact
            path="/admin/bills"
            isAdmin={true}
            component={BillList}
            />

            <ProtectedRoute
            exact
            path="/admin/product/:id"
            isAdmin={true}
            component={UpdateProduct}
            />
            <ProtectedRoute
            exact
            path="/admin/orders"
            isAdmin={true}
            component={OrderList}
            />

            <ProtectedRoute
            exact
            path="/admin/order/:id"
            isAdmin={true}
            component={ProcessOrder}
            />
            <ProtectedRoute
            exact
            path="/admin/users"
            isAdmin={true}
            component={UsersList}
            />

            <ProtectedRoute
            exact
            path="/admin/user/:id"
            isAdmin={true}
            component={UpdateUser}
            />

            <ProtectedRoute
            exact
            path="/admin/reviews"
            isAdmin={true}
            component={ProductReviews}
            />

            <Route
            component={
                window.location.pathname === "/process/payment" ? null : NotFound
            }
            />
        </Switch>

        <Footer />
        </Router>
    );
}

export default App;
