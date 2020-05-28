const fp = require('lodash/fp')

// horsepower 马力 dollar_value 价格 in_stock 库存
const cars =[
  {name: "Ferrari FFM", horsepower: 660, dollar_value: 700000, in_stock: true},
  {name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false},
  {name: "Jaguar XKR-Sn", horsepower: 550, dollar_value: 132000, in_stock: false},
  {name: "Audi R8n", horsepower: 525, dollar_value: 114200, in_stock: false},
  {name: "ASton MArtin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true},
  {name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false}
]

// console.log(cars);

let isLastInStock = function (cars) {
  //获取最后一条数据
  let last_car = fp.last(cars)
  //获取最后一条数据 in_stock 属性值
  return fp.prop('in_stock', last_car)
}

// console.log(isLastInStock(cars));

let composeFn = fp.flowRight(fp.prop('in_stock'),fp.last)

console.log(composeFn(cars), 'ssssssssss')


fp.map((item) => console.log(item, '=========='))(cars)

//### 练习2 使用fp.flowRight(), fp.prop(), fp.first()获取第一个car的name


let composeFn1 = fp.flowRight(fp.prop('name'),fp.first)

console.log(composeFn1(cars))


let _average = function (xs) {
  return fp.reduce(fp.add, 0, xs) / xs.length
}//无需改动

let averageDollarValue = function (cars) {
    let dollar_values = fp.map(function (car) {
      return car.dollar_value
      }, cars)
    return _average(dollar_values)
}
console.log(averageDollarValue(cars), '============>3')

let composeFn2 = fp.flowRight(_average,fp.map(item => item.dollar_value))
console.log(composeFn2(cars), '=>>>>>>>>>>>>>>>>>3');



let _underscore = fp.replace(/\W+/g, '_')

let sanitizenames = fp.map(item => {
    item.name = fp.flowRight(_underscore, fp.toLower)(item.name)
    return item
})

console.log(sanitizenames(cars) ,'==========>4')
