import { Networks } from "./blockchain";

const BSC_MAINNET = {
    SURF_ADDRESS : "0x6Cbd8ECaF789324233039FDB8711a29f3f8d0a61",
     //SURF_ADDRESS : "0x9E1A6E712C5B53c158143f79949b8f9287BD94f1", //testnet
    FIREPIT_ADDRESS : "0x790C475BE03456F56311Dd03713E3Ce33808810e",
    TREASURY_ADDRESS : "0x99283e8a35Bea9ee5B150a28A75130B1b4A58EeB",
    SIF_ADDRESS : "0x19223a53C6ED168e67F91c949e79eD3cFF86E76E",
    PAIR_ADDRESS : "0xa0c54ee121c4804371500e72346e0fd06c80180e",
     //PAIR_ADDRESS : "0x3D3c4eE5aAfFe1603a32fb468C9E9Ecb18221528",  //testnet
    BUSD_ADDRESS : "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",

    STAKING_ADDRESS: "0xDAEdc18c9b686d2e9d6a4Df75d5B2B93deA17534", //testnet
};

export const getAddresses = (networkID: number) => {
    if (networkID === Networks.BSC) return BSC_MAINNET;
    throw Error("Network don't support");
};
