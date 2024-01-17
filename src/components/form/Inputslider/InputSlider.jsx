import React, { useEffect } from "react";
import "./InputSlider.scss";
import { Button, Slider, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useMascot } from "../../../context/MascotContext";
import InsightsIcon from "@mui/icons-material/Insights";
import { useCalculationContext } from "../../../context/CalculationContext";

import { useParams } from "react-router-dom";
import CalculationService from "../../../services/api/CalculationServices";
import { useChartContext } from "../../../context/ChartContext";

const InputSlider = () => {
  const { mascotMessage, setMascotMessage } = useMascot();
  const { calculation, setCalculation } = useCalculationContext();
  const { setStatistics, statistics } = useChartContext();

  const { id } = useParams();

  // useEffect(()=>{
  //   setInvestmentBool(localStorage.getItem('investmentBool'));
  //   setIntrestBool(localStorage.getItem('salaryBool'));

  // },[]);

  useEffect(() => {
    setCalculation(JSON.parse(localStorage.getItem("calculation")));
  }, []);

  const handleSliderChange = (event, newValue) => {
    // setValue(newValue);
    setCalculation((prev) => ({
      ...prev,
      value: {
        ...prev.value,
        value: newValue,
      },
    }));
  };

  const handleGenerate = async () => {
    let obj = {};
    let num = 1;
    Object.keys(calculation).map((value, index) => {
      if (calculation[value].shouldRender) {
        obj = {
          ...obj,
          [`input_${num}`]: calculation[value].value,
        };
        num++;
        return {};
      }
    });

    const data = CalculationService.getCalculatedData(id, obj);

    data.then((resp) => {
      if (statistics.pie.shouldRender) {
        setStatistics((prev) => ({
          ...prev,
          pie: {
            ...prev.pie,
            value: resp.data.result,
          },
        }));
      } else if (statistics.graph.shouldRender) {
        setStatistics((prev) => ({
          ...prev,
          graph: {
            ...prev.graph,
            value: resp.data.yearlyAmount,
            result: resp.data.result,
          },
        }));
      } else if (
        statistics.thumb.shouldRender ||
        statistics.warning.shouldRender
      ) {
        if (resp.data.status) {
          setStatistics((prev) => ({
            ...prev,
            thumb: {
              shouldRender: true,
            },
            warning: {
              shouldRender: false,
            },
          }));
        } else {
          setStatistics((prev) => ({
            ...prev,
            thumb: {
              shouldRender: false,
            },
            warning: {
              shouldRender: true,
            },
          }));
        }

        setStatistics((prev) => ({
          ...prev,
          emvalue: {
            value: resp.data.result,
          },
        }));
      }
    });
  };

  const handleInputChange = (event) => {
    // setValue(event.target.value === "" ? "" : Number(event.target.value));
    setCalculation((prev) => ({
      ...prev,
      value: {
        ...prev.value,
        value: event.target.value === "" ? "" : Number(event.target.value),
      },
    }));
  };

  const handleBlur = () => {
    if (calculation.value.value < 1000) {
      setCalculation((prev) => ({
        ...prev,
        value: {
          ...prev.value,
          value: 1000,
        },
      }));
    } else if (calculation.value.value > 10000000) {
      setCalculation((prev) => ({
        ...prev,
        value: {
          ...prev.value,
          value: 10000000,
        },
      }));
    }
  };
  const handleEmiSliderChange = (event, newValue) => {
    // setEmiValue(newValue);
    setCalculation((prev) => ({
      ...prev,
      emi: {
        ...prev.emi,
        value: newValue,
      },
    }));
  };

  const handleEmiInputChange = (event) => {
    setCalculation((prev) => ({
      ...prev,
      emi: {
        ...prev.emi,
        value: event.target.value === "" ? "" : Number(event.target.value),
      },
    }));
  };

  const handleBlurEmi = () => {
    if (calculation.emi.value < 1000) {
      setCalculation((prev) => ({
        ...prev,
        emi: {
          ...prev.emi,
          value: 1000,
        },
      }));
    } else if (calculation.emi.value > 10000000) {
      setCalculation((prev) => ({
        ...prev,
        emi: {
          ...prev.emi,
          value: 10000000,
        },
      }));
    }
  };

  const handleSalarySliderChange = (event, newValue) => {
    setCalculation((prev) => ({
      ...prev,
      salary: {
        ...prev.salary,
        value: newValue,
      },
    }));
  };

  const handleSalaryInputChange = (event) => {
    setCalculation((prev) => ({
      ...prev,
      salary: {
        ...prev.salary,
        value: event.target.value === "" ? "" : Number(event.target.value),
      },
    }));
  };

  const handleBlursalary = () => {
    if (calculation.salary.value < 1000) {
      setCalculation((prev) => ({
        ...prev,
        salary: {
          ...prev.salary,
          value: 1000,
        },
      }));
    } else if (calculation.salary.value > 10000000) {
      setCalculation((prev) => ({
        ...prev,
        salary: {
          ...prev.salary,
          value: 10000000,
        },
      }));
    }
  };

  const handleIntrestSliderChange = (event, newValue) => {
    // setIntreset(newValue);
    setCalculation((prev) => ({
      ...prev,
      interest: {
        ...prev.interest,
        value: newValue,
      },
    }));
  };

  const handleIntrestInputChange = (event) => {
    // setIntreset(event.target.value === "" ? "" : Number(event.target.value));
    setCalculation((prev) => ({
      ...prev,
      interest: {
        ...prev.interest,
        value: event.target.value === "" ? "" : Number(event.target.value),
      },
    }));
  };

  const handleBlurIntrest = () => {
    if (calculation.intrest.value < 1) {
      setCalculation((prev) => ({
        ...prev,
        interest: {
          ...prev.interest,
          value: 1,
        },
      }));
    } else if (calculation.intrest.value > 100) {
      setCalculation((prev) => ({
        ...prev,
        interest: {
          ...prev.interest,
          value: 100,
        },
      }));
    }
  };

  const handleUsageSliderChange = (event, newValue) => {
    // setUsageValue(newValue);
    setCalculation((prev) => ({
      ...prev,
      usage: {
        ...prev.usage,
        value: newValue,
      },
    }));
  };

  const handleUsageInputChange = (event) => {
    // setUsageValue(event.target.value === "" ? "" : Number(event.target.value));
    setCalculation((prev) => ({
      ...prev,
      usage: {
        ...prev.usage,
        value: event.target.value === "" ? "" : Number(event.target.value),
      },
    }));
  };

  const handleBlurUsage = () => {
    if (calculation.usage.value < 10) {
      setCalculation((prev) => ({
        ...prev,
        usage: {
          ...prev.usage,
          value: 10,
        },
      }));
    } else if (calculation.usage.value > 10000) {
      setCalculation((prev) => ({
        ...prev,
        usage: {
          ...prev.usage,
          value: 10000,
        },
      }));
    }
  };

  return (
    <>
      <div className="calc-card">
        {/* Amount */}
        {calculation.value.shouldRender && (
          <div
            className="clac-wrap"
            style={{
              position: "relative",
              height: "100px",
              top: "0",
            }}
          >
            <div className="calc-label">Funds</div>
            <div className="input-info">
              <Tooltip title="Min amount is 1000" placement="top" arrow>
                <InfoIcon />
              </Tooltip>
            </div>
            <span class="customTextfield">
              &#x20B9;
              <input
                style={{
                  outline: "none",
                  border: "none",
                  width: "90px",
                  fontSize: "16px",
                }}
                type="number"
                name="number"
                step="0.01"
                placeholder="0"
                value={calculation.value.value}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
            </span>

            <Slider
              style={{ color: "#4a8865" }}
              value={
                typeof calculation.value.value === "number"
                  ? calculation.value.value
                  : 0
              }
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
              color="success"
              min={1000}
              max={1000000}
              className="Slider"
            />
          </div>
        )}
        {calculation.emi.shouldRender && (
          <div
            className="clac-wrap"
            style={{
              position: "relative",
              height: "100px",
              top: "0",
            }}
          >
            <div className="calc-label">Emi</div>
            <div className="input-info">
              <Tooltip title="Min amount is 1000" placement="top" arrow>
                <InfoIcon />
              </Tooltip>
            </div>
            <span class="customTextfield">
              &#x20B9;
              <input
                style={{
                  outline: "none",
                  border: "none",
                  width: "90px",
                  fontSize: "16px",
                }}
                type="number"
                name="number"
                step="0.01"
                placeholder="0"
                value={calculation.emi.value}
                onChange={handleEmiInputChange}
                onBlur={handleBlurEmi}
              />
            </span>

            <Slider
              style={{ color: "#4a8865" }}
              value={
                typeof calculation.emi.value === "number"
                  ? calculation.emi.value
                  : 0
              }
              onChange={handleEmiSliderChange}
              aria-labelledby="input-slider"
              color="success"
              min={1000}
              max={1000000}
              className="Slider"
            />
          </div>
        )}
        {calculation.salary.shouldRender && (
          <div
            className="clac-wrap"
            style={{
              position: "relative",
              height: "100px",
              top: "0",
            }}
          >
            <div className="calc-label">Salary</div>
            <div className="input-info">
              <Tooltip title="Min amount is 1000" placement="top" arrow>
                <InfoIcon />
              </Tooltip>
            </div>
            <span class="customTextfield">
              &#x20B9;
              <input
                style={{
                  outline: "none",
                  border: "none",
                  width: "90px",
                  fontSize: "16px",
                }}
                type="number"
                name="number"
                step="0.01"
                placeholder="0"
                value={calculation.salary.value}
                onChange={handleSalaryInputChange}
                onBlur={handleBlursalary}
              />
            </span>

            <Slider
              style={{ color: "#4a8865" }}
              value={
                typeof calculation.salary.value === "number"
                  ? calculation.salary.value
                  : 0
              }
              onChange={handleSalarySliderChange}
              aria-labelledby="input-slider"
              color="success"
              min={1000}
              max={1000000}
              className="Slider"
            />
          </div>
        )}
        {/* Intrest */}
        {calculation.interest.shouldRender && (
          <div
            className="clac-wrap"
            style={{
              position: "relative",
              height: "100px",
              top: "0",
            }}
          >
            <div className="calc-label">Rate </div>
            <div className="input-info">
              <Tooltip title="Min intrest is 1%" placement="top" arrow>
                <InfoIcon />
              </Tooltip>
            </div>
            <span class="customTextfield">
              <input
                style={{
                  outline: "none",
                  border: "none",
                  width: "90px",
                  fontSize: "16px",
                }}
                type="number"
                name="number"
                step="0.01"
                placeholder="0"
                value={calculation.interest.value}
                onChange={handleIntrestInputChange}
                onBlur={handleBlurIntrest}
              />
              %
            </span>

            <Slider
              style={{ color: "#4a8865" }}
              value={
                typeof calculation.interest.value === "number"
                  ? calculation.interest.value
                  : 0
              }
              onChange={handleIntrestSliderChange}
              aria-labelledby="input-slider"
              color="success"
              min={0}
              max={100}
              className="Slider"
            />
          </div>
        )}
        {/* usage */}
        {calculation.usage.shouldRender && (
          <div
            className="clac-wrap"
            style={{
              position: "relative",
              height: "100px",
              top: "0",
            }}
          >
            <div className="calc-label">Estimated Usage</div>
            <div className="input-info">
              <Tooltip title="Min usage is 1 times" placement="top" arrow>
                <InfoIcon />
              </Tooltip>
            </div>
            <span class="customTextfield">
              f
              <input
                style={{
                  outline: "none",
                  border: "none",
                  width: "90px",
                  fontSize: "16px",
                }}
                type="number"
                name="number"
                step="0.01"
                placeholder="0"
                value={calculation.usage.value}
                onChange={handleUsageInputChange}
                onBlur={handleBlurUsage}
              />
            </span>

            <Slider
              style={{ color: "#4a8865" }}
              value={
                typeof calculation.usage.value === "number"
                  ? calculation.usage.value
                  : 0
              }
              onChange={handleUsageSliderChange}
              aria-labelledby="input-slider"
              color="success"
              min={1}
              max={10000}
              className="Slider"
            />
          </div>
        )}

        <Button
          variant="contained"
          style={{ backgroundColor: "#4a8865" }}
          endIcon={<InsightsIcon />}
          onClick={handleGenerate}
        >
          Generate
        </Button>
      </div>
    </>
  );
};

export default InputSlider;
