Component({
  properties: {},
  data: {},
  methods: {
    handleChange(value) {
      console.log(value);
    },
    onIconTap() {
      this.triggerEvent("close");
    },
  },
});
