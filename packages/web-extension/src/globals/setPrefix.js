import settings from 'carbon-components/es/globals/js/settings';
// Save the real Carbon v10 prefix before overriding it with the devtools
// namespace so the grid overlay does not collide with page styles.
// The fallback 'bx' ensures this is safe even if the import is tree-shaken.
settings.carbonPrefix = settings.prefix || 'bx';
settings.prefix = 'bx-dev';
