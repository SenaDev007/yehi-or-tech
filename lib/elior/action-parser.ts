/**
 * Parsing des actions structurées retournées par Elior.
 * Format: [ACTION:TYPE|key:value|...]
 * CDC v1.4
 */

export type EliorAction =
  | { type: "SHOW_SERVICE"; slug: string }
  | { type: "OPEN_DEVIS_FORM"; services: string[]; niveau?: string }
  | { type: "ESCALADE_HUMAIN"; raison: string }
  | { type: "SAVE_LEAD"; data: { nom?: string; email?: string; telephone?: string; besoin?: string; budget?: string; entreprise?: string } }
  | { type: "SEND_BROCHURE"; email: string };

const ACTION_REGEX = /\[ACTION:([^|]+)(?:\|([^\]]+))?\]/g;

function parsePair(s: string): [string, string] {
  const eq = s.indexOf(":");
  if (eq === -1) return [s.trim(), ""];
  return [s.slice(0, eq).trim(), s.slice(eq + 1).trim()];
}

function parseAction(type: string, params: string): EliorAction | null {
  const pairs = params ? params.split("|").map(parsePair) : [];
  const map = new Map(pairs as [string, string][]);

  switch (type) {
    case "SHOW_SERVICE": {
      const slug = map.get("slug") ?? params?.trim();
      return slug ? { type: "SHOW_SERVICE", slug } : null;
    }
    case "OPEN_DEVIS_FORM": {
      const servicesStr = map.get("services") ?? "";
      const services = servicesStr ? servicesStr.split(",").map((s) => s.trim()).filter(Boolean) : [];
      const niveau = map.get("niveau") ?? undefined;
      return { type: "OPEN_DEVIS_FORM", services, niveau };
    }
    case "ESCALADE_HUMAIN": {
      const raison = map.get("raison") ?? params ?? "";
      return { type: "ESCALADE_HUMAIN", raison };
    }
    case "SAVE_LEAD": {
      const data = {
        nom: map.get("nom"),
        email: map.get("email"),
        telephone: map.get("telephone"),
        besoin: map.get("besoin"),
        budget: map.get("budget"),
        entreprise: map.get("entreprise"),
      };
      return { type: "SAVE_LEAD", data };
    }
    case "SEND_BROCHURE": {
      const email = map.get("email") ?? params?.trim();
      return email ? { type: "SEND_BROCHURE", email } : null;
    }
    default:
      return null;
  }
}

/**
 * Extrait toutes les actions [ACTION:...] d'un texte.
 */
export function parseActions(content: string): EliorAction[] {
  const actions: EliorAction[] = [];
  let m: RegExpExecArray | null;
  ACTION_REGEX.lastIndex = 0;
  while ((m = ACTION_REGEX.exec(content)) !== null) {
    const type = m[1].trim();
    const params = m[2]?.trim() ?? "";
    const action = parseAction(type, params);
    if (action) actions.push(action);
  }
  return actions;
}

/**
 * Retire les balises [ACTION:...] du texte pour affichage utilisateur.
 */
export function stripActions(content: string): string {
  return content.replace(ACTION_REGEX, "").replace(/\n{3,}/g, "\n\n").trim();
}
