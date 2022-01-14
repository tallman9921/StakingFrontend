import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { ethers } from 'ethers'
import stakingABI from '../PeetStakingContract.json';
import {
    useWeb3React,
    UnsupportedChainIdError
} from "@web3-react/core";
import TextField from '@material-ui/core/TextField';
import { Alert, Container, Box, Link, Typography, Avatar, Button, Chip, IconButton, SvgIcon, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';

const useStyles = makeStyles((theme) => ({
  container: {
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
  boxContainer: {
    width: '100%',
    borderRadius: '4px',
  },
  boxLink: {
    color: '#f5a623',
    "&:hover": {
      textDecoration: 'none'
    },
  },
  boxContent: {
  },
  boxHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '2.75rem',
    paddingLeft: '1.25rem',
    paddingRight: '1.25rem',
    background: '-webkit-linear-gradient(top, rgba(218,75,253,1) 0%,#5d19db 100%)',
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
    fontSize: '.875rem',
    color: '#fdfdfd',
  },
  boxHeaderStatus: {
    background: '#4aa657',
    color: '#ffffff',
    height: '1.25rem',
    borderRadius: '1px',
    fontSize: '.625rem',
    fontWeight: 700
  },
  boxBody: {
    display: 'flex',
  },
  boxBodyLeft: {
    padding: '0.5rem 4rem',
    display: 'flex',
    width: '60%',
    flexDirection: 'column',
    background: '#5d19db',
    boxSizing: 'border-box',
    borderRight: '.1rem groove rgba(172, 174, 183, 0.5)',
  },
  boxBodyLeftHeader: {
    paddingTop: '2rem',
    paddingBottom: '2rem',
    textAlign: 'center',
  },
  boxBodyLeftHeaderTitle: {
    color: '#f5a623',
  },
  txt_36: {
    fontSize: '2.25rem',
    fontFamily: 'Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif',
    fontWeight: 700,
  },
  txt_20: {
    fontSize: '1.25rem',
    fontFamily: 'Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif',
    fontWeight: 700,
  },
  boxBodyLeftHeaderCaption: {
    color: '#fdfdfd',
    fontSize: '.875rem',
  },
  icons: {
    color: '#f5a623',
  },
  boxBodyLeftBody: {
    display: 'flex',
  },
  boxBodyRight: {
    background: '#5d19db',
    width: '40%',
  },
  boxBodyRightContent: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fdfdfd',
    fontFamily: 'Open Sans',
  },
  boxBodyLabel: {
    color: '#fdfdfd',
    fontSize: '.875rem',
    lineHeight: '1.5rem',
    fontFamily: 'Open Sans'
  },
  boxBodyLabel1: {
    fontSize: '.625rem',
    color: '#fdfdfd',
  },
  boxBodyValue1: {
    fontSize: '1.25rem',
    color: '#fdfdfd',
    fontWeight: 700,
    fontFamily: 'Open Sans',
  },
  boxBodyValue: {
    color: '#f5a623',
    fontSize: '.875rem',
    fontWeight: 700,
    marginLeft: '.5rem',
    lineHeight: 1.5,
    fontFamily: 'Open Sans'
  },
  boxBodyLeftBodyMin: {
    // width: '20%'
    marginRight: '1.25rem',
  },
  boxBodyLabel2: {
    fontSize: '1.25rem',
    color: '#fdfdfd',
    fontFamily: 'Open Sans',
  },
  boxBodyWithdrawal: {
    paddingTop: '1.5rem',
    paddingBottom: '2.5rem',
    textAlign: 'center',
  },
  outlinedBtn: {
    border: '1px solid rgba(172, 174, 183, 0.5)',
    color: 'rgba(172, 174, 183, 0.5)',
    fontSize: '.75rem',
    lineHeight: '1rem',
    fontFamily: 'Open Sans',
    letterSpacing: '1px',
    fontWeight: 700,
    minWidth: '6rem',
    "&:hover": {
      background: 'rgba(172, 174, 183, 0.5)',
      color: '#ffffff'
    },
  },
  root: {
    flexGrow: 1,
  },
  padding: {
    marginTop: '-.1rem',
    backgroundColor: '#5d19db',
  },
  tabs: {
    marginTop: '1rem',
    background: '#5d19db',
    minHeight: '333px',
  },
  demo2: {
    background: '-webkit-linear-gradient(top, rgba(218,75,253,1) 0%,#5d19db 10%)',
  },
  focusedTab: {
    color: '#f5a623',
  },
  tableSpan: {
    color: '#91949f',
    fontSize: '.875rem',
  },
  tableCell: {
    paddingTop: '0.1rem',
    borderTop: 'none',
    borderBottom: 'none',
  }
}));

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 120,
      width: '100%',
      backgroundColor: '#f5a623',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: '#fff',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: '.75rem',
    // marginRight: theme.spacing(1),
    '&:focus': {
      // opacity: 1,
      color: '#f5a623',
    },
  },
}))((props) => <Tab disableRipple {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#5d19db',
    color: '#91949f',
    fontSize: '.625rem',
    paddingTop: '0.25rem',
    paddingBottom: '0.25rem',
    width: '33%',
    borderTop: '.1rem groove rgba(172, 174, 183, 0.5)',
    borderBottom: '.1rem groove rgba(172, 174, 183, 0.1)',
  },
  body: {
    fontSize: '.625rem',
  },
}))(TableCell);


//set default vars
var stakingContractAddress = ""; // TODO Update after deploy
var inputAssetContractAddress = "0x424b50dcb78f459d11a95beddd13788296281987"; //default PTE
var outputAssetContractAddress = "0x424b50dcb78f459d11a95beddd13788296281987"; //default PTE

var currentStakeInPool = 0;
var tokenAmountToStake = 0;

var pool;
var poolIndice = 0;

//contract data vars, contract objs, abis, decimals
var stakingContract;

var inputAssetContract;
var inputAssetABI; //default
var inputAssetDecimals;

var outputAssetContract;
var outputAssetABI; //default
var outputAssetDecimals;

var poolName = "PEET Staking Pool";
var apyPercent = 200;
var currentAmountStaked = 0;
var poolCap = 1000000000;
var maxStakePerWallet = 100000000;
var poolStartDate = "2021/07/01";
var poolEndDate = "2021/08/01";
var currentStakeInPool = 0;

export default async function Plan() { 
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

  const [value, setValue] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState('');


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // for stake number box
  const handleAmountChange = (event, newValue) => {
    setValue(newValue);
    tokenAmountToStake = newValue;
  };
  const showError = async (message) => {
    setErrorMessage(message);
    await new Promise(r => setTimeout(r, 5000));
    setErrorMessage('');
  }
  const main_ = async () => {
    //Get amount youve staked
    if (library) { //if web3 connected to wallet
      poolIndice = this.props.poolIndice;
      console.log(poolIndice);

      pool = fetchPool(poolIndice);
      console.log(pool);  
      //pool_name, input asset, output asset, base_amount_reward, total_amount_input_pooled, 
                  //max_total_participation, max_wallet_participation, start_date, end_date
      if (pool.length == 9) {
        poolName = pool[0];
        inputAssetContractAddress = pool[1];
        outputAssetContractAddress = pool[2];
        apyPercent = parseFloat(pool[3]);
        currentAmountStaked = parseFloat(pool[4]);
        poolCap = parseFloat(pool[5]);
        maxStakePerWallet = parseFloat(pool[6]);
        poolStartDate = pool[7];
        poolEndDate = pool[8];
      
        stakingContract = new ethers.Contract(stakingContractAddress, stakingABI.abi, library.getSigner());
        console.log(stakingContract);

        const result = await stakingContract.getTotalWalletPoolAmount(poolIndice, account);
        await result.wait();

        currentStakeInPool = ethers.utils.formatUnits(result, inputAssetDecimals);
        console.log(`Amount in pool ${tokenName} pool for ${account}: ${currentStakeInPool}`);


        // grab input asset ABI
        fetch('https://api.bscscan.com/api?module=contract&action=getabi&address='+inputAssetContractAddress)
            .then(response => response.json())
            .then((jsonData) => {
              inputAssetABI = jsonData["result"];
              console.log(jsonData["result"])
            })
            .catch((error) => {
              console.error(error)
              showError(`Refresh the page if this keeps happening. You are likely being ratelimited by BSCscan.com`);
            })
        inputAssetContract = new ethers.Contract(inputAssetContractAddress, inputAssetABI, library.getSigner());
        inputAssetDecimals = await inputAssetContract.decimals();
        
        
        fetch('https://api.bscscan.com/api?module=contract&action=getabi&address='+outputAssetContractAddress)
            .then(response => response.json())
            .then((jsonData) => {
              outputAssetABI = jsonData["result"];
              console.log(jsonData["result"])
            })
            .catch((error) => {
              console.error(error)
              showError(`Refresh the page if this keeps happening. You are likely being ratelimited by BSCscan.com`, error);
            })
        outputAssetContract = new ethers.Contract(outputAssetContractAddress, outputAssetABI, library.getSigner());
        outputAssetDecimals = await outputAssetContract.decimals();
      } else {
        console.log('Could not fetch Pool Data');
        showError('Could not fetch Pool Data');
      }
    
    } else {
      showError(`Please Connect to your Wallet to continue`);
    }
  }

  async function stakeTokens({amount}) {
    try { //approve PTE for staking
      const amountToApprove = ethers.utils.parseUnits(amount, inputAssetDecimals);
      const result = await inputAssetContract.approve(stakingContractAddress, amountToApprove);
      await result.wait();
      console.log(`Token Approval Tx Result: `, result);
    } catch (error) {
      console.error(error);
      if (error.message.includes('MetaMask Tx Signature: User denied transaction signature.')) {
          showError('Transaction cancelled.');
      } else { 
        showError(error.message);
      }
    }
    const _allowance = await stakingContract.allowance(account, stakingContract.address);
    const allowance = parseFloat(_allowance);
    if (allowance >= amount) {
      // try depositing/staking that amount in pool
      try {
        await stakingContract.depositInPool(poolIndice, amount);
        console.log(`Refresh the page to see your new Staked amount`);

          //TODO get a non ERROR function for the success operation popups
          //import SimpleModal from '../components/SimpleModal'
          //setModalOpen(true)
          //<SimpleModal open={modalOpen} setModalOpen={setModalOpen} heading={'Successfully redeemed DITTO'} bodyText={'Refresh page & check wallet balance :)'} />
        showError(`Refresh the page to see your new Staked amount`);

      } catch (error) {
        console.error(error);
        if (error.message.includes('MetaMask Tx Signature: User denied transaction signature.')) {
            showError('Transaction cancelled.');
        } else { 
          showError(error.message);
        }
      }
    } else {
      showError(`Contract is not Approved to stake your tokens. Current approved amount is: `, ethers.utils.parseUnits(allowance, inputAssetDecimals), `desired amount is`, ethers.utils.parseUnits(amount, inputAssetDecimals));
    }
  }

  async function unstakeTokens() {
    try {
      const withdrawl = await stakingContract.withdrawFromPool(poolIndice);
      await withdrawl.wait();
      console.log('Successfully unstaked tokens. Total Reward: ', ethers.utils.parseUnits(withdrawl, outputAssetDecimals));
        
        //TODO get a non ERROR function for the success operation popups
        //import SimpleModal from '../components/SimpleModal'
        //setModalOpen(true)
        //<SimpleModal open={modalOpen} setModalOpen={setModalOpen} heading={'Successfully redeemed DITTO'} bodyText={'Refresh page & check wallet balance :)'} />
      showError(`Successfully unstaked tokens. Total Reward:`, ethers.utils.parseUnits(withdrawl, outputAssetDecimals));

    } catch (error) {
      console.error(error);
      if (error.message.includes('MetaMask Tx Signature: User denied transaction signature.')) {
          showError('Transaction cancelled.');
      } else { 
        showError(error.message);
      }
    }
  }
  main_();
  return (
    <React.Fragment>
      <Container className={classes.container}>
      <Box className={classes.boxContainer}>
          <Box className={classes.boxContent}>
            <Box className={classes.boxHeader}>
              <Box className={classes.boxHeader_section}>
                {/* TODO MAKE THIS LOGO DYNAMIC FOR THE ASSET */}
                <Avatar alt="Token Logo" src="../images/logo.ico" className={classes.avatar} />
                <Box>
                  <Typography className={classes.boxHeaderTitle} variant="caption" gutterBottom>{`${poolName}`}</Typography>
                </Box>
              </Box>
              {/* <Chip className={classes.boxHeaderStatus} label="Pre-Launch" /> */}
            </Box>
            <Box className={classes.boxBody}>
              <Box className={classes.boxBodyLeft}>
                <Box className={classes.boxBodyLeftHeader}>
                  <Box className={classes.boxBodyLeftHeaderTitle}>
                    <Typography className={classes.txt_36} variant="caption" gutterBottom> APY: {`${apyPercent}`}% </Typography>
                  </Box>
                  <Box>
                    <IconButton className={classes.icons}>
                      <SvgIcon>
                        <path d="M4.742 20.652h8.074c.399 0 .668-.27.668-.656V18.25c0-2.684 3.903-4.395 3.903-9.223C17.387 3.93 13.94.52 8.785.52 3.63.52.172 3.93.172 9.027c0 4.829 3.914 6.54 3.914 9.223v1.746c0 .387.258.656.656.656zm.375 3.012h7.324c.575 0 1.043-.469 1.043-1.055s-.468-1.054-1.043-1.054H5.117c-.574 0-1.043.468-1.043 1.054 0 .586.469 1.055 1.043 1.055zm3.668 2.719c1.559 0 2.66-.727 2.777-1.817H6.008c.094 1.09 1.195 1.817 2.777 1.817z"></path>
                      </SvgIcon>
                    </IconButton>
                    <Typography className={classes.boxHeaderTitle} variant="caption" gutterBottom>{`${poolName}`}</Typography>
                  </Box>
                </Box>
                <Box className={classes.boxBodyLeftBody}>
                  <Box className={classes.boxBodyLeftBodyMin}>
                    <Typography className={classes.boxBodyLabel1} variant="body1" gutterBottom>Max Stake:</Typography>
                    <Typography className={classes.boxBodyValue1} variant="body1" gutterBottom>{`${maxStakePerWallet}`}</Typography>
                  </Box>
                  <Box className={classes.boxBodyLeftBodyMin}>
                    <Typography className={classes.boxBodyLabel1} variant="body1" gutterBottom>Total Pooled:</Typography>
                    <Typography className={classes.boxBodyValue1} variant="body1" gutterBottom>{`${currentAmountStaked}`}</Typography>
                  </Box>
                  <Box className={classes.boxBodyLeftBodyMin}>
                    <Typography className={classes.boxBodyLabel1} variant="body1" gutterBottom>Pool Cap:</Typography>
                    <Typography className={classes.boxBodyValue1} variant="body1" gutterBottom>{`${poolCap}`}</Typography>
                  </Box>

                </Box>
                <Box className={classes.boxBodyRightBody}>
                <Box className={classes.boxBodyRightBodyMin}>
                    <Typography className={classes.boxBodyLabel1} variant="body1" gutterBottom>Start Date:</Typography>
                    <Typography className={classes.boxBodyValue1} variant="body1" gutterBottom>{`${poolStartDate}`}</Typography>
                  </Box>
                  <Box className={classes.boxBodyRightBodyMin}>
                    <Typography className={classes.boxBodyLabel1} variant="body1" gutterBottom>End Date:</Typography>
                    <Typography className={classes.boxBodyValue1} variant="body1" gutterBottom>{`${poolEndDate}`}</Typography>
                  </Box>
                  <Box className={classes.boxBodyRightBodyMin}>
                    <Typography className={classes.boxBodyLabel1} variant="body1" gutterBottom>Your Staked Tokens:</Typography>
                    <Typography className={classes.boxBodyValue1} variant="body1" gutterBottom>{`${currentStakeInPool}`}</Typography>
                  </Box>
                  <Box> 
                    <Button variant="outlined" className={classes.outlinedBtn} onClick={() => {stakeTokens(tokenAmountToStake);}}>Stake Tokens</Button>
                  </Box>
                  <br></br>
                   <Box>
                    <TextField variant="outlined" label="Token Amount" defaultValue="0" onChange={handleAmountChange} />
                  </Box><br></br>
                 <Box>
                    <Button variant="outlined" href={`https://exchange.pancakeswap.finance/#/swap?outputCurrency=${inputAssetContractAddress}`}
                          className={classes.outlinedBtn}>BUY TOKENS</Button>
                  </Box>
                  <Box className={classes.boxBodyWithdrawal}>
                    <Button variant="outlined" className={classes.outlinedBtn} onClick={() => {unstakeTokens();}}>UnStake & Harvest Rewards</Button>
                      <LockOpenOutlinedIcon className={classes.icons} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className={classes.tabs}>
          <div className={classes.root}>
            <div className={classes.demo2}>
              <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
                <StyledTab label="Distribution" />
                <StyledTab label="Staking History" />
              </StyledTabs>
              <TabPanel value={value} index={0} className={classes.padding}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Date</StyledTableCell>
                      <StyledTableCell>Amount</StyledTableCell>
                      <StyledTableCell>Type</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" colSpan="3" align="center" className={classes.tableCell}>
                      <Typography variant="body1" className={classes.tableSpan}>No Data Yet</Typography>
                      <img src="/images/2.png" width="110" height="89" />
                    </TableCell>
                  </TableRow>
                  </TableBody>
                </Table>
              </TabPanel>
              <TabPanel value={value} index={1} className={classes.padding}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Date</StyledTableCell>
                      <StyledTableCell>Amount</StyledTableCell>
                      <StyledTableCell>Type</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" colSpan="3" align="center" className={classes.tableCell}>
                      <Typography variant="body1" className={classes.tableSpan}>No Staking History Yet</Typography>
                      <img src="/images/2.png" width="110" height="89" />
                    </TableCell>
                  </TableRow>
                  </TableBody>
                </Table>
              </TabPanel>
            </div>
          </div>
        </Box>
      </Container>
    </React.Fragment>
  );
}
