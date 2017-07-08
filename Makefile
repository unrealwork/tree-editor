NAME=redash
VERSION=`python ./manage.py version`
FULL_VERSION=$(VERSION)+b$(CIRCLE_BUILD_NUM)
BASE_VERSION=$(shell python ./manage.py version | cut -d + -f 1)
# VERSION gets evaluated every time it's referenced, therefore we need to use VERSION here instead of FULL_VERSION.
FILENAME=$(CIRCLE_ARTIFACTS)/$(NAME).$(VERSION).tar.gz

deps:
	if [ -d "./client/" ]; then cd ./client && npm install; fi
pack:
	if [ -d "./client/" ]; then cd ./client && npm run build; fi
	cd ./server && mvn package
	if [ ! -d "./build" ]; then mkdir ./build; fi
	cp ./server/target/*.tar.gz ./build

clean:
	if [ -d "./build" ]; then rm -rf ./build; fi