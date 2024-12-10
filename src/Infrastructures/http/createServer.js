const Hapi = require('@hapi/hapi');
const H2o2 = require('@hapi/h2o2');
const Jwt = require('@hapi/jwt');
const winston = require('winston');
const { combine, timestamp, printf } = winston.format;
const DailyRotateFile = require('winston-daily-rotate-file');




const ClientError = require('../../Commons/exceptions/ClientError');
const DomainErrorTranslator = require('../../Commons/exceptions/DomainErrorTranslator');
const users = require('../../Interfaces/http/api/users');
const authentications = require('../../Interfaces/http/api/authentications');
const apks = require('../../Interfaces/http/api/apks');
const banks = require('../../Interfaces/http/api/bnks');
const memo = require('../../Interfaces/http/api/memo');
const proxy = require('../../Interfaces/http/api/proxy');
const content = require('../../Interfaces/http/api/content');


const createServer = async (container) => {

  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
    routes: {
      security: {
        hsts: true, // Enable HTTP Strict Transport Security (HSTS)
        xss: true, // Enable protection against cross-site scripting (XSS)
        noOpen: true, // Enable protection against MIME sniffing attacks
        noSniff: true, // Enable protection against clickjacking attacks
        xframe: true, // Enable protection against cross-site request forgery (CSRF)
      },
    },
  });
  // Create a logger
  const myFormat = printf(({ level, message, timestamp, host, ip, forwardedIp }) => {
    return `${timestamp} [${level.toUpperCase()}] [Host: ${host}] [IP: ${forwardedIp}] : ${message}`;
  });

  const logger = winston.createLogger({
    level: 'info',
    format: combine(
      timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      myFormat
    ),
    transports: [
      new DailyRotateFile({
        filename: './logs/app-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        maxFiles: '7d', // Keep logs for up to 3 days
        zippedArchive: true, // Compress old log files
        options: {
          flags: 'w', // Overwrite existing files
        },
      }),
    ],
  });




  await server.register(H2o2);
  await server.register([
    {
      plugin: Jwt,
    }
  ]);

  // Initialize HapiLog


  server.auth.strategy('dashbljwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.username,
      },
    }),
  });


  await server.register([
    {
      plugin: users,
      options: { container },
    },
    {
      plugin: authentications,
      options: { container },
    },
    {
      plugin: apks,
      options: { container },
    },
    {
      plugin: banks,
      options: { container },
    },
    {
      plugin: memo,
      options: { container },
    },
    {
      plugin: proxy,
      options: { container },
    },
    {
      plugin: content,
      options: { container },
    }

  ]);
  server.ext('onRequest', (request, h) => {
    const startTime = Date.now(); // Start time of request processing
    const { method, url, headers, payload, info } = request;
    const clientIp = info && info.remoteAddress ? info.remoteAddress : 'Unknown';
    const host = info && info.host ? info.host : 'Unknown';
    const ip = info && info._remoteAddress ? info.remoteAddress : 'Unknown';
    const forwardedIp = headers['x-forwarded-for'] || 'Not provided';

    // Log request details with host and IP
    logger.info(`Request: ${method} ${url}`, { headers, payload, clientIp, host, ip, forwardedIp });

    // Extending the response object to log response details after response is sent
    const responseToolkit = h.responseToolkit;
    h.responseToolkit = function (response) {
      const processTime = Date.now() - startTime; // Time taken to process request
      const { statusCode, statusMessage, headers: responseHeaders, source } = response;

      // Log response details
      logger.info(`Response: ${statusCode} ${statusMessage}`, { headers: responseHeaders, payload: source, processTime, host, ip });

      return responseToolkit(response);
    };

    return h.continue;
  });

  const logAuditEvent = (event, data, remoteAddress, host) => {
    logger.info(`Audit Event: ${event}`, { ...data, remoteAddress, host });
  };


  const logSecurityEvent = (event, data) => {
    logger.warn(`Security Event: ${event}`, data);
  };


  server.events.on('request', (request, event, tags) => {
    if (tags.error) {
      const { error, data } = event;
      const errorInfo = {
        message: error.message,
        stackTrace: error.stack,
        requestData: {
          method: request.method,
          url: request.url.href,
          headers: request.headers,
          payload: request.payload,
        },
      };
      logger.error('Error occurred during request processing:', errorInfo);
    }
  });







  // Error handling (onPreResponse)
  server.ext('onPreResponse', (request, h) => {
    const { response } = request;
    const customHeader = request.headers['x-customblhdrs']; // Replace 'x-custom-header' with your actual header name

    if (!customHeader || customHeader !== '09c90c1d6e1b82015737f88d5f5b827060a57c874babe97f965aaa68072585191ce0eab75404312f4f349ee70029404c2d8f66698b6a4da18990445d1437ff79') {
      return h.response({ message: 'Invalid custom header or missing' }).code(401); // Unauthorized
    }

    // Log the response
    if (response) {
      const { statusCode, statusMessage, headers, source } = response;
      const { host } = request.info;
      const ip = request.info.remoteAddress;
      const forwardedIp = request.headers['x-forwarded-for'] || 'Not provided';

      logger.info(`Response: ${statusCode} ${statusMessage}`, { headers, payload: source, host, ip, forwardedIp });
      // Log audit event for successful responses

      logAuditEvent('Successful Response', { method: request.method, url: request.url.href, statusCode, statusMessage, clientIp: ip });
    } else {
      // Log audit event for failed responses
      logAuditEvent('Failed Response', { method: request.method, url: request.url.href, clientIp: request.info.remoteAddress });
    }
    if (response instanceof Error) {
      // Handle errors based on their types
      const translatedError = DomainErrorTranslator.translate(response);
      if (translatedError instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: translatedError.message,
        });
        newResponse.code(translatedError.statusCode);
        logSecurityEvent('Client Error', { errorMessage: translatedError.message, errorStatusCode: translatedError.statusCode });

        return newResponse;
      }


      if (!translatedError.isServer) {
        return h.continue; // Let Hapi handle native client errors
      }

      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami',
      });
      newResponse.code(500);
      logSecurityEvent('Server Error', { errorMessage: translatedError.message, errorStack: translatedError.stack });

      return newResponse;
    }
    // Continue with unmodified response if no error
    return h.continue;
  });

  return server;
};

module.exports = createServer;
