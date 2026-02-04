<template>
  <button @click="run()">Run</button>
  <section class="min-h-screen flex flex-col px-6 my-10">
    <h1 id="datenschutzerklaerung">Datenschutzerklärung</h1>
    <h2 id="verantwortlicher">1. Verantwortlicher</h2>
    <p>Verantwortlich im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:</p>
    <p>
      <strong>{{ fullName }}</strong><br/>
      {{ address }}<br/>
      E-Mail: {{ contactEmail }}
    </p>
    <hr>
    <h2 id="allgemeines">2. Allgemeines zur Datenverarbeitung</h2>
    <p>Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften
      sowie dieser Datenschutzerklärung.<br/>
      Die Nutzung unserer Website ist grundsätzlich ohne Angabe personenbezogener Daten möglich. Soweit auf unseren
      Seiten personenbezogene Daten erhoben werden (z. B. über ein Kontaktformular), erfolgt dies stets auf freiwilliger
      Basis.</p>
    <hr>
    <h2 id="hosting">3. Hosting und Content Delivery Network (CDN)</h2>
    <p>Unsere Website wird auf einem selbst verwalteten Server betrieben. Zusätzlich nutzen wir Dienste von <strong>Cloudflare,
      Inc.</strong> (101 Townsend St, San Francisco, CA 94107, USA) als Content Delivery Network und Sicherheitsdienst.
      Cloudflare verarbeitet hierbei technische Zugriffsdaten (z. B. IP-Adresse, Browser-Informationen,
      Zugriffszeitpunkte), um Angriffe abzuwehren und die Ladezeiten zu optimieren.<br/>
      Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren und effizienten
      Bereitstellung unseres Onlineangebots).</p>
    <hr>
    <h2 id="allgemeine-daten">4. Erfassung allgemeiner Daten</h2>
    <p>Beim Besuch unserer Website werden automatisch Informationen durch den Browser an unseren Server übermittelt:</p>
    <ul>
      <li>IP-Adresse des Endgeräts</li>
      <li>Datum und Uhrzeit des Zugriffs</li>
      <li>verwendeter Browser und Betriebssystem</li>
      <li>Referrer-URL</li>
    </ul>
    <p>Diese Daten sind technisch erforderlich, um die Website korrekt darzustellen, und werden für eine begrenzte Zeit
      gespeichert. Eine Zusammenführung dieser Daten mit anderen Datenquellen erfolgt nicht.</p>
    <hr>
    <h2 id="google-analytics">5. Google Analytics</h2>
    <p>Wir setzen <strong>Google Analytics</strong> ein, einen Webanalysedienst der Google Ireland Limited (Gordon
      House, Barrow Street, Dublin 4, Irland).</p>
    <p>Google Analytics verwendet Cookies, die eine Analyse Ihrer Nutzung der Website ermöglichen. Die so erzeugten
      Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA
      übertragen und dort gespeichert.<br/>
      Wir haben die IP-Anonymisierung aktiviert, sodass Ihre IP-Adresse von Google innerhalb der EU/EWR vor der
      Übermittlung in die USA gekürzt wird.</p>
    <p>Rechtsgrundlage für die Nutzung ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Analyse des
      Nutzerverhaltens zur Optimierung des Online-Angebots).</p>
    <hr>
    <h2 id="google-fonts">6. Google Fonts</h2>
    <p>Diese Website nutzt zur einheitlichen Darstellung von Schriftarten sogenannte <strong>Google Fonts</strong>,
      bereitgestellt von Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Irland). Beim Aufruf einer Seite
      lädt Ihr Browser die benötigten Fonts direkt von Google-Servern. Dabei wird Ihre IP-Adresse an Google übertragen.
    </p>
    <p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (Interesse an einheitlicher und ansprechender Darstellung).</p>
    <hr>
    <h2 id="kontaktformular">7. Kontaktformular</h2>
    <p>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben (Name, E-Mail, Nachricht) zwecks
      Bearbeitung der Anfrage gespeichert.<br/>
      Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
    <p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung bzw. vorvertragliche Maßnahmen) sowie Art. 6
      Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).</p>
    <hr>
    <h2 id="speicherdauer">8. Speicherdauer</h2>
    <p>Personenbezogene Daten werden nur so lange gespeichert, wie es für den jeweiligen Zweck erforderlich ist oder wir
      gesetzlich zur Aufbewahrung verpflichtet sind.</p>
    <hr>
    <h2 id="rechte">9. Rechte der betroffenen Person</h2>
    <p>Sie haben das Recht,</p>
    <ul>
      <li>gemäß Art. 15 DSGVO Auskunft über Ihre bei uns gespeicherten Daten zu erhalten,</li>
      <li>gemäß Art. 16 DSGVO die Berichtigung unrichtiger oder Vervollständigung Ihrer Daten zu verlangen,</li>
      <li>gemäß Art. 17 DSGVO die Löschung Ihrer Daten zu verlangen, soweit keine gesetzlichen Aufbewahrungspflichten
        entgegenstehen,
      </li>
      <li>gemäß Art. 18 DSGVO die Einschränkung der Verarbeitung zu verlangen,</li>
      <li>gemäß Art. 20 DSGVO Ihre Daten in einem maschinenlesbaren Format zu erhalten,</li>
      <li>gemäß Art. 21 DSGVO Widerspruch gegen die Verarbeitung einzulegen.</li>
    </ul>
    <hr>
    <h2 id="beschwerderecht">10. Beschwerderecht bei der Aufsichtsbehörde</h2>
    <p>Sie haben außerdem das Recht, sich bei einer zuständigen Datenschutzaufsichtsbehörde über die Verarbeitung Ihrer
      personenbezogenen Daten zu beschweren.</p>
  </section>
</template>
<script setup lang="ts">
type RoleMap = Record<string, string[]>;

function resolveAll(roles: string[]): Set<string> {
  const memo = new Map<string, Set<string>>();
  const visiting = new Set<string>();

  const expand = (role: string): Set<string> => {
    if (memo.has(role)) return memo.get(role)!;
    if (visiting.has(role)) throw new Error(`Cycle detected at role: ${role}`);
    visiting.add(role);

    const acc = new Set<string>();
    if (!(role in roleMap)) {
      // leaf permission
      acc.add(role);
    } else {
      for (const item of roleMap[role]) {
        if (item in roleMap) {
          for (const x of expand(item)) {
            acc.add(x);
          }
        } else {
          acc.add(item); // leaf permission
        }
      }
      acc.add(role); // keep the role itself
    }

    visiting.delete(role);
    memo.set(role, acc);
    return acc;
  };

  const out = new Set<string>();
  for (const r of startRoles) {
    for (const x of expand(r)) {
      out.add(x);
    }
  }
  return out;
}

const data = JSON.parse(`{
  "admin": [
    ":read",
    ":create",
    ":write",
    ":archive",
    ":delete"
  ],
  "impersonator": [
    "admin"
  ],
  "stakeholder":[
    ":read"
  ],
  "plates": [
    "plates:process",
    "plates:read",
    "plates:create",
    "plates:write",
    "plates:archive"
  ],
  "recipe":[
    "recipe:read",
    "recipe:create",
    "recipe:write",
    "recipe:archive",
    "plates"
  ],
  "user": [
    "plates",
    "recipes"
  ]
}`);

function run() {
  console.log(resolveAll(data))
}

useHead({
  title: 'Datenschutz',
})
const fullName = 'Björn Pfoster';
const address = 'CH-4492 Tecknau';
const contactEmail = 'info@darker.dev'; // todo use email for host
</script>
<style>
@reference "#main";

h1 {
  @apply text-xl mb-4 mt-7;
}

h2 {
  @apply text-lg mb-3 mt-6;
}

p {
  @apply text-ellipsis
}

hr {
  @apply my-10;
}
</style>