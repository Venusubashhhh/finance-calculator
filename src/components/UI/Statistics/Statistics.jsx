import { BarChart } from "@mui/x-charts/BarChart";
import { useChartContext } from "../../../context/ChartContext";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import IconButton from '@mui/material/IconButton';
import "./Statistics.scss";
import { useEffect, useLayoutEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import thumbsUp from '../../../../public/assets/thumbsup.gif'
import warning from '../../../../public/assets/warning.gif'




export default function Satistics() {
  const { barChartBool,pieChartBool,statistics,setStatistics } = useChartContext();
    

const handleDownloadPdf = () => {
  const data = document.getElementById("pdf1");
  const scale = 2; // Increase this value for higher DPI

  html2canvas(data, {
    useCORS: true,
    scale: scale,
    scrollY: -window.scrollY,
  }).then((canvas) => {
    const pdf = new jsPDF("portrait", "pt", "a4");
    const img = canvas.toDataURL("image/png");
    const imgProperties = pdf.getImageProperties(img);
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (imgProperties.height * imgWidth) / imgProperties.width;

    pdf.addImage(canvas, "PNG", 0, 0, imgWidth, imgHeight, "", "SLOW");

    pdf.save("Download.pdf");
  });
};


  
  let datas = {};




  if(statistics.pie.shouldRender){
    datas=statistics.pie.value
  }else if(statistics.graph.shouldRender){
    datas = statistics.graph.result
  }else if(statistics.thumb.shouldRender || statistics.warning.shouldRender){
    
    datas = statistics.emvalue.value
  }

  const constants = {
    need: '(50%)',
    want: '(30%)',
    saving: '(20%)' 
  }

  //data:{need:500,wants:200,savings:100}

  let mockData = statistics.pie.value;

  let graphData = statistics.graph.value;

  const years = graphData.map(item => Object.keys(item)[0]);
  const values = graphData.map(item => Object.values(item)[0]);

  // Creating the xAxis and series objects for BarChart component
  const xAxis = [
    {
      scaleType: 'band',
      data: years,
      
    },
  ];

  const series = [
    {
      label: 'Investment',
      data: values,
      color: '#61B486',
    },
  ];

  

  // useEffect(()=>{
  //   mockData = statistics.pie.value

  // },[statistics])


  // const data = [
  //   { value: 5, label: "A" },
  //   { value: 10, label: "B" },
  //   { value: 15, label: "C" },
  //   { value: 20, label: "D" },
  // ];
  const data = Object.keys(mockData).map((value) => {
    return {
      value: mockData[value],
      label: `${value} ${constants[value]}`
    }
  })



  const size = {
    height: 300,
  };

  

  useEffect(()=>{
    setStatistics(JSON.parse(localStorage.getItem('statistics')))
 
  },[])

  useLayoutEffect(() => {
    setTimeout(() => {
      const textElements = document.getElementsByTagName('text');
  
      for (let i = 0; i < textElements.length; i++) {
        textElements[i].style.fontSize = '9.0px';
      }
    }, 100)
  }, []);


  return (
    <div className="sat-card" id="pdf1" >
     <div className="sat-download-icon" ><IconButton style={{color:'#3e6d53', cursor:'pointer',zIndex:"111"}}  onClick={handleDownloadPdf}>
  
        <DownloadForOfflineIcon /></IconButton>
        </div>

      {statistics.graph.shouldRender && (
        <div style={{paddingLeft:'30px'}}><BarChart
          
          xAxis={xAxis}
          series={series}
          
          height={300}
        /></div>
      )}

     {statistics.pie.shouldRender && <PieChart
        series={[
          {
            arcLabel: (item) => `${item.value}`,
            arcLabelMinAngle: 5,
            data,
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 1,
            cornerRadius: 5,
            startAngle: 0,
            endAngle: 360,
            cx: 150,
            cy: 150,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontWeight: "bold",
            fontSize:'14px'
          },
        }}
        {...size}
      />}

     {statistics.thumb.shouldRender&& <div  style={{marginLeft:'70px'}}>
        <img src={thumbsUp} alt="" height={250}/>
      </div>}
      {statistics.warning.shouldRender&& <div  style={{marginLeft:'70px'}}>
        <img src={warning} alt="" height={250}/>
      </div>}

      {statistics.pie.shouldRender && <div style={{display:"flex",justifyContent:"space-evenly"}}>
        {
         Object.entries(datas).map(([key, value]) => (
            <div style={{padding:'10px',margin:'0px'}} key={key}><p style={{margin:"0px"}}>{key}</p>
        <p style={{margin:'0px'}}>&#8377; {value}</p>
        </div>
          ))
        }

        

        
        
      </div>}

       {!statistics.pie.shouldRender &&<div style={{display:"flex",justifyContent:"space-evenly"}}>
        {
         Object.entries(datas).map(([key, value]) => (
            <div style={{padding:'10px',margin:'0px'}} key={key}><p style={{margin:"0px"}}>{key}</p>
        <p style={{margin:'0px'}}>{value}</p>
        </div>
          ))
        }

        
        
      </div>}


    </div>
  );
}
