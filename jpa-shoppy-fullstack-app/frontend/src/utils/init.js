export function createInit(initArray, text, value){
    return initArray.reduce((acc, cur)=>{
        acc[`${cur}${text}`] = value;
        return acc;
    }, {});
}