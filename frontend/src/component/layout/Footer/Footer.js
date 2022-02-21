import React from 'react';
import playStore from '../../../images/playstore.png';
import appStore from '../../../images/Appstore.png';
import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="leftFooter">
                <h4>TẢI XUỐNG</h4>
                <p>Tải ứng dụng cho điện thoại của bạn</p>
                <img src={playStore} alt="CH Play" />
                <img src={appStore} alt="App Store" />
            </div>

            <div className="midFooter">
                <h1>Nội Thất Cần Thơ</h1>
                <p>Tốt gỗ lẫn tốt nước sơn</p>
            </div>

            <div className="rightFooter">
                <h4>Liên hệ</h4>
                <a href="https://www.instagram.com/tphong._/">Insagram</a>
                <a href="https://www.facebook.com/btphongc3tl/">Facebook</a>
                <a href="https://www.tiktok.com/@phonglop1a">Tiktok</a>
            </div>
        </footer>
    );
};

export default Footer;
