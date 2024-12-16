module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react', // Adicione isso se estiver usando React
  ],
  plugins: [
    '@babel/plugin-transform-modules-commonjs', // Para converter ESM para CommonJS
  ],
};
