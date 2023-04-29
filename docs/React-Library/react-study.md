---
title: react-study
date: 2023-04-29
tags:
 - React
categories: 
 - React
---

## setState 是同步还是异步的

**异步更新，同步执行**

```js
import React, { Component } from 'react';

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count);
  }

  render() {
    return (
      <div>
        Count: {this.state.count}
        <button onClick={() => this.handleClick()}>Increment</button>
      </div>
    );
  }
}

export default MyComponent;
```

在上面的代码中，当您单击“增量”按钮时，组件的状态应该会增加1。但是，如果您运行该代码，您会注意到 console.log(this.state.count)实际上不会打印出预期结果-每次你点击按钮时计数器总是会比你所看到的值少一个。

这是因为setState() 是异步的。 在调用 setState() 后，React将更新添加到内部队列中，在稍后进行批处理优化操作。也就是说，无论何时更新发生，您不能保证this.state表示最新的状态。

要解决这个问题，您可以通过使用回调函数来指定更新后要执行的操作：
```js
handleClick() {
  this.setState({ count: this.state.count + 1 }, () => {
    console.log(this.state.count);
  });
}
```

setState 本身并非异步的，但state 的处理机制给人异步的假象，state 处理一般发生在生命周期变化的时候