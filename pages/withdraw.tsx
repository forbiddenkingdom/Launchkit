import { useState } from 'react'
import Head from 'next/head'

import MainNav from '../components/MainNav'
import Footer from '../components/Footer'

import Donation from '../services/abis/Donation.json'
import { contractAddress } from '../utils/constants'

import {
  useContract,
  useSigner
} from 'wagmi'

import { ethers } from 'ethers'

export default function Withdraw() {
  const { data: signer } = useSigner()

  const contract = useContract({
    addressOrName: contractAddress,
    contractInterface: Donation,
    signerOrProvider: signer,
  })

  const [amount, setAmount] = useState(0);

  const withdraw = () => {
    try {
      contract.withdraw(ethers.utils.parseEther(amount.toString()))
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='w-full main'>
      <Head>
        <title>Donation Project</title>
        <meta name='description' content='Test Project'/>
        <link rel='icon' href='/static/favicon.ico' />
      </Head>

      <MainNav />

      <div className='w-full h-screen flex flex-col justify-center items-center'>
        <p className='text-5xl text-bold text-black'>WITHDRAW</p>
        <div className="flex justify-center gap-5 mt-10">
          <div className="mb-3 xl:w-96">
            <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700">Amount</label>
            <input
              type="number"
              className="
                form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
              "
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="flex space-x-2 justify-center mt-5">
          <button
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={withdraw}
          >
            Withdraw
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
