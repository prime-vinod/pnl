type Jsonish = Record<string, unknown>;

function safeJson(obj: Jsonish): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

export function JsonLd({ data }: { data: Jsonish }) {
  return (
    <script type="application/ld+json" suppressHydrationWarning>
      {safeJson(data)}
    </script>
  );
}
