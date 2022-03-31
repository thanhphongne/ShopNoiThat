import React, { useState, Fragment } from 'react';
import MetaData from '../layout/MetaData';
import './Search.css';
import { FaMicrophoneSlash, FaMicrophone } from 'react-icons/fa';
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";

const Search = ({ history }) => {
    const [keyword, setKeyword] = useState('');
    console.log(keyword);
    const commands = [
        {
            command: ["*", "Tìm *", "Tìm kiếm *"],
            callback: (product) => setKeyword(product),
        },
    ];
    const { transcript, listening} = useSpeechRecognition({ commands });
    const searchSubmitHandler = (e) => {
        e && e.preventDefault();
        if (keyword.trim()) {
            history.push(`/products/${keyword}`);
        } else {
            history.push('/products');
        }
    };
    
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null;
    }
    const microClickHandler = () => {
        SpeechRecognition.startListening({ language: 'vi-VI' });
    }
    const microOffClickHandler = () => {
        SpeechRecognition.stopListening();
    }
    
    if( !listening && transcript && keyword && commands) {
        searchSubmitHandler();
    }

    return (
        <Fragment>
            <MetaData title="Tìm Kiếm Sản Phẩm -- Nội Thất Cần Thơ" />
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input
                    type="text"
                    placeholder="Nhập tên sản phẩm"
                    value={transcript ? transcript : keyword}
                    onChange={(e) => setKeyword(e.target.value) }
                />
                {!listening ? 
                <FaMicrophone className="micro" onClick={microClickHandler}/> : 
                <FaMicrophoneSlash className="micro" onClick={microOffClickHandler}/>
                }
                <input type="submit" value="Tìm" />
            </form>
        </Fragment>
    );
};

export default Search;
