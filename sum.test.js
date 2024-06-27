const sum =require('./sum');
const multi =require('./multiplication');

describe('block opération arithmetique', () => {
    test('should do basic addition', () => { 
    const result = sum(1,2)
    expect(result).toBe(3)
 })
 test('should do basic multiplication', () => { 
    const result = sum(2,2)
    expect(result).toBe(4)
 })
})
