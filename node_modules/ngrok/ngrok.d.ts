/**
 * Creates a ngrok tunnel.
 * E.g:
 *     const url = await ngrok.connect(); // https://757c1652.ngrok.io -> http://localhost:80
 *     const url = await ngrok.connect(9090); // https://757c1652.ngrok.io -> http://localhost:9090
 *     const url = await ngrok.connect({ proto: 'tcp', addr: 22 }); // tcp://0.tcp.ngrok.io:48590
 *
 * @param options Optional. Port number or options.
 */
export function connect(options?: number | INgrokOptions): Promise<string>;

/**
 * Stops a tunnel, or all of them if no URL is passed.
 *
 * /!\ ngrok and all opened tunnels will be killed when the node process is done.
 *
 * /!\ Note on HTTP tunnels: by default bind_tls is true, so whenever you use http proto two tunnels are created:
 *     http and https. If you disconnect https tunnel, http tunnel remains open.
 *     You might want to close them both by passing http-version url, or simply by disconnecting all in one,
 *     with ngrok.disconnect().
 *
 * @param url The URL of the specific tunnel to disconnect -- if not passed, kills them all.
 */
export function disconnect(url?: string): Promise<void>;

/**
 * Kills the ngrok process.
 */
export function kill(): Promise<void>;

/**
 * You can create basic http-https-tcp tunnel without authtoken.
 * For custom subdomains and more you should obtain authtoken by signing up at ngrok.com.
 * E.g:
 *     await ngrok.authtoken(token);
 *     // or
 *     const url = await ngrok.connect({ authtoken: token, ... });
 *
 * @param token
 */
export function authtoken(token: string): Promise<void>;

interface INgrokOptions {
    /**
     * Other "custom", indirectly-supported ngrok process options.
     *
     * @see {@link https://ngrok.com/docs}
     */
    [customOption: string]: any;

    /**
     * The tunnel type to put in place.
     *
     * @default 'http'
     */
    proto?: 'http' | 'tcp' | 'tls';

    /**
     * Port or network address to redirect traffic on.
     *
     * @default opts.port || opts.host || 80
     */
    addr?: string|number;

    /**
     * HTTP Basic authentication for tunnel.
     *
     * @default opts.httpauth
     */
    auth?: string;

    /**
     * Reserved tunnel name (e.g. https://alex.ngrok.io)
     */
    subdomain?: string;

    /**
     * Your authtoken from ngrok.com
     */
    authtoken?: string;

    /**
     * One of ngrok regions.
     * Note: region used in first tunnel will be used for all next tunnels too.
     *
     * @default 'us'
     */
    region?: 'us' | 'eu' | 'au' | 'ap';

    /**
     * Custom path for ngrok config file.
     */
    configPath?: string;

    /**
     * Custom binary path, eg for prod in electron
     */
    binPath?: (defaultPath: string) => string;
}
