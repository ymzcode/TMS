$('#uploadFileButton').click(function () {
    $('#upload').click();
});
$('#upload').click(function () {
    $('#upload').val('');
});
$('#upload').on('change', function () {
    let fileNameStr = $('#upload').val();
    console.log(fileNameStr)
    let index2 = fileNameStr.length;
    let index1 = ''
    if (fileNameStr.indexOf("/") != -1) {
        index1 = fileNameStr.lastIndexOf("/");
    } else {
        index1 = fileNameStr.lastIndexOf("\\");
    }
    if (index1 <= -1) {
        index1 = 0;
    } else {
        index1 += 1;
    }
    fileNameStr = fileNameStr.substring(index1, index2);
    if (!checkExcel(fileNameStr)) {
        alert('请上传Excel格式的文件')
        $('#upload').val('');
        return
    }
    $('#uploadFileName').html(fileNameStr);
    console.log(checkExcel(fileNameStr))
    console.log($('#upload')[0].files)
    let file = $('#upload')[0].files
    let fileData = new FormData()
    fileData.append('paramExcel', file[0])
    $.ajax({
        url: 'http://42.192.76.55:8008/excel_example/uploadExcel',
        type: 'POST',
        data: fileData,
        cache: false,
        processData: false,
        contentType: false
    }).then(res => {
        console.log('上传成功', res)
        window.open(res, '_blank')
    }).catch(err => {
        console.log('error ', err)
        alert('upload err', err)
    })
});

// 校验是否是excel文件
function checkExcel(text) {
    if (!/\.(xlsx|xls)$/.test(text)) {
        return false;
    }
    return true
}