# Module 8 — AI Assistant (OpenAI + Claude)

**Location:** `apps/api/src/modules/ai-assistant/`  
**Status:** Architecture approved — not implemented

## Purpose

Intelligent copilot with dual-model support — OpenAI for speed and cost, Claude for reasoning and long context.

## Scope

- Conversational AI (REST SSE streaming + WebSocket)
- Model router selecting OpenAI or Claude per task type
- RAG over platform docs, business FAQs, and listing data (with permission)
- Tools: draft listings, suggest pricing, summarize chats
- Token usage tracking and plan-tier rate limits
- Admin-managed prompts and knowledge base
- Long-running AI jobs via BullMQ worker

## Model selection

| Task | Model | Reason |
|------|-------|--------|
| Quick FAQ, autocomplete | OpenAI GPT-4o-mini | Low latency, low cost |
| Listing generation, analysis | OpenAI GPT-4o | Quality + speed balance |
| Complex reasoning, long documents | Claude Sonnet | Superior context window |
| Content moderation | Claude | Safety alignment |

## Out of scope

- User-to-user chat (Module 7)
- Payment processing (Module 9 — receives usage events)

## Key entities

- `AIConversation`, `AIMessage`, `AIKnowledgeDocument`
- `AIPromptTemplate`, `AIUsageLog`

## Events emitted

- `ai.usage` → payments (metering on premium tiers), admin analytics

## Provider abstraction

```
AIProvider (interface)
├── OpenAIProvider
└── ClaudeProvider (Anthropic)
```

Model selection logic lives in `AIModelRouter` service.
