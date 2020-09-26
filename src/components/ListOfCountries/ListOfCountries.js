import React, {useState, useEffect} from 'react'
import {fetchData} from '../../utils/fetchData'
import {InputLabel, Select, MenuItem, Grid} from '@material-ui/core'

const ListOfCountries = ({selectHandler, currentCountry}) => {
    const [countries, setCountries] = useState([])
    useEffect(() => {
        const getData = async () => {
            const response = await fetchData('https://covid19.mathdro.id/api/countries')
            const arrOfCountries = response.countries.map(el => el.name)
            setCountries(arrOfCountries)
        }
        getData()
    }, [])

    return (

            <Grid container spacing={3} direction="row" alignItems='center' justify="center">
                <Grid item xs={3}>
                    <InputLabel id="selectCountry" style={{textAlign: 'center'}}>Select Country</InputLabel>
                </Grid>
                <Grid item xs={3}>
                    <Select value={currentCountry} labelId="selectCountry" onChange={selectHandler}>
                        <MenuItem value="All" key='all'>All</MenuItem>
                        {countries.map((el, idx) => <MenuItem value={el} key={idx}>{el}</MenuItem>)}
                    </Select>
                </Grid>
            </Grid>
    )
}

export default ListOfCountries
