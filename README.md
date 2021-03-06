# reenact [re²n(der-re)act]

`reenact` renders a react component to html. For performance reasons we opted for a client - server model to limit the damage caused by starting a new nodejs process for every render.
This tool is really useful when you want to render react components outside of nodejs like in a PHP or Go Process.

## Usage
### Server 
To start the server just do:   
```bash
reenact --server
```
This will start a tcp server on `localhost` listening to `5004`.  
This server will be waiting on incoming tcp data in the form `{file: FILE, props: DATA}`.  
The file props should be absolute or relative to the directory of the server.  
The file will be required (and accordingly any subsequent require will be also called) and the default component will be passed the data.  
The resulting HTML will be written to the same socket that sent the data.

This server will respond with '1' as the first Byte if the rendering succeded other '0'.
If you write your own client for this server please take this into consideration.

see `reenact --help` for more options

####  Caution
All `node-modules` needed by the file you want to render should be available to the server.
Just start the server in the folder where the `node_modules` are installed.
We are trying to find a better way to deal with this for future releases.

### Client
There is a build-in TCP client you could use to render you react components.  
To do so just: 
```bash
reenact --file components/timer.js --props '{"value" : 12213213}'
```
The argument will be transmitted to the server and the resulting HTML written to stdout.  
Surely You can do this with your own tcp client in any language.  
Just send the parameters `{file: FILE, props: DATA}`  as stringified JSON to the tcp address of the server (`127.0.0.1:5004`) and you will receive the HTML back.  
