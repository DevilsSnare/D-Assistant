let recordButton=document.getElementById('newRecording');
recordButton.addEventListener('click', record);

function record() {
    console.log('session started!')
    document.getElementById('playground').innerHTML='<img src="/static/processing.gif" width="20%">';

    $.ajax({
        type: 'POST',
        url: '/record',
        success: function(result) {
            document.getElementById('playground').innerHTML='';
            document.getElementById('displayText').innerHTML='<div class="col-sm-12"><div class="h-100 p-5 text-white bg-dark rounded-3"><h2>Speech to Text:</h2><p>'+result.text+'</p><p>Name: '+result.name+'</p><p>Age: '+result.age+'</p><p>Medicine: '+result.medicine+'</p><p>Date: '+result.date+'</p><button class="btn btn-outline-light" type="button">Generate Prescription</button></div></div>';
            console.log(result);
        },
        error: function(err) {
            console.log(err);
        },
    });
}