# koa-api-bootstrap
* Koa Web API boostrap package used to create an Koa Web API/Microservice/Web application with the bare essentials

## Base files
* `config.json` - used to configure the application. The corresponding type definition is `AppConfig`, so update both accordingly.

## Configuration (`config.json`)
* `port` - specifies the port on which the service will run
* `staticFileServing` - two options: `enabled` and `path` - used to enable/disable static file hosting on given path
* `logTotalHeapOnStartup` - logs total heap used on startup, values => `true` / `false`
* `minLogLevel` - sets the logger level, values => `0` / `1` / `2`
* `developerMode` - logs any developer related information (such as callstacks or other predefined stuff you want to hide normally) (if such logs are added)
* `useHealthcheck` - decides whether a `/healthcheck` endpoint should be exposed (to get healthcheck use header `healthcheck-status` with value `true`)

## Note about static file serving
* When `staticFileServing` feature is enabled the app will create a `static` directory on which you should place your files that you want to be served.
* When you want to access `mytextfile.txt` in `/static/mytextfile.txt` for example - the URL will be `http://YOUR_HOST/mytextfile.txt` so the start of the listing is from the first /, not `/static/mytextfile.txt` 