docker login --username ismaellamgadar --password Kesael123
docker build -t frontend .
docker tag frontend ismaellamgadar/frontend
docker push ismaellamgadar/frontend