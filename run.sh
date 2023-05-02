#!/bin/sh

ROOT_DIR=/app

# Replace env vars in files served by NGINX
echo 'replacing ENV vars..'

for file in $ROOT_DIR/assets/*.js $ROOT_DIR/assets/*.css
do
  echo ${VITE_URL}
  sed -i 's|VUE_APP_API_URL_PLACEHOLDER|'${VITE_URL}'|g' $file
  # Your other variables here...
done

# Starting NGINX
echo 'starting NGINX..'

nginx -g 'daemon off;'

