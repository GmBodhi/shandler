import { context, Method } from "fetch-h2";

const ctx = context({
  // httpProtocol: "http1", /* incase if something doesn't work uncomment this line, to consider http2 */
  userAgent: "Shandler registrar",
});

let token: string = undefined!;

const fetch = (
  path: string,
  { method, body }: { method: Method; body?: unknown }
) => {
  ctx.fetch(path, {
    method,
    body: JSON.stringify(body),
    headers: {
      Authentication: `Bot ${token}`,
    },
  });
};

export default fetch;
export const setToken = (tkn: string) => void (token = tkn);
