const redis = require('redis');
const { promisify } = require('util');

const redisUrl = process.env.REDIS;
const client = redis.createClient(redisUrl);
client.hget = promisify(client.hget);

const mongoose = require('mongoose');

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}) {
   this.useCache = true;
   this.hashKey = JSON.stringify(options.key || '');

   return this;
};

mongoose.Query.prototype.exec = async function() {
   if (!this.useCache) {
      return exec.apply(this, arguments);
   }

   /* 
   To make sure that we don't modify the object that is returned 
   from the getQuery: if we modify the query object, we will modify
   the query itself
   */
   const key = JSON.stringify(
      Object.assign({}, this.getQuery(), {
         collection: this.mongooseCollection.name
      })
   );

   // 1) See if we have the value for 'key' in redis
   const cachedValue = await client.hget(this.hashKey, key);

   // 2) If YES, return that
   if (cachedValue) {
      const doc = JSON.parse(cachedValue);

      return Array.isArray(doc)
         ? doc.map(cur => new this.model(cur))
         : new this.model(doc);
   }

   // 3) If NOT, issue the query and store the result in redis
   const result = await exec.apply(this, arguments);

   client.hset(this.hashKey, key, JSON.stringify(result));
   return result;
};

const clearHash = hashKey => {
   client.del(JSON.stringify(hashKey));
};

const cleanCache = async (req, res, next) => {
   await next();
   clearHash(req.user.id);
};

module.exports = {
   cleanCache
};
