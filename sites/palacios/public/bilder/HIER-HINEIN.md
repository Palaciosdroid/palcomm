# Bilder für die Website

Datei unter genau diesem Namen hier ablegen, pushen — Railway baut neu und
das Bild erscheint. Kein Code nötig. Solange eine Datei fehlt, zeigt die
Seite einen beschrifteten Platzhalter.

| Datei | Stelle | Format | Empfohlen |
|---|---|---|---|
| `startbild-website.jpg` | Startbild, im Browserfenster-Rahmen | 16:9 | 1920×1080 — Bildschirmfoto vom oberen Teil einer Seite auf unserer Vorlage; zugeschnitten wird von oben |
| `beispiel-enza.jpg` | derzeit nicht eingebunden | 16:9 | Bildschirmfoto der Kundenseite Hypnose Enza, aufgehoben für einen späteren Beispiel-Abschnitt |
| `diplom.jpg` | «Kennst du diese Momente?», hinteres Bild | 4:3 | 1200×900 |
| `praxisraum.jpg` | «Kennst du diese Momente?», vorderes Bild | 4:3 | 1200×900 |

Regeln:
- Kleinschreibung, keine Umlaute, keine Leerzeichen im Dateinamen.
- JPG oder WebP, möglichst unter 500 KB (Fotos vorher verkleinern).
- Das Seitenverhältnis zählt mehr als die Pixelzahl — die Seite schneidet
  passend zu (object-cover), aber bei falschem Verhältnis verliert das
  Motiv Kopf oder Füsse.
- PNG nur für Grafiken mit Transparenz, nicht für Fotos.

## Das Startbild ist erzeugt, nicht abfotografiert

Es zeigt eine erfundene Praxis auf unserer eigenen Vorlage in der Farbwelt
Salbei. So gemacht: in `templates/serene` die Demo-Inhalte in
`src/lib/content.ts` setzen, `heroImage` in `src/lib/site-config.ts` auf ein
Foto zeigen lassen, mit `next dev` starten und den oberen Bildschirm bei
1920×1080 aufnehmen. Danach das Template zurücksetzen — die Demo-Inhalte
gehören nicht ins Repo.

Wichtig: Was hier gezeigt wird, muss die Vorlage auch wirklich können. Als das
Bild entstand, konnte der Hero nur Video oder Farbverlauf; das Hintergrundfoto
wurde dafür eingebaut, statt es im Bild vorzutäuschen.
