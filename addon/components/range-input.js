import Ember from 'ember';

var on = Ember.on;
var observer = Ember.observer;
var computed = Ember.computed;

export default Ember.Component.extend({
  classNames: ['range-input'],
  min: 0,
  max: 10,
  step: 1,
  value: 0,

  onValueChange: observer('value', function () {
    var value = this.get('value');
    var lastValue = this.get('lastValue');

    this.get('$range').setValue(value);
    this.sendAction('changed', value, lastValue);
  }),

  setup: on('didInsertElement', function () {
    var that = this;
    Ember.run.next(function(){
      if(that.get('isDestroyed')) {
        return;
      }
      var range = that.$().find('.range-original')
      range.val(function() {
        that.get('value')
      });
      range.attr('value', that.get('value'));
      range.attr('min', that.get('min'));
      range.attr('max', that.get('max'));
      range.attr('step', that.get('step'));
      range.rangeinput({});
      that.set('$range', that.$().find(':range').data('rangeinput'));
    });
  }),

  change: function () {
    this.set('lastValue', this.get('value'));
    this.set('value', this.get('$range').getValue());
  },

  drag: function () {
    this.set('lastValue', this.get('value'));
    this.set('value', this.get('$range').getValue());
  }
});
