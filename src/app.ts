import express from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import cors from 'cors';
import { config, logger } from './config';

const app = express();

// Security Header Request
app.use(helmet());

// Security body request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Sanitize request data
app.use(xss());
app.use(mongoSanitize());

app.use(
  mongoSanitize({
    replaceWith: '_',
  })
);

// Compression gzip Middleware
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

logger.info(`Config file: ${JSON.stringify(config)}`);

export default app;
