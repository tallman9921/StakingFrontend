import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { ethers } from 'ethers'
import stakingABI from '../PeetStakingContract.json';
import pteABI from '../pte.json';

import {
    useWeb3React,
    UnsupportedChainIdError
} from "@web3-react/core";

import { Container, Box, Link, Typography, Avatar, Button, Alert } from '@material-ui/core';
import CardForm from '../components/CardForm';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1.25rem',
    maxWidth: '1080px',
  },
  title: {
    fontSize: '1.5rem',
    color: '#fdfdfd',
    fontWeight: 300,
    fontFamily: 'Open Sans',
    marginBottom: '1rem'
  },
  gridstyle: {
    marginTop: '1.5rem',
  },
}));


export default function Index() {
  const classes = useStyles();
  const context = useWeb3React();
  const {
      connector,
      library,
      chainId,
      account,
      activate,
      deactivate,
      active,
      error
  } = context;

  //TODO make these global variables for efficiency
  var pools;
  var gridBoxes = [];
  var tokenNames = [];
  
  // TODO update this to contract address after deploy
  const stakingContractAddress = "";
  
  var testing = true;

  //main fx
  (async() => {
    // grab ABIs
    if (library) {
      if (testing === false) {
        var stakingContract = new ethers.Contract(stakingContractAddress, stakingABI.abi, library.getSigner());
        console.log(stakingContract);
      } 

      var _max;
      var _total;
      var _apy;

      if (stakingContract || testing){
        if (testing === false){
          const _pools = await stakingContract.fetchAllPools();
          //return (indices, names, input_assets, output_assets, starts, ends);
          console.log(_pools);
        
          if(_pools.length > 0){
            tokenNames = _pools[1];
            pools = _pools;

            const poolsPlus = await stakingContract.fetchLivePoolsPlus();
            //return (amount_reward, total_pooled, max_pooled);
            console.log(poolsPlus);

            // Dynamically ad gridboxes for each published pool
            if (poolsPlus.length > 0) {
              let i = 0;
              while (i < poolsPlus.length) {
                pools.push(poolsPlus[i]);
                _apy = poolsPlus[0][i]; //profit/APY %
                _total = poolsPlus[1][i]; //total of max in pool
                _max = poolsPlus[2][i]; //pool cap
                gridBoxes.push(<Grid item xs key={i}>
                                  <CardForm key={i}
                                            imgsrc="../images/logo.ico" //TODO make this pull specific token logos
                                            headerName={`${tokenNames[i]} Staking Pool`}
                                            Profit={`${_apy}`} 
                                            Max={`${_max}`}
                                            Total={`${_total}`}
                                            PoolIndice={i}
                                            ContractAddress={`${pools[2][i]}`} />
                                </Grid>);
                i++;
              }
            } else { //populate with default values
              let i = 0;
              while (i < pools.length) {
                _apy = parseFloat(200);
                _total = parseFloat(0);
                _max = parseFloat(100000000);
                gridBoxes.push(<Grid item xs key={i}>
                                  <CardForm key={i}
                                            imgsrc="../images/logo.ico" //TODO make this pull specific token logos
                                            headerName={`${pools[1][i]}`}
                                            Profit={`${_apy}`} 
                                            Max={`${_max}`}
                                            Total={`${_total}`}
                                            PoolIndice={i}
                                            ContractAddress={`${pools[2][i]}`} />
                                </Grid>);
                i++;
              }
            }
          } else { //populate with default values
            tokenNames = ["PEET"]; //placeholder until live
            _apy = parseFloat(200);
            _total = parseFloat(0);
            _max = parseFloat(100000000);
            let indice = 0;
            gridBoxes.push(<Grid item xs key={indice}>
              <CardForm key={indice}
                        imgsrc="../images/logo.ico"
                        headerName={`Peet Staking Pool`}
                        Profit={`${_apy}`} 
                        Max={`${_max}`}
                        Total={`${_total}`}
                        PoolIndice={`${indice}`}
                        ContractAddress="0x424b50dcb78f459d11a95beddd13788296281987" />
            </Grid>);
          } 
        } else { //populate with default values
          tokenNames = ["PEET"]; //placeholder until live
          _apy = parseFloat(200);
          _total = parseFloat(0);
          _max = parseFloat(100000000);
          let indice = 0;
          gridBoxes.push(<Grid item xs key={indice}>
            <CardForm key={indice} 
                      imgsrc="../images/logo.ico" 
                      headerName={`Peet Staking Pool`}
                      Profit={`${_apy}`} 
                      Max={`${_max}`}
                      Total={`${_total}`}
                      PoolIndice={`${indice}`}
                      ContractAddress="0x424b50dcb78f459d11a95beddd13788296281987" />
          </Grid>);
        }
      }
    }
  })();
 

  return (
    <React.Fragment>
      <Container className={classes.root}>
        <Typography className={classes.title} variant="h5" gutterBottom>
          Staking Pools
        </Typography>
        <Grid className={classes.gridstyle} container spacing={1}>
           {gridBoxes}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
