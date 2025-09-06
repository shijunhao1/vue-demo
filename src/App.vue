<template>
  <div style="display: flex">
    <div style="display: flex; flex-direction: column; gap: 20px; width: 400px">
      <div class="image-container">
        <img src="/微信图片_20231221202045.jpg" />
      </div>
      <div class="img-container"></div>
      <div class="progress-container">
        <!-- <div class="process-bar" :style="{ width: process + '%' }"></div> -->
        <div
          class="process-bar"
          :style="{ transform: `translateX(${process - 100}%)` }"
        ></div>
      </div>
      <button @click="startAnimate" :disabled="isAnimating">开始</button>
      <!-- <div class="display-grid">
      <div style="height:200px;background-color: antiquewhite;"></div>
      <div style="height:200px;background-color: black;"></div>
    </div> -->

      <!-- 居中布局 -->
      <!-- <div style="display: grid;justify-items: center;align-items: center;width:400px;height:200px;background-color: antiquewhite;">
      <button>居中按钮</button>
     </div> -->
      <!-- <div style="width: 400px;height: 200px;background-color: antiquewhite;position: relative;">
        <div style="position: absolute;top:50%;left: 50%;transform: translate(-50%,-50%);">
          <button>居中按钮</button>
        </div>
     </div> -->
      <!-- <div style="width:400px;height:200px;background-color: antiquewhite;">
      <h1 style="width:200px;margin:0 auto">居中按钮</h1>
     </div> -->

      <!-- 三栏布局 -->
      <!-- <div style="display: flex;width:400px;height: 200px;">
        <div style="width:100px;background-color: antiquewhite;"></div>
        <div style="flex: 1;background-color:aliceblue;"></div>
        <div style="width:100px;background-color:aqua;"></div>
      </div> -->

      <!--元素自动换行 -->
      <!-- <div style="display: flex; flex-wrap: wrap; width: 500px">
    </div> -->

      <!-- 自适应图片裁剪 -->
      <!-- <div style="width:200px;height:200px;overflow: hidden;">
      <img src="/微信图片_20231221202045.jpg" alt="demo" style="width:100%;height: 100%;object-fit: cover;"/>
     </div> -->

      <!-- 文字溢出省略 text-overflow控制文本溢出的显示方式，必须设置 overflow: hidden 或 overflow: clip-->
      <!-- <div
      style="
        width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis; 
      "
    >
      这是一段很长很长的文本，超出部分会被省略
    </div> -->

      <!-- 标准盒模型和怪异盒模型 -->
      <!-- <div style="width:200px;height:200px;padding:10px;border: 1px solid #000;box-sizing: content-box;background-color: antiquewhite;"></div> -->
      <!-- <div style="width:200px;height:200px;padding:10px;border: 1px solid #000;box-sizing: border-box;background-color: bisque;"></div> -->
    </div>
    <div style="width: 500px">
      <!-- position布局 -->
      <h1 style="width: 200px; margin: 0 auto">Basic document flow</h1>
      <!-- 解决高度塌陷 -->
      <!-- <div style="position: absolute; top: 100px; left: 100px;background-color: antiquewhite;">
        <div style="height: 300px; float: left">1111</div>
      </div> -->
      <p>
        I am a basic block level element. My adjacent block level elements sit
        on new lines below me.
      </p>
      <!-- <p style="position: absolute; top: 100px; left: 100px;background-color: antiquewhite;">
          By default we span 100% of the width of our parent element, and we are
          as tall as our child content. Our total width and height is our
          content + padding + border width/height.
      </p> -->
      <p>
        I am a basic block level element. My adjacent block level elements sit
        on new lines below me.
      </p>
    </div>
    <div style="flex: 1">
      <form @submit.prevent="submitForm">
        <div class="form-item">
          <label for="name">用户名：</label>
          <input
            type="text"
            placeholder="请输入用户名"
            v-model="form.name"
            id="name"
            required
          />
        </div>
        <div class="form-item">
          <label for="password">密码：</label>
          <input
            type="password"
            placeholder="请输入密码"
            v-model="form.password"
            id="password"
            required
          />
        </div>
        <div class="form-item">
          <label for="gender">性别:</label>
          <select id="gender">
            <option
              v-for="(item, index) in options"
              :key="index"
              :value="item.val"
            >
              {{ item.label }}
            </option>
          </select>
        </div>
        <button @click="sumbit" type="sumbit">提交</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import axios from "axios";

const process = ref(0);
let animateId = null;
let startTime = null;
const during = 3000;
const isAnimating = ref(false);
const animate = (timestamp) => {
  if (!startTime) startTime = timestamp;
  const time = timestamp - startTime;
  process.value = Math.min(100, (time / during) * 100);
  if (process.value < 100) {
    animateId = requestAnimationFrame(animate);
  } else {
    startTime = null;
    cancelAnimationFrame(animateId);
    isAnimating.value = false;
  }
};
const startAnimate = () => {
  process.value = 0;
  animateId = requestAnimationFrame(animate);
  isAnimating.value = true;
};

function executeTask(tasks) {
  const result = new Array(tasks.length);
  tasks.forEach((task, index) => {
    task
      .then((res) => {
        result[index] = { state: "success", value: res };
      })
      .catch((rej) => {
        result[index] = { state: "error", value: rej };
      })
      .finally(() => {
        consoleResult();
      });
  });
  let outputIndex = 0;
  function consoleResult() {
    while (outputIndex < tasks.length && result[outputIndex]) {
      const output = result[outputIndex];
      if (output.state === "success") {
        console.log(output.value);
      } else {
        console.error(output.value);
      }
      outputIndex++;
    }
  }
}
const t1 = Promise.resolve("OK1");
// const t2 = Promise.reject("ERR2");
// const t3 = new Promise((_, rej) => setTimeout(() => rej("OK3"), 50));

// executeTask([t1, t2, t3]);

// flat()
Array.prototype.myflat = function (deep = 1) {
  const array = this;
  const result = [];
  const flatten = (array, deep) => {
    array.forEach((item) => {
      if (Array.isArray(item) && deep > 0) {
        flatten(item, deep - 1);
      } else {
        result.push(item);
      }
    });
  };
  flatten(array, deep);
  return result;
};
console.log([1, [2, [3, 5]]].myflat(2));

// push()
Array.prototype.mypush = function (...args) {
  const array = this;
  console.log(args, "11111111");
  for (let arg of args) {
    array[array.length] = arg;
  }
  return array;
};
console.log([1].mypush(2, 3, 4));
// filter()
Array.prototype.myfilter = function (callback, Args) {
  const array = this;
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (!(i in array)) continue;
    if (callback.call(Args, array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
};
console.log([1, 2, 3].myfilter((item) => item === 1));
//map()
Array.prototype.mymap = function (callback, arg) {
  const array = this;
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (!(i in array)) continue;
    result.push(callback.call(arg, array[i], i, array));
  }
  return result;
};
console.log([1, 2].mymap((item) => item * 2));
//reduce()
Array.prototype.myreduce = function (callback, initValue) {
  const array = this;
  const startIndex = 0;
  let acc = initValue;
  if (!acc) {
    while (startIndex < array.length && !(startIndex in array)) {
      startIndex++;
    }
    if (startIndex >= array.length) {
      throw new TypeError("Reduce of empty array");
    }
    acc = array[startIndex];
  }
  for (let i = startIndex; i < array.length; i++) {
    if (!(i in array)) continue;
    acc = callback(acc, array[i], i, array);
  }
  return acc;
};
console.log(
  [1, 2, 3].myreduce((a, b) => a + b, 0),
  "reduce"
);
//判断输出
for (var i = 0; i < 3; i++) {
  //输出3 3 3
  const a = i;
  setTimeout(() => {
    console.log(a);
  }, 100);
}

// 表单
const form = reactive({
  name: "",
  password: "",
});
const options = [
  { val: "man", label: "男" },
  { val: "woman", label: "女" },
];
const sumbit = async () => {
  try {
    const response = await axios.post("xxxxxxx", form);
    alert(`请求成功,返回${response.data}`);
  } catch (error) {
    alert(error);
  }finally{
    
  }
};
</script>

<style scoped>
.image-container {
  width: 200px;
  height: 200px;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  /*裁剪掉图片超出部分*/
  overflow: hidden;
}
.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* object-fit: contain; */
}
.img-container {
  width: 200px;
  height: 200px;
  background: url("/微信图片_20231221202045.jpg") no-repeat center center;
  background-size: contain;
  /*background-size: 100% 100%;  拉伸到充满容器 */
}
.progress-container {
  width: 300px;
  height: 30px;
  border: 1px solid #000000;
  border-radius: 10px;
  overflow: hidden;
}
.process-bar {
  height: 100%;
  background: blue;
}
.display-grid {
  width: 300px;
  height: 300px;
  display: grid;
  grid-template-columns: 100px 1fr;
}
p {
  background: aqua;
  border: 3px solid blue;
  padding: 10px;
  margin: 10px;
}
.form-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.form-item label {
  width: 80px; /* 自动占满剩余空间 */
}
</style>
