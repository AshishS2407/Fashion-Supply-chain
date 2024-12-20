#!/bin/bash

function createsupplier() {
  echo "Enrolling the CA admin"
  mkdir -p organizations/peerOrganizations/supplier.fashion.com/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/supplier.fashion.com/

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:7056 --caname ca-supplier --tls.certfiles "${PWD}/organizations/fabric-ca/supplier/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-7056-ca-supplier.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-7056-ca-supplier.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-7056-ca-supplier.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-7056-ca-supplier.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/organizations/peerOrganizations/supplier.fashion.com/msp/config.yaml"

  # Since the CA serves as both the organization CA and TLS CA, copy the org's root cert that was generated by CA startup into the org level ca and tlsca directories

  # Copy supplier's CA cert to supplier's /msp/tlscacerts directory (for use in the channel MSP definition)
  mkdir -p "${PWD}/organizations/peerOrganizations/supplier.fashion.com/msp/tlscacerts"
  cp "${PWD}/organizations/fabric-ca/supplier/ca-cert.pem" "${PWD}/organizations/peerOrganizations/supplier.fashion.com/msp/tlscacerts/ca.crt"

  # Copy supplier's CA cert to supplier's /tlsca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/supplier.fashion.com/tlsca"
  cp "${PWD}/organizations/fabric-ca/supplier/ca-cert.pem" "${PWD}/organizations/peerOrganizations/supplier.fashion.com/tlsca/tlsca.supplier.fashion.com-cert.pem"

  # Copy supplier's CA cert to supplier's /ca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/supplier.fashion.com/ca"
  cp "${PWD}/organizations/fabric-ca/supplier/ca-cert.pem" "${PWD}/organizations/peerOrganizations/supplier.fashion.com/ca/ca.supplier.fashion.com-cert.pem"

  echo "Registering peer0"
  set -x
  fabric-ca-client register --caname ca-supplier --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles "${PWD}/organizations/fabric-ca/supplier/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo "Registering peer1"
  set -x
  fabric-ca-client register --caname ca-supplier --id.name peer1 --id.secret peer1pw --id.type peer --tls.certfiles "${PWD}/organizations/fabric-ca/supplier/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo "Registering user"
  set -x
  fabric-ca-client register --caname ca-supplier --id.name user1 --id.secret user1pw --id.type client --tls.certfiles "${PWD}/organizations/fabric-ca/supplier/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo "Registering the org admin"
  set -x
  fabric-ca-client register --caname ca-supplier --id.name supplieradmin --id.secret supplieradminpw --id.type admin --tls.certfiles "${PWD}/organizations/fabric-ca/supplier/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo "Generating the peer0 msp"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:7056 --caname ca-supplier -M "${PWD}/organizations/peerOrganizations/supplier.fashion.com/peers/peer0.supplier.fashion.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/supplier/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/supplier.fashion.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/supplier.fashion.com/peers/peer0.supplier.fashion.com/msp/config.yaml"

  echo "Generating the peer0-tls certificates, use --csr.hosts to specify Subject Alternative Names"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:7056 --caname ca-supplier -M "${PWD}/organizations/peerOrganizations/supplier.fashion.com/peers/peer0.supplier.fashion.com/tls" --enrollment.profile tls --csr.hosts peer0.supplier.fashion.com --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/supplier/ca-cert.pem"
  { set +x; } 2>/dev/null

  # Copy the tls CA cert, server cert, server keystore to well known file names in the peer's tls directory that are referenced by peer startup config
  cp "${PWD}/organizations/peerOrganizations/supplier.fashion.com/peers/peer0.supplier.fashion.com/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/supplier.fashion.com/peers/peer0.supplier.fashion.com/tls/ca.crt"
  cp "${PWD}/organizations/peerOrganizations/supplier.fashion.com/peers/peer0.supplier.fashion.com/tls/signcerts/"* "${PWD}/organizations/peerOrganizations/supplier.fashion.com/peers/peer0.supplier.fashion.com/tls/server.crt"
  cp "${PWD}/organizations/peerOrganizations/supplier.fashion.com/peers/peer0.supplier.fashion.com/tls/keystore/"* "${PWD}/organizations/peerOrganizations/supplier.fashion.com/peers/peer0.supplier.fashion.com/tls/server.key"

  ##new
  echo "Generating the peer1 msp"
  set -x
  fabric-ca-client enroll -u https://peer1:peer1pw@localhost:7056 --caname ca-supplier -M "${PWD}/organizations/peerOrganizations/supplier.fashion.com/peers/peer1.supplier.fashion.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/supplier/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/supplier.fashion.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/supplier.fashion.com/peers/peer1.supplier.fashion.com/msp/config.yaml"

  echo "Generating the peer1-tls certificates, use --csr.hosts to specify Subject Alternative Names"
  set -x
  fabric-ca-client enroll -u https://peer1:peer1pw@localhost:7056 --caname ca-supplier -M "${PWD}/organizations/peerOrganizations/supplier.fashion.com/peers/peer1.supplier.fashion.com/tls" --enrollment.profile tls --csr.hosts peer1.supplier.fashion.com --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/supplier/ca-cert.pem"
  { set +x; } 2>/dev/null

  # Copy the tls CA cert, server cert, server keystore to well known file names in the peer's tls directory that are referenced by peer startup config
  cp "${PWD}/organizations/peerOrganizations/supplier.fashion.com/peers/peer1.supplier.fashion.com/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/supplier.fashion.com/peers/peer1.supplier.fashion.com/tls/ca.crt"
  cp "${PWD}/organizations/peerOrganizations/supplier.fashion.com/peers/peer1.supplier.fashion.com/tls/signcerts/"* "${PWD}/organizations/peerOrganizations/supplier.fashion.com/peers/peer1.supplier.fashion.com/tls/server.crt"
  cp "${PWD}/organizations/peerOrganizations/supplier.fashion.com/peers/peer1.supplier.fashion.com/tls/keystore/"* "${PWD}/organizations/peerOrganizations/supplier.fashion.com/peers/peer1.supplier.fashion.com/tls/server.key"

  echo "Generating the user msp"
  set -x
  fabric-ca-client enroll -u https://user1:user1pw@localhost:7056 --caname ca-supplier -M "${PWD}/organizations/peerOrganizations/supplier.fashion.com/users/User1@supplier.fashion.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/supplier/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/supplier.fashion.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/supplier.fashion.com/users/User1@supplier.fashion.com/msp/config.yaml"

  echo "Generating the org admin msp"
  set -x
  fabric-ca-client enroll -u https://supplieradmin:supplieradminpw@localhost:7056 --caname ca-supplier -M "${PWD}/organizations/peerOrganizations/supplier.fashion.com/users/Admin@supplier.fashion.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/supplier/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/supplier.fashion.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/supplier.fashion.com/users/Admin@supplier.fashion.com/msp/config.yaml"
}

function createmanufacturer() {
  echo "Enrolling the CA admin"
  mkdir -p organizations/peerOrganizations/manufacturer.fashion.com/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/manufacturer.fashion.com/

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:7054 --caname ca-manufacturer --tls.certfiles "${PWD}/organizations/fabric-ca/manufacturer/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-manufacturer.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-manufacturer.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-manufacturer.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-manufacturer.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/organizations/peerOrganizations/manufacturer.fashion.com/msp/config.yaml"

  # Since the CA serves as both the organization CA and TLS CA, copy the org's root cert that was generated by CA startup into the org level ca and tlsca directories

  # Copy manufacturer's CA cert to manufacturer's /msp/tlscacerts directory (for use in the channel MSP definition)
  mkdir -p "${PWD}/organizations/peerOrganizations/manufacturer.fashion.com/msp/tlscacerts"
  cp "${PWD}/organizations/fabric-ca/manufacturer/ca-cert.pem" "${PWD}/organizations/peerOrganizations/manufacturer.fashion.com/msp/tlscacerts/ca.crt"

  # Copy manufacturer's CA cert to manufacturer's /tlsca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/manufacturer.fashion.com/tlsca"
  cp "${PWD}/organizations/fabric-ca/manufacturer/ca-cert.pem" "${PWD}/organizations/peerOrganizations/manufacturer.fashion.com/tlsca/tlsca.manufacturer.fashion.com-cert.pem"

  # Copy manufacturer's CA cert to manufacturer's /ca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/manufacturer.fashion.com/ca"
  cp "${PWD}/organizations/fabric-ca/manufacturer/ca-cert.pem" "${PWD}/organizations/peerOrganizations/manufacturer.fashion.com/ca/ca.manufacturer.fashion.com-cert.pem"

  echo "Registering peer0"
  set -x
  fabric-ca-client register --caname ca-manufacturer --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles "${PWD}/organizations/fabric-ca/manufacturer/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo "Registering user"
  set -x
  fabric-ca-client register --caname ca-manufacturer --id.name user1 --id.secret user1pw --id.type client --tls.certfiles "${PWD}/organizations/fabric-ca/manufacturer/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo "Registering the org admin"
  set -x
  fabric-ca-client register --caname ca-manufacturer --id.name manufactureradmin --id.secret manufactureradminpw --id.type admin --tls.certfiles "${PWD}/organizations/fabric-ca/manufacturer/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo "Generating the peer0 msp"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:7054 --caname ca-manufacturer -M "${PWD}/organizations/peerOrganizations/manufacturer.fashion.com/peers/peer0.manufacturer.fashion.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/manufacturer/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/manufacturer.fashion.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/manufacturer.fashion.com/peers/peer0.manufacturer.fashion.com/msp/config.yaml"

  echo "Generating the peer0-tls certificates, use --csr.hosts to specify Subject Alternative Names"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:7054 --caname ca-manufacturer -M "${PWD}/organizations/peerOrganizations/manufacturer.fashion.com/peers/peer0.manufacturer.fashion.com/tls" --enrollment.profile tls --csr.hosts peer0.manufacturer.fashion.com --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/manufacturer/ca-cert.pem"
  { set +x; } 2>/dev/null

  # Copy the tls CA cert, server cert, server keystore to well known file names in the peer's tls directory that are referenced by peer startup config
  cp "${PWD}/organizations/peerOrganizations/manufacturer.fashion.com/peers/peer0.manufacturer.fashion.com/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/manufacturer.fashion.com/peers/peer0.manufacturer.fashion.com/tls/ca.crt"
  cp "${PWD}/organizations/peerOrganizations/manufacturer.fashion.com/peers/peer0.manufacturer.fashion.com/tls/signcerts/"* "${PWD}/organizations/peerOrganizations/manufacturer.fashion.com/peers/peer0.manufacturer.fashion.com/tls/server.crt"
  cp "${PWD}/organizations/peerOrganizations/manufacturer.fashion.com/peers/peer0.manufacturer.fashion.com/tls/keystore/"* "${PWD}/organizations/peerOrganizations/manufacturer.fashion.com/peers/peer0.manufacturer.fashion.com/tls/server.key"

  echo "Generating the user msp"
  set -x
  fabric-ca-client enroll -u https://user1:user1pw@localhost:7054 --caname ca-manufacturer -M "${PWD}/organizations/peerOrganizations/manufacturer.fashion.com/users/User1@manufacturer.fashion.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/manufacturer/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/manufacturer.fashion.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/manufacturer.fashion.com/users/User1@manufacturer.fashion.com/msp/config.yaml"

  echo "Generating the org admin msp"
  set -x
  fabric-ca-client enroll -u https://manufactureradmin:manufactureradminpw@localhost:7054 --caname ca-manufacturer -M "${PWD}/organizations/peerOrganizations/manufacturer.fashion.com/users/Admin@manufacturer.fashion.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/manufacturer/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/manufacturer.fashion.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/manufacturer.fashion.com/users/Admin@manufacturer.fashion.com/msp/config.yaml"
}

function createretailer() {
  echo "Enrolling the CA admin"
  mkdir -p organizations/peerOrganizations/retailer.fashion.com/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/retailer.fashion.com/

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:8054 --caname ca-retailer --tls.certfiles "${PWD}/organizations/fabric-ca/retailer/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-retailer.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-retailer.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-retailer.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-retailer.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/organizations/peerOrganizations/retailer.fashion.com/msp/config.yaml"

  # Since the CA serves as both the organization CA and TLS CA, copy the org's root cert that was generated by CA startup into the org level ca and tlsca directories

  # Copy retailer's CA cert to retailer's /msp/tlscacerts directory (for use in the channel MSP definition)
  mkdir -p "${PWD}/organizations/peerOrganizations/retailer.fashion.com/msp/tlscacerts"
  cp "${PWD}/organizations/fabric-ca/retailer/ca-cert.pem" "${PWD}/organizations/peerOrganizations/retailer.fashion.com/msp/tlscacerts/ca.crt"

  # Copy retailer's CA cert to retailer's /tlsca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/retailer.fashion.com/tlsca"
  cp "${PWD}/organizations/fabric-ca/retailer/ca-cert.pem" "${PWD}/organizations/peerOrganizations/retailer.fashion.com/tlsca/tlsca.retailer.fashion.com-cert.pem"

  # Copy retailer's CA cert to retailer's /ca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/retailer.fashion.com/ca"
  cp "${PWD}/organizations/fabric-ca/retailer/ca-cert.pem" "${PWD}/organizations/peerOrganizations/retailer.fashion.com/ca/ca.retailer.fashion.com-cert.pem"

  echo "Registering peer0"
  set -x
  fabric-ca-client register --caname ca-retailer --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles "${PWD}/organizations/fabric-ca/retailer/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo "Registering user"
  set -x
  fabric-ca-client register --caname ca-retailer --id.name user1 --id.secret user1pw --id.type client --tls.certfiles "${PWD}/organizations/fabric-ca/retailer/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo "Registering the org admin"
  set -x
  fabric-ca-client register --caname ca-retailer --id.name retaileradmin --id.secret retaileradminpw --id.type admin --tls.certfiles "${PWD}/organizations/fabric-ca/retailer/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo "Generating the peer0 msp"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:8054 --caname ca-retailer -M "${PWD}/organizations/peerOrganizations/retailer.fashion.com/peers/peer0.retailer.fashion.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/retailer/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/retailer.fashion.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/retailer.fashion.com/peers/peer0.retailer.fashion.com/msp/config.yaml"

  echo "Generating the peer0-tls certificates, use --csr.hosts to specify Subject Alternative Names"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:8054 --caname ca-retailer -M "${PWD}/organizations/peerOrganizations/retailer.fashion.com/peers/peer0.retailer.fashion.com/tls" --enrollment.profile tls --csr.hosts peer0.retailer.fashion.com --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/retailer/ca-cert.pem"
  { set +x; } 2>/dev/null

  # Copy the tls CA cert, server cert, server keystore to well known file names in the peer's tls directory that are referenced by peer startup config
  cp "${PWD}/organizations/peerOrganizations/retailer.fashion.com/peers/peer0.retailer.fashion.com/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/retailer.fashion.com/peers/peer0.retailer.fashion.com/tls/ca.crt"
  cp "${PWD}/organizations/peerOrganizations/retailer.fashion.com/peers/peer0.retailer.fashion.com/tls/signcerts/"* "${PWD}/organizations/peerOrganizations/retailer.fashion.com/peers/peer0.retailer.fashion.com/tls/server.crt"
  cp "${PWD}/organizations/peerOrganizations/retailer.fashion.com/peers/peer0.retailer.fashion.com/tls/keystore/"* "${PWD}/organizations/peerOrganizations/retailer.fashion.com/peers/peer0.retailer.fashion.com/tls/server.key"

  echo "Generating the user msp"
  set -x
  fabric-ca-client enroll -u https://user1:user1pw@localhost:8054 --caname ca-retailer -M "${PWD}/organizations/peerOrganizations/retailer.fashion.com/users/User1@retailer.fashion.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/retailer/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/retailer.fashion.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/retailer.fashion.com/users/User1@retailer.fashion.com/msp/config.yaml"

  echo "Generating the org admin msp"
  set -x
  fabric-ca-client enroll -u https://retaileradmin:retaileradminpw@localhost:8054 --caname ca-retailer -M "${PWD}/organizations/peerOrganizations/retailer.fashion.com/users/Admin@retailer.fashion.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/retailer/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/retailer.fashion.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/retailer.fashion.com/users/Admin@retailer.fashion.com/msp/config.yaml"
}

#new start
function createvalidator() {
  echo "Enrolling the CA admin"
  mkdir -p organizations/peerOrganizations/validator.fashion.com/

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/validator.fashion.com/

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:8055 --caname ca-validator --tls.certfiles "${PWD}/organizations/fabric-ca/validator/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-8055-ca-validator.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-8055-ca-validator.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-8055-ca-validator.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-8055-ca-validator.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/organizations/peerOrganizations/validator.fashion.com/msp/config.yaml"

  # Since the CA serves as both the organization CA and TLS CA, copy the org's root cert that was generated by CA startup into the org level ca and tlsca directories

  # Copy validator's CA cert to validator's /msp/tlscacerts directory (for use in the channel MSP definition)
  mkdir -p "${PWD}/organizations/peerOrganizations/validator.fashion.com/msp/tlscacerts"
  cp "${PWD}/organizations/fabric-ca/validator/ca-cert.pem" "${PWD}/organizations/peerOrganizations/validator.fashion.com/msp/tlscacerts/ca.crt"

  # Copy validator's CA cert to validator's /tlsca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/validator.fashion.com/tlsca"
  cp "${PWD}/organizations/fabric-ca/validator/ca-cert.pem" "${PWD}/organizations/peerOrganizations/validator.fashion.com/tlsca/tlsca.validator.fashion.com-cert.pem"

  # Copy validator's CA cert to validator's /ca directory (for use by clients)
  mkdir -p "${PWD}/organizations/peerOrganizations/validator.fashion.com/ca"
  cp "${PWD}/organizations/fabric-ca/validator/ca-cert.pem" "${PWD}/organizations/peerOrganizations/validator.fashion.com/ca/ca.validator.fashion.com-cert.pem"

  echo "Registering peer0"
  set -x
  fabric-ca-client register --caname ca-validator --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles "${PWD}/organizations/fabric-ca/validator/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo "Registering user"
  set -x
  fabric-ca-client register --caname ca-validator --id.name user1 --id.secret user1pw --id.type client --tls.certfiles "${PWD}/organizations/fabric-ca/validator/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo "Registering the org admin"
  set -x
  fabric-ca-client register --caname ca-validator --id.name validatoradmin --id.secret validatoradminpw --id.type admin --tls.certfiles "${PWD}/organizations/fabric-ca/validator/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo "Generating the peer0 msp"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:8055 --caname ca-validator -M "${PWD}/organizations/peerOrganizations/validator.fashion.com/peers/peer0.validator.fashion.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/validator/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/validator.fashion.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/validator.fashion.com/peers/peer0.validator.fashion.com/msp/config.yaml"

  echo "Generating the peer0-tls certificates, use --csr.hosts to specify Subject Alternative Names"
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:8055 --caname ca-validator -M "${PWD}/organizations/peerOrganizations/validator.fashion.com/peers/peer0.validator.fashion.com/tls" --enrollment.profile tls --csr.hosts peer0.validator.fashion.com --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/validator/ca-cert.pem"
  { set +x; } 2>/dev/null

  # Copy the tls CA cert, server cert, server keystore to well known file names in the peer's tls directory that are referenced by peer startup config
  cp "${PWD}/organizations/peerOrganizations/validator.fashion.com/peers/peer0.validator.fashion.com/tls/tlscacerts/"* "${PWD}/organizations/peerOrganizations/validator.fashion.com/peers/peer0.validator.fashion.com/tls/ca.crt"
  cp "${PWD}/organizations/peerOrganizations/validator.fashion.com/peers/peer0.validator.fashion.com/tls/signcerts/"* "${PWD}/organizations/peerOrganizations/validator.fashion.com/peers/peer0.validator.fashion.com/tls/server.crt"
  cp "${PWD}/organizations/peerOrganizations/validator.fashion.com/peers/peer0.validator.fashion.com/tls/keystore/"* "${PWD}/organizations/peerOrganizations/validator.fashion.com/peers/peer0.validator.fashion.com/tls/server.key"

  echo "Generating the user msp"
  set -x
  fabric-ca-client enroll -u https://user1:user1pw@localhost:8055 --caname ca-validator -M "${PWD}/organizations/peerOrganizations/validator.fashion.com/users/User1@validator.fashion.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/validator/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/validator.fashion.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/validator.fashion.com/users/User1@validator.fashion.com/msp/config.yaml"

  echo "Generating the org admin msp"
  set -x
  fabric-ca-client enroll -u https://validatoradmin:validatoradminpw@localhost:8055 --caname ca-validator -M "${PWD}/organizations/peerOrganizations/validator.fashion.com/users/Admin@validator.fashion.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/validator/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/peerOrganizations/validator.fashion.com/msp/config.yaml" "${PWD}/organizations/peerOrganizations/validator.fashion.com/users/Admin@validator.fashion.com/msp/config.yaml"
}
#new end

function createOrderer() {
  echo "Enrolling the CA admin"
  mkdir -p organizations/ordererOrganizations/fashion.com

  export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/ordererOrganizations/fashion.com

  set -x
  fabric-ca-client enroll -u https://admin:adminpw@localhost:9054 --caname ca-orderer --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: orderer' > "${PWD}/organizations/ordererOrganizations/fashion.com/msp/config.yaml"

  # Since the CA serves as both the organization CA and TLS CA, copy the org's root cert that was generated by CA startup into the org level ca and tlsca directories

  # Copy orderer org's CA cert to orderer org's /msp/tlscacerts directory (for use in the channel MSP definition)
  mkdir -p "${PWD}/organizations/ordererOrganizations/fashion.com/msp/tlscacerts"
  cp "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem" "${PWD}/organizations/ordererOrganizations/fashion.com/msp/tlscacerts/tlsca.fashion.com-cert.pem"

  # Copy orderer org's CA cert to orderer org's /tlsca directory (for use by clients)
  mkdir -p "${PWD}/organizations/ordererOrganizations/fashion.com/tlsca"
  cp "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem" "${PWD}/organizations/ordererOrganizations/fashion.com/tlsca/tlsca.fashion.com-cert.pem"

  echo "Registering orderer"
  set -x
  fabric-ca-client register --caname ca-orderer --id.name orderer --id.secret ordererpw --id.type orderer --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo "Registering the orderer admin"
  set -x
  fabric-ca-client register --caname ca-orderer --id.name ordererAdmin --id.secret ordererAdminpw --id.type admin --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  { set +x; } 2>/dev/null

  echo "Generating the orderer msp"
  set -x
  fabric-ca-client enroll -u https://orderer:ordererpw@localhost:9054 --caname ca-orderer -M "${PWD}/organizations/ordererOrganizations/fashion.com/orderers/orderer.fashion.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/ordererOrganizations/fashion.com/msp/config.yaml" "${PWD}/organizations/ordererOrganizations/fashion.com/orderers/orderer.fashion.com/msp/config.yaml"

  echo "Generating the orderer-tls certificates, use --csr.hosts to specify Subject Alternative Names"
  set -x
  fabric-ca-client enroll -u https://orderer:ordererpw@localhost:9054 --caname ca-orderer -M "${PWD}/organizations/ordererOrganizations/fashion.com/orderers/orderer.fashion.com/tls" --enrollment.profile tls --csr.hosts orderer.fashion.com --csr.hosts localhost --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  { set +x; } 2>/dev/null

  # Copy the tls CA cert, server cert, server keystore to well known file names in the orderer's tls directory that are referenced by orderer startup config
  cp "${PWD}/organizations/ordererOrganizations/fashion.com/orderers/orderer.fashion.com/tls/tlscacerts/"* "${PWD}/organizations/ordererOrganizations/fashion.com/orderers/orderer.fashion.com/tls/ca.crt"
  cp "${PWD}/organizations/ordererOrganizations/fashion.com/orderers/orderer.fashion.com/tls/signcerts/"* "${PWD}/organizations/ordererOrganizations/fashion.com/orderers/orderer.fashion.com/tls/server.crt"
  cp "${PWD}/organizations/ordererOrganizations/fashion.com/orderers/orderer.fashion.com/tls/keystore/"* "${PWD}/organizations/ordererOrganizations/fashion.com/orderers/orderer.fashion.com/tls/server.key"

  # Copy orderer org's CA cert to orderer's /msp/tlscacerts directory (for use in the orderer MSP definition)
  mkdir -p "${PWD}/organizations/ordererOrganizations/fashion.com/orderers/orderer.fashion.com/msp/tlscacerts"
  cp "${PWD}/organizations/ordererOrganizations/fashion.com/orderers/orderer.fashion.com/tls/tlscacerts/"* "${PWD}/organizations/ordererOrganizations/fashion.com/orderers/orderer.fashion.com/msp/tlscacerts/tlsca.fashion.com-cert.pem"

  echo "Generating the admin msp"
  set -x
  fabric-ca-client enroll -u https://ordererAdmin:ordererAdminpw@localhost:9054 --caname ca-orderer -M "${PWD}/organizations/ordererOrganizations/fashion.com/users/Admin@fashion.com/msp" --tls.certfiles "${PWD}/organizations/fabric-ca/ordererOrg/ca-cert.pem"
  { set +x; } 2>/dev/null

  cp "${PWD}/organizations/ordererOrganizations/fashion.com/msp/config.yaml" "${PWD}/organizations/ordererOrganizations/fashion.com/users/Admin@fashion.com/msp/config.yaml"
}

createsupplier
createmanufacturer
createretailer
createvalidator
createOrderer