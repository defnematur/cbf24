// Zeigt fehlende Daten sichtbar als [PLATZHALTER] an, statt etwas zu erfinden.
export function Platzhalter({ wert, label }: { wert: string | null | undefined; label: string }) {
  if (wert) return <>{wert}</>;
  return <span className="placeholder-text">[{label}]</span>;
}
