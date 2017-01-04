assemble.on('preInit', function(app) {
  app.onLoad(/foo\.md$/, function(file, next) {
    file.options = extend({eval: true}, file.options);
    next();
  });
});
