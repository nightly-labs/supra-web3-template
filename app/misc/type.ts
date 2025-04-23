import {
  HexString,
  SupraClient,
  type OptionalTransactionPayloadArgs,
  type TxnBuilderTypes,
} from "supra-l1-sdk";

export interface IRawTxObject {
  senderAddr: HexString;
  senderSequenceNumber: bigint;
  moduleAddr: string;
  moduleName: string;
  functionName: string;
  functionTypeArgs: TxnBuilderTypes.TypeTag[];
  functionArgs: Uint8Array[];
  optionalTransactionPayloadArgs?: OptionalTransactionPayloadArgs;
}

export interface NetworkInfo {
  url: string;
  chainId: number;
}
