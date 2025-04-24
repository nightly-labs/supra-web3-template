/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { toast } from 'sonner'
import { BCS, HexString, SupraClient } from 'supra-l1-sdk'
import nacl from 'tweetnacl'
import { getAdapter } from '../misc/adapter'
import { IRawTxObject } from '../misc/type'
import ActionStarryButton from './ActionStarryButton'
import ChangeNetworkButton from './ChangeNetworkButton'
import StarryButton from './StarryButton'

const remove0xPrefix = (hexString: string) => {
  return hexString.startsWith('0x') ? hexString.slice(2) : hexString
}

const RECEIVER_TEST_ADDRESS = '0xdd284fb30311654251f1bc7ee9293962e1f28177534a56185ad5a553a72ed911'
const AMOUNT_IN_BIG_INT = BigInt('1000000')
const RECEIVER_ACCOUNT = HexString.ensure(RECEIVER_TEST_ADDRESS)

const HARDCODED_RPC_BY_CHAIN_ID: Record<number, string> = {
  6: 'https://rpc-testnet.supra.com/',
  8: 'https://rpc-mainnet.supra.com/'
}

const HARDCODED_EXPLORER_BY_CHAIN_ID: Record<number, string> = {
  6: 'https://testnet.suprascan.io/tx/',
  8: 'https://suprascan.io/tx/'
}

const HARDCODED_CHAIN_NEME_BY_CHAIN_ID: Record<number, string> = {
  6: 'Supra Testnet',
  8: 'Supra Mainnet'
}
const StickyHeader: React.FC = () => {
  const [userAccount, setUserAccount] = React.useState<string | undefined>()
  const [chainId, setChainId] = React.useState<number | undefined>()

  const handleSubsribeChangeNetwork = (input: { chainId: number }) => {
    setChainId(input.chainId)
  }
  const handleSubsribeChangeUserAddress = (newAccount: string) => {
    setUserAccount(newAccount)
  }

  const supraChainName = React.useMemo(() => {
    if (chainId !== undefined) {
      return HARDCODED_CHAIN_NEME_BY_CHAIN_ID[chainId]
    }
    return undefined
  }, [chainId])

  return (
    <header className='fixed top-0 left-0 w-full bg-opacity-50  p-6 z-10'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col space-y-4'>
          <StarryButton
            connected={userAccount !== undefined}
            onConnect={async () => {
              const adapter = await getAdapter()
              try {
                const response = await adapter.connect()
                // Subscribe to events
                adapter.onAccountChange(handleSubsribeChangeUserAddress)
                adapter.onNetworkChange(handleSubsribeChangeNetwork)

                setUserAccount(response[0])
                const { chainId } = adapter.getChainId()
                setChainId(chainId)
                toast.success('Wallet connected!')
              } catch (error) {
                toast.error('Wallet connection failed!')
                // If error, disconnect ignore error
                await adapter.disconnect().catch(() => {})
              }
            }}
            onDisconnect={async () => {
              try {
                const adapter = await getAdapter()
                await adapter.disconnect()
                setUserAccount(undefined)
              } catch (error) {
                console.log(error)
              }
            }}
            publicKey={userAccount}
          />
          {userAccount && (
            <>
              <ActionStarryButton
                onClick={async () => {
                  const signTransaction = async () => {
                    const adapter = await getAdapter()
                    const { chainId } = adapter.getChainId()
                    const supra = SupraClient.init(HARDCODED_RPC_BY_CHAIN_ID[chainId])
                    const sequenceNumber = await (
                      await supra
                    ).getAccountInfo(HexString.ensure(userAccount))
                    const rawTx: IRawTxObject = {
                      senderAddr: HexString.ensure(userAccount),
                      senderSequenceNumber: BigInt(sequenceNumber.sequence_number),
                      moduleAddr:
                        '0x0000000000000000000000000000000000000000000000000000000000000001',
                      moduleName: 'supra_account',
                      functionName: 'transfer',
                      functionTypeArgs: [],
                      functionArgs: [
                        RECEIVER_ACCOUNT.toUint8Array(),
                        BCS.bcsSerializeUint64(AMOUNT_IN_BIG_INT)
                      ]
                      // optionalTransactionPayloadArgs:{} // optional
                    }

                    // Second way to sign transaction
                    // const txRaw = await supra.createRawTxObject(
                    //   rawTx.senderAddr,
                    //   rawTx.senderSequenceNumber,
                    //   rawTx.moduleAddr,
                    //   rawTx.moduleName,
                    //   rawTx.functionName,
                    //   rawTx.functionTypeArgs,
                    //   rawTx.functionArgs,
                    //   rawTx.optionalTransactionPayloadArgs
                    // )
                    // const txHash = await adapter.signAndSubmitTransaction(rawTx)

                    const txHash = await adapter.signAndSubmitTransaction(rawTx)
                    console.log('txHash', txHash)
                    alert(
                      `Transaction sent! Check it out at ${HARDCODED_EXPLORER_BY_CHAIN_ID[chainId]}${txHash}`
                    )
                  }
                  toast.promise(signTransaction, {
                    loading: 'Sign and Sending Transaction...',
                    success: _ => {
                      return `Transaction signed and send!`
                    },
                    error: 'Operation has been rejected!'
                  })
                }}
                name='Sign and Submit'></ActionStarryButton>
              <ActionStarryButton
                onClick={async () => {
                  const signTransaction = async () => {
                    const adapter = await getAdapter()
                    const { chainId } = adapter.getChainId()
                    const supra = SupraClient.init(HARDCODED_RPC_BY_CHAIN_ID[chainId])
                    const sequenceNumber = await (
                      await supra
                    ).getAccountInfo(HexString.ensure(userAccount))
                    const rawTx: IRawTxObject = {
                      senderAddr: HexString.ensure(userAccount),
                      senderSequenceNumber: BigInt(sequenceNumber.sequence_number),
                      moduleAddr:
                        '0x0000000000000000000000000000000000000000000000000000000000000001',
                      moduleName: 'supra_account',
                      functionName: 'transfer',
                      functionTypeArgs: [],
                      functionArgs: [
                        RECEIVER_ACCOUNT.toUint8Array(),
                        BCS.bcsSerializeUint64(AMOUNT_IN_BIG_INT)
                      ]
                      // optionalTransactionPayloadArgs:{} // optional
                    }

                    // Second way to sign transaction
                    // const txRaw = await supra.createRawTxObject(
                    //   rawTx.senderAddr,
                    //   rawTx.senderSequenceNumber,
                    //   rawTx.moduleAddr,
                    //   rawTx.moduleName,
                    //   rawTx.functionName,
                    //   rawTx.functionTypeArgs,
                    //   rawTx.functionArgs,
                    //   rawTx.optionalTransactionPayloadArgs
                    // )
                    // const txHash = await adapter.signAndSubmitTransaction(rawTx)

                    const signedTx = await adapter.signTransaction(rawTx)
                    console.log('signedTx', signedTx)
                  }
                  toast.promise(signTransaction, {
                    loading: 'Signing Transaction...',
                    success: _ => {
                      return `Transaction signed!`
                    },
                    error: 'Operation has been rejected!'
                  })
                }}
                name='Sign Transaction'></ActionStarryButton>

              <ActionStarryButton
                onClick={async () => {
                  const signMessage = async () => {
                    const messageToSign = 'I love Nightly'
                    // const haxString = '0x' + Buffer.from(messageToSign, 'utf8').toString('hex')
                    const adapter = await getAdapter()
                    const response = await adapter.signMessage({
                      message: messageToSign
                    })
                    console.log(response)
                    const { publicKey, signature } = response
                    const sign = remove0xPrefix(signature)
                    const key = remove0xPrefix(publicKey)
                    try {
                      const verified = nacl.sign.detached.verify(
                        new TextEncoder().encode(messageToSign),
                        Uint8Array.from(Buffer.from(sign, 'hex')),
                        Uint8Array.from(Buffer.from(key, 'hex'))
                      )
                      console.log('signature :: ', signature)
                      console.log('verified :: ', verified)
                      if (verified) {
                        toast.success('Message verified!')
                      } else {
                        throw new Error('No verification')
                      }
                    } catch (error) {
                      console.log(error)
                      toast.error('Message verification failed!')
                    }

                    // verify
                  }
                  toast.promise(signMessage, {
                    loading: 'Signing message...',
                    success: _ => {
                      return `Message signed!`
                    },
                    error: 'Operation has been rejected!'
                  })
                }}
                name='Sign Message'></ActionStarryButton>

              <ChangeNetworkButton
                onClick={async (chainId: number) => {
                  try {
                    const adapter = await getAdapter()
                    const walletChainId = adapter.getChainId()

                    if (walletChainId.chainId === chainId) {
                      return
                    }
                    const changeNetworkResponse = await adapter.changeNetwork({
                      chainId
                    })

                    if (changeNetworkResponse) {
                      const changedChainId = adapter.getChainId()
                      toast.success(`Changed chainId to ${changedChainId}!`)
                    }
                  } catch (error) {
                    toast.error("Couldn't change chainId")
                    console.log(error)
                  }
                }}
              />

              <div>
                <span className='text-white' style={{ width: '150px' }}>
                  {supraChainName && `Connected to ${supraChainName}`}{' '}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default StickyHeader
