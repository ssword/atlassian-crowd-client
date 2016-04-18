# Change Log

## Unreleased
Nothing right now.

## 1.3.0 (2016-04-18)
Thanks to Philipp Fahrenschon for his [PR](https://github.com/wehkamp/atlassian-crowd-client/pull/4).
### Added
- Added option to expand users in client.group.users.list to User objects

## 1.2.1 (2016-04-18)
Thanks to thargor for his [PR](https://github.com/wehkamp/atlassian-crowd-client/pull/5).
### Fixed
- Fixed invalid Content-Length header caused by multibyte unicode characters

## 1.2.0 (2015-10-05)
Thanks to Alexander Wolden for his [PR](https://github.com/wehkamp/atlassian-crowd-client/pull/3).
### Added
- Expose the domain models from the client itself
- Added attributes property to Group and User domain models
### Changed
- Improved test reliability across Crowd instances

## 1.1.2 (2015-09-09)
Thanks to Peter Halliday for his [PR](https://github.com/wehkamp/atlassian-crowd-client/pull/2).
### Fixed
- Support for ports other than 443

## 1.1.1 (2015-07-24)
### Changed
- Reject attribute values which exceed 255 characters in length
### Fixed
- Always re-fetch data from Crowd when creating or updating a Group or User

## 1.1.0 (2015-07-21)
### Changed
- Set default session timeout to 10 minutes
- Fallback to empty string instead of undefined for names and group description
