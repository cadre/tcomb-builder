# Lazy Template Provider

## Background

Writing form-based applications on a mixed stack – e.g. a Javascript client and
Java server – requires writing validation code twice.  Once on the client to
show intelligent errors to users in real time, and once on the server to
validate the data and protect against attacks. Many times, this logic ends up
being equivalent and writing it twice only introduces more complexity and bugs.

If your stack is isomorphic – that is, running the same language on the client
and server – you can likely reuse the same validation code in both places.
`tcomb` and `tcomb-validation`, which do not include `react`, are well suited
for this.

If you look at the `package.json` for this project, you will notice that
neither `tcomb-form` nor `react` are dependencies. This is made possible by
lazily fetching React templates and is useful if you decide to include
`tcomb-builder` on the server.

## Use Cases

Consider two use cases:

1. A multipage survey where validation is shared on the client and server.

2. A single form where validation is not shared on the client and server.

### Multipage Survey

In the multipage survey case, your `tcomb-builder`s should be in a library that
is shared between the client and server. In the library, use the
`.setLazyTemplateFactory` function to lazily set the templates for your fields
and layout. On the client, an instance of `LazyTemplateProvider` is created,
templates are set, and it is passed to the `.getOptions` method of the builders
before they are passed to `tcomb-form`.

**The `LazyTemplateProvider` is a key value mapping of identifiers to React
components.** The class checks if the template has been set before returning it
and throws a helpful error if it is missing rather than allow a confusing error
to be thrown deep inside of `tcomb-form`.

### Single Form

In the single form case, the `tcomb-builder` representing your form should
*not* be put into a shared library. Instead, it is best to define this form
only on the client. Builders for individual fields can still be shared; some
are already available in this library.

In this case, you can choose not to use `.setLazyTemplateFactory` and
`LazyTemplateProvider`. Instead, use `.setTemplateFactory` since the template
is available on the client (no need for lazy evaluation).

Alternatively, you may find it is easier to configure one
`LazyTemplateProvider` on the client that is the single source of truth for all
of your templates and still use `.setLazyTemplateFactory` for your client
forms. However, it is still recommended that you not place single page forms in
a shared library because it makes your code harder to understand and reuse.
