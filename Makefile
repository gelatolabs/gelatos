.PHONY: all build clean

all: client/node_modules build

client/node_modules: client/package.json
	cd client && npm install

build:
	docker build -t gelatos .

run:
	docker run -it --rm -p 8080:80 --name gelatos gelatos

clean:
	rm -rf client/node_modules
	-docker rmi gelatos nginx
