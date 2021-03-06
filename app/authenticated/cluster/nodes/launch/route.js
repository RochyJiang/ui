import EmberObject from '@ember/object';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { get } from '@ember/object';

export default Route.extend({
  globalStore: service(),

  model(params) {
    let store = get(this, 'globalStore');
    const cluster = this.modelFor('authenticated.cluster');

    return store.find('machinetemplate', get(params, 'template_id')).then(( template ) => {
      return store.find('machinedriver', get(template, 'driver')).then( ( driver ) => {
        return EmberObject.create({
          template: template,
          driver: driver,
          cluster
        });
      })
    });
  },
});
