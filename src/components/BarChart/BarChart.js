import React, {useEffect, useState} from 'react'
import {Bar} from 'react-chartjs-2'
import {fetchData} from '../../utils/fetchData'

const dataForChart = {
    datasets: [
        {
            backgroundColor: 'rgba(0,0,255, 0.3)',
            borderColor: 'rgba(0,0,255, 1)',
            borderWidth: 2,
            label: 'ПОДТВЕРЖДЕННО'
        },
        {
            backgroundColor: 'rgba(0,128,0, 0.3)',
            borderColor: 'rgba(0,150,0, 1)',
            borderWidth: 2,
            label: 'ВЫЗДОРОВЕВШИЕ'
        },
        {
            backgroundColor: 'rgba(255,13,13, 0.3)',
            borderColor: 'rgba(255,13,13, 1)',
            borderWidth: 2,
            label: 'СМЕРТЕЙ'
        }
    ]
}

const chartOptions = {
    responsive: true,
    scales: {
        yAxes: [
            {
                ticks: {
                    suggestedMin: 0
                }
            }
        ]
    }
}

const BarChart = ({currentCountry}) => {
    const [confirmed, setConfirmed] = useState('')
    const [recovered, setRecovered] = useState('')
    const [deaths, setDeaths] = useState('')

    useEffect(() => {
        const getData = async () => {
            const {confirmed, recovered, deaths} = await fetchData(`https://covid19.mathdro.id/api/countries/${currentCountry}`);
            setConfirmed(confirmed.value)
            setRecovered(recovered.value)
            setDeaths(deaths.value)
        }
        getData()
    }, [deaths, recovered, confirmed, currentCountry])
    
    return (
        <>
            <Bar data={() => {
                dataForChart.datasets[0].data = [confirmed]
                dataForChart.datasets[1].data = [recovered]
                dataForChart.datasets[2].data = [deaths]
                return dataForChart
            }
            } options={chartOptions}/>
            {console.log('death:', deaths, 'confirmed:', confirmed, 'recovered;', recovered)}
        </> 
    )
}

export default BarChart
