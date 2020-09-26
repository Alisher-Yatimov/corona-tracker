import React, {useEffect, useState} from 'react';
import {fetchData} from './utils/fetchData'
import Header from './components/Header/Header';
import Card from './components/Card/Card'
import { Grid, Container } from '@material-ui/core';
import LineChart from './components/LineChart/LineChart'
import ListOfCountries from './components/ListOfCountries/ListOfCountries';
import BarChart from './components/BarChart/BarChart'
import './App.css';

function App() {
  const [confirmed, setCorfimed] = useState('')
  const [recovered, setRecovered] = useState('')
  const [deaths, setDeaths] = useState('')
  const [currentCountry, setCurrentCountry] = useState('All')

  useEffect(() => {
    setCurrentCountry(localStorage.getItem('country') || 'All')
    const getData = async () => {
      const {confirmed, recovered, deaths} = await fetchData('https://covid19.mathdro.id/api')
      setCorfimed(confirmed.value)
      setRecovered(recovered.value)
      setDeaths(deaths.value)
    }
    getData()
  }, [])

  const selectHandler = e => {
    e.preventDefault()
    setCurrentCountry(e.target.value)
    localStorage.setItem('country', e.target.value)
}
  return (
    <>
      <Header/>
        <ListOfCountries selectHandler={selectHandler} currentCountry={currentCountry}/>
      <Grid container spacing={2} className="cards-block">
        <Card name="подтвержденно" val={confirmed} border="blue" />
        <Card name="выздоровевшие" val={recovered} border="green"/>
        <Card name="смертей" val={deaths} border="red"/>
      </Grid>
      <Container>
        {
          currentCountry.toLowerCase() === 'all' ?
          <LineChart mainData={[confirmed, deaths, recovered]}/> :
          <BarChart currentCountry={currentCountry}/>
          
        }
      </Container>
    </>
  )
}

export default App;
