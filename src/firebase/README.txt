
https://stackoverflow.com/questions/37760695/firebase-storage-and-access-control-allow-origin

https://cloud.google.com/storage/docs/gsutil_install

gsutil cors set cors.json gs://exampleproject.appspot.com

cors.json
[
  {
    "origin": ["https://example.com"],
    "method": ["GET"],
    "maxAgeSeconds": 3600
  }
]

or any domain

[
  {
    "origin": ["*"],
    "method": ["GET"],
    "maxAgeSeconds": 3600
  }
]