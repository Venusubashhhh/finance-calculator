import React, { createContext, useContext, useState } from 'react';
import { graphData } from '../constants/constants';

const ChartContext = createContext();

export const ChartProvider = ({ children }) => {

    const [barChartBool,setBarChartBool] = useState(false);
    const [pieChartBool,setPieChartBool] = useState(true);

    const [statistics,setStatistics] = useState({
      pie:{
        shouldRender:false,
        value:{
          need:2500,
          want:1500,
          saving:1000
        },
      },
      graph:{
        shouldRender:false,
        value:graphData,
        result:{}
      },
      thumb:{
        shouldRender:false,
      },
      warning:{
        shouldRender:false
      },
      emvalue:{
        value:{}
      }
    })


  

  return (
    <ChartContext.Provider value={{barChartBool,setBarChartBool,pieChartBool,setPieChartBool,statistics,setStatistics}}>
      {children}
    </ChartContext.Provider>
  );
};

export const useChartContext = () => useContext(ChartContext);