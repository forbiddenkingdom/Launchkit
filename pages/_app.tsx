import '../styles/globals.css'
import type { AppProps } from 'next/app'

import {
  WagmiConfig,
  defaultChains,
  configureChains,
  createClient,
  chain
} from 'wagmi'

import { publicProvider } from 'wagmi/providers/public'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const CoinbaseConnector = new CoinbaseWalletConnector({
  chains: [chain.mainnet, chain.optimism],
  options: {
    appName: 'wagmi.sh',
    jsonRpcUrl: 'https://eth-mainnet.alchemyapi.io/v2/yourAlchemyId',
  },
})

const MetaMask = new MetaMaskConnector({
  chains: [chain.mainnet, chain.optimism],
  options: {
    shimChainChangedDisconnect: false, //prevents the "disconnect" event from being emitted upon switching chains
  },
})

function MyApp({ Component, pageProps }: AppProps) {
	const { provider } = configureChains(defaultChains, [
    publicProvider(),
  ])

	const wagmiClient = createClient({
	  autoConnect: true,
	  connectors: [MetaMask, CoinbaseConnector],
	  provider,
	})

  return (
    <WagmiConfig client={wagmiClient}>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}

export default MyApp
