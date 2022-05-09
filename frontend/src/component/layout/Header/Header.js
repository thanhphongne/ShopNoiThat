import React, { Fragment } from 'react';
import vi from '../../../images/vi.png';
import './Header.css';
import { AiOutlinePhone } from 'react-icons/ai';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { VscAccount } from 'react-icons/vsc';
import Search from '../../Product/Search';
import { useHistory } from 'react-router-dom';

const Header = () => {
    const history = useHistory();
    return (
        <Fragment>
            <div className="navbar">
                <div className="top-bar">
                    <div className="left-top-bar">
                        <div className="lang">
                            <img src={vi} alt="vietnamese" />
                            <span>VN</span>
                        </div>
                        <div className="phone">
                            <b>
                                <AiOutlinePhone />
                                <span> +8437 765 8161</span>
                            </b>
                        </div>
                        <div className="link">
                            <a href="/about">Giới thiệu</a>
                            <a href="/contact">Liên hệ</a>
                            <a href="" className="red">
                                Khuyến mãi đặc biệt
                            </a>
                        </div>
                    </div>
                    <div className="right-top-bar">
                        <a href="/cart">
                            Giỏ hàng <AiOutlineShoppingCart />
                        </a>
                        <a href="/login">
                            <VscAccount />
                        </a>
                    </div>
                </div>
                <div className="bot-bar">
                    <div className="link-1">
                        <b>Nội Thất Cần Thơ</b>
                        <a href="/">Trang chủ</a>
                        <a href="/products">Sản phẩm</a>
                        <a href="/blogs">Bài viết</a>
                    </div>
                    <div className="search-box">
                        <Search history={history} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Header;
