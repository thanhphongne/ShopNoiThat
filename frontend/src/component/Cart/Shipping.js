import React, { Fragment, useState } from 'react';
import './Shipping.css';
import { useSelector, useDispatch } from 'react-redux';
import { saveShippingInfo } from '../../actions/cartAction';
import MetaData from '../layout/MetaData';
import HomeIcon from '@material-ui/icons/Home';
import PublicIcon from '@material-ui/icons/Public';
import PhoneIcon from '@material-ui/icons/Phone';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import { Country, State } from 'country-state-city';
import { useAlert } from 'react-alert';
import CheckoutSteps from './CheckoutSteps';

const Shipping = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { user } = useSelector((state) => state.user);
    // console.log(user.shippingInfo)
    const [isNew, setIsNew] = useState(false);
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [phoneNo, setPhoneNo] = useState('');

    // console.log(isNew);
    const handleSetPhoneNo = (e) => {
        e.preventDefault();
        setIsNew(true);
        setPhoneNo(e.target.value);
    };

    const handleSetState = (e) => {
        e.preventDefault();
        setIsNew(true);
        setState(e.target.value);
    };
    const handleSetCountry = (e) => {
        e.preventDefault();
        setIsNew(true);
        setCountry(e.target.value);
    };
    const handleSetAddress = (e) => {
        e.preventDefault();
        setIsNew(true);
        setAddress(e.target.value);
    };

    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNo.length < 10) {
            alert.error('Số điện thoại không đúng');
            return;
        }
        dispatch(saveShippingInfo({ address, state, country, phoneNo, isNew }));
        history.push('/order/confirm');
    };

    const handleOldAdress = (value) => {
        const shipping = JSON.parse(value);
        setIsNew(false);
        setAddress(shipping.address);
        setState(shipping.state);
        setCountry(shipping.country);
        setPhoneNo(shipping.phoneNo);
        console.log(shipping);
    };

    return (
        <Fragment>
            <MetaData title="Thông tin nhận hàng" />

            <CheckoutSteps activeStep={0} />

            <div className="shippingContainer">
                <div className="shippingBox">
                    <h2 className="shippingHeading">Thông tin nhận hàng</h2>

                    <h3>Thông tin nhận hàng đã lưu:</h3>

                    {user.shippingInfo.length > 0 ? (
                        <select
                            className="oldAddress"
                            onChange={(e) => handleOldAdress(e.target.value)}
                        >
                            {user.shippingInfo.map((shipping) => (
                                <option
                                    key={shipping._id}
                                    value={JSON.stringify(shipping)}
                                >
                                    {shipping.phoneNo}, {shipping.address},{' '}
                                    {shipping.state}, {shipping.country}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p>Không có thông tin nhận hàng nào được lưu!</p>
                    )}
                    <form
                        className="shippingForm"
                        encType="multipart/form-data"
                        onSubmit={shippingSubmit}
                    >
                        <div>
                            <PhoneIcon />
                            <input
                                type="number"
                                placeholder="Số điện thoại"
                                required
                                value={phoneNo}
                                onChange={(e) => handleSetPhoneNo(e)}
                                size="10"
                            />
                        </div>

                        <div>
                            <PublicIcon />

                            <select
                                required
                                value={country}
                                onChange={(e) => handleSetCountry(e)}
                            >
                                <option value="">Quốc gia</option>
                                {Country &&
                                    Country.getAllCountries().map((item) => (
                                        <option
                                            key={item.isoCode}
                                            value={item.isoCode}
                                        >
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {country && (
                            <div>
                                <TransferWithinAStationIcon />

                                <select
                                    value={state}
                                    onChange={(e) => handleSetState(e)}
                                >
                                    <option value="">Tỉnh</option>
                                    {State &&
                                        State.getStatesOfCountry(country).map(
                                            (item) => (
                                                <option
                                                    key={item.isoCode}
                                                    value={item.isoCode}
                                                >
                                                    {item.name}
                                                </option>
                                            ),
                                        )}
                                </select>
                            </div>
                        )}

                        <div>
                            <HomeIcon />
                            <input
                                type="text"
                                placeholder="Chi tiết"
                                required
                                value={address}
                                onChange={(e) => handleSetAddress(e)}
                            />
                        </div>
                        <input
                            type="submit"
                            value="Tiếp"
                            className="shippingBtn"
                            disabled={state ? false : true}
                        />
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Shipping;
