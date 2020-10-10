Stripe.setPublishableKey('pk_test_iaphjbkdmvMjbhclZKUNjp1c00UIiInpOU');


var $form = $('#checkout-form');
$form.submit(function(event){

$form.find('button').prop('disabled' , true);
Stripe.card.createToken({
    number : $('#card-number').val(),
    cvc : $('#card-cvc').val(),
    exp_month : $('#card-expiry-month').val(),
    exp_year : $('#card-expiry-year').val()
}, stripeResponseHandler);
    return false ;
})

function stripeResponseHandler(status , response){
    //var $form = $('#payment-form') ;
    if(response.error){
        $('#payment-errors').text(response.error.message);
        $('#payment-errors').removeClass('d-none')
        $form.find('button').prop('disabled' ,false);

    }else{
        var token = response.id;
        $form.append($('<input type="hidden" name="stripeToken"/>').val(token));
        $form.get(0).submit();
    }
}