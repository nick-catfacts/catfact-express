// set these objects to be available to all views
// note: The stormpath object is already been populated on the req object
router.use( function(req, res, next){
  res.locals.deCamelCaser = function(string){
    var result = string.replace( /([A-Z])/g, " $1" );
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
  next();
});
