<p align="center">
  <img title="Redash" src='logo.png' height="200px"/>
</p>
<p align="center">
  <strong><i>Tree editor</i></strong>
</p>
<p align="center">
    <a href='https://circleci.com/gh/unrealwork/tree-editor'><img title="Build Status" src='https://circleci.com/gh/unrealwork/tree-editor.svg?style=svg'/></a>
    
</p>
<p align="center">
    <a href="https://codecov.io/gh/unrealwork/tree-editor">
      <img src="https://codecov.io/gh/unrealwork/tree-editor/branch/master/graph/badge.svg" alt="Codecov" />
    </a>
</p>

### Description
Simple client-server application for editing tree structure that stores in database.
Server represents RESTFul service with following API. Client is single page application.

### Demo
Latest stable version of application available here: 
### Features
- [ ] Selected element has to mark with special icon. 
- [ ] Lazy node loading.
- [ ] Emulate two-seconds loading by delay.
- [x] Tree modification's operations
  - [x] Add new node
  - [x] Edit current node
  - [x] Remove current node
  - [x] Move current node to another node 
- [x] Store tree in DB.

### Build
```
make
make start
```


### Using technologies

**Backend**
- ![](http://projects.spring.io/spring-cloud/favicon.png) [Spring Framework](https://spring.io/)
- <img height="30px" src="http://tomcat.apache.org/images/tomcat.png"> <a href="http://tomcat.apache.org/">Tomcat server</a>
- <img height="30px" src="https://www.postgresql.org/media/img/about/press/elephant.png"> <a href="https://www.postgresql.org/">PostgreSQL</a>

**Frontend**
- <img height="30px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyg4aaAWwVMluZ7tCWbh9WRTG6lVdAuRS5OoxqSgqmpK2Vq4qz"> <a href="https://angular.io/">Angular 4</a>
- <img height="30px" src="https://semantic-ui.com/images/logo.png"> <a href="https://semantic-ui.com/">Semantic UI</a>

