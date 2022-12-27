const xl = require('excel4node');

const headerColumns = ['Trademark Name', 'Serial Number', 'Registration Number', 'Status', 'International Class', 'Primary Email Address', 'Correspondent'];

module.exports = {
    createExceleFile: function(data){
        const workbook = new xl.Workbook();
        const worksheet = workbook.addWorksheet('result');

        let colIndex = 1;
        headerColumns.forEach((item) => {
            worksheet.cell(1, colIndex++).string(item)
        });
        let rowIndex = 2;
        data.forEach((item) => {
            let columnIndex = 1;
                Object.keys(item).forEach((colName) => {
                    if(colName != 'Correspondent'){
                        worksheet.cell(rowIndex, columnIndex++).string(item[colName])
                    }
                    else{
                        item.Correspondent.map((i, index) =>{
                            worksheet.cell(rowIndex, columnIndex+index).string(item.Correspondent[index])
                        })
                    }
                })
                rowIndex++;
        });
        workbook.write("result.xlsx");
    }
}
