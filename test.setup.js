import chai from 'chai';
import chaiImmutable from 'chai-immutable';

chai.use(chaiImmutable);

require.extensions['.less'] = () => {};
require.extensions['.css'] = () => {};
require.extensions['.svg'] = () => {};
require.extensions['.png'] = () => {};
require.extensions['.jpg'] = () => {};

const { expect } = chai;
