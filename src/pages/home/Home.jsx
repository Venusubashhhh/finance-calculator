import React,{useEffect, useState} from "react";
import NavBar from "../../components/UI/Navbar/Navbar";
import { useNavigate  } from "react-router-dom";
import "./Home.scss";
import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material";
import Mascot from "../../components/UI/Mascot/Mascot";
import { rulesDescription, requirementFields } from "../../constants/constants";
import { useMascot } from "../../context/MascotContext";
import { useCalculationContext } from "../../context/CalculationContext";
import { useChartContext } from "../../context/ChartContext";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useAuth } from "../../context/AuthContext";

function Home() {


  const { mascotMessage, setMascotMessage } = useMascot();
  const {
 
    calculation,
    setCalculation
  } = useCalculationContext();
  const navigate = useNavigate();
  const{setSelectedDate}=useAuth();

  const {setStatistics}=useChartContext();
  const [dateState, setDateState] = useState(new Date());
 
  const changeDate = (e) => {
    setDateState(e)
    dateFormatChange(e);
  }






  const dateFormatChange = (e) =>{
    const dateObject = new Date(e);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = (dateObject.getDate()).toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setSelectedDate(formattedDate)

    navigate('/history')
    
  }



  return (
    <div>
      <NavBar />
      <div className="card-wrapper" style={{ marginTop: "80px" }}>
        <div className="parentFlex">
          {/* First row */}
          <div
            className="card orange"
            onMouseOver={() =>
              setMascotMessage(rulesDescription["50-30-20Rule"])
            }
            onClick={() => {
              // setInvestmentBool(false);
              // setIntrestBool(false);
              // setSalaryBool(true);
              // setUsageBool(false);
              // setEmiBool(false);
              setCalculation(prev => {

                const newState= {
                ...prev,
                value:{
                  ...prev.value,
                  shouldRender:false,
                },
                salary: {
                  ...prev.salary,
                  shouldRender: true,
                },
                emi:{
                  ...prev.emi,
                  shouldRender:false,
                },
                interest:{
                  ...prev.interest,
                  shouldRender:false,
                },
                usage:{
                  ...prev.usage,
                  shouldRender:false,
                },
               

              };
              localStorage.setItem('calculation',JSON.stringify(newState));
              return newState;

              })

              setStatistics(prev=>{
                const newStatestat = {
                  ...prev,
                  pie:{
                    ...prev.pie,
                    shouldRender:true,
                  },
                  graph:{
                    ...prev.graph,
                    shouldRender:false,
                  },
                  thumb:{
                    shouldRender:false,
                  },
                  warning:{
                    shouldRender:false
                  }
                 
                };
                localStorage.setItem("statistics",JSON.stringify(newStatestat));
                return newStatestat;
                
              })

              
              
              navigate("/calculation/1");
            }}
          >
            <div className="rule-text">#1</div>
            <div className="icon">
              <Tooltip
                title={requirementFields["50-30-20Rule"]}
                placement="top"
                arrow
              >
                <InfoIcon />
              </Tooltip>
            </div>

            <p className="card-text">Rule of 50-30-20</p>
          </div>
          <div
            className="card purple"
            onMouseOver={() =>
              setMascotMessage(rulesDescription["3XEmergencyRule"])
            }
            onClick={() => {
              // setInvestmentBool(true);
              // setIntrestBool(false);
              // setSalaryBool(true);
              // setUsageBool(false);
              // setEmiBool(false);
              setCalculation(prev => {
                const newState ={
                ...prev,
                value:{
                  ...prev.value,
                  shouldRender:true,
                },
                salary: {
                  ...prev.salary,
                  shouldRender: true,
                },
                emi:{
                  ...prev.emi,
                  shouldRender:false,
                },
                interest:{
                  ...prev.interest,
                  shouldRender:false,
                },
                usage:{
                  ...prev.usage,
                  shouldRender:false,
                },
              };
              localStorage.setItem('calculation',JSON.stringify(newState));
              return newState;
              })
              setStatistics(prev=>{
                const newStatestat = {
                  ...prev,
                  pie:{
                    ...prev.pie,
                    shouldRender:false,
                  },
                  graph:{
                    ...prev.graph,
                    shouldRender:false,
                  },
                  thumb:{
                    shouldRender:true,
                  },
                  warning:{
                    shouldRender:false
                  }
                 
                };
                localStorage.setItem("statistics",JSON.stringify(newStatestat));
                return newStatestat;
                
              })
              navigate(`/calculation/2`);
            }}
          >
            <div className="rule-text">#2</div>
            <div className="icon">
              <Tooltip
                title={requirementFields["3XEmergencyRule"]}
                placement="top"
                arrow
              >
                <InfoIcon />
              </Tooltip>
            </div>

            <p className="card-text">Rule of 3x Emergency</p>
          </div>

          {/* Third row */}
          <div
            className="card cyan"
            onMouseOver={() => setMascotMessage(rulesDescription["40%EMIRule"])}
            onClick={() => {
              // setInvestmentBool(false);
              // setIntrestBool(false);
              // setSalaryBool(true);
              // setUsageBool(false);
              // setEmiBool(true);
              setCalculation(prev => {
                const newState ={
                ...prev,
                value:{
                  ...prev.value,
                  shouldRender:false,
                },
                salary: {
                  ...prev.salary,
                  shouldRender: true,
                },
                emi:{
                  ...prev.emi,
                  shouldRender:true,
                },
                interest:{
                  ...prev.interest,
                  shouldRender:false,
                },
                usage:{
                  ...prev.usage,
                  shouldRender:false,
                },
              };
              localStorage.setItem('calculation',JSON.stringify(newState));
              return newState;
              })
              setStatistics(prev=>{
                const newStatestat = {
                  ...prev,
                  pie:{
                    ...prev.pie,
                    shouldRender:false,
                  },
                  graph:{
                    ...prev.graph,
                    shouldRender:false,
                  },
                  thumb:{
                    shouldRender:true,
                  },
                  warning:{
                    shouldRender:false
                  },
                  emvalue:{
                    value:{}

                  }
                 
                };
                localStorage.setItem("statistics",JSON.stringify(newStatestat));
                return newStatestat;
                
              })
              navigate(`/calculation/3`);
            }}
          >
            <div className="rule-text">#3</div>
            <div className="icon">
              <Tooltip
                title={requirementFields["40%EMIRule"]}
                placement="top"
                arrow
              >
                <InfoIcon />
              </Tooltip>
            </div>

            <p className="card-text">Rule of 40% EMI</p>
          </div>
          <div
            className="card magenta"
            onMouseOver={() =>
              setMascotMessage(rulesDescription.LifeInsuranceRule)
            }
            onClick={() => {
              // setInvestmentBool(true);
              // setIntrestBool(false);
              // setSalaryBool(true);
              // setUsageBool(false);
              // setEmiBool(false);
              setCalculation(prev => {
                const newState ={
                ...prev,
                value:{
                  ...prev.value,
                  shouldRender:true,
                },
                salary: {
                  ...prev.salary,
                  shouldRender: true,
                },
                emi:{
                  ...prev.emi,
                  shouldRender:false,
                },
                interest:{
                  ...prev.interest,
                  shouldRender:false,
                },
                usage:{
                  ...prev.usage,
                  shouldRender:false,
                },
              };
              localStorage.setItem('calculation',JSON.stringify(newState));
              return newState;
              })
              setStatistics(prev=>{
                const newStatestat = {
                  ...prev,
                  pie:{
                    ...prev.pie,
                    shouldRender:false,
                  },
                  graph:{
                    ...prev.graph,
                    shouldRender:false,
                  },
                  thumb:{
                    shouldRender:true,
                  },
                  warning:{
                    shouldRender:false
                  },
                  emvalue:{
                    value:{}

                  }
                 
                };
                localStorage.setItem("statistics",JSON.stringify(newStatestat));
                return newStatestat;
                
              })
              navigate(`/calculation/4`);
            }}
          >
            <div className="rule-text">#4</div>
            <div className="icon">
              <Tooltip
                title={requirementFields.LifeInsuranceRule}
                placement="top"
                arrow
              >
                <InfoIcon />
              </Tooltip>
            </div>

            <p className="card-text">Rule of Life Insurance</p>
          </div>
          <div
            className="card pink"
            onMouseOver={() => setMascotMessage(rulesDescription["The4%Rule"])}
            onClick={() => {
              // setInvestmentBool(true);
              // setIntrestBool(false);
              // setSalaryBool(false);
              // setUsageBool(false);
              // setEmiBool(false);
              setCalculation(prev => {
                const newState ={
                ...prev,
                value:{
                  ...prev.value,
                  shouldRender:true,
                },
                salary: {
                  ...prev.salary,
                  shouldRender: false,
                },
                emi:{
                  ...prev.emi,
                  shouldRender:false,
                },
                interest:{
                  ...prev.interest,
                  shouldRender:false,
                },
                usage:{
                  ...prev.usage,
                  shouldRender:false,
                },
              };
              localStorage.setItem('calculation',JSON.stringify(newState));
              return newState;
              })
              setStatistics(prev=>{
                const newStatestat = {
                  ...prev,
                  pie:{
                    ...prev.pie,
                    shouldRender:false,
                  },
                  graph:{
                    ...prev.graph,
                    shouldRender:true,
                  },
                  thumb:{
                    shouldRender:false,
                  },
                  warning:{
                    shouldRender:false
                  }
                 
                };
                localStorage.setItem("statistics",JSON.stringify(newStatestat));
                return newStatestat;
                
              })
              navigate("/calculation/5");
            }}
          >
            <div className="rule-text">#5</div>
            <div className="icon">
              <Tooltip
                title={requirementFields["The4%Rule"]}
                placement="top"
                arrow
              >
                <InfoIcon />
              </Tooltip>
            </div>

            <p className="card-text">Rule of 4%</p>
          </div>

          <div
            className="card red"
            onMouseOver={() => setMascotMessage(rulesDescription.Ruleof72)}
            onClick={() => {
              // setInvestmentBool(true);
              // setIntrestBool(true);
              // setSalaryBool(false);
              // setUsageBool(false);
              // setEmiBool(false);
              setCalculation(prev => {
                const newState ={
                ...prev,
                value:{
                  ...prev.value,
                  shouldRender:true,
                },
                salary: {
                  ...prev.salary,
                  shouldRender: false,
                },
                emi:{
                  ...prev.emi,
                  shouldRender:false,
                },
                interest:{
                  ...prev.interest,
                  shouldRender:true,
                },
                usage:{
                  ...prev.usage,
                  shouldRender:false,
                },
              };
              localStorage.setItem('calculation',JSON.stringify(newState));
              return newState;
              })
              setStatistics(prev=>{
                const newStatestat = {
                  ...prev,
                  pie:{
                    ...prev.pie,
                    shouldRender:false,
                  },
                  graph:{
                    ...prev.graph,
                    shouldRender:true,
                  },
                  thumb:{
                    shouldRender:false,
                  },
                  warning:{
                    shouldRender:false
                  }
                 
                };
                localStorage.setItem("statistics",JSON.stringify(newStatestat));
                return newStatestat;
                
              })
              navigate("/calculation/6");
            }}
          >
            <div className="rule-text">#6</div>
            <div className="icon">
              <Tooltip title={requirementFields.Ruleof72} placement="top" arrow>
                <InfoIcon />
              </Tooltip>
            </div>
            <p className="card-text">Rule of 72</p>
          </div>
          <div
            className="card blue"
            onMouseOver={() => setMascotMessage(rulesDescription.Ruleof114)}
            onClick={() => {
              // setInvestmentBool(true);
              // setIntrestBool(true);
              // setSalaryBool(false);
              // setUsageBool(false);
              // setEmiBool(false);
              setCalculation(prev => {
                const newState ={
                ...prev,
                value:{
                  ...prev.value,
                  shouldRender:true,
                },
                salary: {
                  ...prev.salary,
                  shouldRender: false,
                },
                emi:{
                  ...prev.emi,
                  shouldRender:false,
                },
                interest:{
                  ...prev.interest,
                  shouldRender:true,
                },
                usage:{
                  ...prev.usage,
                  shouldRender:false,
                },
              };
              localStorage.setItem('calculation',JSON.stringify(newState));
              return newState;
              })
              setStatistics(prev=>{
                const newStatestat = {
                  ...prev,
                  pie:{
                    ...prev.pie,
                    shouldRender:false,
                  },
                  graph:{
                    ...prev.graph,
                    shouldRender:true,
                  },
                  thumb:{
                    shouldRender:false,
                  },
                  warning:{
                    shouldRender:false
                  }
                 
                };
                localStorage.setItem("statistics",JSON.stringify(newStatestat));
                return newStatestat;
                
              })
              navigate("/calculation/7");
            }}
          >
            <div className="rule-text">#7</div>
            <div className="icon">
              <Tooltip
                title={requirementFields.Ruleof114}
                placement="top"
                arrow
              >
                <InfoIcon />
              </Tooltip>
            </div>
            <p className="card-text">Rule of 114</p>
          </div>
          <div
            className="card green"
            onMouseOver={() => setMascotMessage(rulesDescription.Ruleof144)}
            onClick={() => {
              // setInvestmentBool(true);
              // setIntrestBool(true);
              // setSalaryBool(false);
              // setUsageBool(false);
              // setEmiBool(false);
              setCalculation(prev => {
                const newState ={
                ...prev,
                value:{
                  ...prev.value,
                  shouldRender:true,
                },
                salary: {
                  ...prev.salary,
                  shouldRender: false,
                },
                emi:{
                  ...prev.emi,
                  shouldRender:false,
                },
                interest:{
                  ...prev.interest,
                  shouldRender:true,
                },
                usage:{
                  ...prev.usage,
                  shouldRender:false,
                },
              };
              localStorage.setItem('calculation',JSON.stringify(newState));
              return newState;
              })
              setStatistics(prev=>{
                const newStatestat = {
                  ...prev,
                  pie:{
                    ...prev.pie,
                    shouldRender:false,
                  },
                  graph:{
                    ...prev.graph,
                    shouldRender:true,
                  },
                  thumb:{
                    shouldRender:false,
                  },
                  warning:{
                    shouldRender:false
                  }
                 
                };
                localStorage.setItem("statistics",JSON.stringify(newStatestat));
                return newStatestat;
                
              })
              navigate("/calculation/8");
            }}
          >
            <div className="rule-text">#8</div>
            <div className="icon">
              <Tooltip
                title={requirementFields["50-30-20Rule"]}
                placement="top"
                arrow
              >
                <InfoIcon />
              </Tooltip>
            </div>
            <p className="card-text">Rule of 144</p>
          </div>

          {/* Second row */}
          <div
            className="card yellow"
            onMouseOver={() => setMascotMessage(rulesDescription.Ruleof70)}
            onClick={() => {
              // setInvestmentBool(true);
              // setIntrestBool(true);
              // setSalaryBool(false);
              // setUsageBool(false);
              // setEmiBool(false);
              setCalculation(prev => {
                const newState ={
                ...prev,
                value:{
                  ...prev.value,
                  shouldRender:true,
                },
                salary: {
                  ...prev.salary,
                  shouldRender: false,
                },
                emi:{
                  ...prev.emi,
                  shouldRender:false,
                },
                interest:{
                  ...prev.interest,
                  shouldRender:true,
                },
                usage:{
                  ...prev.usage,
                  shouldRender:false,
                },
              };
              localStorage.setItem('calculation',JSON.stringify(newState));
              return newState;
              })
              setStatistics(prev=>{
                const newStatestat = {
                  ...prev,
                  pie:{
                    ...prev.pie,
                    shouldRender:false,
                  },
                  graph:{
                    ...prev.graph,
                    shouldRender:true,
                  },
                  thumb:{
                    shouldRender:false,
                  },
                  warning:{
                    shouldRender:false
                  }
                 
                };
                localStorage.setItem("statistics",JSON.stringify(newStatestat));
                return newStatestat;
                
              })
              navigate("/calculation/9");
            }}
          >
            <div className="rule-text">#9</div>
            <div className="icon">
              <Tooltip title={requirementFields.Ruleof70} placement="top" arrow>
                <InfoIcon />
              </Tooltip>
            </div>
            <p className="card-text">Rule of 70</p>
          </div>

          {/* Fourth row */}
          <div
            className="single"
            onMouseOver={() => setMascotMessage(rulesDescription.Ruleof10)}
            onClick={() => {
              // setInvestmentBool(true);
              // setIntrestBool(false);
              // setSalaryBool(false);
              // setUsageBool(true);
              // setEmiBool(false);
              setCalculation(prev => {
                const newState ={
                ...prev,
                value:{
                  ...prev.value,
                  shouldRender:true,
                },
                salary: {
                  ...prev.salary,
                  shouldRender: false,
                },
                emi:{
                  ...prev.emi,
                  shouldRender:false,
                },
                interest:{
                  ...prev.interest,
                  shouldRender:false,
                },
                usage:{
                  ...prev.usage,
                  shouldRender:true,
                },
              };
              localStorage.setItem('calculation',JSON.stringify(newState));
              return newState;
              })
              setStatistics(prev=>{
                const newStatestat = {
                  ...prev,
                  pie:{
                    ...prev.pie,
                    shouldRender:false,
                  },
                  graph:{
                    ...prev.graph,
                    shouldRender:false,
                  },
                  thumb:{
                    shouldRender:true,
                  },
                  warning:{
                    shouldRender:false
                  },
                  emvalue:{
                    value:{}

                  }
                 
                };
                localStorage.setItem("statistics",JSON.stringify(newStatestat));
                return newStatestat;
                
              })
              navigate(`/calculation/10`);
            }}
          >
            <div className="card-content-wrapper">
              <div className="rule-text">#10</div>
              <div className="icon">
                <Tooltip
                  title={requirementFields.Ruleof10}
                  placement="top"
                  arrow
                >
                  <InfoIcon />
                </Tooltip>
              </div>
              <p className="card-text">Rule of 10</p>
            </div>
          </div>
        </div>
        <div className="history">
          <p className="history-header">History calendar</p>
          {/* <div className="history-list">
            <div className="history-operation-text">
              hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
            </div>
            <span>1.00pm</span>
          </div>
          <div className="history-list">hii</div>
          <div className="history-list">hii</div>
          <div className="history-list">hii</div>
          <div className="history-list">hii</div> */}
          <Calendar
           style={{ outline: 'none' }}
           value={dateState}
           onChange={changeDate}
          />
        </div>
        <Mascot />
      </div>
    </div>
  );
}

export default Home;
