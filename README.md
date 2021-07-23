# Setup

see setup-eventstore.sh

# Kubernetes

`kubectl -n <namespace> port-forward service/eventstore-service 2113:2113`

You can then point your browser to http://localhost:2113 to access eventstore's web UI.

