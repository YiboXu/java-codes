## 开源项目的组成部分

在讲清楚之前呢，我们先来了解一下一个开源项目有哪些组成部分：

- name: 项目名
- description: 项目的简要描述
- 项目的源码
- README.md: 项目的详细情况的介绍

那么除了这些要素之外，项目本身的`star`数和`fork`数，也是评判一个开源项目是否火热的标准，这同时也是一个很重要的搜索标准。另外我们也要注意观察这个项目的最近更新日期，因为项目越活跃，那么它的更新日期也更加频繁。

以上要素就是我们在进行搜索的时候要注意的一些关键点。



## 如何搜索

那我们到底如何搜索呢？

假设我们现在要搜索`React`,相信大部分小伙伴都是直接在搜索框里输入：“React”，然后一回车，你就会发现情况像下面这样：

![屏幕快照 2020-02-07 13.19.13.png](https://user-gold-cdn.xitu.io/2020/2/7/1701e4f273e03268?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

搜索结果会显示非常多的开源项目，简直让你应接不暇，无从下手，很多小伙伴搜到这一步就放弃了，因为项目太多了，根本找不到如何找到自己感兴趣的开源项目，所以这样搜索非常的不准确。所以我们来学习一下稍微精确一点的搜索方法。

### 按照 `name` 搜索

搜索`项目名`里面包含`React`的项目:

```shell
in:name React
```

得到如下结果：

![屏幕快照 2020-02-07 13.33.28.png](https://user-gold-cdn.xitu.io/2020/2/7/1701e4f2751b5408?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

可以看到，这些搜索结果都是项目名里面带有“React”关键字的项目，但是项目数量依旧很多。

现在我们来约束一下

比如我再精确到项目的star数大于5000+：

```shell
in:name React stars:>5000
```

结果是这样的：

![屏幕快照 2020-02-07 13.38.59.png](https://user-gold-cdn.xitu.io/2020/2/7/1701e4f278da5355?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

搜索结果瞬间精确了很多，现在只有114个项目可供选择。当然我们一般不会把star数设置得这么高，一般设置个1000就差不多了。

同理，我们也可以按照fork的数量来进行搜索:

```
in:name React stars:>5000 forks:>3000
```



![屏幕快照 2020-02-07 13.42.56.png](https://user-gold-cdn.xitu.io/2020/2/7/1701e4f2796564eb?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

你会发现，结果越来越精确！

### 按照`README`来搜索

搜索`README.md`里面包含`React`的项目:

```shell
 in:readme React
```



![屏幕快照 2020-02-07 13.46.50.png](https://user-gold-cdn.xitu.io/2020/2/7/1701e4f27ab91ee0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



结果有这么多，那么我们再限制一下它的`star`数和`fork`数：

```shell
in:readme React stars:>3000 forks:>3000
```



![屏幕快照 2020-02-07 13.50.04.png](https://user-gold-cdn.xitu.io/2020/2/7/1701e4f27cb42794?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



搜索结果一下子精确到了90个。这个时候你再去选择项目，就会变得容易很多。

### 按照`descriptin`搜索

假设我们现在要学习`微服务`的项目，我们搜索`项目描述(description)`里面包含`微服务`的项目:

```
in:description 微服务
```



![屏幕快照 2020-02-07 13.55.33.png](https://user-gold-cdn.xitu.io/2020/2/7/1701e4f36ecc93f3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



结果有这么多，那我们接着增加一些筛选条件:

```
in:description 微服务 language:python 
```

`language:python`的意思是我们把语言限制为`python`，我们来看看结果如何:



![屏幕快照 2020-02-07 13.58.32.png](https://user-gold-cdn.xitu.io/2020/2/7/1701e4f375276748?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



搜索结果精确了很多。

假如在这些项目里面，我们想要找到最近才更新的项目，意思是更新时间就在最近，我们可以这样：

```
in:description 微服务 language:python pushed:>2020-01-01
```

`pushed:>2020-01-01`的意思是我们把项目的最后更新时间限制到2020-01-01，我们来看看结果如何:



![屏幕快照 2020-02-07 14.03.24.png](https://user-gold-cdn.xitu.io/2020/2/7/1701e4f38e72250e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



搜索结果只有8个了，这几个项目就属于更新比较活跃的项目，这下再也不纠结了。

## 总结

### 筛选条件

好，我们来总结一下。我们想要进行精准搜索，无非就是增加筛选条件。

#### in:name xxx 

// 按照项目名搜索

#### in:readme xxx 

// 按照README搜索

#### in:description xxx 

// 按照description搜索

### 具体筛选条件

#### stars:>xxx 

// stars数大于xxx

#### forks:>xxx

// forks数大于xxx

#### language:xxx 

// 编程语言是xxx

#### pushed:>YYYY-MM-DD 

// 最后更新时间大于YYYY-MM-DD





> 参考：https://juejin.im/post/5e3d01c56fb9a07c91100801





