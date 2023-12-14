import type { AppProps } from 'next/app';
import './globals.css'; 

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  goerli,
  polygonMumbai,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { GlobalContextProvider } from '@/context/store';
import Layout from './layout';

const { chains, publicClient } = configureChains(
    [goerli],
    [
      alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_INFRA_KEY as string }),
      publicProvider()
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
    chains
  });
  
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
  })
  

function MyApp({ Component, pageProps }: AppProps) {
  return( 
    <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <GlobalContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </GlobalContextProvider>
        </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;