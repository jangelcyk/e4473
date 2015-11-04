
$.validator.setDefaults({
    submitHandler: function() {
        alert("submitted!");
    }
});

$().ready(function() {

    $(".next").click(function(){
        var form = $("#atfForm");
        form.validate({
            rules: {
                form_cust_last_name: "required",
                form_cust_first_name: "required",
                form_cust_middle_name: "required",
                form_cust_street_address: "required",
                form_cust_city: "required", 
                form_cust_county: "required",
                form_cust_state: "required",
                form_cust_zip: "required",
                form_cust_height_ft: "required",
                form_cust_height_in: "required",
                form_cust_weight: "required",
                form_cust_sex: "required",
                form_cust_state_residence: "required"
            },
            messages: {
                form_cust_middle_name: "This field is required. NMN if no middle name."
            }
        });
        if (form.valid() == true){
            if ($('#page1').is(":visible")){
                current_fs = $('#page1');
                next_fs = $('#page2');
            }
            else if ($('#page2').is(":visible")){
                current_fs = $('#page2');
                next_fs = $('#page3');
            }
            else if ($('#page3').is(":visible")){
                current_fs = $('#page3');
                next_fs = $('#page4');
            }
            else if ($('#page4').is(":visible")){
                current_fs = $('#page4');
                next_fs = $('#page5');
            }
            else if ($('#page5').is(":visible")){
                current_fs = $('#page5');
                next_fs = $('#page6');
            }
            else if ($('#page6').is(":visible")){
                current_fs = $('#page6');
                next_fs = $('#page7');
                $('#formsubmit').show();
            }
            else if ($('#page7').is(":visible")){
                current_fs = $('#page7');
                next_fs = $('#page7');
                $('#formsubmit').show();
            }

            next_fs.show(); 
            current_fs.hide();
        }
    });            


    
    $('#form_cust_zip').on('input' , function() {
        var input = $( this ) ;
        var regex = /^\d{5}$/;
        input.val( input.val().replace(/[^0-9]/g, '' ) );
        var isZip = regex.test(input.val());
        if (isZip) {
            input.removeClass("invalid numeric").addClass("valid numeric");
        }
        else {
            input.removeClass("valid numeric").addClass("invalid numeric");
        }
    });

    
});


                      
                      
                      
                      

