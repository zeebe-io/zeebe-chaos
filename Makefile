# Makefile for go-chaos
directory=go-chaos

# test: runs the tests without updating the golden files (runs checks against golden files)
.PHONY: test
test:	
	go test $(directory)/...

# golden: runs the tests with updating the golden files
.PHONY: golden
golden:	
	go test $(directory)/... -args -update-golden 

# fmt: runs the gofmt in order to format all go files
.PHONY: fmt
fmt:
	go fmt $(directory)/... 

# addlicense: add license headers to go files
.PHONY: addlicense
addlicense:
	addlicense -c 'Camunda Services GmbH' -l apache go-chaos/**/*.go

# checkLicense: checks that the go files contain license header
.PHONY: checkLicense
checkLicense:
	addlicense -check -l apache go-chaos/**/*.go

# installLicense: installs the addlicense tool
.PHONY: installLicense
installLicense:
	go install github.com/google/addlicense@v1.0.0
