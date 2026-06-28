# Crypto Payment Gateway Architecture

Engineering reference for multi-rail cryptocurrency payment systems — based on DEWEB production work including [Kobbopay](../projects/kobbopay-architecture.md).

**Portfolio:** [dewebam.com/en/projects/kobbopay](https://dewebam.com/en/projects/kobbopay)

## Overview

A crypto payment gateway connects merchants to blockchain deposit detection, confirmation logic, treasury accounting, and settlement — typically via API and webhooks rather than manual wallet monitoring.

This document describes common architectural patterns. It is not a product specification and does not include performance guarantees.

## Reference architecture

```text
Merchant Integration
        │
        ▼
   Payment API (auth, rate limits, idempotency)
        │
        ├──► Wallet / address provisioning
        │
        ├──► Chain listeners (per rail)
        │
        ├──► Confirmation engine
        │
        ├──► Ledger / balance service
        │
        ├──► Webhook dispatcher
        │
        └──► Admin & treasury ops
```

## Core components

### Payment API

- Creates payment intents and unique deposit addresses
- Exposes merchant balances and transaction history
- Enforces authentication, scopes, and idempotency keys

### Chain listeners

- Poll or subscribe to chain events per rail (TRON, BSC, Ethereum, etc.)
- Normalize events into internal transaction models
- Run outside HTTP request threads to protect API latency

### Confirmation engine

- Applies per-rail confirmation thresholds before crediting balances
- Handles reorgs, late confirmations, and duplicate event detection

### Ledger service

- Maintains explicit transaction states (pending, confirmed, settled, failed)
- Supports reconciliation and support investigations
- Avoids implicit balance mutations without audit trails

### Webhook dispatcher

- Signs payloads and delivers to merchant endpoints
- Retries with backoff; logs delivery attempts
- Uses idempotency to prevent duplicate merchant-side effects

### Admin and treasury

- Merchant onboarding, limits, and exception review
- Treasury views for inbound vs payout queues
- Withdrawal approval workflows for high-risk operations

## Tech stack patterns

Typical production stacks DEWEB uses for gateway-class systems:

| Layer | Common choices |
|-------|----------------|
| API | NestJS / Node.js, TypeScript |
| Database | PostgreSQL |
| Queues / cache | Redis |
| Proxy | Nginx |
| Chain access | Rail-specific RPC adapters |

## Security and operations

- Separate merchant and admin permission models
- Environment-isolated keys and RPC configuration
- Confirmation thresholds per rail and risk profile
- Structured logging without exposing secrets
- Monitoring for stuck deposits and webhook failures
- Manual approval gates for treasury and withdrawal actions

## Problems commonly solved

- Multi-rail USDT without separate merchant integrations per chain
- Webhook reliability under retries and merchant downtime
- Reconciliation-friendly transaction states
- Ops tooling that reduces direct database intervention

## Lessons learned

- State machines beat implicit balance updates for payment systems
- Chain adapters should be pluggable — new rails should not rewrite core ledger logic
- Webhooks are part of the product surface — treat delivery, signing, and retries as first-class domains
- Treasury UI is not optional at production scale

## Related documentation

- [Kobbopay architecture](../projects/kobbopay-architecture.md)
- [Multi-rail settlement system](./multi-rail-settlement-system.md)
- [DEWEB contact](https://dewebam.com/en/contact)
