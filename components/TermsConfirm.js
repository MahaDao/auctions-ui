/** @jsx jsx */

import React, { useState } from 'react';
import {
  Heading,
  Text,
  jsx,
  Button,
  Grid,
  Box,
  Styled,
  Label,
  Input,
  Checkbox,
  Flex,
  NavLink
} from 'theme-ui';
import Link from 'next/link';

const TermsConfirm = ({onConfirm, confirmed}) => {
  const _onConfirm = () => {
    console.log( 'here')
    onConfirm()
  }
  return (
    <Box sx={{
      p: 6,
      pt: 0
    }}>
    <Box sx={{
      p: 6,
      bg: 'background',
      borderRadius: 6
    }}>
      <Text variant="boldBody" pb="2">Please accept the Terms and Conditions before bidding</Text>
      <Flex sx={{
        alignItems: 'center'
      }}>

        <Box onClick={_onConfirm}>
        <Checkbox as="input" defualtChecked={confirmed} onChange={_onConfirm}/>
        </Box>
        <Label
          sx={{
            pl: 0
          }}
        >
          <Text
          variant="inputText"
          
          >
          I have read and accept these{" "}
          <Link href="/terms" sx={{
            display: 'inline'
          }}>Terms and Conditions</Link>
          </Text>
        </Label>
      </Flex>
    </Box>
    </Box>
  );
};

export default TermsConfirm;