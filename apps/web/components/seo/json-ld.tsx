import {
  toJsonLdDocument,
  validateJsonLd,
  type WebPageSchemaInput,
  buildGlobalSchemaGraph,
  buildPageSchemaGraph,
} from '@/lib/schema';

type JsonLdProps =
  | {
      mode: 'global';
    }
  | {
      mode: 'page';
      page: WebPageSchemaInput;
      /** Additional Schema.org nodes merged into @graph (e.g. CreativeWork). */
      extra?: Record<string, unknown>[];
    }
  | {
      mode: 'graph';
      graph: Record<string, unknown>[];
    };

export function JsonLd(props: JsonLdProps) {
  const graph =
    props.mode === 'global'
      ? buildGlobalSchemaGraph()
      : props.mode === 'page'
        ? [...buildPageSchemaGraph(props.page), ...(props.extra ?? [])]
        : props.graph;

  const document = toJsonLdDocument(graph);
  const validation = validateJsonLd(document);

  if (!validation.ok && process.env.NODE_ENV !== 'production') {
    console.error('[json-ld] validation errors', validation.errors);
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(document) }}
    />
  );
}
