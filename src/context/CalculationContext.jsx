import React, { createContext, useContext,useState } from "react";

const CalculationContext = createContext();

export const CalculationProvider = ({ children }) => {
  const [investmentBool, setInvestmentBool] = useState(false);
  const [emiBool, setEmiBool] = useState(false);
  const [salaryBool, setSalaryBool] = useState(false);
  const [intrestBool, setIntrestBool] = useState(false);
  const [usageBool, setUsageBool] = useState(false);
  const [value, setValue] = useState(1000);
  const [salaryValue, setSalaryValue] = useState(1000);
  const [emiValue, setEmiValue] = useState(1000);
  const [intrest, setIntreset] = useState(1);
  const [usagevalue, setUsageValue] = useState(1);
  const [calculation, setCalculation] = useState({
    value: {
      shouldRender: false,
      value: 1000,
    },
    salary: {
      shouldRender: false,
      value: 1000,
    },
    emi: {
      shouldRender: false,
      value: 1000,
    },
    interest: {
      shouldRender: false,
      value: 1,
    },
    usage: {
      shouldRender: false,
      value: 1,
    },

  });



  return (
    <CalculationContext.Provider
      value={{
        investmentBool,
        setInvestmentBool,
        intrestBool,
        setIntrestBool,
        usageBool,
        setUsageBool,
        value,
        setValue,
        intrest,
        setIntreset,
        usagevalue,
        setUsageValue,
        salaryBool,
        setSalaryBool,
        salaryValue,
        setSalaryValue,
        emiBool,
        setEmiBool,
        emiValue,
        setEmiValue,
        calculation,
        setCalculation,
      }}
    >
      {children}
    </CalculationContext.Provider>
  );
};

export const useCalculationContext = () => useContext(CalculationContext);
