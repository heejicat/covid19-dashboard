import React, { useState, useEffect } from "react";
import axios from 'axios';

function NewRule() {

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

            return <div dangerouslySetInnerHTML={{ __html: newRegHTML}}></div>;
        })
        .catch( err => err); 

}

export default NewRule;