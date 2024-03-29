import { createWeb3Modal } from '@web3modal/wagmi/react'

import { http, createConfig, WagmiProvider } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { walletConnect, injected, coinbaseWallet } from 'wagmi/connectors'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '97d9f5aedf03f3b6dbcbbe333ddbbe73'
// const projectId = 'YOUR_PROJECT_ID'

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// const config = createConfig({
//   chains: [mainnet, sepolia],
//   transports: {
//     [mainnet.id]: http(),
//     [sepolia.id]: http()
//   },
//   connectors: [
//     walletConnect({ projectId, metadata, showQrModal: false }),
//     injected({ shimDisconnect: true }),
//     coinbaseWallet({
//       appName: metadata.name,
//       appLogoUrl: metadata.icons[0]
//     })
//   ]
// })

// function createConfig(configObject: ConfigType) {
//   // Function body
// }

  const config = createConfig({
    chains: [mainnet, sepolia],
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http()
    },
    connectors: [
      walletConnect({ projectId, metadata, showQrModal: false }),
      injected({ shimDisconnect: true }),
      coinbaseWallet({
        appName: metadata.name,
        appLogoUrl: metadata.icons[0]
      })
    ]
  });



// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

// function ContextProvider({ children }) {
  function ContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider