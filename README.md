# 基于jQuery 2.0.0-pre 和 Zepto 1.0.0 的移动基础类库

#### 打包命令：
    
    $ grunt

#### 文件大小：
    
| |   raw(byte)  |   gz(byte) |
| ---- | ---- | ---- |
|dist/jquto-debug.js|242259  | 54856 |
|dist/jquto.js|61749  | 22095 |

##### 模块说明
    
* 不含jQuery模块：sizzle、event-alias、effects、deprecated、exports
* 包含Zepto模块：fx.js、fx_methods.js、touch.js

##### 扩展

$.support

* `vendor`: 样式属性前缀: "O", "webkit", "ms", "Moz", ""
* `prefix`: 样式前缀: "-o-", "-webkit-", "-ms-", "-moz-", ""
* `touch`: 是否支持`ontouchstart`, `ontouchmove`, `ontouchend`, `ontouchcancel`系列特性
* `pointer`: 是否支持Window Phone 8+ 的`MSPointerDown`, `MSPpointerMove`, `MSPointerUp`, `MSPointerCancel`系统特性
* `transform`: 是否支持CSS3 transform特性
* `trans3d`: 是否支持CSS3 3d transform特性
* `transition`: 是否支持CSS3 线性动画特性

