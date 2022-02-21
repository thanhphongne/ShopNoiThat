import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './component/layout/Header/Header';
import WebFont from 'webfontloader';
import React from 'react';
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
import Shipping from './component/Cart/Shipping.js';
import ConfirmOrder from './component/Cart/ConfirmOrder.js';
import Payment from './component/Cart/Payment.js';

function App() {
    const { isAuthenticated, user } = useSelector((state) => state.user);

    React.useEffect(() => {
        WebFont.load({
            google: {
                families: ['Roboto', 'Droid Sans', 'Chilanka'],
            },
        });

        store.dispatch(loadUser());
    }, []);
    return (
        <Router>
            <Header />
            {isAuthenticated && <UserOptions user={user} />}
            <Switch>
                <Route extract path="/product/:id" component={ProductDetails} />
                <Route extract path="/products" component={Products} />
                <Route path="/products/:keyword" component={Products} />
                <Route extract path="/Search" component={Search} />
                <ProtectedRoute extract path="/account" component={Profile} />
                <ProtectedRoute
                    extract
                    path="/me/update"
                    component={UpdateProfile}
                />
                <ProtectedRoute extract path="/password/update" component={UpdatePassword} />
                <Route extract path="/password/forgot" component={ForgotPassword} />
                <Route extract path="/password/reset/:token" component={ResetPassword} />
                <Route extract path="/login" component={LoginSignUp} />
                <Route extract path="/cart" component={Cart} />
                <ProtectedRoute extract path="/shipping" component={Shipping} />
                <ProtectedRoute extract path="/order/confirm" component={ConfirmOrder} />
                <ProtectedRoute extract path="/process/payment" component={Payment} />
                <Route extract path="/" component={Home} />
            </Switch>
            <Footer />
        </Router>
    );
}

export default App;
