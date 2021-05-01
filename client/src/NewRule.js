import React, { useRef, memo, useEffect } from "react";
import axios from 'axios';

export const NewRule = memo( (props) => {
    const divRef = useRef(null);

    useEffect(() => {
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

                    return newRegHTML;
                })
                .catch( err => err); 
        }

        this.divRef.current.innerHTML = rule();
        
    })
    
    return <div ref={divRef}></div>

});
