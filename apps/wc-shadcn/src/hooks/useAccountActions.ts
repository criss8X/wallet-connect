import { useState } from "react";
import { toast } from "sonner";
import { useAccount, useDisconnect } from "wagmi";

export function useAccountActions() {
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
