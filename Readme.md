## Description
一个数据库实验的作业。先用tpc-h生成8个表的数据，再把这些数据转成json的格式，然后导入数据库中，完成一些查询操作。

## Datatype
TPC-H生成的数据格式<br>
![Alt text](./images/datatype.png)<br>
我们的需要的数据格式<br>
![Alt text](./images/datatype2.png)

## How to use
+ 先用TPC-H生成数据
+ 然后将生成的.tbl数据文件放到data文件夹下
+ 然后命令行输入 node index.js
+ 等待完成
+ over

## Attention
额，我这里没有一个res的文件夹，直接node index.js 会报错。所以你们得手动创建一个res文件夹。。（改天我再加段代码上去。。）
