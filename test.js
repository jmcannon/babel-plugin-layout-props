const babel = require('@babel/core');
const layoutPropsPlugin = require('./lib/index.js');

function transform(code) {
    return babel.transform(code, {
        plugins: ["@babel/plugin-syntax-jsx", layoutPropsPlugin],
        retainLines: true,
    }).code;
}

test('No Attributes - Closing Tag', () => {
    const code = transform('<div></div>;');
    const expected = '<div></div>;';

    expect(code).toBe(expected);
})

test('No Attributes - Single Tag', () => {
    const code = transform('<div />;');
    const expected = '<div />;';

    expect(code).toBe(expected);
})

test('One Non-layout Attribute', () => {
    const code = transform('<div open="true" />;');
    const expected = '<div open="true" />;';

    expect(code).toBe(expected);
})

test('Many Non-layout Attributes', () => {
    const code = transform('<div open="true" disabled variant="outlined" />;');
    const expected = '<div open="true" disabled variant="outlined" />;';

    expect(code).toBe(expected);
})

test('One Layout Attribute', () => {
    const code = transform('<div display="flex" />;');
    const expected = '<div style={{ display: "flex" }} />;';

    expect(code).toBe(expected);
})

test('Two Layout Attributes', () => {
    const code = transform('<div display="flex" flexDirection="row" />;');
    const expected = '<div style={{ display: "flex", flexDirection: "row" }} />;';

    expect(code).toBe(expected);
})

test('Many Layout Attributes', () => {
    const code = transform('<div display="flex" flexDirection="row" alignItems="center" position="absolute" justifyContent="center"  />;');
    const expected = '<div style={{ display: "flex", flexDirection: "row", alignItems: "center", position: "absolute", justifyContent: "center" }} />;';

    expect(code).toBe(expected);
})

test('One Layout Attribute - One Non-layout Attribute', () => {
    const code = transform('<div display="flex" variant="outlined" />;');
    const expected = '<div style={{ display: "flex" }} variant="outlined" />;';

    expect(code).toBe(expected);
})

test('One Layout Attribute - Many Non-layout Attribute', () => {
    const code = transform('<div display="flex" variant="outlined" open="true" name="test" />;');
    const expected = '<div style={{ display: "flex" }} variant="outlined" open="true" name="test" />;';

    expect(code).toBe(expected);
})

test('Existing Inline Styles', () => {
    const code = transform('<div display="flex" style={{ color: "#fff", textAlign: "left" }} />;');
    const expected = '<div style={{ color: "#fff", textAlign: "left", display: "flex" }} />;';

    expect(code).toBe(expected);
})

test('Existing Inline Styles With Many Attributes', () => {
    const code = transform('<div display="flex" style={{ color: "#fff", textAlign: "left" }} alignItems="center" open="true" disabled position="absolute" />;');
    const expected = '<div style={{ color: "#fff", textAlign: "left", display: "flex", alignItems: "center", position: "absolute" }} open="true" disabled />;';

    expect(code).toBe(expected);
})

test('Computed Value', () => {
    const code = transform('<div marginLeft={2} />;');
    const expected = '<div style={{ marginLeft: 2 }} />;';

    expect(code).toBe(expected);
})

test('Inserted Variable', () => {
    const code = transform('<div marginLeft={theMargin} />;');
    const expected = '<div style={{ marginLeft: theMargin }} />;';

    expect(code).toBe(expected);
})

test('Variable in Existing Inline Styles', () => {
    const code = transform('<div marginLeft={2} style={{ marginRight: 2, flexDirection: direction }} />;');
    const expected = '<div style={{ marginRight: 2, flexDirection: direction, marginLeft: 2 }} />;';

    expect(code).toBe(expected);
})

test('Spread Operator', () => {
    const code = transform('<div {...props} />;');
    const expected = '<div {...props} />;';

    expect(code).toBe(expected);
})

test('Spread Operator in Inline Styles', () => {
    const code = transform('<div style={{ marginLeft: 2, ...style }} display="flex" />;');
    const expected = '<div style={{ marginLeft: 2, ...style, display: "flex" }} />;';

    expect(code).toBe(expected);
})