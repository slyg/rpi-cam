#!/bin/sh

modprobe bcm2835-v4l2 \
  && modprobe v4l2_common \
  && ./node_modules/.bin/babel-node app.js