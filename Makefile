install: install-deps

start:
	npm run start

build:
	npm run build

make lint:
	npx eslint . --ext js

tests:
	npm test

coverage:
	npm test -- --coverage --coverageProvider=v8

install-deps:
	npm ci
