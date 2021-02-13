SHELL=/bin/bash

IMAGE_NAME_RUN="typp-e-run"
IMAGE_NAME_TEST="typp-e-test"

.PHONY: run test
init:
	@imageIDRun=$$(docker image ls -f reference="${IMAGE_NAME_RUN}" -q) && \
	[ -z $$imageIDRun ] && docker build -t ${IMAGE_NAME_RUN} --no-cache -f .docker/run.Dockerfile .;

	@imageIDTest=$$(docker image ls -f reference="${IMAGE_NAME_TEST}" -q) && \
	[ -z $$imageIDTest ] && docker build -t ${IMAGE_NAME_TEST} --no-cache -f .docker/test.Dockerfile .;

run:
	@read -p "Input file path (default: in/input.txt): " inputFile && \
	[ -z $$inputFile ] && inputFile="in/input.txt"; \
	inputFile=$$(realpath $$inputFile) && \
	docker run -v $$inputFile:/typp-e/in/input.txt --rm ${IMAGE_NAME_RUN}

test:
	@docker run --rm ${IMAGE_NAME_TEST}
