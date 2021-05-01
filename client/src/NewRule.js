import React, { useRef, memo, useEffect } from "react";
import axios from 'axios';

export const NewRule = memo( (props) => {
    const divRef = useRef(null);

    function rule() {

            axios
                .get('/api/rules')
                .then( (rule) => {
                    // get new rule
                    const newRegHTML = rule.data[0].restriction;

                    // const ruleTab = document.getElementById("rule");
                    // const ruleDiv = document.createElement("div");
                    // ruleTab.appendChild(ruleDiv);
                    // ruleDiv.innerHTML = newReg;
                    // setNewRule(newReg);

                    return {__html: newRegHTML};
                })
                .catch( err => err); 
        }

    
    return <div dangerouslySetInnerHTML={rule()}></div>;

});
