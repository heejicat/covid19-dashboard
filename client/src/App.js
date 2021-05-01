import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import 'react-web-tabs/dist/react-web-tabs.css';

import NewRule from "./NewRule";

function App() {
  const node = React.createRef();

  const [newCase, setNewCase] = useState();
  const [todayDate, setTodayDate] = useState();
  const [html, setNewRule] = useState();

  const getDatas = () => {
    axios
      .get('/api/data')
      .then((data) => {
        
        // get new case for today
        const dateFormat = {year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(data.data[0].date).toLocaleDateString("en-US", dateFormat);
        const todayCase = data.data[0].new_cases;
        
        setNewCase(todayCase);
        setTodayDate(date);
      })
      .catch( err => console.log(err));
  }

  const getRules = () => {
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
      .catch( err => console.log(err));

  }

  useEffect(() => {
    getDatas();
    // getRules();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p id="staySafe">STAY SAFE</p>
        <p id="subTitle">Covid-19 Daily New Cases and Lastest Regulation for British Colombia</p>
      </header>
      <Tabs defaultTab="data" onChange={(tabId) => { console.log(tabId) }}>
        <TabList>
          <Tab tabFor="data">New Cases</Tab>
          <Tab tabFor="rule">Restriction</Tab>
        </TabList>
        <TabPanel tabId="data">
          <div className="cardOut">
            <div className="card">
              <h3>Last Update</h3>
              <hr />
              <p>{todayDate}</p> 
            </div>
            <div className="card left">
              <h3>Today's New Cases</h3>
              <hr />
              <p> {newCase}</p>
            </div>
          </div>
        </TabPanel>
        <TabPanel tabId="rule">
          <div dangerouslySetInnerHTML={{__html: getRules()}}></div>;
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default App;
