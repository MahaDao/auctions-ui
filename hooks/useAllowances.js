import { useEffect, useState } from 'react';
import useMaker from './useMaker';
import { AUCTION_DATA_FETCHER } from '../constants';

const REQUIRED_ALLOWANCE = 0;

const useAllowances = () => {
  const { maker, web3Connected } = useMaker();
  const [hasDaiAllowance, setHasDaiAllowance] = useState(false);
  const [hasMkrAllowance, setHasMkrAllowance] = useState(false);
  const [hasEthFlipHope, setHasFlipEthHope] = useState(false);
  const [hasJoinDaiHope, setHasJoinDaiHope] = useState(false);
  const [hasFlopHope, setHasFlopHope] = useState(false);

  // DAI Allowance
  useEffect(() => {
    if (!web3Connected) return;
    (async () => {
      const joinDaiAdapterAddress = maker.service(AUCTION_DATA_FETCHER)
        .joinDaiAdapterAddress;
      const daiAllowance = await maker
        .getToken('MDAI')
        .allowance(maker.currentAddress(), joinDaiAdapterAddress);
      setHasDaiAllowance(daiAllowance.gt(REQUIRED_ALLOWANCE) ? true : false);
    })();
  }, [maker, web3Connected]);

  // MKR Allowance
  useEffect(() => {
    if (!web3Connected) return;
    (async () => {
      const joinDaiAdapterAddress = maker.service(AUCTION_DATA_FETCHER)
        .joinDaiAdapterAddress;
      const mkrAllowance = await maker
        .getToken('MDAI')
        .allowance(maker.currentAddress(), joinDaiAdapterAddress);
      setHasMkrAllowance(mkrAllowance.gt(REQUIRED_ALLOWANCE) ? true : false);
    })();
  }, [maker, web3Connected]);

  // Flip ETH has Hope
  useEffect(() => {
    if (!web3Connected) return;
    (async () => {
      const flipEthAddress = maker.service(AUCTION_DATA_FETCHER).flipEthAddress;
      const can = await maker
        .service('smartContract')
        .getContract('MCD_VAT')
        .can(maker.currentAddress(), flipEthAddress);
      setHasFlipEthHope(can.toNumber() === 1 ? true : false);
    })();
  }, [maker, web3Connected]);

  // Join DAI has Hope
  useEffect(() => {
    if (!web3Connected) return;
    (async () => {
      const joinDaiAdapterAddress = maker.service(AUCTION_DATA_FETCHER)
        .joinDaiAdapterAddress;
      const can = await maker
        .service('smartContract')
        .getContract('MCD_VAT')
        .can(maker.currentAddress(), joinDaiAdapterAddress);
      setHasJoinDaiHope(can.toNumber() === 1 ? true : false);
    })();
  }, [maker, web3Connected]);

  // Flop has Hope
  useEffect(() => {
    if (!web3Connected) return;
    (async () => {
      const flopAddress = maker.service(AUCTION_DATA_FETCHER).flopAddress;
      const can = await maker
        .service('smartContract')
        .getContract('MCD_VAT')
        .can(maker.currentAddress(), flopAddress);
      setHasFlopHope(can.toNumber() === 1 ? true : false);
    })();
  }, [maker, web3Connected]);

  const giveDaiAllowance = async address => {
    try {
      await maker.getToken('MDAI').approveUnlimited(address);
      setHasDaiAllowance(true);
    } catch (err) {
      const message = err.message ? err.message : err;
      const errMsg = `unlock dai tx failed ${message}`;
      console.error(errMsg);
    }
  };

  const giveMkrAllowance = async address => {
    try {
      await maker.getToken('MKR').approveUnlimited(address);
      setHasMkrAllowance(true);
    } catch (err) {
      const message = err.message ? err.message : err;
      const errMsg = `unlock mkr tx failed ${message}`;
      console.error(errMsg);
    }
  };

  const giveFlipEthHope = async address => {
    try {
      await maker
        .service('smartContract')
        .getContract('MCD_VAT')
        .hope(address);
      setHasFlipEthHope(true);
    } catch (err) {
      const message = err.message ? err.message : err;
      const errMsg = `hope tx failed ${message}`;
      console.error(errMsg);
    }
  };

  const giveJoinDaiHope = async address => {
    try {
      await maker
        .service('smartContract')
        .getContract('MCD_VAT')
        .hope(address);
      setHasJoinDaiHope(true);
    } catch (err) {
      const message = err.message ? err.message : err;
      const errMsg = `hope tx failed ${message}`;
      console.error(errMsg);
    }
  };

  const giveFlopHope = async address => {
    try {
      await maker
        .service('smartContract')
        .getContract('MCD_VAT')
        .hope(address);
      setHasFlopHope(true);
    } catch (err) {
      const message = err.message ? err.message : err;
      const errMsg = `hope tx failed ${message}`;
      console.error(errMsg);
    }
  };

  return {
    hasDaiAllowance,
    hasMkrAllowance,
    hasEthFlipHope,
    hasJoinDaiHope,
    hasFlopHope,
    giveDaiAllowance,
    giveMkrAllowance,
    giveFlipEthHope,
    giveJoinDaiHope,
    giveFlopHope
  };
};

export default useAllowances;
