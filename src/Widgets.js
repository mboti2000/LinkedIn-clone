import React from 'react';
import './Widgets.css';

import InfoIcon from '@material-ui/icons/Info';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const Widgets = () =>{
    const newsArticle = (heading, subtitle) =>{
        return (
            <div className="widgets__article">

                <div className="widgets__articleLeft">
                    <FiberManualRecordIcon />
                </div>

                <div className="widgets__articleRight">
                    <h4>{heading}</h4>
                    <p>{subtitle}</p>
                </div>

            </div>
        );
    };

    return (
        <div className="widgets">
            <div className="widgets__header">
                <h2>LinkedIn News</h2>
                <InfoIcon />
            </div>

            {newsArticle('React is the most popular library' ,'Top news - 9005 readers')}
            {newsArticle('Coronavirus: UK updates' ,'Top news - 565 readers')}
            {newsArticle('Tesla hits new highs' ,'Cars & auto - 2415 readers')}
            {newsArticle('bitcoin breaks $22k' ,'Crypto - 329 readers')}
            {newsArticle('Is Redux good?' ,'Code - 217 readers')}
            
        </div>
    );
};

export default Widgets;