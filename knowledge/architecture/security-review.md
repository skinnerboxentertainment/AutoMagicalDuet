---
domain: architecture
tags: [security, privacy, validation]
triggers: [src/networking/**, src/save/**, src/analytics/**, src/**]
related: [architecture/network-code-standards, workflow/release-pipeline]
---

# Security Review

Security review starts from the threat model: untrusted input, cheating, save tampering, data privacy, secrets, and release exposure.

## Patterns

- Validate and sanitize all user-controlled strings and packets.
- Rate-limit client-to-server calls and anomaly logging.
- Use TLS for network communication.
- Keep server-authoritative validation for critical state.
- Version saves, add integrity checks, and handle corruption gracefully.
- Collect only necessary analytics data and provide opt-out where required.
- Keep secrets, tokens, and credentials out of source, logs, saves, and client errors.
- Review each feature for attack surface before release.

## Anti-patterns

- Hardcoded secrets or credentials.
- Plaintext sensitive data in logs.
- Security through obscurity without validation.
- Exposing cheat detection logic in client-visible errors.
- Collecting personally identifiable information without explicit requirements.

## References

- `.opencode/agents/security-engineer.md`
- `.opencode/rules/network-code.md`
