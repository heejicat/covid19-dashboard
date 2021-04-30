import React from "react";
import axios from 'axios';

function NewRule(_, ref) {
    axios
        .get('/api/rules')
        .then( (rule) => {
            // get new rule
            const newReg = rule.data[0].restriction;

            // const ruleTab = document.getElementById("rule");
            // const ruleDiv = document.createElement("div");
            // ruleTab.appendChild(ruleDiv);
            // ruleDiv.innerHTML = newReg;
            // setNewRule(newReg);

            const newRule = (
                <section ref={ref}>
                    {newReg}
                </section>
            )

            console.log(newReg);

            return newRule;
        })
        .catch( err => console.log(err)); 
}

export default React.forwardRef(NewRule);