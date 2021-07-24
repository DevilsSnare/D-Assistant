let recordButton=document.getElementById('newRecording');
recordButton.addEventListener('click', record);

function record() {
    console.log('session started!');
    alert('Click Okay and Start Speaking. D Assistant if all ears.');
    document.getElementById('playground').innerHTML='<img src="/static/processing.gif" width="20%">';

    $.ajax({
        type: 'POST',
        url: '/record',
        success: function(result) {
            alert('DONE!');
            document.getElementById('playground').innerHTML='';
            document.getElementById('displayText').innerHTML='<div class="row align-items-md-stretch"><div class="col-md"><div class="h-100 p-5 bg-light border rounded-3"><h2>Notes:</h2><p>'+result.text+'</p><button class="btn btn-outline-secondary" type="button"  onClick="window.location.href=window.location.href">New Session</button></div></div><div class="col-md-auto"><div class="h-100 p-5 text-white bg-dark rounded-3"><h2>Patients Information:</h2><p>Name: '+result.name+'</p><p>Age: '+result.age+'</p><p>Medicine: '+result.medicine+'</p><p>Date: '+result.date+'</p><button class="btn btn-outline-light" type="button" id="generate">Generate Prescription</button></div></div></div>';
            console.log(result);
            let gen=document.getElementById('generate');
            gen.addEventListener(('click'), genPres);
            function genPres() {
                if(result.name=='unknown') {
                    alert('ERROR!')
                }
                else {
                    const doc = new jsPDF();
                    let img='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaUAAACZCAMAAAC4w9X+AAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAkxQTFRFAAAAsbGxampqNDQ0ExMTBwcHCAgIGhoaQUFBfHx8ycnJlJSUISEhAAAAQEBAt7e32traQkJCbGxsxsbGFhYWSEhITk5OfX19k5OT0tLSICAgY2NjsLCwAgICaGhor6+vMzMze3t7ERERW1tbBQUFT09P8fHx////7e3t4uLi19fXzMzMwMDArKyslZWVfn5+Z2dnLy8vy8vLmpqaMjIy8vLyaWlpJiYm29vbhISELCwseHh4Dg4O7u7u8PDwysrKJSUl9vb2a2trra2tFxcX4+PjKysr5ubm4ODgAQEBVlZWKSkpc3NzmZmZwcHB6enpd3d3Hh4ezc3N+/v7VVVV1dXVU1NT0dHRYWFh9/f3CwsL3t7ehoaGDw8Pw8PD9PT0oKCgNzc3cHBwYGBgkJCQ39/fz8/PUFBQgICAGRkZlpaWv7+/n5+fj4+PMDAwf39/EBAQPz8/WVlZNjY2b29vtLS0Hx8fX19fTU1N+vr6jIyMRUVF7+/vvb294eHh/v7+ZGRkzs7OiYmJsrKypKSkoaGhpaWls7OzkZGRurq6iIiIxMTE3d3dDQ0NKioqNTU1HR0dBAQEp6en7OzsEhISnJyc6Ojo5OTkoqKiXl5ecnJyFRUV09PT1tbWV1dXMTExHBwcJCQk6urqtra2ZWVl9fX1FBQUdHR05+fnLS0tvr6+ubm5bm5uXFxch4eH8/PzgoKCGxsbqampmJiYhYWFVFRUIiIitbW1i4uLUlJSOzs7Wlpaenp6ZmZmPDw81NTUOjo6GBgYODg4CgoKeMH46wAAAMR0Uk5TAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7q8BSsAAA87SURBVHic7Z2Ju+w0GYcLIiCasl4u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';
                    doc.addImage(img, 'PNG', 15, 40, 50, 50);
                    doc.text(result.text, 10, 10);
                    doc.save("d-assistant-"+result.name);
                }
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
}
