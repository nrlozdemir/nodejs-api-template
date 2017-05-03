[![Code Climate](https://img.shields.io/codeclimate/github/EQuimper/nodejs-api-boilerplate.svg?style=flat-square)](https://codeclimate.com/github/EQuimper/nodejs-api-boilerplate)
[![Coverage Status](https://img.shields.io/coveralls/EQuimper/nodejs-api-boilerplate/master.svg?style=flat-square)](https://coveralls.io/github/EQuimper/nodejs-api-boilerplate?branch=master)
[![Build Status](https://img.shields.io/travis/EQuimper/nodejs-api-boilerplate/master.svg?style=flat-square)](https://travis-ci.org/EQuimper/nodejs-api-boilerplate)
[![CircleCI](https://circleci.com/gh/EQuimper/nodejs-api-boilerplate.svg?&style=shield)](https://circleci.com/gh/EQuimper/nodejs-api-boilerplate)
[![bitHound Overall Score](https://www.bithound.io/github/EQuimper/nodejs-api-boilerplate/badges/score.svg)](https://www.bithound.io/github/EQuimper/nodejs-api-boilerplate)
[![Greenkeeper badge](https://badges.greenkeeper.io/EQuimper/nodejs-api-boilerplate.svg)](https://greenkeeper.io/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![MIT License](https://img.shields.io/npm/l/stack-overflow-copy-paste.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![Dependency Status](https://dependencyci.com/github/EQuimper/nodejs-api-boilerplate/badge)](https://dependencyci.com/github/EQuimper/nodejs-api-boilerplate)
[![dependencies Status](https://david-dm.org/equimper/nodejs-api-boilerplate/status.svg?style=flat-square)](https://david-dm.org/equimper/nodejs-api-boilerplate)
[![devDependencies Status](https://david-dm.org/equimper/nodejs-api-boilerplate/dev-status.svg?style=flat-square)](https://david-dm.org/equimper/nodejs-api-boilerplate?type=dev)
[![nps](https://img.shields.io/badge/scripts%20run%20with-nps-blue.svg?style=flat-square)](https://github.com/kentcdodds/nps)

# NodeJS-API-Boilerplate

[![forthebadge](http://forthebadge.com/images/badges/built-by-developers.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/powered-by-netflix.svg)](http://forthebadge.com)

# Get Started

- [Api Doc](https://github.com/EQuimper/nodejs-api-boilerplate#api-doc)
- [Pre-Commit Hook](https://github.com/EQuimper/nodejs-api-boilerplate#pre-commit-hook)
- [Usage](https://github.com/EQuimper/nodejs-api-boilerplate#usage)
- [Scripts](https://github.com/EQuimper/nodejs-api-boilerplate#scripts)
- [Dev-Debug](https://github.com/EQuimper/nodejs-api-boilerplate#dev-debug)
- [Why toJSON() on methods model](https://github.com/EQuimper/nodejs-api-boilerplate#why-tojson-on-methods-model-)
- [For validation on request](https://github.com/EQuimper/nodejs-api-boilerplate#for-validation-on-request)
- [Seeds](https://github.com/EQuimper/nodejs-api-boilerplate#seeds)
- [Docker](https://github.com/EQuimper/nodejs-api-boilerplate#docker)
- [Techs](https://github.com/EQuimper/nodejs-api-boilerplate#techs)
- [Todos](https://github.com/EQuimper/nodejs-api-boilerplate#add)

## Api Doc

Api doc his hosted on surge. [Link](http://equimper-nodejs-api-boilerplate.surge.sh/)

## Pre-Commit Hook

I've add `pre-commit` and `lint-staged` for lint your code before commit. That can maybe take time :bowtie:

## Usage

For get raven log create account here: [Sentry](https://sentry.io/)

1. Clone the project `git clone https://github.com/EQuimper/nodejs-api-boilerplate.git`.
2. Install dependencies `yarn install` or `npm i`
3. Create a `.env` file in the root like
  ```
  MONGO_URL=yourmongodb
  JWT_SECRET=yoursecret
  RAVEN_ID=yourapikey
  DOCS_WEBSITE=yourwebsite.surge.sh/
  ```

---

## Scripts

### DEV

First thing you want to start babel to compile the project by doing `yarn dev:watch` or `npm run dev:watch`

After

```
yarn dev
```

or

```
npm run dev
```

### DEV-DEBUG

```
yarn dev:debug
```

or

```
npm run dev:debug
```

---

## Why toJSON on methods model ?

`toJSON()` help us to get only the data we want when we push the info to the client. So now we just need to put the user object in the `res.json(user)` and we received only what we want. Why `toAuthJSON()` ? Cause if we populated the post we get the `toJSON()` so the `toAuthJSON()` is the on to call on signup and login for get the token and _id.

```js
toAuthJSON() {
  return {
    _id: this._id,
    token: `JWT ${this.createToken()}`,
  };
},

toJSON() {
  return {
    _id: this._id,
    username: this.username,
  };
},
```

---

## For Validation on Request

I'm using Joi in this boilerplate, that make the validation really easy.

```js
export const validation = {
  create: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
      username: Joi.string().min(3).max(20).required(),
    },
  },
};

routes.post(
  '/signup',
  validate(UserController.validation.create),
  UserController.create,
);
```

## Seeds

For seed just run one of this following comand. This is helpful in dev for making fake user.

**This is only available in dev environment**

*You can change the number of seed by changing the number in each script inside `/scripts/seeds`*

- Seeds 10 user `yarn db:seeds-user`
- Clear user collection `yarn db:seeds-clear-user`
- Clear all collection `yarn db:seeds-clear`

---

Monitoring Server on `http://localhost:3000/status`

---


## Docker

```
bash scripts/development.sh
```

---

## Techs

- [Helmet](https://github.com/helmetjs/helmet)
- [Cors](https://github.com/expressjs/cors)
- [Body-Parser](https://github.com/expressjs/body-parser)
- [Morgan](https://github.com/expressjs/morgan)
- [PassportJS](https://github.com/jaredhanson/passport)
- [Passport-Local](https://github.com/jaredhanson/passport-local)
- [Passport-JWT](https://github.com/themikenicholson/passport-jwt)
- [Raven](https://github.com/getsentry/raven-node)
- [Joi](https://github.com/hapijs/joi)
- [Http-Status](https://github.com/adaltas/node-http-status)
- [Lint-Staged](https://github.com/okonet/lint-staged)
- [Pre-Commit](https://github.com/observing/pre-commit)
- [Prettier](https://github.com/prettier/prettier)
- [Eslint Config EQuimper](https://github.com/EQuimper/eslint-config-equimper)
- [Eslint Config Prettier](https://github.com/prettier/eslint-config-prettier)
- [CodeClimate](https://codeclimate.com/)
- [Coveralls](https://github.com/integrations/coveralls)
- [Travis Ci](https://travis-ci.org/)
- [Circle Ci](https://circleci.com/)
- [Greenkeeper](https://greenkeeper.io/)
- [Istanbul](https://github.com/gotwarlost/istanbul)
- [Mocha](https://github.com/mochajs/mocha)
- [Chai](https://github.com/chaijs/chai)
- [Supertest](https://github.com/visionmedia/supertest)
- [NPS](https://github.com/kentcdodds/nps)

---

## Todo

### Add

- [ ] Sendgrid or Other Mail supply
- [ ] Add S3 for user image
