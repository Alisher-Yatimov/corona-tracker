import React, {useEffect, useState} from 'react'
import {fetchData} from '../../utils/fetchData'
import { Line } from 'react-chartjs-2'

const dataForChart = { 
    datasets: [
        {
            label: 'ПОДТВЕРЖДЕННО',
            backgroundColor: 'rgba(48,63,159, 0.3)',
            borderColor: '#303F9F',
            borderWidth: 1,
            hoverBackgroundColor: '#1A237E',
        },
        {
            label: 'СМЕРТЕЙ',
            backgroundColor: 'rgba(255,82,82, 0.3)',
            borderColor: '#000',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
        }
    ]
}

const Chart = () => {
    const [labels, setLabels] = useState([])
    const [confirmed, setConfirmed] = useState('')
    const [deaths, setDeaths] = useState('')
    useEffect(() => {
        const getDailyData = async () => {
            const response = await fetchData('https://covid19.mathdro.id/api/daily')
            setLabels(response.map(({reportDate}) => reportDate))
            setConfirmed(response.map(({totalConfirmed}) => totalConfirmed))
            setDeaths(response.map(({deaths}) => deaths.total))
        }
        getDailyData()
        
    }, [])

    return (
        <div>
           <Line 
            data={() => {
                dataForChart.labels = labels
                dataForChart.datasets[0].data = confirmed
                dataForChart.datasets[1].data = deaths
                return dataForChart
            }}
            height={500}
            options={{ maintainAspectRatio: false }}
           /> 
        </div>
    )
}

export default Chart
