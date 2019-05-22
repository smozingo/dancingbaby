# 1. Removes image from local environment
# 2. Rebuilds image with updated package.json

echo -e "\033[1;33m'CTRL + Z' to kill this script\033[0m"

echo -e "\033[1;36mRemoving existing image from local environment...\033[0m"
docker image rm dbsites/db-dependencies --force
echo -e "\033[1;36mRebuilding image with updated package.json...\033[0m"
docker build -t dbsites/db-dependencies -f Dockerfile-dependencies .
echo -e "\033[1;32mDone!\033[0m"
