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
  disabled: true,

  onValueChange: observer('value', function () {
    var value = this.get('value');
    var lastValue = this.get('lastValue');

    this.get('$range').setValue(value);
    this.sendAction('changed', value, lastValue);
  }),

  setup: on('didInsertElement', function () {
    var range = this.$().find('.range-original')
    var that = this;
    range.val(function() {
      that.get('value')
    });
    range.attr('value', this.get('value'));
    range.attr('min', this.get('min'));
    range.attr('max', this.get('max'));
    range.attr('step', this.get('step'));
    range.attr('disabled', this.get('disabled'));
    range.rangeinput({});
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
