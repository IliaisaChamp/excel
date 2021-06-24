install: install-deps

start:
	npm run start

build:
	npm run build

make lint:
	npx eslint . --ext js

install-deps:
	npm install
