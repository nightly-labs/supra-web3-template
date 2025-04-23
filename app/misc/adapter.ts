import { type TxnBuilderTypes } from 'supra-l1-sdk'
import { IRawTxObject, NetworkInfo } from './type'

export interface SupraAdatper {
  accounts: string[]
  connect: () => Promise<string[]>
  disconnect: () => Promise<string[]>
  signTransaction: (input: IRawTxObject | TxnBuilderTypes.RawTransaction) => Promise<string>
  signAndSubmitTransaction: (
    input: IRawTxObject | TxnBuilderTypes.RawTransaction
  ) => Promise<string>
  signMessage: (input: { message: string }) => Promise<{ publicKey: string; signature: string }>
  onAccountChange: (input: (newAccount: string) => void) => Promise<void>
  onNetworkChange: (input: (newNetwork: NetworkInfo) => void) => Promise<void>
  getChainId: () => { chainId: number }
}

let _adapter: SupraAdatper
export const getAdapter = async (persisted = true) => {
  if (_adapter) return _adapter
  // @ts-ignore
  const windowNightly = window?.nightly?.supra
  if (!windowNightly) {
    alert('Supra adapter not found, Install Nightly wallet')
    window.open(
      'https://chromewebstore.google.com/detail/nightly/fiikommddbeccaoicoejoniammnalkfa',
      '_blank'
    )
    throw new Error('Supra adapter not found')
  }
  _adapter = windowNightly
  return _adapter
}
