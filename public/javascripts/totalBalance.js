window.showTotal = (props) => {
    const showTotal = props.reduce((x, y) =>  x + y);

    return showTotal;
}
/*
const data = [1, 2, 3];

let sum = 0;
window.sumFunc =(myNums) => {
    for(const [x, y] of Object.entries(myNums)) {
        sum += Number(x);
    }

    return sum;
}
    */