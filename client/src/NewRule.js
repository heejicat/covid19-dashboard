import React from "react";
import axios from 'axios';

function NewRule(_, ref) {

    const getRule = async () => {
        await axios
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
    };
console.log(getRule());
    return (
        <section ref={ref}>
            {getRule()}
        </section>
    )
}

export default React.forwardRef(NewRule);