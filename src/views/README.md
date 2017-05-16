ICON View Components
====================

How views and routes are used in the ICON front-end UI:
-------------------------------------------------------

- all views are attached to the ```icon.views``` Angular module in ```views/views.module.js```; this module is an injected dependency of the top-level ```icon``` application module in ```app.js```
- view names are ```camelCased```, with a file name that matches the view name (*example:* `camelCased.js`)
- views are associated with routes in the relevant ```.config(...)``` block of ```app.js```
- routes are referred to by named constants in ```views/routes.js```
- **NOTE:** one view may be re-used in multiple routes to minimize redundant template code


Conceptually, views should be an aggregate of sub-components, and contain little to no content or logic themselves.


Where possible, include data needed for the component's scope in the ```data``` parameter of the component definition, found in ```views/routes.js```. This improves reusability of components by keeping them "dumb", instead of relying on implicit global variables etc.
