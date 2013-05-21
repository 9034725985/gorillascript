const unfalse = true
const untrue = false

describe "consts", #
  it "work from the top scope", #
    expect(unfalse).to.be.true
    expect(untrue).to.be.false
  
  it "converts directly to constant value", #
    let make-code(debug-value)
      gorilla.compile("""
      const DEBUG = $debug-value
    
      if DEBUG
        throw Error "EVIL"
      else
        hello()
      """).code
    
    expect(make-code("false")).to.contain "hello"
    expect(make-code("false")).to.not.contain "EVIL"
    expect(make-code("true")).to.not.contain "hello"
    expect(make-code("true")).to.contain "EVIL"
  
  it "can exist in a lower scope", #
    let f()
      const MY_CONST = 5
      MY_CONST + 5
    expect(f()).to.equal 10
    expect(typeof MY_CONST).to.equal \undefined
  
  it "can shadow a higher-scoped variable", #
    let MY_VALUE = 0
    let f()
      const MY_VALUE = 5
      MY_VALUE + 5
    expect(f()).to.equal 10
    expect(MY_VALUE).to.equal 0
