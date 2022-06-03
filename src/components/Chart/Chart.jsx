import React, { useContext, useEffect } from "react"
import { DualAxes } from '@ant-design/charts'
import { GlobalContext } from "../../context/GlobalStateContext"
import './Chart.css'
import { Button, CircularProgress } from "@mui/material";

const Chart = () => {

  const { list, district } = useContext(GlobalContext)

  const config = {
    width: 500,
    height: 240,
    autoFit: false,
    xField: "date",
    yField: ['averageDay', 'averageNight'],
    meta: {
      averageDay: {
        alias: 'Temp. promedio diurna',
        formatter: (v) => `${v} C°`
      },
      averageNight: {
        alias: 'Temp. promedio nocturna',
        formatter: (v) => `${v} C°`
      }
    },
    yAxis: {
      averageDay: {
        min: 10,
        max: 30
      },
      averageNight: {
        min: 10,
        max: 30
      }
    },
    geometryOptions: [
      {
        geometry: 'column',
      },
      {
        geometry: 'line',
        lineStyle: {
          lineWidth: 2
        },
        point: {
          size: 4,
          shape: "point",
        }
      },
    ]
  }

  let chart
  const downloadImage = () => chart?.downloadImage()

  useEffect(() => {}, [district])

  return (
    <div className="chartContainer">
      <h2>Average Temperature per Day</h2>
      <div style={{paddingBottom: '20px'}}>
        {list != null ? (
          <DualAxes data={[list, list]} {...config} onReady={(chartInstance) => (chart = chartInstance)} />
        ) : (
          <CircularProgress />
        )}
      </div>
      <Button variant='outlined' onClick={downloadImage}>
        Export Image
      </Button>
    </div>
  );

};

export default Chart;
