import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

// Import styles for the wallet modal
require('@solana/wallet-adapter-react-ui/styles.css');

const WalletContext = ({ children }) => {
    const network = 'devnet';
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

const DAppContent = () => {
    const { publicKey } = useWallet();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <h1>Solana Follower Check</h1>
            <WalletMultiButton />
            {publicKey && (
                <div style={{ marginTop: '20px' }}>
                    <p>Connected: {publicKey.toBase58()}</p>
                </div>
            )}
        </div>
    );
};

export default function App() {
    return (
        <WalletContext>
            <DAppContent />
        </WalletContext>
    );
}
