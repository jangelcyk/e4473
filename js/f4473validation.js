
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
//                form_cust_place_of_birth: "required",
//                form_cust_state_of_birth: "required",
//                form_cust_foreign_country: "required",
                form_cust_height_ft: "required",
                form_cust_height_in: "required",
                form_cust_weight: "required",
                form_cust_sex: "required",
                birthdate: "required",
//                form_cust_ssn: "requrired",
//                form_cust_upin: "required", 
                form_cust_ethnicity: "required",
                form_cust_race: "required",
                form_cust_question_11a: "required",
                form_cust_question_11b: "required",
                form_cust_question_11c: "required",
                form_cust_question_11d: "required",
                form_cust_question_11e: "required",
                form_cust_question_11f: "required",
                form_cust_question_11g: "required",
                form_cust_question_11h: "required",
                form_cust_question_11i: "required",
                form_cust_question_11j: "required",
                form_cust_question_11k: "required",
                form_cust_question_11l: "required",
                form_cust_question_12: "required",
//                form_cust_state_residence: "required",
                form_cust_citizenship: "required",
                form_cust_alien_num: "required",
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
            input.removeClass("invalid").addClass("valid");
        }
        else {
            input.removeClass("valid").addClass("invalid");
        }
    });
    
    $('#form_cust_citizenship_us').change( function() {
        if ($(this).is(":checked")) {
            $('#form_cust_alien_num').val('');
            $('#question15').hide();
        }
        else {
            $('#question15').show();
        }
        
    });

    $('#form_cust_citizenship_other').change( function() {
        if ($(this).is(":checked")) {
            $('#question14b').show();
        }
        else {
            $('#question14b').hide();
            $('#form_cust_citizenship_other_desc').val('');

        }
    });
    
    
});


                      
                      
                      
                      

