export function chainSelectorTemplate({
	alertDialogImport,
	buttonImport,
}: {
	alertDialogImport: string;
	buttonImport: string;
}) {
	return `
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { ChevronDown, Droplet, X } from "lucide-react";
import { useMemo } from "react";
import { toast } from "sonner";
import { useChainId, useSwitchChain } from "wagmi";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "${alertDialogImport}";
import { Button } from "${buttonImport}";

export function ChainSelector() {
  const { switchChain, chains } = useSwitchChain();
  const chainId = useChainId();

  const currentChain = useMemo(
    () => chains.find(({ id }) => id === chainId),
    [chainId, chains],
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="px-2">
          <div className="flex gap-2 items-center size-full">
            <span className="leading-relaxed">
              {currentChain?.name ?? "Unknown"}
            </span>
          </div>

          <ChevronDown />
        </Button>
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
`;
}
