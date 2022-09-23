import React, { useState } from 'react'
import Link from 'next/link'
import { useAccount, useDisconnect, useConnect } from 'wagmi'

const MainNav:React.FC = () => {
  const [show, setShow] = useState(false);

  const { connect, connectors, isLoading, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()
  const { address, isConnected } = useAccount()

  const accountEllipsis = address ? `${address.substring(0, 4)}...${address.substring(address.length - 4)}` : null

  return(
    <>
      <div className='mainnavcorner border-b border-gray-600 h-20 abel z-10 px-4'>
        <div className='relative flex items-center container mx-auto justify-between items-center h-full'>
          <div className='flex items-end gap-10'>
            <Link href='/' passHref>
              <p className='primary-button text-5xl font-bold text-gray-600 cursor-pointer hidden md:block'>Donation</p>
            </Link>
            <div className='flex items-end gap-5'>
              <Link href='/' passHref>
                <p className='text-xl text-indigo-500 cursor-pointer'>Donate</p>
              </Link>
              <Link href='/withdraw' passHref>
                <p className='text-xl text-indigo-500 cursor-pointer'>Withdraw</p>
              </Link>
            </div>
          </div>

          {
            isConnected ? (
              <button
                onClick={() => disconnect()}
                className="text-white border px-2 h-12 rounded-lg text-lg text-center inline-flex items-center text-gray-600"
              >
                {accountEllipsis}
              </button>
            ) : (
              <button
                onClick={() => setShow(true)}
                className="text-white border px-2 h-12 rounded-lg text-lg text-center inline-flex items-center text-gray-600"
              >
                Connect
              </button>
            )
          }
        </div>
      </div>
      {
        show && (
          <div tabIndex={-1} className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full justify-center items-center bg-gray-300">
            <div className="relative p-4 h-auto w-80 translate-x-[-50%] translate-y-[-50%] top-1/2 left-1/2">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                  {connectors.map((connector: any) => (
                    <button
                      disabled={!connector.ready}
                      key={connector.id}
                      onClick={() => {
                        connect({ connector })
                        setShow(false)
                      }}
                      className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                      {connector.name}
                      {!connector.ready && ' (unsupported)'}
                      {isLoading &&
                        connector.id === pendingConnector?.id &&
                        ' (connecting)'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default MainNav