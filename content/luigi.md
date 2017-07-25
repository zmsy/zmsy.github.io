# Simple Data Pipelines with Python + Luigi
Luigi is an excellent framework for automating many batch tasks that you need to get accomplished on a regular basis. It makes management of queueing/running/tracking processes very simple, and provides an elegantly simple interface for doing so.

## What Luigi Is, and What Luigi Is Not
Luigi is a DAG (_directed acyclic graph_) execution framework. You can draw up dependencies for a variety of tasks and ensure that they fire in the correct order.