const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '1prft1kq',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

console.log('Testing Sanity connection...');

client.fetch('*[_type == "sermon"]{title, featured, slug}').then(data => {
  console.log('Sermon titles and featured status:', JSON.stringify(data, null, 2));
}).catch(err => console.error('Error:', err));