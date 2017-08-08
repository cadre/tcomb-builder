# Types vs. Options

When rendering a tcomb-form from a tcomb type, display information such as
labels, error messages, and disabled statuses is given to the tcomb-form. In
the tcomb-form documentation, two methods for doing this are described:

1. Set each option field on the prototype of the tcomb type

2. Create a parallel "options" object which defines each option separately from
   the tcomb type

This library takes the second approach. The complexity of the second approach
is apparent when composing types - the options blob must be composed in
parallel. However, it has the advantages of cleanly separating type data
from display parameters and making the options blob easier to inspect.

When rendering a form, the first approach passes only the tcomb type to the
tcomb component:

`<t.form.Form ref="form" type={WiringInstructionsType} />`

whereas the second approach requires the options object to be passed
separately:

`<t.form.Form ref="form" type={WiringInstructionsType} options={WiringInstructionsOptions} />`
