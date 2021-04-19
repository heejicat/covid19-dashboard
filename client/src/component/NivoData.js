

// make sure parent container have a defined height when using responsive component,
// otherwise height will be 0 and no chart will be rendered.
// website examples showcase many properties, you'll often use just a few of them.

export function getNivoData() {

    
    const data = (async() =>  {
        var newCase = await Promise.all([
            covidData()
        ]);

        return newCase;

    })();
console.log(data);
}
