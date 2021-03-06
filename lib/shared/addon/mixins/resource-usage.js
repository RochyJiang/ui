import Mixin from '@ember/object/mixin';
import { get, computed } from '@ember/object';
import { formatPercent } from 'shared/utils/util';
import { formatSi, parseSi, exponentNeeded } from 'shared/utils/parse-unit';
import { inject as service } from '@ember/service';

export default Mixin.create({
  intl: service(),

  cpuUsage: computed('requested.cpu','allocatable.cpu', function() {
    const used  = parseSi(get(this,'requested.cpu'));
    const total = parseSi(get(this,'allocatable.cpu'));
    if ( total ) {
      const minExp = exponentNeeded(total);
      const usedStr  = formatSi(used,  1000, '', '', 0, minExp).replace(/\s.*$/,'');
      const totalStr = formatSi(total, 1000, '', '', 0, minExp);

      return `${usedStr}/${totalStr}`
    } else {
      return null;
    }
  }),

  cpuPercent: computed('requested.cpu','allocatable.cpu', function() {
    const used  = parseSi(get(this,'requested.cpu'));
    const total = parseSi(get(this,'allocatable.cpu'));
    if ( total ) {
      return formatPercent(100*used/total);
    } else {
      return null;
    }
  }),

  memoryUsage: computed('requested.memory','allocatable.memory', function() {
    const used = parseSi(get(this,'requested.memory'));
    const total = parseSi(get(this,'allocatable.memory'));
    if ( total ) {
      const minExp = exponentNeeded(total);
      const usedStr =  formatSi(used,  1024, '', '', 0, minExp).replace(/\s.*/,'');
      const totalStr = formatSi(total, 1024, 'iB', 'B', 0, minExp);

      return `${usedStr}/${totalStr}`
    } else {
      return null;
    }
  }),

  memoryPercent: computed('requested.memory','allocatable.memory', function() {
    const used  = parseSi(get(this,'requested.memory'));
    const total = parseSi(get(this,'allocatable.memory'));
    if ( total ) {
      return formatPercent(100*used/total);
    } else {
      return null;
    }
  }),

  podUsage: computed('requested.pods','allocatable.pods', function() {
    const used  = parseSi(get(this,'requested.pods'));
    const total = parseSi(get(this,'allocatable.pods'));
    if ( total ) {
      const minExp = exponentNeeded(total);
      const usedStr  = formatSi(used,  1000, '', '', 0, minExp).replace(/\s.*$/,'');
      const totalStr = formatSi(total, 1000, '', '', 0, minExp);

      return `${usedStr}/${totalStr}`
    } else {
      return null;
    }
  }),

  podPercent: computed('requested.pods','allocatable.pods', function() {
    const used  = parseSi(get(this,'requested.pods'));
    const total = parseSi(get(this,'allocatable.pods'));
    if ( total ) {
      return formatPercent(100*used/total);
    } else {
      return null;
    }
  }),
});
