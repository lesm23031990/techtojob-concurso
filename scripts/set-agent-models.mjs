#!/usr/bin/env node
/**
 * Interruptor de modelos del sistema multiagente (politica en AGENTS.md).
 *
 * Primario: opencode-go (cada agente con su modelo afinado).
 * Reserva:  deepseek/deepseek-flash, SOLO mientras los creditos de
 *           opencode-go esten agotados (reserva de disponibilidad, no de calidad).
 *
 * Uso:
 *   node scripts/set-agent-models.mjs opencode-go [--dry-run]
 *   node scripts/set-agent-models.mjs deepseek    [--dry-run]
 *   node scripts/set-agent-models.mjs status
 *
 * Reescribe UNICAMENTE la linea `model:` del frontmatter de cada agente; el
 * resto del archivo (description, mode, temperature, permission) queda intacto.
 * Es idempotente y falla con exit 1 si un frontmatter no trae `model:`, para
 * nunca dejar un archivo a medias (opencode no arranca con frontmatter roto).
 *
 * OJO: opencode carga la config una sola vez al arrancar — tras cambiar los
 * modelos hay que reiniciar opencode para que el cambio tenga efecto.
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const AGENTS_DIR = path.join(ROOT, ".opencode", "agent");

/** Modelo primario por agente (arquitectura original del proyecto). */
const PRIMARY = {
  "spec-architect": "opencode-go/qwen3.8-flash",
  "nextjs-builder": "opencode-go/kimi-k3",
  "design-ux": "opencode-go/glm-5.3",
  "qa-access": "opencode-go/qwen3.8-flash",
  "rules-auditor": "opencode-go/qwen3.8-flash",
  "seo-perf": "opencode-go/qwen3.8-flash",
};

/** Modelo de reserva: unico modelo deepseek disponible en el entorno. */
const FALLBACK = "deepseek/deepseek-flash";

const MODES = {
  "opencode-go": (agent) => PRIMARY[agent],
  deepseek: () => FALLBACK,
};

const MODEL_LINE = /^model:[^\n]*$/m;
const MODEL_VALUE = /^model:[ \t]*(\S+)[ \t]*$/m;

/**
 * @param {string} agent
 * @returns {Promise<{ agent: string, before: string, after: string | null }>}
 */
async function readCurrent(agent) {
  const file = path.join(AGENTS_DIR, `${agent}.md`);
  const source = await readFile(file, "utf8");
  const match = source.match(MODEL_VALUE);
  if (!match) {
    throw new Error(
      `${agent}.md no tiene una linea "model: <valor>" en el frontmatter. Abortado sin escribir nada.`,
    );
  }
  return { agent, before: match[1], after: null };
}

/** Files present in the agents dir that this script does not manage. */
async function unmanagedAgents() {
  const entries = await readdir(AGENTS_DIR);
  const names = entries
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
  return names.filter((name) => !(name in PRIMARY));
}

function usage() {
  return [
    "Uso: node scripts/set-agent-models.mjs <modo> [--dry-run]",
    "  modos: opencode-go | deepseek | status",
    "  --dry-run: muestra el cambio sin escribir",
  ].join("\n");
}

async function main() {
  const [, , rawMode, ...flags] = process.argv;
  const dryRun = flags.includes("--dry-run");
  const extra = await unmanagedAgents();

  if (!rawMode || !["opencode-go", "deepseek", "status"].includes(rawMode)) {
    console.error(usage());
    process.exitCode = 1;
    return;
  }

  if (extra.length > 0) {
    console.warn(
      `AVISO: hay agentes fuera del mapa (quedan con su modelo actual): ${extra.join(", ")}`,
    );
  }

  const agents = Object.keys(PRIMARY);
  const current = await Promise.all(agents.map(readCurrent));
  const rows = [];
  let changes = 0;
  const isStatus = rawMode === "status";

  for (const entry of current) {
    const after = isStatus ? entry.before : MODES[rawMode](entry.agent);
    const isChange = !isStatus && after !== entry.before;
    rows.push({ ...entry, after, isChange });

    if (!isChange) continue;

    const file = path.join(AGENTS_DIR, `${entry.agent}.md`);
    if (!dryRun) {
      const source = await readFile(file, "utf8");
      await writeFile(file, source.replace(MODEL_LINE, `model: ${after}`), "utf8");
    }
    changes += 1;
  }

  const width = Math.max(...agents.map((agent) => agent.length));
  console.log(isStatus ? "Modelo actual por agente:" : `Modo: ${rawMode}${dryRun ? " (dry-run)" : ""}`);
  for (const row of rows) {
    const suffix = row.isChange ? ` -> ${row.after}` : "";
    console.log(`  ${row.agent.padEnd(width)}  ${row.before}${suffix}`);
  }

  if (!isStatus) {
    console.log(
      changes === 0
        ? "Sin cambios (ya estaban en ese modo)."
        : `${changes} archivo(s) ${dryRun ? "a cambiar" : "actualizados"}. Reinicia opencode para aplicarlo.`,
    );
  }
}

main().catch((error) => {
  console.error(`ERROR: ${error.message}`);
  process.exitCode = 1;
});
