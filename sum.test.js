const sum =require('./sum');
test('should do basic addition', () => { 
    const result = sum(1,2)
    expect(result).toBe(3)
 })
