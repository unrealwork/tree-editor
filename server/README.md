# Tree editor RESTful service

The apllication represents a simple web server with following API.

### API
Every api url starts with /api.

| URL | Description |Request type | Payload | Response |
|---|---|----|---------|----------|
|**/nodes**| Retrieve  list of nodes | **GET**   | -   | ```[{"content":{"name":"/"},"id":2,"level":0,"root":true,"terminal":true}] ``` |
|**/nodes/{id}**| Retrieve node with specified id | **GET**   | -   |
|**/nodes/{id}**| Update node content | **POST**   | {"name": "name"}   |
|**/nodes/{id}**| Add child node with content passed in payload to specified node | **PUT**   | {"name": "name"}   |
|**/nodes/{id}**| Remove specified node | **DELETE**   | - |
|**/nodes/{id}/path**| Retrieve path to specified node | **GET**   | -   |
|**/nodes/{id}/children**| Retrieve list of children nodes | **GET**   | -   |
|**/nodes/{id}/move/{destId}**| Move specified node to destination node | **GET**   | -   |
