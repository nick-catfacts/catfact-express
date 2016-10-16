$(function() {


  $('.buy_messages').click(function(event){
    event.form.submit()
    $('#myModal').modal('hide');

  })

  $('#myModal').on('show.bs.modal', function (e) {

      // get the button and modal element
      var $button = $(e.relatedTarget);
      var $modal = $(this)

      var amount = $button.data('amount-cents');
      var messages = $button.data('messages');
      $modal.find('#charge-input').attr( 'value', amount)

      // Add form text
      amount = parseInt(amount) / 100;
      $modal.find('.modal-body').text("Please confirm a charge of $" + amount + " to buy " + messages + " messages.");
  });

  $('#myModal').on('hide.bs.modal', function (e) {
    // remove hidden from element on modal close
    var $modal = $(this)
    $modal.find('#charge-input').remove()
  });

  var $form = $('#payment-form');
  $form.submit(function(event) {
    // Disable the submit button to prevent repeated clicks:
    $form.find('.submit').prop('disabled', true);

    // Request a token from Stripe:
    Stripe.card.createToken($form, stripeResponseHandler);

    // Prevent the form from being submitted:
    return false;
  });

  function stripeResponseHandler(status, response) {
  // Grab the form:
    var $form = $('#payment-form');

    if (response.error) { // Problem!

      // Show the errors on the form:
      $form.find('.payment-errors').text(response.error.message);
      $form.find('.submit').prop('disabled', false); // Re-enable submission

    } else { // Token was created!

      // Get the token ID:
      var token = response.id;

      // Insert the token ID into the form so it gets submitted to the server:
      $form.append($('<input type="hidden" name="stripeToken">').val(token));

      // Submit the form:
      $form.get(0).submit();
    }
  };

});