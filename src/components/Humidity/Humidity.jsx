import { Line, Liquid } from '@ant-design/charts'
import { Button, CircularProgress } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../context/GlobalStateContext'
import './Humidity.css'

const Humidity = () => {

  const { list } = useContext(GlobalContext)
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
    if (list != null) setHumidityAvg(list.map(e => e.humidity).reduce((a, b) => a + b) / list.length)
  }, [list])

  return (
    <div className='humidityContainer'>
      <h2>Average Humidity</h2>
      <div className='humidityCharts'>
        {list != null ? (
          <>
            <Line data={list} {...configChart} onReady={(chartInstance) => (chart = chartInstance)} />
            <Liquid percent={humidityAvg / 100} {...configLiquid}></Liquid>
          </> 
        ) : <CircularProgress />}
      </div>
      <Button variant='outlined' onClick={downloadImage}>
        Export Image
      </Button>
    </div>
  )
}

export default Humidity