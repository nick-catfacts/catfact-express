/// this will filter the recipients fields if needed, which I found out I didn't


var get_view_friendly_recipients = function(res){

  var raw_recipients = res.locals.current_user.recipients;
  var processed_recipients = [];
  var subset = {}

  for (var i = 0; i < raw_recipients.length; i++) {
     subset = lodash.pick(
      raw_recipients[i],
      ['name', 'phone','interval']
    )
    processed_recipients.push(subset)
  }

  return processed_recipients;
}