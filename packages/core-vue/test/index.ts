import { injectTraceIdVue } from '../src/index';

const vue = `
<template>
  <div id="app" data-hi="okoko"
    v-show="isShow"
    class="app go"
    :class="{newCls: classObject}"
    style="font-size: 24px;"
    v-bind:style="[styleObject]"
    @click.stop="clickItem(item)"
    name="ddd"
    :is="ok"
    @touchstart.capture="clickItem" >
    <HelloWord />
    <div v-html="vHtml" ref="vHtml-dom">
      <slot name="demo" :user="user"></slot>
      <p v-if="isShow">3</p>
      <p v-else-if="isHide">34</p>
      <p v-else></p>
    </div>
    hello
    <input v-model.number.trim="bindCls" focus :placeholder="inputType" @confirm="click(Item)" @blur="click(Item)"/>
    <card-list :info="resInfo" :list="list"></card-list>
    <ul :class="bindCls" class="list" v-if="isShow && isHide">
        <li v-for="(item, key) in data" v-bind:key="key" @click="clickItem(index)">
          {{item}}:{{index}}
          <slot v-bind:todo="todo">
            {{ todo.text }}
          </slot>
        </li>
    </ul>
  </div>
</template>

<script>
  console.log('aaaa');
</script>
`;

console.log(injectTraceIdVue(vue, { filepath: 'mockfile' }));
