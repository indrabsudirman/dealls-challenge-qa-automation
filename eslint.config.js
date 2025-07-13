import tseslint from 'typescript-eslint'

export default tseslint.config({
  files: ['**/*.ts'],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      project: './tsconfig.json',
      warnOnUnsupportedTypeScriptVersion: false,
    },
  },
})
