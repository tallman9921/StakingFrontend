import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Container, Box, Link, Typography, Avatar, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    boxContainer: {
      width: '252px',
      borderRadius: '4px',    
    },
    boxLink: {
      borderRadius: '4px',
      "&:hover": {
        textDecoration: 'none'
      },
    },
    boxContent: {
      border: '.1rem solid #7d3cf4',
      borderRadius: '1rem',
    },
    boxHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: '2.75rem',
      paddingLeft: '1.25rem',
      paddingRight: '1.25rem',
      background: '-webkit-linear-gradient(top, rgba(218,75,253,1) 0%,#5d19db 100%)',
      borderTopLeftRadius: '.9rem',
      borderTopRightRadius: '.9rem',
    },
    boxHeader_section: {
      display: 'flex',
      alignItems: 'center',
    },
    avatar: {
      width: '1.75rem',    
      height: '1.75rem',
    },
    boxHeaderTitle: {
      marginLeft: '1rem',
      fontSize: '.95rem',
      fontWeight: '700',
      color: '#fdfdfd',
    },
    boxBody: {
      padding: '1.3125rem 1.25rem 1.625rem 1.9375rem',
      display: 'grid',
      gap: '.75rem .625rem',
      background: '#5d19db',
      boxSizing: 'border-box',
      width: '250px',
      borderBottom: '.1rem solid rgba(172, 174, 183, 0.5)',
    },
    boxBodyLabel: {
      color: '#fdfdfd',
      fontSize: '.75rem',
      lineHeight: '1.5rem',
      fontFamily: 'Open Sans'
    },
    boxBodyValue: {
      color: '#f5a623',
      fontSize: '.875rem',
      fontWeight: 700,
      marginLeft: '.5rem',
      lineHeight: 1.5,
      fontFamily: 'Open Sans'
    },
    boxFooter: {
      background: '#5d19db',
      padding: '1rem 1.25rem',
      width: '210px',
      gridTemplateColumns: '1fr 1fr',
      display: 'grid',
      gap: '.625rem',
      borderBottomLeftRadius: '.9rem',
      borderBottomRightRadius: '.9rem',
    },
    containedBtn: {
      background: '-webkit-linear-gradient(bottom,#0694ee 0%,#5d19db 90%)',
      color: '#ffffff',
      fontSize: '.75rem',
      lineHeight: '1rem',
      fontFamily: 'Open Sans',
      letterSpacing: '1px',
      fontWeight: 700,
      "&:hover": {
        background: '-webkit-linear-gradient(top,#0694ee 0%,#5d19db 90%)'
      },
    },
    outlinedBtn: {
      color: 'rgba(172, 174, 183, 0.5)',
      fontSize: '.75rem',
      lineHeight: '1rem',
      fontFamily: 'Open Sans',
      letterSpacing: '1px',
      fontWeight: 700,
      "&:hover": {
        background: 'rgba(172, 174, 183, 0.5)',
        color: '#ffffff'
      },
    }
  }));


//I wrote everything from here on, not the CSS above
export default function CardForm({imgsrc, headerName, Profit, Max, Total, PoolIndice, ContractAddress }) {
    const classes = useStyles();

    return (
        <Box className={classes.boxContainer}>
            <Box className={classes.boxContent}>
              <Box className={classes.boxHeader}>
                <Box className={classes.boxHeader_section}>
                  <Avatar alt="Token Logo" src={imgsrc} className={classes.avatar} />
                  <Box>
                    <Typography className={classes.boxHeaderTitle} variant="caption" gutterBottom>{`${headerName}`}</Typography>
                  </Box>
                </Box>
              </Box>
              <Box className={classes.boxBody}>
                <Box>
                  <Typography className={classes.boxBodyLabel} variant="caption" gutterBottom>APY:</Typography>
                  <Typography className={classes.boxBodyValue} variant="caption" gutterBottom>{`${Profit}`}%</Typography>
                </Box>
                <Box>
                  <Typography className={classes.boxBodyLabel} variant="caption" gutterBottom>Pooled:</Typography>
                  <Typography className={classes.boxBodyValue} variant="caption" gutterBottom>{`${Total}`}</Typography>
                </Box>
                <Box>
                  <Typography className={classes.boxBodyLabel} variant="caption" gutterBottom>Max:</Typography>
                  <Typography className={classes.boxBodyValue} variant="caption" gutterBottom>{`${Max}`}</Typography>
                </Box>
              </Box>
              <Box className={classes.boxFooter}>
              <Link href="/plan" className={classes.boxLink}>
                <Button variant="contained" className={classes.containedBtn}>Pool Info</Button>
              </Link>

                <Button variant="outlined" href={`https://exchange.pancakeswap.finance/#/swap?outputCurrency=${ContractAddress}`}
                        className={classes.outlinedBtn}>Buy</Button>
              </Box>
            </Box>
        </Box>
    );
};
