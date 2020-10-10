var indexclick = -5;
$(document).ready(function () {
  backcolor();
  if (localStorage.getItem("indexclick") != null) {
    setstart(parseInt(localStorage.getItem("indexclick")));
  }
  $(".fa-star").on("click", function () {
    indexclick = parseInt($(this).data("index"));
    localStorage.setItem("indexclick", indexclick);
  });
  $(".fa-star").mouseover(function () {
    var id = this.id;

    var data = parseInt($(this).data("index"));
    console.log(data);
    var ids = id.toString();
    console.log(ids);
    setstart(data, id);
  });

  $(".fa-star").mouseleave(function () {
    backcolor();
    if (indexclick > -1) {
      setstart(indexclick);
    }
  });
  function setstart(max, id) {
    for (var i = 0; i <= max; i++) {
      $("#" + id + ".fa-star:eq(" + i + ")").css("color", "gold");
    }
  }
  function backcolor() {
    $(".fa-star").css("color", "#333");
  }
  
});
