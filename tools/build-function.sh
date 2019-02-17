cd amplify/backend/function/squeezephotoprocessor
docker run -v "$PWD":/var/task lambci/lambda:build-nodejs8.10 npm i --prefix ./src
zip -r ./dist/squeezephotoprocessor-$(node -e 'console.log(Date.now())')-latest-build.zip ./src/*
