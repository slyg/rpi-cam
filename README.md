# Raspberry pi remote camera

This is a sample code to build a rpi hosted webserver triggering a photo shoot on `/snap` route. It is deployed and can be reached remotely using resin.io's amazing product.

## Exposed endpoints

- `GET /` html page giving routes
- `GET /snap` triggers a photo shoot
- `GET /snap.jpg` displays latest taken photo

## Sources

- [Resin.io doc](https://docs.resin.io/hardware/i2c-and-spi/#raspberry-pi-camera-module)
- [npm raspicam module](https://github.com/troyth/node-raspicam)
- libraspberrypi-bin

Notice the importance of setting the right variables (or manually configure'em on the resin image) with the following resin.io fleet/device parameters:

```

  RESIN_HOST_CONFIG_start_x     1
  RESIN_HOST_CONFIG_gpu_mem     128
  RESIN_HOST_CONFIG_fixup_file  fixup_x.dat
  RESIN_HOST_CONFIG_start_file  start_x.elf

```
