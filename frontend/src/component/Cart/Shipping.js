import React, { Fragment, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../layout/MetaData";
import HomeIcon from "@material-ui/icons/Home";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import CheckoutSteps from './CheckoutSteps'

const Shipping = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { shippingInfo } = useSelector((state) => state.cart);
    const [address, setAddress] = useState(shippingInfo.address);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNo.length < 10 ) {
        alert.error("Số điện thoại không đúng");
        return;
        }
        dispatch(
        saveShippingInfo({ address, state, country, phoneNo })
        );
        history.push("/order/confirm");
    };

    return (
        <Fragment>
        <MetaData title="Thông tin nhận hàng" />

        <CheckoutSteps activeStep={0} />

        <div className="shippingContainer">
            <div className="shippingBox">
            <h2 className="shippingHeading">Thông tin nhận hàng</h2>

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
                    onChange={(e) => setPhoneNo(e.target.value)}
                    size="10"
                />
                </div>

                <div>
                <PublicIcon />

                <select
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                >
                    <option value="">Quốc gia</option>
                    {Country &&
                    Country.getAllCountries().map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
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
                    onChange={(e) => setState(e.target.value)}
                    >
                    <option value="">Tỉnh</option>
                    {State &&
                        State.getStatesOfCountry(country).map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                        </option>
                        ))}
                    </select>
                </div>
                )}
                

                <div>
                <HomeIcon />
                <input
                    type="text"
                    placeholder="Địa chỉ"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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