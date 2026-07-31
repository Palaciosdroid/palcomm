"""Setzt templates/serene auf die Demo-Praxis «Deine Praxis».

Erzeugt die Vorlage für das Startbild der Palacios-Seite. Danach mit
`git checkout templates/serene` zurücksetzen — die Demo-Inhalte gehören
nicht ins Repo.

Aufbau nach dem Vorbild der Kundenseite Hypnose Enza: Zielgruppen und
Themen als Raster, Konditionen, Kontaktformular. Die Texte sind aber neu
geschrieben. Die Formulierungen einer echten Kundin auf der eigenen
Verkaufsseite zu zeigen wäre schräg — und ihre Arbeit.
"""
import pathlib
import re
import sys

WURZEL = pathlib.Path("/home/user/palcomm/templates/serene")

ZIELGRUPPEN = [
    ("Erwachsene", "Grübeln, das nicht aufhört. Anspannung, die auch am Wochenende bleibt."),
    ("Kinder und Jugendliche", "Prüfungsangst, Lernblockaden, Druck in der Schule."),
    ("Eltern", "Wenn man alles richtig machen will und trotzdem an Grenzen kommt."),
    ("Menschen unter Druck", "Erschöpfung, Überforderung im Beruf, Vorbeugen statt Ausbrennen."),
    ("Ältere Menschen", "Übergänge, Schlaf, Ängste, die mit den Jahren gekommen sind."),
]

# Die Symbole stammen aus topicIconMap in ServicesSection — andere Namen
# rendern nichts.
THEMEN = [
    ("Ängste und Panik", "cloud-lightning", "Panikattacken, soziale Angst, Sorgen, die den Alltag bestimmen."),
    ("Schlaf und Unruhe", "moon-star", "Einschlafen, Durchschlafen, das Gedankenkarussell am Abend."),
    ("Schmerzen", "heart-pulse", "Chronische Schmerzen lindern und den Umgang damit verändern."),
    ("Selbstvertrauen", "trophy", "Alte Muster erkennen und ein anderes Bild von sich aufbauen."),
    ("Rauchstopp", "cigarette-off", "Aufhören, ohne den Kampf gegen sich selbst."),
    ("Gewicht", "scale", "Essgewohnheiten verändern, ohne Verbotsliste."),
    ("Blockaden lösen", "unlock", "Was einen festhält, benennen und in Bewegung bringen."),
    ("Trauer und Übergänge", "flower-2", "Abschied, Neuanfang, Zeiten ohne festen Boden."),
    ("Phobien", "spider", "Höhe, Enge, Flug, Tiere — gezielt und in kurzer Zeit."),
]


def js_zielgruppen():
    teile = []
    for i, (titel, text) in enumerate(ZIELGRUPPEN, 1):
        teile.append(
            "      {\n"
            f'        id: "zielgruppe-{i}",\n'
            f'        title: "{titel}",\n'
            f'        image: "/images/zielgruppe-{(i - 1) % 3 + 1}.svg",\n'
            f'        description: "{text}",\n'
            "      },"
        )
    return "\n".join(teile)


def js_themen():
    teile = []
    for i, (titel, symbol, text) in enumerate(THEMEN, 1):
        teile.append(
            "      {\n"
            f'        id: "thema-{i}",\n'
            f'        title: "{titel}",\n'
            f'        icon: "{symbol}",\n'
            f'        description: "{text}",\n'
            "      },"
        )
    return "\n".join(teile)


def ersetze_block(text, schluessel, neu):
    """Ersetzt ein Array-Feld `schluessel: [...]` auf oberster Klammerebene."""
    start = text.index(f"{schluessel}: [")
    i = text.index("[", start)
    tiefe = 0
    for j in range(i, len(text)):
        if text[j] == "[":
            tiefe += 1
        elif text[j] == "]":
            tiefe -= 1
            if tiefe == 0:
                return text[: i + 1] + "\n" + neu + "\n    " + text[j:]
    raise ValueError(schluessel + " nicht abgeschlossen")


def main():
    p = WURZEL / "src/lib/content.ts"
    t = p.read_text(encoding="utf-8")

    einfach = [
        ('name: "Musterpraxis",', 'name: "Deine Praxis",'),
        ('tagline: "Beratung & Begleitung",', 'tagline: "Hypnose- und Gesprächstherapie",'),
        ('fullName: "Vorname Nachname",', 'fullName: "Dein Name",'),
        ('subtitle: "Persönlich und auf Augenhöhe",', 'subtitle: "Persönlich und auf Augenhöhe",'),
        ('phone: "+41 00 000 00 00",', 'phone: "+41 31 000 00 00",'),
        ('email: "kontakt@musterpraxis.ch",', 'email: "hallo@deine-praxis.ch",'),
        ('street: "Musterstrasse 1",', 'street: "Deine Strasse 1",'),
        ('city: "0000 Musterort",', 'city: "3000 Bern",'),
        ('title: "Ihr Weg beginnt hier",', 'title: "Da ankommen, wo du hinwolltest.",'),
        (
            '"Ein kurzer, einladender Satz, der beschreibt, was Sie anbieten und wofür Sie stehen. Zwei bis drei Zeilen wirken am besten.",',
            '"Ich begleite Menschen, die mit Ängsten, Schlafproblemen oder alten Mustern leben — behutsam und in deinem Tempo.",',
        ),
    ]
    fehlend = [a for a, _ in einfach if a not in t]
    if fehlend:
        print("NICHT GEFUNDEN:", *fehlend, sep="\n  ")
        sys.exit(1)
    for a, b in einfach:
        t = t.replace(a, b)

    t = ersetze_block(t, "targetGroups", js_zielgruppen())
    t = ersetze_block(t, "topics", js_themen())
    p.write_text(t, encoding="utf-8")

    c = WURZEL / "src/lib/site-config.ts"
    s = c.read_text(encoding="utf-8")
    s = s.replace('name: "Musterpraxis",', 'name: "Deine Praxis",')
    s = s.replace('domain: "musterpraxis.ch",', 'domain: "deine-praxis.ch",')
    # Das Regenbogen-Abzeichen ist eine Option für Kundenseiten, keine
    # Aussage von Palacios. Im Demo-Bild hat es nichts verloren.
    s = s.replace("showInclusivityBadge: true", "showInclusivityBadge: false")
    c.write_text(s, encoding="utf-8")

    logo = WURZEL / "public/images/logo.svg"
    logo.write_text(
        '<svg xmlns="http://www.w3.org/2000/svg" width="260" height="64" '
        'viewBox="0 0 260 64" role="img" aria-label="Deine Praxis">\n'
        '  <text x="0" y="32" font-family="Georgia, serif" font-size="29" '
        'fill="#3d4a3a">Deine Praxis</text>\n'
        '  <text x="2" y="51" font-family="system-ui, sans-serif" font-size="9.5" '
        'letter-spacing="3.4" fill="#7a8775">HYPNOSE &amp; GESPRÄCHSTHERAPIE</text>\n'
        "</svg>\n",
        encoding="utf-8",
    )
    print("Demo-Inhalte gesetzt:", len(ZIELGRUPPEN), "Zielgruppen,", len(THEMEN), "Themen")


if __name__ == "__main__":
    main()
