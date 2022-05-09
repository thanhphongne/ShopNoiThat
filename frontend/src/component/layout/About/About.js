import React from 'react';
import './aboutSection.css';
import { Button, Typography, Avatar } from '@material-ui/core';
import YouTubeIcon from '@material-ui/icons/YouTube';
import InstagramIcon from '@material-ui/icons/Instagram';
const About = () => {
    const visitInstagram = () => {
        window.location = 'https://instagram.com/tphong._';
    };
    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">Thông tin của hàng</Typography>

                <div>
                    <div>
                        <Avatar
                            style={{
                                width: '10vmax',
                                height: '10vmax',
                                margin: '2vmax 0',
                            }}
                            src="logo.png"
                            alt="Founder"
                        />
                        <Typography>Nội Thất Cần Thơ</Typography>
                        <Button onClick={visitInstagram} color="primary">
                            Instagram
                        </Button>
                        <span>
                            Của hàng chuyên cung cấp những sản phẩm nội thất
                            chất lượng, thiết kế trẻ trung, hiện đại
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <Typography component="h2">YouTube</Typography>
                        <a href="https://www.youtube.com" target="blank">
                            <YouTubeIcon className="youtubeSvgIcon" />
                        </a>

                        <a href="https://instagram.com/tphong._" target="blank">
                            <InstagramIcon className="instagramSvgIcon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
