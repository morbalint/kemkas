#!/bin/sh
set -eu

CERT_DIR="${CERT_DIR:-/certs}"

mkdir -p "$CERT_DIR"

if [ -f "$CERT_DIR/rootCA.pem" ] && [ -f "$CERT_DIR/rootCA.key" ] && [ -f "$CERT_DIR/kemkas.pem" ] && [ -f "$CERT_DIR/kemkas.key" ]; then
  echo "Using existing TLS material from $CERT_DIR"
  exit 0
fi

apk add --no-cache openssl >/dev/null

cat > /tmp/kemkas-server.cnf <<'EOF'
[req]
default_bits = 2048
prompt = no
default_md = sha256
distinguished_name = dn
req_extensions = req_ext

[dn]
CN = localhost

[req_ext]
subjectAltName = @alt_names
keyUsage = digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth

[alt_names]
DNS.1 = localhost
DNS.2 = proxy
DNS.3 = host.docker.internal
IP.1 = 127.0.0.1
IP.2 = ::1
EOF

cat > /tmp/kemkas-v3.ext <<'EOF'
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage=digitalSignature,keyEncipherment
extendedKeyUsage=serverAuth
subjectAltName=@alt_names

[alt_names]
DNS.1=localhost
DNS.2=proxy
DNS.3=host.docker.internal
IP.1=127.0.0.1
IP.2=::1
EOF

openssl genrsa -out "$CERT_DIR/rootCA.key" 2048
openssl req -x509 -new -nodes -key "$CERT_DIR/rootCA.key" -sha256 -days 3650 -subj "/CN=kemkas-local-root" -out "$CERT_DIR/rootCA.pem"

openssl genrsa -out "$CERT_DIR/kemkas.key" 2048
openssl req -new -key "$CERT_DIR/kemkas.key" -out /tmp/kemkas.csr -config /tmp/kemkas-server.cnf
openssl x509 -req -in /tmp/kemkas.csr -CA "$CERT_DIR/rootCA.pem" -CAkey "$CERT_DIR/rootCA.key" -CAcreateserial -out "$CERT_DIR/kemkas.pem" -days 825 -sha256 -extfile /tmp/kemkas-v3.ext

echo "Generated TLS CA and nginx certificate under $CERT_DIR"
