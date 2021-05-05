import jsonServer from 'json-server';
import { Request, RequestHandler } from 'express';
import { DynamicContentConfig } from '../../DynamicContent';
import { Server } from 'http';

interface InitServerResponse<T extends Record<string, unknown>> {
  server: Server;
  router: jsonServer.JsonServerRouter<T>;
  dynamicContentClientConfig: DynamicContentConfig;
}

export function initJsonServer<T extends Record<string, unknown>>(
  routes: T,
  middlewares: RequestHandler[] = []
): Promise<InitServerResponse<T>> {
  return new Promise((resolve) => {
    const validTokens = [];

    function isAuthorized(req: Request) {
      if (req.path === '/oauth/token') {
        return true;
      }
      if (req.headers.authorization) {
        const [, token] = req.headers.authorization.split(' ', 2);
        if (validTokens.includes(token)) {
          return true;
        }
      }
      return false;
    }

    const app = jsonServer.create();
    const router = jsonServer.router(routes);
    app.use(jsonServer.defaults());

    app.post('/oauth/token', (req, res) => {
      const access_token = new Date().valueOf().toString();
      validTokens.push(access_token);
      res.json({
        access_token: access_token,
        expires_in: 300,
      });
    });

    app.use(jsonServer.bodyParser);
    app.use(middlewares);
    app.use((req, res, next) => {
      if (isAuthorized(req)) {
        next();
      } else {
        res.sendStatus(401);
      }
    });
    app.use(router);

    const server = app.listen(3000, 'localhost', () => {
      console.log('JSON Server is running');
      resolve({
        server: server,
        router: (router as unknown) as jsonServer.JsonServerRouter<T>,
        dynamicContentClientConfig: {
          apiUrl: 'http://localhost:3000',
          authUrl: 'http://localhost:3000',
        },
      });
    });
  });
}
