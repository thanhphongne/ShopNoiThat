import React, { useState, Fragment } from 'react';
import MetaData from '../layout/MetaData';
import './Search.css';
import { FaMicrophoneSlash, FaMicrophone } from 'react-icons/fa';
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";

const Search = ({ history }) => {
    const [keyword, setKeyword] = useState('Nhập tên sản phẩm');
    const [isMicOn, setIsMicOn] = useState(false)
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/products/${keyword}`);
        } else {
            history.push('/products');
        }
    };
    const { transcript } = useSpeechRecognition();

    const microClickHandler = () => {
        SpeechRecognition.startListening({ language: 'vi-VI' });
        setIsMicOn(true)
    }
    const microOffClickHandler = () => {
        SpeechRecognition.stopListening();
        setKeyword(transcript);
        setIsMicOn(false)
    }

    return (
        <Fragment>
            <MetaData title="Tìm Kiếm Sản Phẩm -- Nội Thất Cần Thơ" />
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                {!isMicOn ? 
                <FaMicrophone className="micro" onClick={microClickHandler}/> : 
                <FaMicrophoneSlash className="micro" onClick={microOffClickHandler}/>
                }
                <input type="submit" value="Tìm" />
            </form>
        </Fragment>
    );
};

export default Search;
