# koa-api-bootstrap
* Koa Web API boostrap package used to create an Koa Web API/Microservice/Web application with the bare essentials

## Base files
* `config.json` - used to configure the application. The corresponding type definition is `AppConfig`, so update both accordingly.

## Configuration (`config.json`)
* `port` - specifies the port on which the service will run
* `staticFileServing` - two options: `enabled` and `path` - used to enable/disable static file hosting on given path