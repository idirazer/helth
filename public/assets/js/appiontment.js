$(document).ready(function () {
        /////////////////// Thursdaaaaaaaaaaaaaaaaaaaaaay/////////////////

        $("#thur").click(function () {
                console.log("hellow")
                console.log($("input[name=thus]").prop("checked"))
                if (($("input[name=thus]").prop("checked")) == true) {

                        $("#thusday2").css("display", "block");
                        $("#thusday3").css("display", "block");


                        $("input[name=thus]").attr('checked', false);
                } else {
                        $("#thusday2").css("display", "none");
                        $("#thusday3").css("display", "none");
                        $("input[name=thus]").attr('checked', true);
                }

        });


        $("#btn2").click(function () {
                var listContainer = $('#list');
                event.preventDefault(); // stop default behaviour of submit button 
                //to add class 
                // listContainer.addClass("myborder");
                inputValue1 = $('#input1').val();
                inputValue2 = $('#input2').val();
                inputValue3 = inputValue1 + " " + "To" + " " + inputValue2

                // add new list item
                listContainer.prepend(

                        `<div class="list2" style="margin-left: 10px;"  >
   <label for="appt-time"><h5>From </h5> </label>
   <input input input input type = "hidden"
   name = "thursday_input"
   value = "` + inputValue3 + `" >
           <input  style="margin-left: 20px;"  type="time" value="` + inputValue1 + `"
            name=""></input>
            <label for="appt-time">
												<h5 style="margin-left: 10px;">To</h5>
           </label>
           <input  style="margin-left: 20px;"  type="time"
		value = "` + inputValue2 + `"
		name = "" >
											<label for="appt-time">
												<a style=" font-size: 20px;margin-left:10px ;color: #2066ff; font-weight: 900;">
													<button id="slashh"  type="button" class="btn  btn-icon btn-danger"><i class="feather icon-slash"></i></button></a>

           </label>
           </div> `);

                // clear value input
                $('#input1').val('');
                $('#input2').val('');

        });

        $(document).on('click', "#slashh", function () {
                //Your code
                $(this).closest(".list2").remove();
        });
        ///////////////////enddddddddddddddddddddddddddddd//////////////////

        /////////////////// wedensdaaaaaaaaaaaaaaaaaaaaaay/////////////////

        $("#wedn").click(function () {
                if (($("input[name=wedn]").prop("checked")) == true) {
                        $("#wedensday2").css("display", "block");
                        $("#wedensday1").css("display", "block");


                        $("input[name=wedn]").attr('checked', false);
                } else {
                        $("#wedensday2").css("display", "none");
                        $("#wedensday1").css("display", "none");
                        $("input[name=wedn]").attr('checked', true);
                }
        });



        $("#btn_wedn").click(function () {
                var listContainer = $('#list_wed');
                event.preventDefault(); // stop default behaviour of submit button 
                //to add class 
                // listContainer.addClass("myborder");
                inputValue1 = $('#input_wed1').val();
                inputValue2 = $('#input_wed2').val();
                inputValue3 = inputValue1 + " " + "To" + " " + inputValue2
                console.log(inputValue1)
                // add new list item
                listContainer.prepend(

                        `<div class="list2_wed" style="margin-left: 10px;"  >
   <label for="appt-time"><h5>From </h5> </label>
   <input input input type = "hidden"
   name = "wedensday_input"
   value = "` + inputValue3 + `" >
           <input  style="margin-left: 20px;"  type="time" value="` + inputValue1 + `"
            name="appt-time"></input>
            <label for="appt-time">
												<h5 style="margin-left: 10px;">To</h5>
           </label>
           <input  style="margin-left: 20px;"  type="time"
		value = "` + inputValue2 + `"
		name = "appt-time" >
											<label for="appt-time">
												<a style=" font-size: 20px;margin-left:10px ;color: #2066ff; font-weight: 900;">
													<button id="delete_wedn"  type="button" class="btn  btn-icon btn-danger"><i class="feather icon-slash"></i></button></a>

           </label>
           </div> `);

                // clear value input
                $('#input1').val('');
                $('#input2').val('');

        });
        $(document).on('click', "#delete_wedn", function () {
                //Your code
                $(this).closest(".list2_wed").remove();
        });
        //////////////////endddddddddddddddddddd//////////////////////////////

        //////////////////Tuesdaaaaaaaaaaaaaaayy/////////////////////////////

        $("#Tue").click(function () {
                if (($("input[name=Tue]").prop("checked")) == true) {
                        $("#Tuesday2").css("display", "block");
                        $("#Tuesday1").css("display", "block");


                        $("input[name=Tue]").attr('checked', false);
                } else {
                        $("#Tuesday2").css("display", "none");
                        $("#Tuesday1").css("display", "none");
                        $("input[name=Tue]").attr('checked', true);
                }
        });


        $("#btn_Tuesday").click(function () {
                var listContainer = $('#list_Tuesday');
                event.preventDefault(); // stop default behaviour of submit button 
                //to add class 

                inputValue1 = $('#input_Tuesday1').val();
                inputValue2 = $('#input_Tuesday2').val();
                inputValue3 = inputValue1 + " " + "To" + " " + inputValue2
                console.log(inputValue3)
                // add new list item
                listContainer.prepend(
                        `<div class="list_Tuesday" style="margin-left: 10px;"  >
           <label for="appt-time"><h5>From </h5> </label>
           <input type = "hidden"
           name = "tuesday_input"
           value = "` + inputValue3 + `"> 

           <input  style="margin-left: 20px;"  type="time" value="` + inputValue1 + `"
            >
            <label for="appt-time">
												<h5 style="margin-left: 10px;">To</h5>
           </label>
           <input  style="margin-left: 20px;"  type="time"
		value = "` + inputValue2 + `"
		name = "" >
											<label for="appt-time">
												<a style=" font-size: 20px;margin-left:10px ;color: #2066ff; font-weight: 900;">
													<button id="delete_Tuesday"  type="button" class="btn  btn-icon btn-danger"><i class="feather icon-slash"></i></button></a>

           </label>
           </div> `);

                // clear value input
                $('#input_Tuesday1').val('');
                $('#input_Tuesday2').val('');

        });

        $(document).on('click', "#delete_Tuesday", function () {
                //Your code
                $(this).closest(".list_Tuesday").remove();
        });
        //////////////////endddddddddddddddddddd//////////////////////////////

        //////////////////monddaaaaaaaaaaaaaaayy/////////////////////////////
        $("#Mond").click(function () {
                if (($("input[name=Mond]").prop("checked")) == true) {

                        $("#Monday2").css("display", "block");
                        $("#Monday1").css("display", "block");


                        $("input[name=Mond]").attr('checked', false);
                } else {
                        $("#Monday2").css("display", "none");
                        $("#Monday1").css("display", "none");
                        $("input[name=Mond]").attr('checked', true);
                }

        });


        $("#btn_Monday").click(function () {
                var listContainer = $('#list_Monday');
                event.preventDefault(); // stop default behaviour of submit button 
                //to add class 
                // listContainer.addClass("myborder");
                inputValue1 = $('#input_Monday1').val();
                inputValue2 = $('#input_Monday2').val();
                inputValue3 = inputValue1 + " " + "To" + " " + inputValue2
                // add new list item
                listContainer.prepend(

                        `<div class="list_Monday" style="margin-left: 10px;"  >
   <label for="appt-time"><h5>From </h5> </label>
   <input input type = "hidden"
   name = "monday_input"
   value = "` + inputValue3 + `" >
           <input  style="margin-left: 20px;"  type="time" value="` + inputValue1 + `"
            name=""></input>
            <label for="appt-time">
												<h5 style="margin-left: 10px;">To</h5>
           </label>
           <input  style="margin-left: 20px;"  type="time"
		value = "` + inputValue2 + `"
		name = "" >
											<label for="appt-time">
												<a style=" font-size: 20px;margin-left:10px ;color: #2066ff; font-weight: 900;">
													<button id="delete_monday"  type="button" class="btn  btn-icon btn-danger"><i class="feather icon-slash"></i></button></a>

           </label>
           </div> `);

                // clear value input
                $('#input_Monday1').val('');
                $('#input_Monday2').val('');

        });

        $(document).on('click', "#delete_monday", function () {
                //Your code
                $(this).closest(".list_Monday").remove();
        });
        //////////////////endddddddddddddddddddd//////////////////////////////


        //////////////////sunddaaaaaaaaaaaaaaayy/////////////////////////////
        $("#Sund").click(function () {
                if (($("input[name=Sund]").prop("checked")) == true) {

                        $("#Sunday2").css("display", "block");
                        $("#Sunday1").css("display", "block");


                        $("input[name=Sund]").attr('checked', false);
                } else {
                        $("#Sunday2").css("display", "none");
                        $("#Sunday1").css("display", "none");
                        $("input[name=Sund]").attr('checked', true);
                }

        });


        $("#btn_Sunday").click(function () {
                var listContainer = $('#list_Sunday');
                event.preventDefault(); // stop default behaviour of submit button 
                //to add class 
                // listContainer.addClass("myborder");
                inputValue1 = $('#input_Sunday1').val();
                inputValue2 = $('#input_Sunday2').val();
                inputValue3 = inputValue1 + " " + "To" + " " + inputValue2;
                // add new list item
                listContainer.prepend(

                        `<div class="list_Sunday" style="margin-left: 10px;"  >
   <label for="appt-time"><h5>From </h5> </label>
   <input type = "hidden"
   name = "sunday_input"
   value = "` + inputValue3 + `" >
           <input  style="margin-left: 20px;"  type="time" value="` + inputValue1 + `"
            name=""></input>
            <label for="appt-time">
												<h5 style="margin-left: 10px;">To</h5>
           </label>
           <input  style="margin-left: 20px;"  type="time"
		value = "` + inputValue2 + `"
		name = "" >
											<label for="appt-time">
												<a style=" font-size: 20px;margin-left:10px ;color: #2066ff; font-weight: 900;">
													<button id="delete_Sunday"  type="button" class="btn  btn-icon btn-danger"><i class="feather icon-slash"></i></button></a>

           </label>
           </div> `);

                // clear value input
                $('#input_Sunday1').val('');
                $('#input_Sunday2').val('');

        });

        $(document).on('click', "#delete_Sunday", function () {
                //Your code
                $(this).closest(".list_Sunday").remove();
        });
        //////////////////endddddddddddddddddddd//////////////////////////////

        //////////////////Fridaaaaaaaaaaaaaaayy/////////////////////////////
        $("#Frid").click(function () {
                if (($("input[name=Frid]").prop("checked")) == true) {

                        $("#Friday2").css("display", "block");
                        $("#Friday1").css("display", "block");


                        $("input[name=Frid]").attr('checked', false);
                } else {
                        $("#Friday2").css("display", "none");
                        $("#Friday1").css("display", "none");
                        $("input[name=Frid]").attr('checked', true);
                }

        });


        $("#btn_Friday").click(function () {
                var listContainer = $('#list_Friday');
                event.preventDefault(); // stop default behaviour of submit button 
                //to add class 
                // listContainer.addClass("myborder");
                inputValue1 = $('#input_Friday1').val();
                inputValue2 = $('#input_Friday2').val();
                inputValue3 = inputValue1 + " " + "To" + " " + inputValue2;
                // add new list item
                listContainer.prepend(

                        `<div class="list_Friday" style="margin-left: 10px;"  >
   <label for="appt-time"><h5>From </h5> </label>
    <input input input input input type = "hidden"
    name = "friday_input"
    value = "` + inputValue3 + `" >
           <input  style="margin-left: 20px;"  type="time" value="` + inputValue1 + `"
            name=""></input>
            <label for="appt-time">
												<h5 style="margin-left: 10px;">To</h5>
           </label>
           <input  style="margin-left: 20px;"  type="time"
		value = "` + inputValue2 + `"
		name = "" >
											<label for="appt-time">
												<a style=" font-size: 20px;margin-left:10px ;color: #2066ff; font-weight: 900;">
													<button id="delete_Friday"  type="button" class="btn  btn-icon btn-danger"><i class="feather icon-slash"></i></button></a>

           </label>
           </div> `);

                // clear value input
                $('#input_Friday1').val('');
                $('#input_Friday2').val('');

        });

        $(document).on('click', "#delete_Friday", function () {
                //Your code
                $(this).closest(".list_Friday").remove();
        });
        //////////////////endddddddddddddddddddd//////////////////////////////
































});