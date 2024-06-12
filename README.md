# Pterodactyl.client

> Pterodactyl.client is avalidable for TypeScript

## Instalation
```
$ npm i pterodactyl.client
```

## Help
> If you need any help, you can join my [Discord server](https://discord.gg/JYwkyVRz)

## How to use ?

You can read the [DOCUMENTATION HERE](https://pterodactyl.free.darkhostsweb.fr)

## Guide

```js
const ptero = new Pterodactyl()
    .setApiKey("Your API Key (Admin)")
    .setPanelURL("https://your.pterodactyl.panel") // Don't add the / at the end
    .setApplicationKey("APP Key (client side)") // Optionnal
```

### Users

```ts
ptero.users.fetch(id: number): User
           .fetchAll(): User[]
           .fetchByEmail(email: string): User
           .create(new UserBuilder()): User
```

See [User](https://pterodactyl.free.darkhostsweb.fr/classes/Users_User.User.html)

### Nodes

```ts
ptero.nodes.fetch(id: number): Node
           .fetchAll(): Node[]
           .create(new NodeBuilder()): Node
```

See [Node](https://pterodactyl.free.darkhostsweb.fr/classes/Nodes_Node.Node.html)

### Locations

```ts
ptero.locations.fetch(id: number): Location
               .fetchAll(): Location[]
               .create(long: string, short: string): Location
```

See [Location](https://pterodactyl.free.darkhostsweb.fr/classes/Locations_Location.Location.html)

### Nests

```ts
ptero.nests.fetch(id: number): Nest
           .fetchAll(): Nest[]
```

See [Nest](https://pterodactyl.free.darkhostsweb.fr/classes/Nests.Nest.html)

### Servers

```ts
ptero.servers.fetch(id: number): Server
             .fetchAll(): Server[]
             .create(new ServerBuilder()): Server
```

See [Server](https://pterodactyl.free.darkhostsweb.fr/classes/Servers.Server.html)