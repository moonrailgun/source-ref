import { injectTraceIdVue } from '../src/index';

const vue = `
<template>
  <div>
    <div @click="console.log('foo')">Hello World</div>
  </div>
</template>

<script>
  console.log('aaaa');
</script>
`;

injectTraceIdVue(vue, { filepath: 'mockfile' });
