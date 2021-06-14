FROM ubuntu:20.04

RUN apt update && \
	DEBIAN_FRONTEND=noninteractive apt install -y wget libicu66 && \
	apt clean

RUN mkdir -p /eventstore /etc/eventstore && \
	wget -O - https://github.com/EventStore/Downloads/raw/master/ubuntu/EventStore-OSS-Linux-v20.10.2.tar.gz | tar -C /eventstore -xzf - && \
	ln -s /eventstore/EventStore* /eventstore/current

COPY eventstore.conf /etc/eventstore/

ENTRYPOINT ["/eventstore/current/eventstored"]

