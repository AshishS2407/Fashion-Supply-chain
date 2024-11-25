export FABRIC_CFG_PATH=./peercfg
export CHANNEL_NAME=mychannel
export CORE_PEER_LOCALMSPID=supplierMSP
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/supplier.fashion.com/peers/peer0.supplier.fashion.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/supplier.fashion.com/users/Admin@supplier.fashion.com/msp
export CORE_PEER_ADDRESS=localhost:5051
export ORDERER_CA=${PWD}/organizations/ordererOrganizations/fashion.com/orderers/orderer.fashion.com/msp/tlscacerts/tlsca.fashion.com-cert.pem 
export supplier_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/supplier.fashion.com/peers/peer0.supplier.fashion.com/tls/ca.crt
export manufacturer_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/manufacturer.fashion.com/peers/peer0.manufacturer.fashion.com/tls/ca.crt
export validator_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/validator.fashion.com/peers/peer0.validator.fashion.com/tls/ca.crt
export retailer_PEER_TLSROOTCERT=${PWD}/organizations/peerOrganizations/retailer.fashion.com/peers/peer0.retailer.fashion.com/tls/ca.crt




peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.fashion.com --tls --cafile $ORDERER_CA -C $CHANNEL_NAME -n basic --peerAddresses localhost:7051 --tlsRootCertFiles $manufacturer_PEER_TLSROOTCERT --peerAddresses localhost:9051 --tlsRootCertFiles $retailer_PEER_TLSROOTCERT --peerAddresses localhost:6051 --tlsRootCertFiles $validator_PEER_TLSROOTCERT --peerAddresses localhost:5051 --tlsRootCertFiles $supplier_PEER_TLSROOTCERT -c '{"function":"createProduct","Args":["Raw1", "Cotton", "100", "Fine","22.01.2024","Kerala
","supplier1"]}'


peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.fashion.com --tls --cafile $ORDERER_CA -C $CHANNEL_NAME -n basic --peerAddresses localhost:7051 --tlsRootCertFiles $manufacturer_PEER_TLSROOTCERT --peerAddresses localhost:9051 --tlsRootCertFiles $retailer_PEER_TLSROOTCERT --peerAddresses localhost:6051 --tlsRootCertFiles $validator_PEER_TLSROOTCERT --peerAddresses localhost:5051 --tlsRootCertFiles $supplier_PEER_TLSROOTCERT -c '{"function":"placeOrder",
"Args":["Finished1","Order1","Retailer1","10"]}'

