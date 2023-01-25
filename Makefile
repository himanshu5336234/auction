SERVICE_NAME := $(shell basename ${PWD})
# Setup Project Variables
GIT_REF := $(shell git rev-parse --short=7 HEAD)
VERSION ?= commit-$(GIT_REF)
CODEOWNER := $(shell git config user.email)
BUILD_TYPE ?= development
REGISTRY := 083947760274.dkr.ecr.ap-south-1.amazonaws.com/auction-frontend
IMAGE := $(REGISTRY):$(VERSION)
LATEST :=latest
LATEST_IMAGE := $(REGISTRY):$(LATEST)
DOCKER_FILE := "Dockerfile"



.PHONY: run
run:
	REACT_APP_ENV=development npm start

.PHONY: dependencies
dependencies:
	npm install --legacy-peer-deps

.PHONY: check-build-type
check-build-type:
	@echo "BUILD_TYPE=${BUILD_TYPE}, IMAGE: ${IMAGE}, ENV: ${ENV}"

.PHONY: container
container:
	@docker	build -t $(IMAGE) \
			-f $(DOCKER_FILE) \
			.

.PHONY: get-ecr-credentials
get-ecr-credentials:
	aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin  083947760274.dkr.ecr.ap-south-1.amazonaws.com

.PHONY: docker-push
docker-push:
	docker push $(IMAGE)
	docker tag $(IMAGE) $(LATEST_IMAGE)
	docker push $(LATEST_IMAGE)

docker-run-local:
	docker run -p 3000:80 $(IMAGE)

.PHONY:run-https
run-https :
	HTTPS=true SSL_CRT_FILE=./.cert/cert.pem SSL_KEY_FILE=./.cert/key.pem react-scripts start

.PHONY:create-https-cert
create-https-cert:
	mkcert -install
	mkdir -p .cert
	mkcert -key-file ./.cert/key.pem -cert-file ./.cert/cert.pem "localhost"
