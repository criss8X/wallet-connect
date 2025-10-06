import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type Config, createConfig, http, WagmiProvider } from "wagmi";
import { base, mainnet } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";
import { Toaster } from "@/components/Sonner";

export const WAGMI_CONFIG: Config = createConfig({
	chains: [mainnet, base],
	connectors: [
		injected(),
		walletConnect({ projectId: "5ab49edfff6f8fd1a255f08c558b718c" }),
		metaMask(),
		safe(),
	],
	transports: {
		[mainnet.id]: http(),
		[base.id]: http(),
	},
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<WagmiProvider config={WAGMI_CONFIG}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>

			<Toaster />
		</WagmiProvider>
	);
}
