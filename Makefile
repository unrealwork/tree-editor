NAME=tree-editor
VERSION=`python ./manage.py version`
FULL_VERSION=$(VERSION)+b$(CIRCLE_BUILD_NUM)
BASE_VERSION=$(shell python ./manage.py version | cut -d + -f 1)
# VERSION gets evaluated every time it's referenced, therefore we need to use VERSION here instead of FULL_VERSION.
FILENAME=$(CIRCLE_ARTIFACTS)/$(NAME).$(VERSION).tar.gz

all:
	make clean deps pack

pack:
	if [ -d "./client/" ]; then cd ./client && npm run build; fi
	cd ./server && mvn package
	if [ ! -d "./build" ]; then mkdir ./build; fi
	cp ./server/target/*.tar.gz ./build

deps:
	sudo apt install nodejs
	if [ -d "./client/" ]; then cd ./client && npm install; fi

clean:
	if [ -d "./build" ]; then rm -rf ./build; fi

install:
	cd ./build && if [ ! -d "tree-editor" ]; then mkdir tree-editor; fi && \
	 tar -xvf tree-editor-rest-service-*-bin.tar.gz --strip 1 -C ./tree-editor
start:
	./build/tree-editor/start.sh

