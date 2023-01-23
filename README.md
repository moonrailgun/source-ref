# source-ref

A tool for source code ref, inspired by [@babel/plugin-transform-react-jsx-source](https://github.com/babel/babel/tree/main/packages/babel-plugin-transform-react-jsx-source)

More detail can checkout those page: [http://moonrailgun.com/posts/da6d1d53/](http://moonrailgun.com/posts/da6d1d53/)


![](./docs/1.gif)

![](./docs/2.gif)

## Develop

This repo is manager with `rush`


#### Install Dependency
```bash
rush update
```

#### Publish

```bash
rush version --bump
rush publish --include-all --publish --npm-auth-token <authToken>
```
