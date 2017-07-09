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
	cd ./server && mvn -Dspring.profiles.active=dev clean package
	if [ ! -d "./build" ]; then mkdir ./build; fi
	cp ./server/target/*.jar ./build

deps:
	echo $(which mvn)
	if [ -d "./client/" ]; then cd ./client && npm install; fi

clean:
	if [ -d "./build" ]; then rm -rf ./build; fi

install:
	cd ./build && if [ ! -d "tree-editor" ]; then mkdir tree-editor; fi && \
	 tar -xvf tree-editor-rest-service-*-bin.tar.gz --strip 1 -C ./tree-editor

start:
	java -jar -Dspring.profiles.active=dev ./build/tree-editor*.jar

deploy:
	cd ./server && mvn -Dmaven.test.skip=true -Dspring.profiles.active=dev heroku:deploy