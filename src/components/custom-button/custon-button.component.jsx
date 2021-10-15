import React from "react";

import './custon-button.styles.scss';

const CustonButton = ({ children, ...otherProps })=>(
    <button className='custom-button' { ...otherProps }>
        {children}
    </button>
)

export default CustonButton;