first i wanted to build an image gallery by using www.pixabay.com api. because i'm living in iran maybe my ip is restricted.
so i decided to route my request to api through Tor. i installed axios and socks-proxy-agent for proxying my requests to Tor proxy but
i ran into a problem. the latest version of react uses webpack v5 and in this version core modules of node js has been removed(like fs, path, net etc.), so i couldn't use the package. then i looked for a way that i can pollyfill the core packages. i test some way and see a lot of questions on www.stackoverflow.com and got nowhere. i turn into installing next js framework maybe it didn't have problem like this but it did.
then i decided to build a simple proxy server that sends http requests through Tor. i visit a lot of implementation of proxy servers in node js.
i found out that Tor has a capability that we can sends our http requests to it. but first we need to activate it in /etc/torrc config.
just setting HTTPTunnelPort to some port then forward http reqs to it.
at the end i came up with this implementaion of proxy server.
