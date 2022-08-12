import { contract, Web3, artifacts, assert, expect } from "hardhat";
import { arg } from "../helpers/constants";
import { sleep, toNormalUnit } from "../helpers/testHelpers";

const relayhubMumbaiContract = '0x6646cD15d33cE3a6933e36de38990121e8ba2806'

const WhitelistPaymaster = artifacts.require('WhitelistPaymaster')
const CaptureTheFlags = artifacts.require('CaptureTheFlags')
const Deposit = artifacts.require('depositorOpenGsnV2')

const log = (msg: string, ...optParam: any[]) => console.info(`(i) ${msg}`, ...optParam, '\n')

contract("CaptureTheFlags", (accounts) => {
  const me = (this as any)
  before(async () => {
    console.log(accounts, '@myAccounts?')
    const web3 = new Web3(Web3.givenProvider || 'https://polygon-mumbai.infura.io/v3/2abf317ac68f47b1890e187c552dcdc1')

    const meBalance = await web3.eth.getBalance(accounts[0])
    const chainId = await web3.eth.getChainId()
    log('Chain ID ==> ', chainId)
    log('Balance ==> ', meBalance)

    me.balance = meBalance
    me.chainId = chainId
  })
  it('Deployment ... ', async () => {
    log('Deploying CaptureTheFlags ...')
    const deployedCaptureTheFlags = await CaptureTheFlags.new(arg[0], { from: accounts[0] })
    const captureTheFlagsAddr = deployedCaptureTheFlags.address
    log('CaptureTheFlag Deployed ==> ', captureTheFlagsAddr)

    log('Deploying Paymaster ...')
    const deployedWhitelistPaymaster = await WhitelistPaymaster.new({ from: accounts[0] })
    const whitelistPaymasterAddr = deployedWhitelistPaymaster.address
    log('WhitelistPaymaster Deployed ==> ', whitelistPaymasterAddr)

    log('Deploying Deposit ...')
    const deployedDepositOpenGsn = await Deposit.new(relayhubMumbaiContract, { from: accounts[0] })
    const depositOpenGsnAddr = deployedDepositOpenGsn.address
    log('DepositOpenGsn Deployed ==> ', depositOpenGsnAddr)

    me.account = accounts[0]
    me.CaptureTheFlags = deployedCaptureTheFlags
    me.WhitelistPaymaster = deployedWhitelistPaymaster
    me.Deposit = deployedDepositOpenGsn

    expect(whitelistPaymasterAddr).to.be.a('string')
  })
  it('Check me as any ...', () => {
    assert.equal(me.account, accounts[0])
    expect(me).to.be.an('object')
  })
  it('Setting paymaster ...', async () => {
    log('Set RelayHub ...')
    const setRelayhub = await me.WhitelistPaymaster.setRelayHub(relayhubMumbaiContract)
    log('Success set relayHub [tx] ==> ', setRelayhub.tx)
    await sleep(15) //wait in seconds

    log('Set Forwarder...')
    const setForwarder = await me.WhitelistPaymaster.setTrustedForwarder(arg[0])
    log('Success set forwarder [tx] ==> ', setForwarder.tx)
    await sleep(15) //wait in seconds

    log('Set whitelist target ...')
    const setWhilelistTarget = await me.WhitelistPaymaster.whitelistTarget(me.CaptureTheFlags.address)
    log('Success set whitelist target [tx] ==> ', setWhilelistTarget.tx)

    expect(setWhilelistTarget.tx).to.be.a('string')
  })
  it('Deposit', async () => {
    log('Deposit 2 matic')
    log(`Will deposit 2 matic as ${toNormalUnit(2, 18)}`)
    const depositMatic = await me.Deposit.deposit(me.WhitelistPaymaster.address, { from: accounts[0], value: toNormalUnit(2, 18) })
    log('Success deposit 2 matic [obj] ==> ', depositMatic)
  })
  it('Simulating transaction', async () => {
    log('Current balance ==> ', me.balance)

    log('Capturing the flags ...')
    const capturingTheFlags = await me.CaptureTheFlags.captureTheFlags()
    log('Capture the flags [tx] ==> ', capturingTheFlags.tx)
    await sleep(30) //wait in seconds

    log('After balance ==> ', me.balance)
    expect(capturingTheFlags).to.be.an('object')
  })
})