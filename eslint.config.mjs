// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "import/first": "off",
    "import/order": "off",
    "nuxt/nuxt-config-keys-order": "off",
    "@stylistic/arrow-parens": "off",
    "@stylistic/operator-linebreak": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/html-self-closing": "off",
    "vue/max-attributes-per-line": "off",
    "vue/multi-word-component-names": "off",
    "vue/require-default-prop": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-empty-object-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
});
