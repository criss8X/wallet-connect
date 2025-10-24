import fs from "node:fs/promises";
import path from "node:path";
import { gray, green } from "colorette";
import type { Aliases } from "@/schemas/components.schema.js";
import { ifEndsWithSlash, spinner } from "@/utils.js";

export async function copyConnectWalletTo({
	to,
	aliases,
}: {
	to: string;
	aliases?: Aliases;
}) {
	const copyCompSpinner = spinner("Copying ConnectWallet component...");

	const connectWalletCode = getConnectWalletCode(aliases);

	const pathForFile = path.join(to, "ConnectWallet.tsx");
	await fs.writeFile(pathForFile, connectWalletCode);

	copyCompSpinner.succeed(green("ConnectWallet.tsx is copied!"));

	console.log(gray(`-> ${pathForFile}`));
}

export function getConnectWalletCode(aliases?: Aliases): string {
	const components = ifEndsWithSlash(aliases?.components ?? "@/components/");

	return `import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import type * as AvatarPrimitive from "@radix-ui/react-avatar";
import {
	ChevronDown,
	Copy,
	CopyCheck,
	Droplet,
	Loader,
	LogOut,
	Wallet,
	X,
} from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { Address } from "viem";
import {
	type Connector,
	useAccount,
	useBalance,
	useChainId,
	useConnectors,
	useDisconnect,
	useEnsAvatar,
	useEnsName,
	useSwitchChain,
} from "wagmi";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "${components}/AlertDialog";
import { Avatar, AvatarFallback, AvatarImage } from "${components}/Avatar";
import { Button } from "${components}/Button";

function useAccountActions() {
	const [isCopied, setIsCopied] = useState(false);
	const { address } = useAccount();
	const { disconnectAsync } = useDisconnect();

	const handleCopyToClipboard = async () => {
		if (address === undefined) {
			toast.error("No account connected", { dismissible: true });

			return;
		}

		try {
			await navigator.clipboard.writeText(address);
			setIsCopied(true);
		} catch (err) {
			toast.error("Failed address copy to clipboard", { dismissible: true });

			console.error("Copying address failed: ", err);
		} finally {
			setTimeout(() => setIsCopied(false), 2000);
		}
	};

	const handleDisconnect = async () => {
		try {
			await disconnectAsync();
		} catch (err) {
			toast.error("Disconnect account failed", { dismissible: true });

			console.error("Disconnect account failed:", err);
		}
	};

	return {
		address,
		isCopied,
		handleCopyToClipboard,
		handleDisconnect,
	};
}

export function ConnectWallet() {
	const { address } = useAccount();

	if (address) {
		return (
			<div className="flex gap-2">
				<WagmiAccount address={address}>
					<Button className="w-max px-0.5 py-0.5" variant="outline">
						<AccountBalance className="leading-relaxed ml-1.5 mr-1" />

						<div className="flex gap-2 items-center bg-accent px-1.5 size-full rounded-md">
							<Avatar className="size-5">
								<AccountAvatarImage address={address} />

								<AvatarFallback className="bg-transparent">
									<Wallet />
								</AvatarFallback>
							</Avatar>

							<span className="leading-relaxed">
								{truncateAddress(address)}
							</span>
						</div>
					</Button>
				</WagmiAccount>

				<ChainSwitcherDialog>
					{(currentChainName) => (
						<Button variant="outline" className="px-2">
							<div className="flex gap-2 items-center size-full">
								<span className="leading-relaxed">{currentChainName}</span>
							</div>

							<ChevronDown />
						</Button>
					)}
				</ChainSwitcherDialog>
			</div>
		);
	}

	return (
		<ConnectWalletDialog>
			<Button>
				<Wallet />

				<span className="leading-relaxed">Connect Wallet</span>
			</Button>
		</ConnectWalletDialog>
	);
}

function ConnectWalletDialog({ children }: { children: React.ReactNode }) {
	const connectors = useConnectors();

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Pick Wallet</AlertDialogTitle>

					<AlertDialogDescription>
						Select your preferred wallet provider from the available wallet
						list.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<div className="p-0.5 grid grid-cols-1 md:grid-cols-2 max-h-40 md:max-h-72 gap-4 overflow-y-auto">
					{connectors.map((connector) => (
						<WalletConnectorCard key={connector.id} connector={connector} />
					))}
				</div>

				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

function WalletConnectorCard({ connector }: { connector: Connector }) {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		(async () => {
			const provider = await connector.getProvider();

			setReady(!!provider);
		})();
	}, [connector]);

	return (
		<button
			type="button"
			className="bg-muted rounded-md dark:bg-card h-30 border hover:bg-muted-foreground/15 dark:hover:bg-foreground/10 transition-colors focus:outline-2 disabled:opacity-50 dark:hover:disabled:bg-card hover:disabled:bg-muted disabled:cursor-not-allowed"
			disabled={!ready}
			onClick={() => connector.connect()}
			title={
				!ready
					? \`\${connector.name} not available\`
					: \`Connect with \${connector.name}\`
			}
		>
			<div className="flex flex-col gap-2 items-center justify-center">
				<Avatar className="size-8">
					<AvatarImage src={connector.icon} alt={\`Logo of \${connector.name}\`} />

					<AvatarFallback className="bg-transparent">
						<Wallet />
					</AvatarFallback>
				</Avatar>

				<span>{connector.name}</span>
			</div>
		</button>
	);
}

export function ChainSwitcherDialog({
	children,
}: {
	children: (currentChainName: string) => React.ReactNode;
}) {
	const { switchChain, chains } = useSwitchChain();
	const chainId = useChainId();

	const currentChain = useMemo(
		() => chains.find(({ id }) => id === chainId),
		[chainId, chains],
	);

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				{children(currentChain?.name ?? "Unknown")}
			</AlertDialogTrigger>

			<AlertDialogContent className="sm:max-w-xs gap-6">
				<AlertDialogHeader className="flex relative gap-0">
					<AlertDialogTitle>Switch Chain</AlertDialogTitle>

					<AlertDialogDescription>
						Switch to preferred chain
					</AlertDialogDescription>

					<AlertDialogPrimitive.AlertDialogCancel asChild>
						<Button
							size="icon"
							variant="ghost"
							className="absolute right-0 bottom-1/2 translate-y-1/2"
						>
							<X />
						</Button>
					</AlertDialogPrimitive.AlertDialogCancel>
				</AlertDialogHeader>

				<div className="flex flex-col gap-2 mt-1">
					{chains.length === 0 ? (
						<div className="flex flex-col gap-2 items-center justify-center">
							<Droplet className="size-14" />

							<div className="text-center">No chains available</div>
						</div>
					) : (
						chains.map(({ id, name }) => (
							<Button
								key={id}
								aria-label={\`Switch to \${name}\`}
								aria-selected={id === chainId}
								variant={id === chainId ? "default" : "outline"}
								className="justify-between focus-visible:ring-0 focus-visible:dark:ring-0 aria-[selected=false]:focus-visible:bg-accent aria-[selected=true]:focus-visible:bg-primary/90"
								onClick={() => {
									switchChain(
										{ chainId: id },
										{
											onError: (error) => {
												console.error("Failed to switch chain", error);

												toast.error("Failed to switch chain", {
													dismissible: true,
												});
											},
										},
									);
								}}
							>
								<span>{name}</span>

								{id === chainId && <span className="text-xs">Connected</span>}
							</Button>
						))
					)}
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export function WagmiAccount({
	address,
	children,
}: {
	address: Address;
	children: React.ReactNode;
}) {
	const { handleCopyToClipboard, handleDisconnect, isCopied } =
		useAccountActions();

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

			<AlertDialogContent className="sm:max-w-xs gap-0">
				<AlertDialogHeader>
					<AlertDialogTitle hidden>Account Details</AlertDialogTitle>

					<AlertDialogDescription hidden>
						Details of account {address}
					</AlertDialogDescription>

					<AlertDialogPrimitive.AlertDialogCancel asChild>
						<Button size="icon" variant="ghost" className="ml-auto">
							<X />
						</Button>
					</AlertDialogPrimitive.AlertDialogCancel>
				</AlertDialogHeader>

				<div className="flex flex-col items-center gap-3 text-foreground">
					<Avatar className="size-16">
						<AccountAvatarImage address={address} />

						<AvatarFallback>
							<Wallet />
						</AvatarFallback>
					</Avatar>

					<div className="flex flex-col items-center">
						<span className="opacity-80">{truncateAddress(address)}</span>

						<AccountBalance as="h1" />
					</div>
				</div>

				<AlertDialogFooter className="w-full flex gap-4 justify-between mt-4">
					<WagmiAccountActionCard onClick={handleCopyToClipboard}>
						{isCopied ? <CopyCheck /> : <Copy />}
						Copy Address
					</WagmiAccountActionCard>

					<WagmiAccountActionCard onClick={handleDisconnect}>
						<LogOut />
						Disconnect
					</WagmiAccountActionCard>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

function WagmiAccountActionCard({
	onClick,
	children,
}: {
	onClick: () => void;
	children: React.ReactNode;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="select-none disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer w-full h-16 gap-1 hover:bg-accent/90 bg-accent/50 rounded-md flex items-center justify-center flex-col text-xs [&_svg]:size-5"
		>
			{children}
		</button>
	);
}

type AccountAvatarImageProps = Omit<
	React.ComponentProps<typeof AvatarPrimitive.Image>,
	"children" | "asChild"
> & {
	address: Address;
	defaultAvatarUrl?: string | undefined;
};

export function AccountAvatarImage({
	className = "size-5",
	address,
	defaultAvatarUrl = \`https://effigy.im/a/\${address}.svg\`,
	...props
}: AccountAvatarImageProps) {
	const { data: ensName } = useEnsName({
		address,
		query: { select: (data) => data ?? undefined },
	});

	const { data: ensAvatar } = useEnsAvatar({
		name: ensName,
		query: {
			enabled: ensName !== undefined,
			select: (data) => data ?? undefined,
		},
	});

	return <AvatarImage {...props} src={ensAvatar ?? defaultAvatarUrl} />;
}

type AccountBalanceProps<T extends React.ElementType> = {
	as?: T;
	className?: string;
} & React.ComponentPropsWithoutRef<T>;

export function AccountBalance<T extends React.ElementType = "span">({
	className = "font-medium text-lg",
	as: Component,
	...props
}: AccountBalanceProps<T>) {
	const { address } = useAccount();

	const { data, isLoading, error, isError } = useBalance({
		address,
		query: { enabled: address !== undefined },
	});

	const Comp = Component ?? "span";

	useEffect(() => {
		if (!isError) {
			return;
		}

		toast.error("Error obtaining balance, reload the page", {
			dismissible: true,
		});

		console.error("Error obtaining balance", error);
	}, [isError, error]);

	return (
		<Comp className={className} {...props}>
			{isLoading ? (
				<Loader className="animate-spin" />
			) : isError || data === undefined ? (
				"Err"
			) : (
				\`\${data.formatted} \${data.symbol}\`
			)}
		</Comp>
	);
}

export function truncateAddress(address: Address): string {
	const start = address.slice(0, 4);
	const end = address.slice(-10, -1);

	return \`\${start}...\${end}\`;
}
`;
}
