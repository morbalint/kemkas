#!/usr/bin/env bash
set -euo pipefail

trusted_cert_path="${E2E_TRUSTED_CERT_PATH:-}"
if [[ -n "$trusted_cert_path" ]]; then
  if [[ ! -f "$trusted_cert_path" ]]; then
    echo "Trusted certificate not found at: $trusted_cert_path" >&2
    exit 1
  fi

  install -m 0644 -D "$trusted_cert_path" /usr/local/share/ca-certificates/kemkas-proxy.crt
  update-ca-certificates

  if command -v certutil >/dev/null 2>&1; then
    for candidate_home in /root /home/pwuser; do
      if [[ -d "$candidate_home" ]]; then
        nss_db_dir="$candidate_home/.pki/nssdb"
        mkdir -p "$nss_db_dir"
        certutil -d "sql:$nss_db_dir" -N --empty-password >/dev/null 2>&1 || true
        certutil -d "sql:$nss_db_dir" -D -n kemkas-proxy >/dev/null 2>&1 || true
        certutil -d "sql:$nss_db_dir" -A -t "C,," -n kemkas-proxy -i "$trusted_cert_path"
      fi
    done
  fi
fi

if [[ -n "${E2E_WAIT_FOR_URL:-}" ]]; then
  echo "Waiting for target URL: ${E2E_WAIT_FOR_URL}"
  for attempt in {1..60}; do
    if curl --silent --show-error --fail "${E2E_WAIT_FOR_URL}" >/dev/null; then
      break
    fi

    if [[ "$attempt" -eq 60 ]]; then
      echo "Timed out waiting for ${E2E_WAIT_FOR_URL}" >&2
      exit 1
    fi

    sleep 2
  done
fi

exec "$@"
