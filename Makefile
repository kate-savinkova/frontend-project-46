install: 
	npm ci
lint: 
	npx eslint .
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest --no-warnings
test-coverage:
	npm test -- --coverage --coverageProvider=v8
.PHONY: test