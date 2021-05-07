# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.11.0](https://www.github.com/amplience/dc-management-sdk-js/compare/v1.10.0...v1.11.0) (2021-05-07)


### Features

* **webhooks:** add webhook properties for headers, method, filters and customPayload ([#83](https://www.github.com/amplience/dc-management-sdk-js/issues/83)) ([cc4315d](https://www.github.com/amplience/dc-management-sdk-js/commit/cc4315d04f42b67a29e3f53d24b87ef9629986e5))


### Bug Fixes

* **content items:** make locale nullable ([#80](https://www.github.com/amplience/dc-management-sdk-js/issues/80)) ([54a07b9](https://www.github.com/amplience/dc-management-sdk-js/commit/54a07b9b8663723664d39dcead44987039d192bf))
* **deps:** bump axios from 0.18.1 to 0.21.1 ([#76](https://www.github.com/amplience/dc-management-sdk-js/issues/76)) ([b4f046c](https://www.github.com/amplience/dc-management-sdk-js/commit/b4f046c466069a61fc9869b93d3295a809375f11))

## [1.10.0](https://github.com/amplience/dc-management-sdk-js/compare/v1.9.0...v1.10.0) (2021-01-28)


### Features

* updating auth and icon urls ([#77](https://github.com/amplience/dc-management-sdk-js/issues/77)) ([7cc7987](https://github.com/amplience/dc-management-sdk-js/commit/7cc79871b16672056b3137d569eff213c1899af5))

## [1.9.0](https://github.com/amplience/dc-management-sdk-js/compare/v1.8.0...v1.9.0) (2020-12-16)


### Features

* **content items:** facets support ([#71](https://github.com/amplience/dc-management-sdk-js/issues/71)) ([494d5e3](https://github.com/amplience/dc-management-sdk-js/commit/494d5e36800b5cb0e07de289c8a05be9ce5579e9))
* **content repository:** find by feature ([#65](https://github.com/amplience/dc-management-sdk-js/issues/65)) ([0e25837](https://github.com/amplience/dc-management-sdk-js/commit/0e2583795e629bda525a4a40f8386d2eeceedcf5))
* **event:** delete, archive events and delete, archive, unschedule editions ([#61](https://github.com/amplience/dc-management-sdk-js/issues/61)) ([32c9951](https://github.com/amplience/dc-management-sdk-js/commit/32c9951cc56fd417397c005438beaa8e75c55de4))
* **settings:** added update settings in a hub and workflow states lis… ([#62](https://github.com/amplience/dc-management-sdk-js/issues/62)) ([8326435](https://github.com/amplience/dc-management-sdk-js/commit/8326435f91eee5481670073ecb2115d2f34b51af))
* **webhook signature:** dynamically imports crypt ([#72](https://github.com/amplience/dc-management-sdk-js/issues/72)) ([12a67f7](https://github.com/amplience/dc-management-sdk-js/commit/12a67f7c5cf32a9d8d7809a37a10bf085d303e2e))
* **workflow-state:** assign to content-item and update workflow-state support ([#70](https://github.com/amplience/dc-management-sdk-js/issues/70)) ([578aca8](https://github.com/amplience/dc-management-sdk-js/commit/578aca85f5eadc5d833c0d82271ccbae20a37e10))

## [1.8.0](https://github.com/amplience/dc-management-sdk-js/compare/v1.7.0...v1.8.0) (2020-11-17)


### Features

* added hub() methods to the resource that have hub hal links ([#64](https://github.com/amplience/dc-management-sdk-js/issues/64)) ([5a94e36](https://github.com/amplience/dc-management-sdk-js/commit/5a94e36c74a2c23f8d96752de5ebf5a23b9daa86))
* expose edition find by date ([#63](https://github.com/amplience/dc-management-sdk-js/issues/63)) ([fcc5150](https://github.com/amplience/dc-management-sdk-js/commit/fcc51502254ad60dccaf921fda26089051c61567))
* Feature/cmp 7269 able to fetch children and parents to create hierarchys ([#60](https://github.com/amplience/dc-management-sdk-js/issues/60)) ([1badea6](https://github.com/amplience/dc-management-sdk-js/commit/1badea6d8ad76eb61a0aa9a3e8bb55a664e09d00))

## [1.7.0](https://github.com/amplience/dc-management-sdk-js/compare/v1.6.0...v1.7.0) (2020-09-01)


### Features

* **search indexes:** analytics apis ([#58](https://github.com/amplience/dc-management-sdk-js/issues/58)) ([759a7d8](https://github.com/amplience/dc-management-sdk-js/commit/759a7d829701d704f6a4ec3a19843d2e6fbbf9d0)), closes [#43](https://github.com/amplience/dc-management-sdk-js/issues/43) [#46](https://github.com/amplience/dc-management-sdk-js/issues/46) [#47](https://github.com/amplience/dc-management-sdk-js/issues/47) [#48](https://github.com/amplience/dc-management-sdk-js/issues/48) [#50](https://github.com/amplience/dc-management-sdk-js/issues/50) [#49](https://github.com/amplience/dc-management-sdk-js/issues/49) [#51](https://github.com/amplience/dc-management-sdk-js/issues/51)
* search index actions ([#44](https://github.com/amplience/dc-management-sdk-js/issues/44)) ([68c2a80](https://github.com/amplience/dc-management-sdk-js/commit/68c2a80f5c2a2577d2af68687b141230c982ea61))

<a name="1.6.0"></a>
# [1.6.0](https://github.com/amplience/dc-management-sdk-js/compare/v1.5.0...v1.6.0) (2020-07-29)


### Bug Fixes

* **folders:** fix subfolder pagination ([09d874d](https://github.com/amplience/dc-management-sdk-js/commit/09d874d))


### Features

* **content:** add support for archive and unarchive hal links ([ed40d28](https://github.com/amplience/dc-management-sdk-js/commit/ed40d28))
* **folders:** add proper pagination support to subfolder and subitem list ([27fdc54](https://github.com/amplience/dc-management-sdk-js/commit/27fdc54))



<a name="1.5.0"></a>
# [1.5.0](https://github.com/amplience/dc-management-sdk-js/compare/v1.4.2...v1.5.0) (2020-04-22)



<a name="1.4.2"></a>
## [1.4.2](https://github.com/amplience/dc-management-sdk-js/compare/v1.4.1...v1.4.2) (2020-02-12)


### Bug Fixes

* **docs:** logo update ([30e6629](https://github.com/amplience/dc-management-sdk-js/commit/30e6629))



<a name="1.4.1"></a>
## [1.4.1](https://github.com/amplience/dc-management-sdk-js/compare/v1.4.0...v1.4.1) (2019-11-07)



<a name="1.4.0"></a>
# [1.4.0](https://github.com/amplience/dc-management-sdk-js/compare/v1.3.1...v1.4.0) (2019-11-05)


### Bug Fixes

* **content-type-schema:** removed the sort support from the sdk ([b1e699b](https://github.com/amplience/dc-management-sdk-js/commit/b1e699b))
* **crypto import:** replace wildcard imports to avoid deprecated warnings ([5b44b54](https://github.com/amplience/dc-management-sdk-js/commit/5b44b54))
* **tojson:** added support for JSON.stringify serialization and deprecated previous method ([b8db6b1](https://github.com/amplience/dc-management-sdk-js/commit/b8db6b1))
* **tojson:** added support for JSON.stringify serialization and deprecated previous method ([2cb76ac](https://github.com/amplience/dc-management-sdk-js/commit/2cb76ac))


### Features

* **content type schema:** added extra resource to content types to update and fetch ([3408df3](https://github.com/amplience/dc-management-sdk-js/commit/3408df3))
* **content types:** added get and update actions along with tests ([d78b6e1](https://github.com/amplience/dc-management-sdk-js/commit/d78b6e1))
* **content-repository:** exposing itemLocales property ([a263f6d](https://github.com/amplience/dc-management-sdk-js/commit/a263f6d))
* **content-type-cached-schema:** exported ContentTypeCachedSchema & CachedSchema models ([df74052](https://github.com/amplience/dc-management-sdk-js/commit/df74052))
* **content-type-schema:** ability to create, update, get, get by version & list content-type-schemas ([7e32fac](https://github.com/amplience/dc-management-sdk-js/commit/7e32fac))
* **http errors:** extends the thrown http errors to include the request and response ([ca9c371](https://github.com/amplience/dc-management-sdk-js/commit/ca9c371))



<a name="1.3.1"></a>
## 1.3.1 (2019-07-17)



<a name="1.3.0"></a>
# 1.3.0 (2018-11-29)



<a name="1.2.0"></a>
# 1.2.0 (2018-11-28)



<a name="1.1.0"></a>
# 1.1.0 (2018-11-09)



<a name="1.0.1"></a>
## 1.0.1 (2018-08-24)



<a name="1.0.0"></a>
# 1.0.0 (2018-08-23)


### Features

* Add npm badge ([9283870](https://github.com/amplience/dc-management-sdk-js/commit/9283870))
* travis-ci integration ([705733e](https://github.com/amplience/dc-management-sdk-js/commit/705733e))



<a name="1.3.0"></a>
# 1.3.0 (2018-11-29)



<a name="1.2.0"></a>
# 1.2.0 (2018-11-28)



<a name="1.1.0"></a>
# 1.1.0 (2018-11-09)



<a name="1.0.1"></a>
## 1.0.1 (2018-08-24)



<a name="1.0.0"></a>
# 1.0.0 (2018-08-23)


### Features

* Add npm badge ([9283870](https://github.com/amplience/dc-management-sdk-js/commit/9283870))
* travis-ci integration ([705733e](https://github.com/amplience/dc-management-sdk-js/commit/705733e))



<a name="1.2.0"></a>
# 1.2.0 (2018-11-28)



<a name="1.1.0"></a>
# 1.1.0 (2018-11-09)



<a name="1.0.1"></a>
## 1.0.1 (2018-08-24)



<a name="1.0.0"></a>
# 1.0.0 (2018-08-23)


### Features

* Add npm badge ([9283870](https://github.com/amplience/dc-management-sdk-js/commit/9283870))
* travis-ci integration ([705733e](https://github.com/amplience/dc-management-sdk-js/commit/705733e))



<a name="1.1.0"></a>
# 1.1.0 (2018-11-09)



<a name="1.0.1"></a>
## 1.0.1 (2018-08-24)



<a name="1.0.0"></a>
# 1.0.0 (2018-08-23)


### Features

* Add npm badge ([9283870](https://github.com/amplience/dc-management-sdk-js/commit/9283870))
* travis-ci integration ([705733e](https://github.com/amplience/dc-management-sdk-js/commit/705733e))
