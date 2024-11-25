let profile = {
    manufacturer: {
        "cryptoPath": "../../FashionSupplyChain/organizations/peerOrganizations/manufacturer.fashion.com", 
		"keyDirectoryPath": "../../FashionSupplyChain/organizations/peerOrganizations/manufacturer.fashion.com/users/User1@manufacturer.fashion.com/msp/keystore/",
        "certPath":     "../../FashionSupplyChain/organizations/peerOrganizations/manufacturer.fashion.com/users/User1@manufacturer.fashion.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../../FashionSupplyChain/organizations/peerOrganizations/manufacturer.fashion.com/peers/peer0.manufacturer.fashion.com/tls/ca.crt",
		"peerEndpoint": "localhost:7051",
		"peerHostAlias":  "peer0.manufacturer.fashion.com",
        "mspId": "manufacturerMSP"
    },
    retailer: {
        "cryptoPath": "../../FashionSupplyChain/organizations/peerOrganizations/retailer.fashion.com", 
		"keyDirectoryPath": "../../FashionSupplyChain/organizations/peerOrganizations/retailer.fashion.com/users/User1@retailer.fashion.com/msp/keystore/",
        "certPath":     "../../FashionSupplyChain/organizations/peerOrganizations/retailer.fashion.com/users/User1@retailer.fashion.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../../FashionSupplyChain/organizations/peerOrganizations/retailer.fashion.com/peers/peer0.retailer.fashion.com/tls/ca.crt",
		"peerEndpoint": "localhost:9051",
		"peerHostAlias":  "peer0.retailer.fashion.com",
        "mspId": "retailerMSP"
    },
    validator: {
        "cryptoPath": "../../FashionSupplyChain/organizations/peerOrganizations/validator.fashion.com", 
		"keyDirectoryPath": "../../FashionSupplyChain/organizations/peerOrganizations/validator.fashion.com/users/User1@validator.fashion.com/msp/keystore/",
        "certPath":     "../../FashionSupplyChain/organizations/peerOrganizations/validator.fashion.com/users/User1@validator.fashion.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../../FashionSupplyChain/organizations/peerOrganizations/validator.fashion.com/peers/peer0.validator.fashion.com/tls/ca.crt",
		"peerEndpoint": "localhost:6051",
		"peerHostAlias":  "peer0.validator.fashion.com",
        "mspId": "validatorMSP"
    },
    supplier: {
        "cryptoPath": "../../FashionSupplyChain/organizations/peerOrganizations/supplier.fashion.com", 
		"keyDirectoryPath": "../../FashionSupplyChain/organizations/peerOrganizations/supplier.fashion.com/users/User1@supplier.fashion.com/msp/keystore/",
        "certPath":     "../../FashionSupplyChain/organizations/peerOrganizations/supplier.fashion.com/users/User1@supplier.fashion.com/msp/signcerts/cert.pem",
		"tlsCertPath":  "../../FashionSupplyChain/organizations/peerOrganizations/supplier.fashion.com/peers/peer0.supplier.fashion.com/tls/ca.crt",
		"peerEndpoint": "localhost:5051",
		"peerHostAlias":  "peer0.supplier.fashion.com",
        "mspId": "supplierMSP"
    }
}
module.exports = { profile }