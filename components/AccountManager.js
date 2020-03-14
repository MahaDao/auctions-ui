/** @jsx jsx */

import React from 'react';
import { Heading, Text, jsx, Box, Button, Grid, Styled, Input, Flex } from 'theme-ui'

export default ({ web3Connected }) => {
  if (!web3Connected) {
    return (
      <Flex sx={{
        justifyContent: 'center',
        py: 4
      }}>
      <Heading as="h2" variant="h2" sx={{
        mb: 2,
      }}>To participate in auctions, connect your wallet</Heading>
     </Flex> 
    )
  }
  return <Box sx={{
    textAlign: 'center',
    mx: 'auto',
    py: 8

  }}>

    <Heading as="h2" variant="h2" sx={{
      mb: 5,
    }}>To participate in auctions you need to sign these 3 approval transactions</Heading>
    
    <Grid sx={{
      maxWidth: '200px',
      mx: 'auto',

    }}>
      <Button>Unlock Dai in your wallet</Button>
      <Button>Unlock Dai in the adaptor</Button>
      <Button>Unlock Dai in the VAT</Button>
      </Grid>
     </Box>;
};
