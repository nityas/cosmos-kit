import { Chain } from '@chain-registry/types';
import { IconType } from 'react-icons';

import { ChainWalletBase, MainWalletBase } from './bases';
import { WalletManager } from './wallet-manager';
// import { ChainOption } from "@/components";

export interface ChainWalletData {
  address?: string;
}

export interface ExtendedChainWalletData extends ChainWalletData {
  [k: string]: unknown;
}

export interface WalletData {
  username?: string;
}

export interface ExtendedWalletData extends WalletData {
  [k: string]: unknown;
}

export interface ExtendedMainWallet extends MainWalletBase<unknown, ExtendedWalletData, any> {
  [k: string]: unknown;
}
export interface ExtendedChainWallet extends ChainWalletBase<unknown, ExtendedChainWalletData, unknown> {
  [k: string]: unknown;
}
export type ExtendedWallet = ExtendedMainWallet | ExtendedChainWallet;

export enum State {
  Init = 'Init',
  Pending = 'Pending',
  Done = 'Done',
  Error = 'Error',
}

export enum WalletStatus {
  Disconnected = "Disconnected",
  Connecting = "Connecting",
  Connected = "Connected",
  NotExist = "NotExist",
  Rejected = "Rejected"
}

export interface Mutable<T> {
  state: State;
  data?: T;
  message?: string;
}

export type ChainName = string;
export type WalletName = string;

export type Dispatch<T> = (value: T) => void;

export interface Registry<Name> {
  name: Name;
  active: boolean;
}

interface Icon {
  browser?: string;
  os?: string;
  icon: IconType;
  link: string;
}

export interface WalletRegistry extends Registry<WalletName> {
  wallet: ExtendedMainWallet;
  prettyName: string;
  isQRCode: boolean;
  downloads?: {
    default: string;
    desktop?: Icon[];
    tablet?: Icon[];
    mobile?: Icon[];
  },
  logo?: string;
  qrCodeLink?: string;
}

export interface ChainRegistry extends Registry<ChainName> {
  raw?: Chain;
}

// export interface ChainSelectorProps {
//     name: ChainName;
//     setName: Dispatch<ChainName>;
//     chainOptions: ChainOption[];
// }

export interface WalletModalProps {
  isOpen: boolean;
  setOpen: Dispatch<boolean>;
  chainName?: string;
}

export interface DefinedActions {
  state?: Dispatch<State>;
  data?: Dispatch<Object | undefined>;
  message?: Dispatch<string | undefined>;
  walletName?: Dispatch<WalletName | undefined>;
  chainName?: Dispatch<ChainName | undefined>,
  modalOpen?: Dispatch<boolean>;
  qrUri?: Dispatch<string | undefined>;
}

export interface Actions extends DefinedActions {
  [k: string]: Dispatch<any> | undefined;
}

export interface Autos {
  connectWhenInit?: boolean;
  connectWhenCurrentChanges?: boolean;
  closeModalWhenWalletIsConnected?: boolean;
  closeModalWhenWalletIsDisconnected?: boolean;
  closeModalWhenWalletIsRejected?: boolean;
}