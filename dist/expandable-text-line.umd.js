(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.ExpandableTextLine = {}));
}(this, (function (exports) { 'use strict';

  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script = {
    name: 'ExpandableTextLine',

    props: {
      useHover: { type: Boolean, default: true },
      duration: { type: Number, default: 0.1 },
      collapseTextOnLeaveRatio: { type: Number, default: 0.6 }
    },

    mounted: function mounted () {
      this.$refs.textLine.style.transitionDuration = (this.duration) + "s";
    },

    methods: {
      click: function click (e) {
        var el = e.target;
        if (!el.style.height) {
          this.enter(e);
          e.stopPropagation();
        } else {
          this.leave(e);
        }
      },

      enter: function enter (e) {
        var el = e.target;
        var ref = getComputedStyle(el);
        var width = ref.width;
        var height = ref.height;
        var minHeight = height;

        el.style.width = width;
        el.style.position = "absolute";
        el.style.visibility = "hidden";
        el.style.height = "auto";
        el.style.whiteSpace = 'initial';

        height = getComputedStyle(el).height;

        el.style.width = null;
        el.style.position = null;
        el.style.visibility = null;
        el.style.whiteSpace = null;
        el.style.height = minHeight;

        // Force repaint to make sure the animation is triggered correctly.
        // eslint-disable-next-line no-unused-expressions
        getComputedStyle(el).height;
        setTimeout(function () {
          el.style.height = height;
          el.style.whiteSpace = 'unset';
        });
      },

      leave: function leave (e) {
        var this$1 = this;

        var el = e.target;
        var ref = getComputedStyle(el);
        var width = ref.width;
        var height = ref.height;
        var whiteSpace = ref.whiteSpace;
        var maxHeight = height;

        el.style.height = 'auto';
        el.style.width = width;
        el.style.position = "absolute";
        el.style.visibility = "hidden";
        el.style.whiteSpace = 'nowrap';

        height = getComputedStyle(el).height;

        el.style.width = null;
        el.style.position = null;
        el.style.visibility = null;
        el.style.whiteSpace = whiteSpace;
        el.style.height = maxHeight;

        // eslint-disable-next-line no-unused-expressions
        getComputedStyle(el).height;
        setTimeout(function () {
          el.style.height = height;
          setTimeout(function () {
            el.style.whiteSpace = null;
            el.style.height = null;
          }, this$1.duration * 1000 * this$1.collapseTextOnLeaveRatio);
        });
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      var options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      var hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              var originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              var existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  var isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return function (id, style) { return addStyle(id, style); };
  }
  var HEAD;
  var styles = {};
  function addStyle(id, css) {
      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          var code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  { style.element.setAttribute('media', css.media); }
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              var index = style.ids.size - 1;
              var textNode = document.createTextNode(code);
              var nodes = style.element.childNodes;
              if (nodes[index])
                  { style.element.removeChild(nodes[index]); }
              if (nodes.length)
                  { style.element.insertBefore(textNode, nodes[index]); }
              else
                  { style.element.appendChild(textNode); }
          }
      }
  }

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      _vm._g(
        {
          ref: "text-line",
          staticClass: "expandable-text-line",
          on: { click: _vm.click }
        },
        _vm.useHover ? { mouseover: _vm.enter, mouseleave: _vm.leave } : {}
      ),
      [_vm._t("default")],
      2
    )
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = function (inject) {
      if (!inject) { return }
      inject("data-v-8102b758_0", { source: "\n.expandable-text-line {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  transition: height 0.1s;\n}\n", map: {"version":3,"sources":["/Users/maxim/PROJECTs/job/vue-expandable-text-line/src/ExpandableTextLine.vue"],"names":[],"mappings":";AAgGA;EACA,mBAAA;EACA,uBAAA;EACA,gBAAA;EACA,uBAAA;AACA","file":"ExpandableTextLine.vue","sourcesContent":["<template>\n  <div ref=\"text-line\"\n       class=\"expandable-text-line\"\n       v-on=\"useHover ? { mouseover: enter, mouseleave: leave } : {}\"\n       @click=\"click\">\n    <slot />\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'ExpandableTextLine',\n\n  props: {\n    useHover: { type: Boolean, default: true },\n    duration: { type: Number, default: 0.1 },\n    collapseTextOnLeaveRatio: { type: Number, default: 0.6 }\n  },\n\n  mounted () {\n    this.$refs.textLine.style.transitionDuration = `${this.duration}s`\n  },\n\n  methods: {\n    click (e) {\n      const el = e.target\n      if (!el.style.height) {\n        this.enter(e)\n        e.stopPropagation()\n      } else {\n        this.leave(e)\n      }\n    },\n\n    enter (e) {\n      const el = e.target\n      let { width, height } = getComputedStyle(el)\n      const minHeight = height\n\n      el.style.width = width\n      el.style.position = `absolute`\n      el.style.visibility = `hidden`\n      el.style.height = `auto`\n      el.style.whiteSpace = 'initial'\n\n      height = getComputedStyle(el).height\n\n      el.style.width = null\n      el.style.position = null\n      el.style.visibility = null\n      el.style.whiteSpace = null\n      el.style.height = minHeight\n\n      // Force repaint to make sure the animation is triggered correctly.\n      // eslint-disable-next-line no-unused-expressions\n      getComputedStyle(el).height\n      setTimeout(() => {\n        el.style.height = height\n        el.style.whiteSpace = 'unset'\n      })\n    },\n\n    leave (e) {\n      const el = e.target\n      let { width, height, whiteSpace } = getComputedStyle(el)\n      const maxHeight = height\n\n      el.style.height = 'auto'\n      el.style.width = width\n      el.style.position = `absolute`\n      el.style.visibility = `hidden`\n      el.style.whiteSpace = 'nowrap'\n\n      height = getComputedStyle(el).height\n\n      el.style.width = null\n      el.style.position = null\n      el.style.visibility = null\n      el.style.whiteSpace = whiteSpace\n      el.style.height = maxHeight\n\n      // eslint-disable-next-line no-unused-expressions\n      getComputedStyle(el).height\n      setTimeout(() => {\n        el.style.height = height\n        setTimeout(() => {\n          el.style.whiteSpace = null\n          el.style.height = null\n        }, this.duration * 1000 * this.collapseTextOnLeaveRatio)\n      })\n    }\n  }\n}\n</script>\n\n<style>\n  .expandable-text-line {\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    overflow: hidden;\n    transition: height 0.1s;\n  }\n</style>\n"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__ = undefined;
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var component = normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      createInjector,
      undefined,
      undefined
    );

  // Import vue component

  // Declare install function executed by Vue.use()
  function install(Vue) {
  	if (install.installed) { return; }
  	install.installed = true;
  	Vue.component('ExpandableTextLine', component);
  }

  // Create module definition for Vue.use()
  var plugin = {
  	install: install,
  };

  // Auto-install when vue is found (eg. in browser via <script> tag)
  var GlobalVue = null;
  if (typeof window !== 'undefined') {
  	GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
  	GlobalVue = global.Vue;
  }
  if (GlobalVue) {
  	GlobalVue.use(plugin);
  }

  exports.default = component;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
