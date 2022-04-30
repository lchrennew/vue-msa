# Sub-App1

This sub-app is integrated in the root-app.
Run the following to release this app.
```shell
yarn build && rm -rf "../root-app/public/sub-app1/*" && cp -r dist/* ../root-app/public/sub-app1
```
