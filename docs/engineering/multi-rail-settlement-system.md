# Multi-Rail Settlement System

Engineering reference for settlement flows across multiple blockchain payment rails — based on DEWEB production work including [Kobbopay](../projects/kobbopay-architecture.md).

**Portfolio:** [dewebam.com/en/projects/kobbopay](https://dewebam.com/en/projects/kobbopay)

## Overview

A multi-rail settlement system credits merchant balances only after chain-specific confirmation rules pass, then moves funds through treasury accounting toward withdrawals or payouts. "Settlement" here means internal balance availability and payout processing — not a claim about on-chain finality guarantees beyond configured thresholds.

## Settlement flow

```text
Deposit detected
      │
      ▼
Confirmation threshold met (per rail)
      │
      ▼
Credit merchant-available balance
      │
      ▼
Treasury segregation / reporting
      │
      ▼
Withdrawal request → review → payout
```

## Per-rail considerations

| Rail | Typical considerations |
|------|------------------------|
| **TRON (TRC20)** | Confirmation counts, energy/bandwidth, USDT contract address |
| **BSC (BEP20)** | Block confirmations, gas variability, contract verification |
| **Ethereum (ERC20)** | Higher gas, longer finality expectations, mempool delays |

Each rail should have:

- Independent listener workers
- Configurable confirmation thresholds
- Normalized internal event format before ledger writes

## Treasury model

Recommended separation:

1. **Inbound tracking** — detected but unconfirmed deposits
2. **Confirmed pool** — passed confirmation, eligible for merchant credit
3. **Merchant-available** — credited balances merchants can withdraw against
4. **Payout queue** — approved withdrawals awaiting execution

Treasury separation reduces accidental double-credit and simplifies support investigations.

## Withdrawal controls

Production systems usually include:

- Merchant-initiated withdrawal requests
- Admin review for high amounts or flagged accounts
- Status monitoring through pending → approved → sent → confirmed
- Audit logs for manual interventions

## Operations

- Dashboards for stuck deposits and delayed confirmations
- Reprocessing tools for failed webhook or listener jobs
- Indexing strategy for high-volume transaction lookups
- Alerting on listener lag or RPC failures

## Problems solved

- Unified merchant experience across heterogeneous chain confirmation times
- Reconciliation between chain events and internal ledger states
- Support workflows that do not require raw database access
- Scalable webhook fan-out decoupled from API threads

## Lessons learned

- Do not credit balances on first sighting — confirmation rules are product decisions, not defaults
- Normalize chain events early; ledger logic should not contain rail-specific parsing
- Withdrawals need explicit state machines — ambiguous payout status creates trust issues
- Treasury reporting belongs in the product, not in spreadsheets

## Related documentation

- [Kobbopay architecture](../projects/kobbopay-architecture.md)
- [Crypto payment gateway architecture](./crypto-payment-gateway-architecture.md)
- [DEWEB contact](https://dewebam.com/en/contact)
