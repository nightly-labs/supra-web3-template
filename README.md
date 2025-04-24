# supra-web3-template

## LIVE DEMO

[supra-web3-template.nightly.app](https://supra-web3-template.nightly.app/)

## Nightly Wallet Interface

The following documentation describes the Nightly Wallet interface that is accessible via `window.nightly.supra`. This interface provides methods for connecting to web3 applications, managing accounts, signing transactions, and handling network changes.

### Interface Definition

```typescript
export interface SupraAdatper {
  accounts: string[]
  connect: () => Promise<string[]>
  disconnect: () => Promise<string[]>
  signTransaction: (input: IRawTxObject | TxnBuilderTypes.RawTransaction) => Promise<string>
  signAndSubmitTransaction: (
    input: IRawTxObject | TxnBuilderTypes.RawTransaction
  ) => Promise<string>
  signMessage: (input: { message: string }) => Promise<{ publicKey: string; signature: string }>
  getChainId: () => { chainId: number }
  changeNetwork: (input: { chainId: number }) => Promise<boolean>
  onAccountChange: (input: (newAccount: string) => void) => Promise<void>
  onNetworkChange: (input: (newNetwork: { chainId: number }) => void) => Promise<void>
}
```

## Example Usage

For implementation examples, please visit: [supra-web3-template-example](https://github.com/nightly-labs/supra-web3-template/blob/main/app/components/StickyHeader.tsx)
