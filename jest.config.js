module.exports = {
  verbose: true,
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!**/index.js',
  ],
};
