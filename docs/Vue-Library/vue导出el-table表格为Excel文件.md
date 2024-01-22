---
title: $ref和$el区别
date: 2024-01-22 14:50:38
tags:
 - Vue
categories: 
 - Vue
---

## 方式一，仅使用 xlsx.js，不带样式，简单导出

```js
import * as XLSX from 'xlsx'

const book = XLSX.utils.book_new();
// 数据
const sheet = XLSX.utils.table_to_sheet(this.$refs.exportTableRef.$el);
// Sheet
XLSX.utils.book_append_sheet(book, sheet, "Sheet1");
XLSX.writeFile(book, "检查部位统计.xlsx");
```


## 方式二，封装为常用方法（多 sheet，带样式）

安装

```
"file-saver": "^2.0.5",
"xlsx": "^0.16.9",
"xlsx-style-medalsoft": "^0.8.13"
```

- 新建文件 exportToExcel.js

```js
import FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import XLSXStyle from 'xlsx-style-medalsoft'

let OMS = {}

// 导出Excel-可多sheet  带样式
OMS.downLoadXlsx = ({ sheets = [], name = '文件' }) => {
  const workbook = XLSX.utils.book_new()

  sheets.forEach(sheetData => {
    const { dom, sheetName, columnWidth = [], raw } = sheetData
    const table = dom

    // 因为element-ui的表格的fixed属性导致多出一个table，会下载重复内容，这里删除掉
    if (table.querySelector('.el-table__fixed')) {
      table.removeChild(table.querySelector('.el-table__fixed'))
    }
    if (table.querySelector('.el-table__fixed-right')) {
      table.removeChild(table.querySelector('.el-table__fixed-right'))
    }

    const sheet = XLSX.utils.table_to_sheet(table, { raw }) //raw为true表示单元格为文本格式(未加工)

    // 删掉末尾空行
    Object.keys(sheet).forEach((item, index) => {
      if (!item.startsWith('!') && sheet[item].v === '') {
        delete sheet[item]
      }
    })
    // 设置表格列宽度
    if (columnWidth.length === 0) {
      for (let i = 0; i < 30; i++) {
        sheet['!cols'][i] = { wch: 12.5 }
      }
    } else {
      columnWidth.forEach((item, i) => {
        sheet['!cols'][i] = { wch: item }
      })
    }

    // 循环遍历每一个表格，设置样式
    for (const key in sheet) {
      if (!key.startsWith('!')) {
        sheet[key].s = {
          font: {
            sz: 11,
            bold: false,
            name: '宋体',
            color: {
              rgb: '000000'
            }
          },
          alignment: {
            horizontal: 'center',
            vertical: 'center',
            wrapText: false
          },
          border: {}
        }
      }
    }

    const arr = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z'
    ]
    /*eslint-disable*/
    // 行列合并
    const range = sheet['!merges']
    if (range) {
      range.forEach(item => {
        const startColNumber = Number(item.s.r),
          endColNumber = Number(item.e.r)
        const startRowNumber = Number(item.s.c),
          endRowNumber = Number(item.e.c)
        const test = sheet[arr[startRowNumber] + (startColNumber + 1)]
        for (let col = startColNumber; col <= endColNumber; col++) {
          for (let row = startRowNumber; row <= endRowNumber; row++) {
            sheet[arr[row] + (col + 1)] = test
          }
        }
      })
    }

    XLSX.utils.book_append_sheet(workbook, sheet, sheetName)
  })

  const excelData = XLSXStyle.write(workbook, {
    bookType: 'xlsx',
    type: 'buffer'
  })

  try {
    FileSaver.saveAs(
      new Blob([excelData], { type: 'application/octet-stream' }),
      `${name}.xlsx`
    )
  } catch (e) {
    throw e
  }
}

export default OMS

```

## 使用

```js
import OMS from "@/utils/exportToExcel";

OMS.downLoadXlsx({
  sheets: [
     {
       dom: this.$refs.rowTableRef.$el,
       sheetName: this.rowData[0].hospName,
       columnWidth: [20, 15, 15, 15, 15, 15, 15, 15] // 可选，用于设置列宽度
     },
     {
       dom: this.$refs.table.$el,
       sheetName: "明细",
       raw: true,
       columnWidth: [10, 15, 12, 15, 15, 15, 15, 15] // 可选，用于设置列宽度
     }
   ],
   name: name
  });
```


[参考](https://blog.csdn.net/Jackchen9900/article/details/125747215)