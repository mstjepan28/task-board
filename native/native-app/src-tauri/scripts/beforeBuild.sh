cd ../../
yarn build
cd ./apps/core-app
mkdir -p ../../native/native-app/src-tauri/dist
cp -r ./dist/* ../../native/native-app/src-tauri/dist