import { type TxnBuilderTypes } from 'supra-l1-sdk'
import { IRawTxObject } from './type'

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

let _adapter: SupraAdatper
export const getAdapter = async (persisted = true) => {
  if (_adapter) return _adapter
  // @ts-ignore
  const windowNightly = window?.nightly?.supra
  if (!windowNightly) {
    alert('Supra adapter not found, Install Nightly wallet')
    window.open('https://nightly.app/download', '_blank')
    throw new Error('Supra adapter not found')
  }
  _adapter = windowNightly
  return _adapter
}
