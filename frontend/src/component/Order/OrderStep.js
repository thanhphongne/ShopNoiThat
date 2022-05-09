import React, { Fragment } from 'react';
import { Typography, Stepper, StepLabel, Step } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import MoveToInboxOutlinedIcon from '@material-ui/icons/MoveToInbox';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import WatchOutlinedIcon from '@material-ui/icons/WatchOutlined';
// import RemoveCircleSharpIcon from "@material-ui/icons/RemoveCircleSharp";
import './OrderSteps.css';

const OrderStep = ({ activeStep }) => {
    const steps = [
        {
            label: <Typography>Chờ xác nhận</Typography>,
            icon: <WatchOutlinedIcon />,
        },
        {
            label: <Typography>Đang lấy hàng</Typography>,
            icon: <MoveToInboxOutlinedIcon />,
        },
        {
            label: <Typography>Đang giao hàng</Typography>,
            icon: <LocalShippingIcon />,
        },
        {
            label: <Typography>Đã nhận hàng</Typography>,
            icon: <DoneIcon />,
        },
    ];

    const stepStyles = {
        boxSizing: 'border-box',
    };

    return (
        <Fragment>
            <Stepper
                alternativeLabel
                activeStep={activeStep}
                style={stepStyles}
            >
                {steps.map((item, index) => (
                    <Step
                        key={index}
                        active={activeStep === index ? true : false}
                        completed={activeStep >= index ? true : false}
                    >
                        <StepLabel
                            style={{
                                color:
                                    activeStep >= index
                                        ? 'tomato'
                                        : 'rgba(0, 0, 0, 0.649)',
                            }}
                            icon={item.icon}
                        >
                            {item.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Fragment>
    );
};

export default OrderStep;
