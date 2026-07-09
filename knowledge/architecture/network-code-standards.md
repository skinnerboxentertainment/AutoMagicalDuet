---
domain: architecture
tags: [networking, replication, security]
triggers: [src/networking/**]
related: [architecture/security-review, qa-testing/performance-budgets]
---

# Network Code Standards

Networked gameplay must be server-authoritative, versioned, bandwidth-aware, and resilient to real-world latency and disconnection.

## Patterns

- Keep the server authoritative for gameplay-critical state.
- Version every network message for compatibility.
- Use local client prediction with server reconciliation.
- Define replication strategy per value: reliable or unreliable, frequency, interpolation, and authority.
- Profile bandwidth per message type and apply relevancy, delta compression, and priority-based sending.
- Handle disconnect, reconnect, and host migration gracefully when applicable.
- Validate packet sizes, field ranges, and state transitions.

## Anti-patterns

- Trusting clients for health, damage, currency, position, or progression.
- Unversioned packet formats.
- Unbounded network logging.
- Treating 150ms latency as an edge case rather than a design constraint.

## References

- `.opencode/rules/network-code.md`
- `.opencode/agents/network-programmer.md`
