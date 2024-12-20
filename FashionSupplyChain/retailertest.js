export FABRIC_CFG_PATH=./peercfg
export CHANNEL_NAME=mychannel
export CORE_PEER_LOCALMSPID=retailerMSP
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/retailer.fashion.com/peers/peer0.retailer.fashion.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/retailer.fashion.com/users/Admin@retailer.fashion.com/msp
export CORE_PEER_ADDRESS=localhost:9051
export ORDERER_CA=${PWD}/organizations/ordererOrganizations/fashion.com/orderers/orderer.fashion.com/msp/tlscacerts/tlsca.fashion.com-cert.pem 
export supplier_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/supplier.fashion.com/peers/peer0.supplier.fashion.com/tls/ca.crt
export manufacturer_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/manufacturer.fashion.com/peers/peer0.manufacturer.fashion.com/tls/ca.crt
export validator_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/validator.fashion.com/peers/peer0.validator.fashion.com/tls/ca.crt
export retailer_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/retailer.fashion.com/peers/peer0.retailer.fashion.com/tls/ca.crt