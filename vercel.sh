#!/bin/bash
 
if [[ $VERCEL_ENV == "production"  ]] ; then 
  yarn build:prod
else 
  yarn build:dev
fi