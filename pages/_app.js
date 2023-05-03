import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { sepolia, arbitrum, mainnet, polygon } from 'wagmi/chains'

const chains = [arbitrum, mainnet, polygon, sepolia]
const projectId = '8688e77f5658e94f5380c5968b4e8a58'

const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})
const ethereumClient = new EthereumClient(wagmiClient, chains)

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      {/* <WagmiConfig client={wagmiClient}> */}
      <Component {...pageProps} />
      {/* </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} /> */}
    </ChakraProvider>
  )
}
