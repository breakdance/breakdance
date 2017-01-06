

function Sledgehammer() {
  if (typeof val === 'string') {
    var proto = Object.create(Sledgehammer.prototype);
    Sledgehammer.call(proto);
    return proto.render.apply(proto, arguments);
  }

}

Sledgehammer.prototype.compile = function() {

};

Sledgehammer.prototype.parse = function() {

};


var breakdance = new Sledgehammer()
  .use(wikipedia())
  .use(word())

  .parser(function() {

  })
  .compiler(function() {

  })

console.log(breakdance.render('<h1>Foo</h1>'))

function word(options) {
  return function(breakdance) {
    breakdance.parser(function() {

    });
    breakdance.compiler(function() {

    });
  };
}
