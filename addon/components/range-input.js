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
    this.$().find('.range-original').rangeinput({
      value: this.get('value'),
      min: this.get('min'),
      max: this.get('max'),
      step: this.get('step')
    });
    this.set('$range', this.$().find(':range').data('rangeinput'));
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
