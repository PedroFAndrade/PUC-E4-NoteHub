export default {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)']
};
