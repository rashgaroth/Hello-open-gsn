import { ethers, network, run } from "hardhat"
import { arg } from "../helpers/constants"
import { sleep, toNormalUnit } from "../helpers/testHelpers"

const log = (msg: string, ...optParam: any[]) => {
  console.info(`(i) ${msg}`, ...optParam, '\n')
}

interface IDeployedContracts {
  address: string
  arg: any[]
}

async function main() {
  // initials
  const relayhubMumbaiContract = '0x6646cD15d33cE3a6933e36de38990121e8ba2806'
  const deployedContracts: IDeployedContracts[] = []
  const Capture = await ethers.getContractFactory("CaptureTheFlags")
  const Paymaster = await ethers.getContractFactory("WhitelistPaymaster")
  const Depositor = await ethers.getContractFactory("depositorOpenGsnV2")

  const deployedCapture = await Capture.deploy(arg[0])
  await deployedCapture.deployed()
  log('Capture address ==> ', deployedCapture.address)
  deployedContracts.push({
    address: deployedCapture.address,
    arg: [arg[0]]
  })
  await sleep(15)

  const deployedPaymaster = await Paymaster.deploy()
  await deployedPaymaster.deployed()
  log('Paymaster address ==> ', deployedPaymaster.address)
  deployedContracts.push({
    address: deployedPaymaster.address,
    arg: []
  })
  await sleep(15)

  const deployedDepositor = await Depositor.deploy(relayhubMumbaiContract)
  await deployedDepositor.deployed()
  log('Depositor address ==> ', deployedDepositor.address)
  deployedContracts.push({
    address: deployedDepositor.address,
    arg: [relayhubMumbaiContract]
  })
  await sleep(15)

  // paymaster settings
  const setRelayHub = await deployedPaymaster.setRelayHub(relayhubMumbaiContract)
  await setRelayHub.wait()
  log('Set relayhub done')
  const setForwarder = await deployedPaymaster.setTrustedForwarder(arg[0])
  await setForwarder.wait()
  log('Set forwarder done')
  const setWhitelistTarget = await deployedPaymaster.whitelistTarget(deployedCapture.address)
  await setWhitelistTarget.wait()
  log('Set whitelist done')

  // verifying contracts
  log('Verifying all contracts')
  const promiseArray = []
  for (let i = 0; i < deployedContracts.length; i++) {
    promiseArray.push(
      await run('verify:verify', {
        address: deployedContracts[i].address,
        constructorArguments: deployedContracts[i].arg
      })
    )
  }
  await Promise.all(promiseArray).catch(console.log)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

