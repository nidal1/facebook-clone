import React from 'react';
import InfoSharpIcon from '@material-ui/icons/InfoSharp';
import FibreManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import './widgets.css'

function Widgets() {

    const newArticale = (heading, subtitle) => {
        return <div className="widgets__articale">
            <div className="widgets__articaleLeft">
                <FibreManualRecordIcon />
            </div>
            <div className="widgets__articaleRight">
                <h4>{heading}</h4>
                <p>{subtitle}</p>
            </div>
        </div>
    }
    return (
        <div className="widgets">
            <div className="widgets__header">
                <h2>Linkedin News</h2>
                <InfoSharpIcon />
            </div>
{newArticale("PAPA React is back", "Top news - 9999")}
        </div>
    )
}

export default Widgets
