import { Model } from '@mean-expert/model'
/**
 * @module StorageFile
 * @description
 * Write a useful StorageFile Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: { name: 'before save', type: 'operation' },
  },
  remotes: {
    myRemote: {
      returns: { arg: 'result', type: 'array' },
      http: { path: '/my-remote', verb: 'get' },
    },
  },
})
class StorageFile {
  // LoopBack model instance is injected in constructor
  constructor(public model: any) {}

  // Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    console.log('StorageFile: Before Save')
    next()
  }
  // Example Remote Method
  myRemote(next: Function): void {
    this.model.find(next)
  }
}

module.exports = StorageFile
