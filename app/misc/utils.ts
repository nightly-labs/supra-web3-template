export interface INetwork {
  buttonName: string
  uiQueue: number
  chainId: number
}

export const NETWORK_MAP: Record<string, INetwork> = {
  '1': {
    uiQueue: 1,
    chainId: 8,
    buttonName: 'Supra Mainnet'
    //   url: "https://fullnode.mainnet.aptoslabs.com/v1",
  },
  '2': {
    uiQueue: 2,
    chainId: 6,
    buttonName: 'Supra Testnet'
    //   url: "https://fullnode.testnet.aptoslabs.com/v1",
  }
}
