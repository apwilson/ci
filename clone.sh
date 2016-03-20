TEMP_DIR="$(mktemp -d)"

# deletes the temp directory
function cleanup {
  rm -rf "$TEMP_DIR"
  # echo "Deleted temp working directory $TEMP_DIR"
}

# register the cleanup function to be called on the EXIT signal
trap cleanup EXIT

# echo "Working in $TEMP_DIR"
cd $TEMP_DIR

COMMIT_ID=$1
REPO_URL=$2
REPO_SHORT_NAME=$3

echo "Pulling down commit $COMMIT_ID from $REPO_URL"
curl -s -L $REPO_URL/archive/$COMMIT_ID.zip --output repo.zip
unzip -q repo.zip

cd $REPO_SHORT_NAME-$COMMIT_ID
echo 'Run some script from the repo'
echo 'done!'
