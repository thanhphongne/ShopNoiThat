import React from 'react';
import { ReactNavbar } from 'overlay-navbar';
import logo from '../../../images/logo.png';

const options = {
    burgerColorHover: '#eb4034',
    logo,
    logoWidth: '20vmax',
    navColor1: 'white',
    logoHoverSize: '10px',
    logoHoverColor: '#eb4034',
    link1Text: 'Trang Chủ',
    link2Text: 'Sản Phẩm',
    link3Text: 'Liên Hệ',
    link4Text: 'Thông Tin',
    link1Url: '/',
    link2Url: '/products',
    link3Url: '/contact',
    link4Url: '/about',
    link1Size: '1.3vmax',
    link1Color: 'rgba(35, 35, 35,0.8)',
    nav1justifyContent: 'flex-start',
    nav2justifyContent: 'flex-end',
    nav3justifyContent: 'flex-start',
    nav4justifyContent: 'flex-start',
    link1ColorHover: '#eb4034',
    link1Margin: '2vmax',
    profileIconUrl: '/login',
    profileIconColor: 'rgba(35, 35, 35,0.8)',
    searchIconColor: 'rgba(35, 35, 35,0.8)',
    cartIconColor: 'rgba(35, 35, 35,0.8)',
    profileIconColorHover: '#eb4034',
    searchIconColorHover: '#eb4034',
    cartIconColorHover: '#eb4034',
    cartIconMargin: '1vmax',
};

const Header = () => {
    return <ReactNavbar {...options} />;
};

export default Header;
