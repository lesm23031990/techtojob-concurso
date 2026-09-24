---
name: discord-material-intake
description: Processes the raw contest material from TechToJob deposited in material-concurso/ (pasted Discord txt, screenshots, PDFs) and generates the specs and the rules checklist. Use when Lorena reports that she has uploaded new material to Discord or asks to "process the material".
---

# Discord material intake

Turn raw Discord material into verifiable specifications. RAW material is never
copied literally into `specs/` beyond specific rule quotes
(no usernames or third-party identifiers — paraphrase context, quote only
the normative contest text).

## Procedure

1. **Inventory**: list everything in `material-concurso/` (bases/, criterios/, marca/,
   capturas/). Note dates and versions: if two versions of a rule contradict,
   the most recent wins and the change is documented.

2. **Rules checklist** → `specs/00-rules-checklist.md`. Table format:
   `| # | rule (short verbatim quote) | type: mandatory/evaluable/negative/meta | source | state |`
   - META type = deliverable requirements (repo, deploy, format, date).
   - any informational empty item goes to "Open questions" at the end of the file.

3. **Landing spec** → `specs/10-landing-spec.md`:
   conversion goal, audience, language, proposed sections (with justification
   "rule #N of the checklist requires it" or "UX criterion, NOT required"), copy available
   vs copy to write, brand assets available.

4. **Technical requirements** → `specs/20-technical-requirements.md`:
   transcribe thresholds/stack/tests/limits that the rules require verbatim.
   What the rules do NOT say is NOT invented: it goes to open questions.

5. **Evaluation criteria** → if material exists in criterios/, cross-reference:
   each criterion with weight → which agent in the system covers it and where the evidence lives.

6. **Closing**: update the phase table in GUIDE.md and write in
   `docs/DECISIONS.md` the ambiguities detected as a prioritized list of questions
   for the organizer (if the contest allows public questions).

## Anti-hallucination rule
Any statement in a spec that does not trace back to a line of the material or a decision
in docs/DECISIONS.md is deleted or marked `[ASSUMPTION - CONFIRM]`.
