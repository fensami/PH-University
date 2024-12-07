import app from './app';
import config from './app/config';
import mongoose from 'mongoose';
import { Server } from 'http'
// const mongoose = require('mongoose');
let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main();


process.on('unhandledRejection', () => {
  console.log('😤 unhandledRejection is detected, shutting down ...');

  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
})


process.on('uncaughtException', () => {
  console.log('😤 uncaughtException is detected, shutting down ...');
  process.exit(1)
})

