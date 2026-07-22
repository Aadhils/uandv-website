import assert from 'node:assert/strict';

import {
  buildPageSchemaGraph,
  schemaSameAs,
  schemaServices,
  toJsonLdDocument,
  validateJsonLd,
} from '../lib/schema';

const document = toJsonLdDocument(
  buildPageSchemaGraph({
    title: 'Home',
    description: 'U&V Technologies',
    path: '/',
    breadcrumbs: [{ name: 'Home', path: '/' }],
  }),
);

const result = validateJsonLd(document);
assert.equal(result.ok, true, result.errors.join('; '));

const graph = document['@graph'] as Record<string, unknown>[];

const organization = graph.find((n) => n['@type'] === 'Organization') as Record<
  string,
  unknown
>;
assert.equal(organization.name, 'U&V Technologies');
assert.equal(organization.url, 'https://uandv.com');
assert.equal(organization.email, 'info@uandv.com');
assert.equal(
  (organization.logo as Record<string, unknown>).url,
  'https://uandv.com/icon.svg',
);
assert.deepEqual(organization.sameAs, [...schemaSameAs]);

const website = graph.find((n) => n['@type'] === 'WebSite') as Record<
  string,
  unknown
>;
const action = website.potentialAction as Record<string, unknown>;
assert.equal(action['@type'], 'SearchAction');
assert.ok(
  String((action.target as Record<string, unknown>).urlTemplate).includes(
    '{search_term_string}',
  ),
);

const services = graph.filter((n) => n['@type'] === 'Service');
assert.ok(services.length >= schemaServices.length);

for (const expected of schemaServices) {
  assert.ok(
    services.some((s) => s.name === expected.name),
    `Missing Service: ${expected.name}`,
  );
}

assert.ok(graph.some((n) => n['@type'] === 'WebPage'));
assert.ok(graph.some((n) => n['@type'] === 'BreadcrumbList'));

JSON.parse(JSON.stringify(document));

console.log('JSON-LD validation passed.');
console.log(
  `- Organization, WebSite+SearchAction, ${schemaServices.length} Services, WebPage, BreadcrumbList OK`,
);
