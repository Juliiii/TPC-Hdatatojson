const arr = {
  'part': ['partkey', 'name', 'mfgr', 'brand', 'type', 'size', 'container', 'retailprice', 'comment'],
  'supplier': ['suppkey','name', 'address', 'nationkey', 'phone', 'acctbal', 'comment'],
  'nation': ['nationkey','name', 'regionkey', 'comment'],
  'region': ['regionkey','name', 'comment'],
  'partsupp': ['partkey','suppkey', 'availqty', 'supplycost', 'comment'],
  'customer': ['custkey','name', 'address', 'nationkey', 'phone', 'acctbal', 'mktsegment', 'comment'],
  'lineitem': ['orderkey','partkey', 'suppkey', 'linenumber', 'quantity', 'exiendedprice', 'discount', 'tax', 'returnflag', 'linestatus', 'shipdate', 'commitdate', 'receiptdate', 'shipinstruct', 'shipmode', 'comment'],
  'orders': ['orderkey','custkey', 'orderstatus', 'totalprice', 'orderdate', 'orderpriority', 'clerk', 'shippriority', 'comment']
}


module.exports = arr;