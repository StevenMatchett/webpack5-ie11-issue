module.exports = {
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.js'],
  setupFiles: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx)?$': [
      '<rootDir>/node_modules/babel-jest',
      {
        configFile: './babel.build.js',
      },
    ],
  },
  testPathIgnorePatterns: ['/tests/cypress'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(enzyme)/)'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 90,
      lines: 95,
    },
  },
  moduleDirectories: ['node_modules', 'src'],
  testURL: 'http://localhost',
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.story.{js,jsx}',
    '!src/**/index.js',
    '!src/**/*.stories*.js',
    '!src/_mock/**/*.*',
    '!src/GlobalNav/utils/polyfills.js', // TODO remove this once there are tests for polyfills
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tests/setupFileMock.js',
    '\\.(css|less|scss|sass)$': '<rootDir>/tests/setupFileMock.js',
  },
};
