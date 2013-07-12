# 基于jQuery 2.0.3 和 Zepto 1.0.0 的移动基础类库



#### 命令：
    
    $ npm install
    $ grunt

#### 文件大小：
    
| |   raw(byte)  |   gz(byte) |
| ---- | ---- | ---- |
|dist/jquto-debug.js| 224025 | 54658 |
|dist/jquto.js| 62241 | 22350 |

##### 模块说明
    
* 不含jQuery模块：sizzle、effects、deprecated、wrap
* 包含Zepto模块：fx.js、fx_methods.js、touch.js

##### 扩展

$.support

* `prefix`: 样式前缀: 
    
    ```javasript
    {"css":"-o-","style":"O"} 
    {"css":"-webkit-","style":"webkit"}
    {"css":"-ms-","style":"ms"}
    {"css":"-moz-","style":"Moz"}
    {"css":"","style":""}
    ```
    
* `touch`: 是否支持`ontouchstart`, `ontouchmove`, `ontouchend`, `ontouchcancel`系列特性
* `pointer`: 是否支持Window Phone 8+ 的`MSPointerDown`, `MSPpointerMove`, `MSPointerUp`, `MSPointerCancel`系统特性
* `transform`: 是否支持CSS3 transform特性
* `trans3d`: 是否支持CSS3 3d transform特性
* `transition`: 是否支持CSS3 线性动画特性

