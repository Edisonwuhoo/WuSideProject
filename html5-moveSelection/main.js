const legalVideoFormats = [
    "mp4","flv","avi","mov","mkv","mpeg","3gp","wmv","swf"
  ];
  
  window.URL = window.URL || window.webkitURL;
  
  
  //initial
  $(function(){
    $("#inputFile").on("change",function(e){
      $("table").empty();
      $("table").append("<tr><th>檢查項目</th><th>需求規格</th><th>檢查結果</th><th>是否通過</th></tr>");
      // debugger;
      processFile(e.target.files);
    });
    $("#dropbox").on("dragenter", dragenter);
    $("#dropbox").on("dragleave", dragleave);
    $("#dropbox").on("dragover", dragover);
    $("#dropbox").on("drop", drop);
  });
  
  function dragenter(){
    $("#dropbox").css("border","3px dashed black");
    $("#dropbox").text("放入檔案,開始檢測");
  }
  
  function dragleave() {
    $("#dropbox").css("border", "3px solid black");
    $("#dropbox").text("將檔案拖曳至此或點擊按鈕");
  }
  
  function dragover(e){
    e.preventDefault();
  }
  
  function drop(e){
    e.preventDefault();
    let files = e.originalEvent.dataTransfer.files;
    if(files.length == 0){
      return false;
    }
    // convert(files[0]);
    $("table").empty();
    $("table").append("<tr><th>檢查項目</th><th>需求規格</th><th>檢查結果</th><th>是否通過</th></tr>");
    // debugger;
    processFile(files);
    dragleave();
  }
   
  function processFile(files){
    let thisVideo = files[0];
    $("table").append($(`<tr><td colspan="4">影片名稱 : ${thisVideo.name}</td></tr>`).css("background-color","yellow"));
    $("table").append(`<tr><td>影片長度</td><td>須介於60~90秒</td><td id="thisDuration"></td><td id="thisDurationResult"></td></tr>`);
    $("table").append(`<tr><td>影片格式</td><td>mp4,flv,avi,mov,mkv,mpeg,3gp,wmv,swf</td><td id="thisFormat">${thisVideo.type}</td><td id="thisFormatResult"></td></tr>`);
    var thisFileType = thisVideo.type.split("/");
    console.log(thisFileType);
    console.log(thisFileType[0]);
    console.log(thisFileType[1]);
    if(thisFileType[0]=='video'){
      if(legalVideoFormats.indexOf(thisFileType[1])!=-1){
        $("#thisFormatResult").text("O").css("color", "green");
      }else{
        $("#thisFormatResult").text("X").css("color", "red");
      }
    }else{
      $("#thisFormatResult").text("非影片格式").css("color","red");
    }
  
    $("table").append(`<tr><td>解析度</td><td>720p(1280*720)以上</td><td id="thisResolution"></td><td id="thisResolutionResult"></td></tr>`);
  
    let videoElement = document.createElement('video');
    videoElement.preload = 'metadata';
  
    videoElement.onloadedmetadata = function(){
      thisVideo.duration = videoElement.duration;

      console.log(thisVideo.duration)

      thisVideo.videoWidth = videoElement.videoWidth;
      thisVideo.videoHeight = videoElement.videoHeight;
      $("#thisDuration").text(thisVideo.duration);
      $("#thisResolution").text(thisVideo.videoWidth+"*"+thisVideo.videoHeight);
      if(thisVideo.duration>=60 && thisVideo.duration<91){
        $("#thisDurationResult").text("O").css("color", "green");
      }else{
        $("#thisDurationResult").text("X").css("color", "red");
      }
  
      if(thisVideo.videoWidth>=1280 && thisVideo.videoHeight>=720){
        $("#thisResolutionResult").text("O").css("color", "green");
      }else{
        $("#thisResolutionResult").text("X").css("color", "red");
      }
    };
  
    videoElement.src = URL.createObjectURL(thisVideo);
  
  }