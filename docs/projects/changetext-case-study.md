# Changetext — AI Telegram Content Automation System

**Portfolio page:** [dewebam.com/en/projects/changetext](https://dewebam.com/en/projects/changetext)

## Project context

Changetext automates content processing and publishing through Telegram, connecting editorial inputs in Google Sheets to OpenAI-assisted transformations and scheduled bot delivery. DEWEB built the bot orchestration layer, integration boundaries, and failure-handling patterns needed for daily automation rather than one-off scripts.

Throughput depends on sheet volume, API limits, and operator configuration — no fabricated performance statistics are included here.

## Architecture overview

Content pipeline stages:

```text
Ingest → Transform → Review (optional) → Publish
```

| Stage | Description |
|-------|-------------|
| **Ingest** | Sheet-driven content intake with row-level job identity |
| **Transform** | OpenAI-assisted rewriting via parameterized prompt templates |
| **Review** | Optional operator gates for ambiguous outputs |
| **Publish** | Telegram delivery segmented by audience or topic |

## Tech stack

| Component | Technology |
|-----------|------------|
| Bot platform | Telegram Bot API |
| AI | OpenAI API |
| Content source | Google Sheets API |
| Orchestration | Custom backend with job queues and logging |
| Triggers | Optional webhook endpoints |

## Security and operations

- Credentials isolated per integration adapter
- Idempotent job keys tied to sheet row identifiers
- Rate-aware scheduling for API limits
- Content validation before send — length, format, blocked patterns
- Structured logging with correlation IDs per content job
- Dead-letter handling for rows that fail validation
- Health checks for bot connectivity and integration credentials
- Graceful degradation when optional AI steps are skipped by configuration

## Problems solved

- Repeatable Telegram publishing without manual copy-paste loops
- Sheet-operable workflows for non-engineering operators
- Traceable failures to a single pipeline stage
- Duplicate publish prevention via row-level idempotency
- Retry policies for transient integration failures

## Lessons learned

- Automation bots fail on edge cases — empty rows, API timeouts, partial sheet updates; logging and row state preservation are required
- Integrations should be adapter-bound so credential rotation does not rewrite core logic
- Operator notifications matter as much as successful sends
- AI steps should be optional in configuration when manual fallback is acceptable

## Related DEWEB resources

- [Portfolio case study](https://dewebam.com/en/projects/changetext)
- [AI automation services](https://dewebam.com/en/services/ai-business-automation)
- [Telegram bot development](https://dewebam.com/en/services/telegram-bot-development)
- [Contact DEWEB](https://dewebam.com/en/contact)
