import React from 'react';
import PropTypes from 'prop-types';
import './BossUI.css';

function BossUI(props){
    let titles = props.boss.titles;
    if (props.boss.status === 'alive'){
        return (
            <div className="boss-ui-wrap">
                <div id="boss-name">{props.boss.name}</div>
                <div id="boss-titles">
                    <ul>
                        {titles.map(function(title) {
                            return (
                                <li>{title}<br /></li>
                            )
                        })};
                    </ul>
                </div>
                <span id="boss-hp"></span>
            </div>
        );
    } else {
        return null
    };
}

BossUI.propTypes = {
    boss: PropTypes.object
};

export default BossUI;