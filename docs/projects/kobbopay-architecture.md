# Kobbopay — Multi-Rail Crypto Payment Platform

**Portfolio page:** [dewebam.com/en/projects/kobbopay](https://dewebam.com/en/projects/kobbopay)

## Project context

Kobbopay is a production payment platform built for merchants who need USDT acceptance across TRON, BSC, and Ethereum without maintaining three separate chain integrations. DEWEB engineered merchant checkout flows, an operations admin portal, and backend services that coordinate deposits, confirmations, treasury movements, and merchant withdrawals with auditable state transitions.

This document describes the architecture and engineering decisions. It does not include revenue, user counts, or performance guarantees.

## Architecture overview

End-to-end payment path:

```text
Merchant → API → Wallet Infrastructure → Blockchain → Treasury → Settlement
```

| Layer | Role |
|-------|------|
| **Merchant** | Checkout, API keys, webhook endpoints |
| **API** | NestJS services, authentication, transaction state |
| **Wallet infrastructure** | Unique deposit addresses per payment intent |
| **Blockchain** | TRON, BSC, and Ethereum USDT monitoring |
| **Treasury** | Inbound flow tracking and balance segregation |
| **Settlement** | Merchant-available balances and withdrawals |

### Supported networks

- TRON (TRC20)
- BNB Smart Chain (BEP20)
- Ethereum (ERC20)

### Core domains

- Merchants, wallets, transactions, webhooks, admin
- PostgreSQL as system of record with ledger-style states
- Redis for queues, caching, and webhook retry scheduling
- Chain adapters isolated per rail for deposit detection

## Tech stack

| Component | Technology |
|-----------|------------|
| Backend API | NestJS, TypeScript |
| Database | PostgreSQL |
| Queues / cache | Redis |
| Reverse proxy | Nginx |
| Chain monitoring | TRON, BSC, Ethereum adapters |

## Security and operations

- Multi-network validation before crediting merchant balances
- Confirmation thresholds configured per rail and risk profile
- Role-based access separation between merchant and admin surfaces
- Webhook signature verification and replay-safe idempotency keys
- Withdrawal controls with approval steps for high-risk actions
- Treasury separation between inbound flows and payout queues
- Operational monitoring for stuck deposits and webhook failures
- Chain listener workers decoupled from core API request threads

## Problems solved

- Unified USDT acceptance across three chains without three merchant integrations
- Reliable webhook delivery with idempotency and operator-visible retry logs
- Ledger-style transaction states for reconciliation and support investigations
- Admin tooling for treasury review without direct database intervention
- Decoupled chain listeners under webhook fan-out load

## Lessons learned

- Payment platforms benefit from explicit state machines — implicit balance updates create support debt
- Chain adapters should isolate RPC and confirmation logic so new rails do not rewrite core domains
- Merchant and admin portals should share API contracts but never share permission models
- Treasury operations need first-class UI — spreadsheets do not scale with webhook volume

## Related DEWEB resources

- [Portfolio case study](https://dewebam.com/en/projects/kobbopay)
- [Multi-rail settlement system](../engineering/multi-rail-settlement-system.md)
- [Crypto payment gateway architecture](../engineering/crypto-payment-gateway-architecture.md)
- [Contact DEWEB](https://dewebam.com/en/contact)
