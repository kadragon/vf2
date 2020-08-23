# vf2

## Project setup
```bash
yarn install
cd /functions
npm i
```

## firebase use
```bash
firebase login # If you are not logged in
firebase use --add
```
## functions

### key download
functions/firebase-adminsdk.json download from console service account key

### setting
```bash
firebase functions:config:set admin.email=xxx@abc.com admin.db_url = https://xxx-site.firebaseio.com
```

### functions upload
```bash
firebase deploy --only functions
```

### database setting upload
```bash
firebase deploy --only database
```


### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
