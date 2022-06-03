import { Line, Liquid } from '@ant-design/charts'
import { Button } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../context/GlobalStateContext'
import './Humidity.css'

const Humidity = () => {

  const {list, district} = useContext(GlobalContext)
  const [humidityAvg, setHumidityAvg] = useState(null)

  const configLiquid = {
      outline: {
        border: 4,
        distance: 8,
      },
      wave: {
        length: 128,
      },
  }

  const configChart = {
    width: 550,
    height: 240,
    xField: 'date',
    yField: 'humidity',
    yAxis: {
      min: 50,
      max: 100
    },
    meta: {
      humidity: {
        alias: 'Humedad',
        formatter: (e) => `${e}%`
      }
    },
    lineStyle: {
      lineWidth: 2
    },
    point: {
      size: 4,
      shape: "point",
    }
  }

  let chart
  const downloadImage = () => chart?.downloadImage()

  useEffect(() => {
    if(list != null){
      let copy = [...list]
      if(copy.length > 0) setHumidityAvg(copy.map(e => e.humidity).reduce((a,b)=>a+b) / copy.length)
    }
  }, [district])

  return (
    <div className='humidityContainer'>
        <h2>Average Humidity</h2>
        <div className='humidityCharts'>
          {list != null ? (
            <Line data={list} {...configChart} onReady={(chartInstance) => (chart = chartInstance)} />
          ) : <h1>Sin registros</h1>}
          <Liquid percent={humidityAvg/100} {...configLiquid}></Liquid>
        </div>
        <Button variant='outlined' onClick={downloadImage}>
          Export Image
        </Button>
    </div>
  )
}

export default Humidity