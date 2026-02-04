<template>
  <section class="min-h-screen flex flex-col px-6 my-10">
    <h1>Nutzungsbedingungen (Terms of Service)</h1>
    <p>für die Website {{websiteName}} von {{fullName}}, {{address}} — Kontakt: {{contactEmail}}<br>Stand: {{tosUpdatedAt}}</p>

    <h2>1. Geltungsbereich</h2>
    <p>Diese Nutzungsbedingungen regeln den Zugriff auf und die Nutzung der Website {{websiteName}}. Mit dem Zugriff erklären Sie sich mit diesen Bedingungen einverstanden.</p>

    <h2>2. Inhalte der Website</h2>
    <p>Die Inhalte wurden mit größter Sorgfalt erstellt. Es wird keine Gewähr für Richtigkeit, Vollständigkeit oder Aktualität übernommen.</p>

    <h2>3. Nutzung der Website</h2>
    <p>Die Nutzung erfolgt auf eigene Verantwortung. Untersagt sind insbesondere Eingriffe in den Betrieb, das Umgehen von Sicherheitsmechanismen sowie automatisiertes Auslesen von Daten. Es besteht kein Anspruch auf ständige Verfügbarkeit; der Zugriff kann jederzeit eingeschränkt oder beendet werden.</p>

    <h2>4. Geistiges Eigentum</h2>
    <p>Alle Inhalte (insb. Texte, Bilder, Grafiken, Logos, Layouts, Quellcode) sind urheberrechtlich oder durch sonstige Schutzrechte geschützt. Jede Nutzung außerhalb der gesetzlichen Schranken bedarf der vorherigen Zustimmung von {{fullName}}.</p>

    <h2>5. Haftungsausschluss</h2>
    <p>Wir haften für Schäden nur bei Vorsatz und grober Fahrlässigkeit sowie bei Verletzung wesentlicher Vertragspflichten. Bei leicht fahrlässiger Verletzung wesentlicher Pflichten ist die Haftung auf den vorhersehbaren, typischen Schaden begrenzt. Für Inhalte externer Seiten wird keine Haftung übernommen.</p>

    <h2>6. Änderungen</h2>
    <p>Wir können diese Nutzungsbedingungen jederzeit mit Wirkung für die Zukunft ändern. Die jeweils aktuelle Fassung wird auf {{websiteName}} bereitgestellt.</p>

    <h2>7. Anwendbares Recht und Gerichtsstand</h2>
    <p>Es gilt das Recht von {{country}}. Gerichtsstand ist, soweit gesetzlich zulässig, {{jurisdiction}}.</p>

  </section>
</template>
<script setup lang="ts">
useHead({
  title: 'Nutzungsbedingungen',
})
const headers = useRequestHeaders(['host'])
const websiteName = headers?.host ?? window.location.host
const fullName = 'Björn Pfoster';
const address = 'CH-4492 Tecknau';
const contactEmail = 'info@darker.dev'; // todo use email for host
const tosUpdatedAt = '23.09.2025';
const country = 'Schweiz';
const jurisdiction = 'Basel-Landschaft';
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