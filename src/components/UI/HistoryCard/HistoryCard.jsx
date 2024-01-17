import React, { useState, useEffect } from "react";
import "./HistoryCard.scss";
import HistoryApiService from "../../../services/api/HistoryApi";
import { useAuth } from "../../../context/AuthContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { IconButton } from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import DownloadForOffline from "@mui/icons-material/DownloadForOffline";

function HistoryCard() {
  const { selectedDate } = useAuth();
  const [item, setItem] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(2);

  useEffect(() => {
    const data = {
      date: selectedDate,
      page: 1,
      pageSize: 10,
    };
    const response = HistoryApiService.getHistoryData(data);

    response.then((res) => {
      setItem(res.message.result);
    });
  }, []);

  const fetchMoreData = () => {
    const data = {
      date: selectedDate,
      page: index,
      pageSize: 10,
    };
    const response = HistoryApiService.getHistoryData(data);
    response
      .then((res) => {
        setItem((prevItems) => [...prevItems, ...res.message.result]);

        res.message.totalPages > index ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => console.log(err));

    setIndex((prevIndex) => prevIndex + 1);
  };

  const handleDownloadPdf = async () => {
    const data = document.getElementById("pdf1");
    html2canvas(data, { useCORS: true, scale: 2 }).then((canvas) => {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
        precision: 2, // optional, sets the precision for measurements
        dpi: 300,
        compress: true, // adjust DPI as needed
      });
      const img = canvas.toDataURL("image/png");
      const imgProperties = pdf.getImageProperties(img);
      const imgWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (imgProperties.height * imgWidth) / imgProperties.width;
      let heightLeft = imgHeight;
      let position = 0;
      heightLeft -= pageHeight;
      pdf.addImage(canvas, "PNG", 0, position, imgWidth, imgHeight, "");
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas, "PNG", 0, position, imgWidth, imgHeight, "");
        heightLeft -= pageHeight;
      }
      pdf.save("Download.pdf");
    });
  };

  return (
    <>
      <div className="d-button" onClick={handleDownloadPdf}>
        {" "}
        <IconButton aria-label="delete" size="large">
          <DownloadForOffline fontSize="inherit" />
        </IconButton>
      </div>
      <div id="pdf1">
        <InfiniteScroll
          key={selectedDate}
          dataLength={item.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={"loading..."}
        >
          {item.map((item) => (
            <div className="history-card">
              <div className="history-rule-text">
                {`#${item.rule_id}`} {item.rule_name}
              </div>

              <div className="history-input-text">
                {item.result?.input &&
                  Object.entries(item.result.input).map(([key, value]) => (
                    <span
                      key={key}
                      style={{ margin: "2px 5px" }}
                    >{`${key}:${value}`}</span>
                  ))}
              </div>
              <div className="result-div">
                Result
                <div>
                  {item.result?.input &&
                    Object.entries(item.result.result).map(([key, value]) => (
                      <div key={key} className="result-value">
                        {" "}
                        {`${key}:${value}`}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
}

export default HistoryCard;
