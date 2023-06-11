import './Prices.css'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Coin from './Coin';
import { Box, Grid, Toolbar, useTheme } from '@mui/material';
import PageHeader from '../../Components/PageHeader/PageHeader';
import { QueryStats } from '@mui/icons-material';
import { FcBullish } from 'react-icons/fc';



export default function Prices() {
  const theme = useTheme()
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('')

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLocaleLowerCase())
    )



  
    useEffect(()=>{
      axios
      .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => {
        setCoins(res.data);
        // console.log(res.data);
      }).catch(error => console.log(error));
    }, []);
  
    const handleChange = e => {
      setSearch(e.target.value);
    };
  
    
  
    return (
      <>
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: theme.palette.background.default, minHeight: 100 + 'vh' }}>
      <Toolbar/>
      <PageHeader
        icon={<FcBullish size={24} />}
        title="Live Prices"
        subTitle="Coin Market Cape"
      />
      <Grid container>
        <Grid item xs={12}>
        <div className='coin-app'>
          <div className='coin-search'>
            <h1 className='coin-text'>Search a currency</h1>
            <form>
              <input
                className='coin-input'
                type='text'
                onChange={handleChange}
                placeholder='Search'
              />
            </form>
          </div>
          {filteredCoins.map(coin => {
            return (
              <>
            <Coin
                key={coin.id}
                name={coin.name}
                price={coin.current_price}
                symbol={coin.symbol}
                marketcap={coin.total_volume}
                volume={coin.market_cap}
                image={coin.image}
                priceChange={coin.price_change_percentage_24h}
              />
              </>
            );
          })}
        </div>
        </Grid>
      </Grid>
      </Box>
        
        </>
    );


  }

