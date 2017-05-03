# React Render HTML

Renders a react component to html. For performance reasons we opted for a client server model to limit the damage caused by starting a new nodejs process every time we want to render.

## Usage
To start the server just do `react-render-html --server`. This will start a tcp server on `localhost` listening to `5004`.
To render some component just `react-render-html -f COMPONENTFILE -d JSONDATA`.



