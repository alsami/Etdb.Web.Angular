#!/usr/bin/env bash
echo removing existing prod-config

rm ./src/environments/environment.prod.ts

echo writing new environment file

echo "export const environment = {
    production: true,
    apiUrls: {
        userService: '${1}'
    },
    etdbClientId: '${2}',
    googleClientId: '${3}'
};" > src/environments/environment.prod.ts