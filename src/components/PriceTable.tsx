import {
  druckpreise,
  druckVerfahrenSpalten,
  mengenstaffel,
  stickpreisProStueck,
  stickprogramm,
} from "@/data/preise";
import { Platzhalter } from "./Platzhalter";
import styles from "./PriceTable.module.css";

export function StickPreise() {
  return (
    <div className={styles.list}>
      {stickprogramm.map((row) => (
        <div key={row.leistung} className={styles.row}>
          <span>{row.leistung}</span>
          <strong className={styles.price}>
            <Platzhalter wert={row.preis} label="PREIS" />
          </strong>
        </div>
      ))}
      <div className={`${styles.row} ${styles.muted}`}>
        <span>Stickpreis pro Stück</span>
        <strong className={styles.price}>
          <Platzhalter wert={stickpreisProStueck} label="PREIS je Stichzahl" />
        </strong>
      </div>
    </div>
  );
}

export function DruckPreise() {
  return (
    // Tabelle scrollt auf schmalen Bildschirmen horizontal innerhalb ihres Rahmens
    <div className={styles.scroll} tabIndex={0} role="region" aria-label="Preistabelle Druck, horizontal scrollbar">
      <table className={styles.table}>
        <caption className="sr-only">Richtwerte pro Stück, zzgl. MwSt. und Textil</caption>
        <thead>
          <tr>
            <th scope="col">Motivgröße</th>
            {druckVerfahrenSpalten.map((v) => (
              <th scope="col" key={v}>
                {v}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {druckpreise.map((row) => (
            <tr key={row.motivgroesse}>
              <th scope="row">{row.motivgroesse}</th>
              {row.preise.map((p, i) => (
                <td key={i}>
                  <Platzhalter wert={p} label="PREIS" />
                </td>
              ))}
            </tr>
          ))}
          <tr className={styles.mutedRow}>
            <th scope="row">{mengenstaffel.label}</th>
            {mengenstaffel.rabatte.map((r, i) => (
              <td key={i}>
                <Platzhalter wert={r} label="RABATT" />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
