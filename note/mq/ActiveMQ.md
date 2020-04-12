

#  MQ(Message Queue)应用场景：
- 异步
- 解耦
- 削峰

# 常见的消息中间件

特性 | ActiveMQ | RabbitMQ | RocketMQ | Kafka
:-: |:-: |:-: |:-: | :-:
开发语言 | Java | Erlang | Java | Scala
单机吞吐量 | 万级 | 万级 | 10万级 | 10万级
时效性 | 毫秒级 | 微秒级 | 毫秒级 | 毫秒级
可用性 | 高（支持主从架构） | 高（支持主从架构） | 非常高（分布式架构） | 非常高（分布式架构） 
功能特性 | 成熟的产品，很多公司得到应用；有较多的文档；各种协议支持较好 | 基于Erlang开发,所以并发能力很强，性能几号，延时很低，管理界面较丰富 | MQ功能比较完备，扩张性佳 | 像一些消息查询，消息回溯等功能没有提供，在大数据领域应用广

#  JMS（Java Message Service）
**消息中间件**利用高效可靠的消息传递机智进行平台无关的数据交流，并基于数据通信来进行**分布式系统**的集成。它可以在分布式环境下扩展进程间的通信。对于消息中间件，常见的角色大致有 **Producer**（生产者）、**Consumer**（消费者）

## JMS消息模型

###  1. 点对点模式 （Queue队列模型）
> P2P (Pointer-to-Pointer ) 即生产者和消费者之间的消息往来
![mq_queue.png](http://ww1.sinaimg.cn/large/005CzYvJgy1gdgwy2wli2j30vq09vdmq.jpg)
###  点对点模型的特点
- 每个消息只有一个消费者（Consumer）（即**一旦被消费，消息就从队列中移除**）；
- 发送者和接收者之间在**时间上没有依赖性**（也就是发送消息后，无论有没有接收者监听消息，都会保存在队列中）
- 接收者在成功接收消息之后需向队列应答成功
###  举例
![mq_queue_case.png](http://ww1.sinaimg.cn/large/005CzYvJgy1gdgx7oy3vcj30v308wmzl.jpg)

### 2. 发布/订阅模型（topic主题模型）
> Public-Subscribe
包含三个角色：**主题（Topic）**、**发布者（Publisher）**、**订阅者（Subscriber）**，多个发布者将消息发送到topic，系统将这些消息投递到订阅此topic的订阅者
![mq_topic.png](http://ww1.sinaimg.cn/large/005CzYvJgy1gdgwyblffwj30vk0cqn71.jpg)
###  发布/订阅模型的特点
- 每个消息可以有多个订阅者 （一对多）
- 发布者和订阅者之间有时间上的依赖性 （订阅者先订阅主题，发布者再发送消息）
- 订阅者必须保持运行的状态，才能接受发布者发布的消息

# JMS编程API
![mq_JMS.png](http://ww1.sinaimg.cn/large/005CzYvJgy1gdgxt5te79j30g00chdk6.jpg)

要素 | 作用
:-: | :-:
Destination | 表示**消息所走通道的目标**，用来定义消息从发送端发出后要走的通道，而不是接收方。Destination属于管理类对象
ConnectionFactory | 连接工厂，用于创建连接对象，ConnectionFactory 属于管理类的对象
Connection | 连接接口，用于创建 Session
Session | 回话接口，用于创建**消息发送者**、**消息接收者** 和 **消息**
MessageConsume | 消息的消费者，订阅消息并处理消息
MessageProducer | 消息的生产者，发送消息

##  1. ConnectionFactory
创建Connection对象的工厂，针对两种不同的jms消息模型，  
分别有**QueueConnectionFactory**和**TopicConnectionFactory**两种。

##  2. Destination （Queue & Topic）
Destination的意思是消息**生产者的消息发送目标**或者说**消息消费者的消息来源**。  
对于消息生产者来说，它的Destination是某个队列（Queue）或某个主题（Topic）;  
对于消息消费者来说，它的Destination也是某个队列（Queue）或主题（Topic）。  
所以，Destination实际上就是两种类型的对象：**Queue**、**Topic**

##  3. Connection
Connection表示在客户端和JMS系统之间**建立的链接**（对TCP/IP socket的包装）。  
Connection可以产生一个或多个Session

##  4. Session
Session 是我们对消息进行操作的接口，可以通过session创建**生产者、消费者、消息**等。  
Session 提供了**事务**的功能，如果需要使用session发送/接收多个消息时，可以将这些发送/接收动作放到一个事务
中。


##  5. Producer
Producer（消息生产者）：消息生产者由Session创建，并用于将消息发送到Destination。  
同样，消息生产者分两种类型：**QueueSender**和**TopicPublisher**。  
可以调用消息生产者的方法（**send**或**publish**方法）发送消息。

##  6. Consumer
Consumer（消息消费者）：消息消费者由Session创建，用于接收被发送到Destination的消息。  
两种类型：**QueueReceiver**和**TopicSubscriber**。  
可分别通过session的**createReceiver**(Queue)或**createSubscriber**(Topic)来创建。  
可分别通过session的**createReceiver**(Queue)或**createSubscriber**(Topic)来创建。  
当然，也可以session的**creatDurableSubscriber**方法来创建**持久化**的订阅者。


##  7. MessageListener
消息监听器。如果注册了消息监听器，一旦消息到达，将自动调用监听器的onMessage方法。  
EJB中的MDB（Message-Driven Bean）就是一种MessageListener。

# JMS消息组成

结构 | 描述
:-: | :-:
JMS Provider | 消息中间件/消息服务器
JMS Producer | 消息生产者
JMS Consumer | 消息消费者
JMS Message | 消息

##  JMS Message 由三部分组成：
###  1.  消息头
JMS消息头预定义了若干字段用于客户端与JMS提供者之间识别和发送消息，预编译头如下：

名称 | 描述
:-: | :-:
<font style="color:red">JMSDestination</font> | 消息发送的 Destination，在发送过程中由提供者设置
<font style="color:red">JMSMessageID</font> | 唯一标识提供者发送的每一条消息。这个字段是在发送过程中由提供者设置的，客户机只能在消息发送后才能确定消息的 JMSMessageID
<font style="color:red">JMSDeliveryMode</font> | 消息持久化。包含值 DeliveryMode.PERSISTENT 或者 DeliveryMode.NON_PERSISTENT
JMSTimestamp | 提供者发送消息的时间，由提供者在发送过程中设置
<font style="color:red">JMSExpiration</font> | 消息失效的时间，毫秒，值 0 表明消息不会过期，默认值为0
<font style="color:red">JMSPriority</font> | 消息的优先级，由提供者在发送过程中设置。优先级 0 的优先级最低，优先级 9 的优先级最高。0-4为普通消息，5-9为加急消息。ActiveMQ不保证优先级高就一定先发送，只保证了加急消息必须先于普通消息发送。默认值为0
<font style="color:red">JMSCorrelationID</font> | 通常用来链接响应消息与请求消息，由发送消息的 JMS 程序设置。
JMSReplyTo | 请求程序用它来指出回复消息应发送的地方，由发送消息的 JMS 程序设置
JMSType JMS | 程序用它来指出消息的类型。
JMSRedelivered | 消息的重发标志，false，代表该消息是第一次发生，true，代表该消息为重发消息

需要注意的是，在传送消息时，消息头的值由JMS提供者来设置，  
因此开发者使用以上`setJMSXXX()`方法分配的值就被忽略了，  
只有以下几个值是可以由开发者设置的：
- JMSCorrelationID
- JMSReplyTo
- JMSType

###  2. 消息体

xxxMessage | 类型
:-: |:-:
<font style="color:red">TextMessage</font> | 一个字符串对象
<font style="color:red">ObjectMessage</font> | 一个序列化的 Java 对象
<font style="color:red">BytesMessage</font> | 一个字节的数据流
MapMessage | 一套名称-值对
StreamMessage | Java原始值的数据流

生成者Demo --> [SpringBootProducer.java: Lines 18-135](../../demos/src/test/java/com/linhuanjie/demos/mq/activemq/SpringBootProducer.java#L18-L135)  
监听者Demo --> [ActiveMQListener.java: Lines 11-67](../../demos/src/main/java/com/linhuanjie/mq/activemq/ActiveMQListener.java#L11-L67)

###  3. 消息属性
我们可以给消息设置自定义属性，这些属性主要是提供给应用程序的。  
对于**实现消息过滤功能**，消息属性非常有用，JMS API定义了一些标准属性。  
JMS服务提供者可以选择性的提供部分标准属性。
```java
message.setStringProperty("Property",Property); //自定义属性
```
Demo --> [SpringBootProducer.java: Line 127](../../demos/src/test/java/com/linhuanjie/demos/mq/activemq/SpringBootProducer.java#L127)

# 消息持久化

##  ActiveMQ提供了以下三种的消息存储方式：
1.  Memory 消息存储（基于内存的消息存储。）
2.  基于日志消息存储方式，**KahaDB**是ActiveMQ的默认日志存储方式，它提供了容量的提升和恢复能力。
3. 基于JDBC的消息存储方式（数据存储于数据库，如：MySQL中）。

## ActiveMQ持久化机制流程图：
![ActiveMQ生产者消息持久化.png](http://ww1.sinaimg.cn/large/005CzYvJgy1gdgzmuo6hnj30f908ydhe.jpg)
![ActiveMQ消费者消息持久化.png](http://ww1.sinaimg.cn/large/005CzYvJgy1gdgzn32cz3j30fn0aj40e.jpg)

## JDBC持久化配置
### 1. 配置application.yml
```yml
server:
    port: 9001
spring:
    activemq:
        broker-url: tcp://192.168.66.133:61616
        user: admin
        password: admin
    jms:
        pub-sub-domain: false  # false：点对点队列模式， true：发布/订阅模式
        template:
            delivery-mode: persistent # 持久化
    activemq:
        name: springboot-queue01
```
###  2. 修改activemq.xml
```xml
    <!--配置数据库连接池-->
    <bean name="mysql-ds" class="com.alibaba.druid.pool.DruidDataSource" destroy-method="close">
        <property name="driverClassName" value="com.mysql.jdbc.Driver" />
        <property name="url" value="jdbc:mysql://192.168.66.133:3306/db_activemq" />
        <property name="username" value="root" />
        <property name="password" value="123456"/>
    </bean>
    
    <!--JDBC Jdbc用于master/slave模式的数据库分享 -->
    <persistenceAdapter>
        <jdbcPersistenceAdapter dataSource="#mysql-ds"/>
    </persistenceAdapter>
```
### 3. 拷贝mysql及durid数据源的jar包到activemq的lib目录下
- druid-1.1.6.jar
- mysql-connector-java-5.1.46.jar

### 4. 重启activemq

# 消息事务

消息事务，是保证消息传递**原子性**的一个重要特征，和JDBC的事务特征类似。

一个事务性发送，其中一组消息要么能够全部保证到达服务器，要么都不到达服务器。  
生产者、消费者与消息服务器之间都支持事务性；  
ActionMQ的事务主要偏向在生产者的应用。

##  生产者事务
1. 原生JMS事务 Demo --> [SpringBootProducer.java: Lines 138-176](../../demos/src/test/java/com/linhuanjie/demos/mq/activemq/SpringBootProducer.java#L138-L176)
2. Spring的JmsTransactionManager功能
   1. 添加JMS事务管理器  Demo --> [ActiveMQConfig.java: Lines 10-28](../../demos/src/main/java/com/linhuanjie/mq/activemq/ActiveMQConfig.java#L10-L28)
   2. 生产者业务类 Demo --> [MessageService.java: Lines 24-32](../../demos/src/main/java/com/linhuanjie/mq/activemq/MessageService.java#L24-L32)
   3. 测试发送方法 Demo --> [SpringBootProducer.java: Lines 178-184](../../demos/src/test/java/com/linhuanjie/demos/mq/activemq/SpringBootProducer.java#L178-L184)

##  消费者事务
SpringBoot 默认会开启消费者事务
消费完信息，执行 `session.commit();` Demo --> [ActiveMQListener.java: Lines 10-79](../../demos/src/main/java/com/linhuanjie/mq/activemq/ActiveMQListener.java#L10-L79)

# 消息确认机制
JMS消息只有在被确认之后，才认为已经被成功地消费了。  
消息的确认通常包含三个阶段:
1. 消费者接收消息
2. 消费者处理消息
3. 消息被确认

**如果开启了事务，则事务被提交时，就会自动确认**
没开启事务时，消息何时被确认，则取决于创建会话时的**应答模式** （acknowledgement mode）

值 | 描述
:-: | :-:
Session.AUTO_ACKNOWLEDGE | 当客户成功的从receive方法返回的时候，或者从MessageListener.onMessage方法成功返回的时候，会话自动确认客户收到的消息
Session.CLIENT_ACKNOWLEDGE | 客户通过消息的acknowledge方法确认消息。需要注意的是，在这种模式中，确认是在会话层上进行：确认一个被消费的消息将自动确认所有已被会话消费的消息。例如，如果一个消息消费者消费了10个消息，然后确认第5个消息，那么所有10个消息都被确认。（SpringBoot整合 ActiveMQ 时，Session.CLIENT_ACKNOWLEDGE会失效，应填4）
Session.DUPS_ACKNOWLEDGE | 该选择只是会话迟钝确认消息的提交。如果JMS provider失败，那么可能会导致一些重复的消息。如果是重复的消息，那么JMS provider必须把消息头的JMSRedelivered字段设置为true

## SpringBoot环境开启 client_acknowledge 手动确认
配置类：
```java
@Configuration
public class ActiveMqConfig {
    @Bean(name = "jmsQueryListenerFactory")
    public DefaultJmsListenerContainerFactory
    jmsListenerContainerFactory(ConnectionFactory connectionFactory) {
        DefaultJmsListenerContainerFactory factory = new
                DefaultJmsListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory);
        factory.setSessionTransacted(false); // 不开启事务操作
        factory.setSessionAcknowledgeMode(4); //手动确认
        return factory;
    }
}
```
消费者：
```java
/**
 * 消息消费者
 */
@Component
public class Consumer {
    /**
     * 接收消息的方法
     */
    @JmsListener(destination = "${activemq.name}", containerFactory = "jmsQueryListenerFactory")
    public void receiveMessage(TextMessage textMessage) {
        try {
            System.out.println("消息内容：" + textMessage.getText() + ",是否重发："
                    + textMessage.getJMSRedelivered());
            textMessage.acknowledge(); // 确认收到消息，一旦消息确认，消息不会重新发送
            throw new RuntimeException("test");
        } catch (JMSException e) {
            e.printStackTrace();
        }
    }
}
```

# 消息投递方式
## 异步投递

###  1、异步投递 vs 同步投递同步发送：

消息生产者使用持久（Persistent）传递模式发送消息的时候，Producer.send() 方法会被阻塞，直到broker 发送一个确认消息给生产者(ProducerAck)，这个确认消息暗示broker已经成功接收到消息并把消息保存到二级存储中。
- 异步发送:  
如果应用程序能够容忍一些消息的丢失，那么可以使用异步发送。异步发送不会在受到broker的确认之前一直阻塞 Producer.send方法。
想要使用异步，在brokerURL中增加 `jms.alwaysSyncSend=false&jms.useAsyncSend=true`属性
> 1）如果设置了alwaysSyncSend=true系统将会忽略useAsyncSend设置的值都采用同步  
> 2）当alwaysSyncSend=false时，“NON_PERSISTENT”(非持久化)、事务中的消息将使用“异步发送”  
> 3）当alwaysSyncSend=false时，如果指定了useAsyncSend=true，“PERSISTENT”类型的消息使用异步发
        送。如果useAsyncSend=false，“PERSISTENT”类型的消息使用同步发送。

总结： 默认情况(`alwaysSyncSend=false,useAsyncSend=false`)，非持久化消息、事务内的消息均采用
异步发送；对于持久化消息采用同步发送！！！

### 2、配置异步投递的方式
```java
@Configuration
public class ActiveConfig {
    /**
     * 配置用于异步发送的非持久化JmsTemplate
     */
    @Autowired
    @Bean
    public JmsTemplate asynJmsTemplate(PooledConnectionFactory pooledConnectionFactory) {
        JmsTemplate template = new JmsTemplate(pooledConnectionFactory);
        template.setExplicitQosEnabled(true);
        template.setDeliveryMode(DeliveryMode.NON_PERSISTENT);
        return template;
    }

    /**
     * 配置用于同步发送的持久化JmsTemplate
     */
    @Autowired
    @Bean
    public JmsTemplate synJmsTemplate(PooledConnectionFactory
                                              pooledConnectionFactory) {
        JmsTemplate template = new JmsTemplate(pooledConnectionFactory);
        return template;
    }
}
```

### 3、异步投递如何确认发送成功？

异步投递丢失消息的场景是：生产者设置 UseAsyncSend=true，使用 producer.send（msg）持续发送消息。  
由于消息不阻塞，生产者会认为所有 send 的消息均被成功发送至 MQ。如果 MQ 突然宕机，此时生产者端内存中尚未被发送至 MQ 的消息都会丢失。  
这时，可以给异步投递方法接收回调，以确认消息是否发送成功
```java
    /**
     * 异步投递，回调函数
     *
     * @return
     */
    @RequestMapping("/send")
    @ResponseBody
    public String sendQueue() {
        Connection connection = null;
        Session session = null;
        ActiveMQMessageProducer producer = null;
        // 获取连接工厂
        ConnectionFactory connectionFactory =
                jmsMessagingTemplate.getConnectionFactory();
        try {
            connection = connectionFactory.createConnection();
            session = connection.createSession(true, Session.AUTO_ACKNOWLEDGE);
            Queue queue = session.createQueue(name);
            int count = 10;
            producer = session.createProducer(queue);
            producer.setDeliveryMode(DeliveryMode.NON_PERSISTENT);
            long start = System.currentTimeMillis();
            for (int i = 0; i < count; i++) {
                //创建需要发送的消息
                TextMessage textMessage = session.createTextMessage("Hello");
                //设置消息唯一ID
                String msgid = UUID.randomUUID().toString();
                textMessage.setJMSMessageID(msgid);
                producer.send(textMessage, new AsyncCallback() {
                    @Override
                    public void onSuccess() {
                        // 使用msgid标识来进行消息发送成功的处理
                        System.out.println(msgid + " 消息发送成功");
                    }

                    @Override
                    public void onException(JMSException exception) {
                        // 使用msgid表示进行消息发送失败的处理
                        System.out.println(msgid + " 消息发送失败");
                        exception.printStackTrace();
                    }
                });
            }
            session.commit();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "ok";
    }
```

## 延迟投递

生产者提供两个发送消息的方法，一个是即时发送消息，一个是延时发送消息。
###  1、修改activemq.xml
添加 `broker` 标签添加 `schedulerSupport="true"`
```
<broker xmlns="http://activemq.apache.org/schema/core"  ...  schedulerSupport="true" >
    xxx
</broker>
```
###  2、在代码中设置延迟时长
```java
    /**
     * 延时投递
     * @return
     */
    @Test
    public String sendQueue() {
        Connection connection = null;
        Session session = null;
        ActiveMQMessageProducer producer = null;
        // 获取连接工厂
        ConnectionFactory connectionFactory =
                jmsMessagingTemplate.getConnectionFactory();
        try {
            connection = connectionFactory.createConnection();
            session = connection.createSession(true, Session.AUTO_ACKNOWLEDGE);
            Queue queue = session.createQueue(name);
            int count = 10;
            producer = (ActiveMQMessageProducer) session.createProducer(queue);
            producer.setDeliveryMode(DeliveryMode.NON_PERSISTENT);
            //创建需要发送的消息
            TextMessage textMessage = session.createTextMessage("Hello");
            //设置延时时长(延时10秒)
            textMessage.setLongProperty(ScheduledMessage.AMQ_SCHEDULED_DELAY,
                    10000);
            producer.send(textMessage);
            session.commit();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "ok";
    }
```

## 定时投递

###  1、启动类添加定时注解
```java
    @SpringBootApplication
    @EnableScheduling // 开启定时功能
    public class MyActiveMQApplication {
        public static void main(String[] args) {
            SpringApplication.run(MyActiveMQApplication.class,args);
        }
    }
```

### 2、在生产者添加@Scheduled设置定时

```java
    /**
     *消息生产者
     */
    @Component
    public class ProducerController3 {
        @Value("${activemq.name}")
        private String name;
        @Autowired
        private JmsMessagingTemplate jmsMessagingTemplate;

        /**
         * 延时投递
         */
        //每隔3秒定投
        @Scheduled(fixedDelay = 3000)
        public void sendQueue() {
            jmsMessagingTemplate.convertAndSend(name, "消息ID:" +
                    UUID.randomUUID().toString().substring(0, 6));
            System.out.println("消息发送成功...");
        }
    }
```

# 死信队列
`DLQ-Dead Letter Queue`，死信队列，用来保存处理失败或者过期的消息  
出现以下情况时，消息会被重发：
- 事务回滚（A transacted session is used and rollback() is called.）
- 事务提交前，会话关闭（A transacted session is closed before commit is called.）
- 手动应答模式下，调用Session.recover() （A session is using CLIENT_ACKNOWLEDGE and Session.recover() is called.）

当一个消息被重发超过6(缺省为6次)次数时，会给broker发送一个"Poison ack"，这个消息被认为是`a poison pill`，这时broker会将这个消息发送到死信队列，以便后续处理。  
注意两点：
1. 缺省持久消息过期，会被送到DLQ，**非持久消息不会送到DLQ**
2. 缺省的死信队列是ActiveMQ.DLQ，如果没有特别指定，死信都会被发送到这个队列。

可以通过配置文件(activemq.xml)来调整死信发送策略。
Demo --> [ActiveMQConfig.java: Lines 23-43](../../demos/src/main/java/com/linhuanjie/mq/activemq/ActiveMQConfig.java#L23-L43)

# ActiveMQ企业面试经典问题
## ActiveMQ 宕机了怎么办？
可以使用集群，来保证高可用
ActiveMQ 主从集群方案：Zookeeper集群 + Replicated LevelDB + ActiveMQ 集群

## 如何防止消费方消息重复消费 ？（消费方幂等问题）
解决思路：
1. 如果消费方是做数据库操作，那么可以把消息的ID作为表的唯一主键（或唯一索引），这样重复消费消息是，就会发生主键冲突，避免产生脏数据。
2. 如果消费方不是做数据库操作，那么可以借助第三方应用，如Redis来记录消费记录。消费完，将消息的ID作为key存入redis，每次消费前，先查询redis有没有该消息的消费记录。

## 如何防止消息丢失？
1. 在消息生产者和消费者使用事务
2. 在消费方采用手动消息确认（ACK）
3. 消息持久化，例如JDBC或日志

## 什么是死信队列？
[死信队列](#死信队列)


> 参考：http://yun.itheima.com/course/636.html