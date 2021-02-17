SHELL=/bin/bash

IMAGE_NAME_RUN="typp-e-run"
IMAGE_NAME_TEST="typp-e-test"

.PHONY: run test rebuild
init:
	@imageIDRun=$$(docker image ls -f reference=${IMAGE_NAME_RUN} -q) && \
	[ -z $$imageIDRun ] && docker build -t ${IMAGE_NAME_RUN} --no-cache -f .docker/run.Dockerfile .;

	@imageIDTest=$$(docker image ls -f reference=${IMAGE_NAME_TEST} -q) && \
	[ -z $$imageIDTest ] && docker build -t ${IMAGE_NAME_TEST} --no-cache -f .docker/test.Dockerfile .;

rebuild:
	@imageIDRun=$$(docker image ls -f reference=${IMAGE_NAME_RUN} -q) && \
	[ -z $$imageIDRun ] || docker image rm $$imageIDRun;

	@imageIDTest=$$(docker image ls -f reference="${IMAGE_NAME_TEST}" -q) && \
	[ -z $$imageIDTest ] || docker image rm $$imageIDTest;

	@make init

run:
	@read -p "Input file path (default: inputs/input.txt): " inputFile && \
	[ -z $$inputFile ] && inputFile="inputs/input.txt"; \
	inputFile=$$(realpath $$inputFile) && \
	docker run -v $$inputFile:/typp-e/inputs/input.txt --rm ${IMAGE_NAME_RUN}

test:
	@docker run --rm ${IMAGE_NAME_TEST}
