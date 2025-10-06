import type { Meta, StoryObj } from "@storybook/react-vite";

import { ConnectWallet } from "../components/ConnectWallet";

const meta = {
	component: ConnectWallet,
} satisfies Meta<typeof ConnectWallet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
