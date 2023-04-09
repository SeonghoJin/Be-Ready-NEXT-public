//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');
const isProduction = process.env['NODE_ENV'] === 'production';
const withPWA = require('next-pwa')({
  dest: 'public',
});

/**
 * @type {import("@nrwl/next/plugins/with-nx").WithNxOptions}
 **/

const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  env: {
    hi: 'hi',
  },
  compiler: {
    emotion: true,
  },
};

const config = () => {
  if (isProduction) {
    console.info('load with pwa nx');
    return withPWA(withNx(nextConfig));
  }
  console.info('load with nx');
  return withNx(nextConfig);
};

module.exports = config;
