/**
 * Dati strutturati schema.org: Google e i motori AI li leggono per capire
 * di cosa parla la pagina, chi l'ha scritta e quando.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // `<` escapato: un testo con "</script>" non può chiudere il tag
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
