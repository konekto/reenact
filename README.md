# React Render HTML

Renders a react component to html. For performance reasons we opted for a client - server model to limit the damage caused by starting a new nodejs process for every render.
This tool is really useful when you want to render react components outside of nodejs like in a PHP or Go Process.

## Usage
### server 
To start the server just do:   
```bash
react-render-html --server
```
This will start a tcp server on `localhost` listening to `5004`.
This server will be waiting on incoming tcp data in the form `{file: FILE, data: DATA}`. 
The file props should be absolute or relative to the directory of the server.  
The file will be required (and accordingly any subsequent require will be also called) and the default component will be passed the data.
The resulting HTML will be written to the same socket that sent the data.

### client
There is a build-in TCP client you could use to render you react components.  
To do so just: 
```bash
react-render-html --file components/timer.js --data '{"value" : 12213213}'
```
The argument will be transmitted to the server and the resulting HTML written to stdout.
Surely You can do this with your own tcp client in any language.
Just send the parameters `{file: FILE, data: DATA}`  as stringified JSON to the tcp address `127.0.0.1` on port `5004` and you will receive the HTML back.  
An example of PHP client could be:
```php

function react_render_html($file, $data) {

    $service_port = 5004;
    $address = '127.0.0.1';
    
    $socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
    
    if ($socket === false) {
    
      throw new Exception("socket_create failed");
    }
    
    $result = socket_connect($socket, $address, $service_port);
    
    if ($result === false) {
    
      throw new Exception("socket_connect failed");
    }
    
    $options = [
      'file' => $file,
      'data' => $data
    ];
    
    $in = json_encode($options);
    
    socket_write($socket, $in, strlen($in));
    
    $result = socket_read($socket, 2048, PHP_NORMAL_READ);
    
    socket_close($socket);
    
    return $result;
}

```








