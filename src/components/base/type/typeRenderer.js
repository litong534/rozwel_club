export default {
  props: {
    typeClass: {
      type: String,
      default: 'label_other'
    }
  },
  render(h) {
    return h('div', {class:`label ${this.typeClass}`}, this.$slots.default);
  }
}