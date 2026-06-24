type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown> | null | undefined>;
};

export function JsonLd({ data }: JsonLdProps) {
  const schemas = (Array.isArray(data) ? data : [data]).filter(
    (schema): schema is Record<string, unknown> => Boolean(schema)
  );
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
