//data below
var data = [
    {country: "Albania", family: 97.5, friends: 36.2,leisure: 18.0,politics:5.4,work:80.5,religion:24.4},
    {country: "Andorra", family: 89.5, friends: 54.9,leisure:62.9,politics:7.8,work:56.9,religion:9.5},
    {country: "Austria", family: 82.3, friends: 60.1,leisure:47.7,politics:11.4,work:49.7,religion:13.9},
    {country: "Bolivia", family: 80.9, friends: 20.9,leisure:44.9,politics:14.9,work:76.9,religion:58.4},
    {country: "Brazil", family: 85.3, friends: 38.7,leisure:35.5,politics:16.5,work:61.1,religion:45.1},
    {country: "Myanmar", family: 86.6, friends: 11.8,leisure:22.3,politics:30.5,work:77.1,religion:81.0},
    {country: "Canada", family: 79.3, friends: 48.7,leisure:51.2,politics:12.2,work:30.7,religion:15.5},
    {country: "China", family: 86.2, friends: 34.5,leisure:20.6,politics:15.1,work:44.5,religion:3.3},
    {country: "Croatia", family: 81.8, friends: 40.3,leisure:32.0,politics:3.5,work:47.0,religion:20.6},
    {country: "Denmark", family: 87.6, friends: 53.7,leisure:43.5,politics:8.2,work:37.3,religion:5.7},
    {country: "Finland", family: 83.4, friends: 55.5,leisure:58.5,politics:6.3,work:50.9,religion:11.0},
    {country: "France", family: 85.4, friends: 51.5,leisure:34.2,politics:9.2,work:60.8,religion:14.3},
    {country: "Germany", family: 87.6, friends: 51.3,leisure:38.7,politics:13.7,work:46.6,religion:13.2},
    {country: "Iraq", family: 97.2, friends: 53.7,leisure:39.4,politics:17.6,work:80.6,religion:87.6},
    {country: "USA", family: 91.0, friends: 50.7,leisure:39.5,politics:14.9,work:39.4,religion:37.1},

];

//set up color scheme
const color = ["#CC99C9", "#9EC1CF", "#9EE09E", "#FDFD97", "#FEB144", "#FF6663"];

//set up svg

const width = window.innerWidth*(3/4);
const height = window.innerHeight/4;

const svg= d3.select("#stackedBarChart")
    .append("svg")
    .attr("width", width)
    .attr("height",height);

//set up stack
const stack = d3.stack()
    .keys(Object.keys(data[0]).slice(1))
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone);

const series = stack(data);

//set up axes
const x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([20,width-20])
    .padding(0.1);

const y = d3.scaleLinear()
    .domain([0,400])
    .range([height-20,10]);

//tooltip!

const tooltip = d3.select("#stackedBarChart")
    .append("div")
    .style("opacity",0)
    .attr("class","tooltip")
    .attr("pointer-events","none");

const mouseover = function(event,d){
    const category = d3.select(this.parentNode).datum().key;
    const value = d.data[category];
    console.log(d3.pointer(event));
    tooltip
        .html("<strong>"+ category +"</strong>"+ "<br>" + "<strong>"+ value +"</strong>")
        .style("opacity",1.5)
        .style("z-index",99)
        .style("background-color","lightgrey")
        .style("position","absolute")
        .style("left",(d3.pointer(event)[0]-20)+"px")
        .style("top",(d3.pointer(event)[1])+"px")
        .style("width","120px")
        .style("height","50px")
        .style("padding","2px")
        .style("text-align", "center")
        .style("font", "15px san-serif" )
        .style("border-radius", "8px")
        .style("border", "1px")
        .style("color", "black")
        .on("mouseleave",mouseleave);
    svg.node()
}

const mouseleave = function(event, d) {
  tooltip.style("opacity",0);
  svg.node()
}

//draw it!
svg.append("g")
    .selectAll("g")
    .data(series)
    .enter()
    .append("g")
    .attr("fill", function(d,i){return color[i];})
    .selectAll("rect")
    .data(function(d) {return d;})
    .enter()
    .append("rect")
    .attr("x", function(d,i) { return x(i);})
    .attr("y", function(d) { return y(d[1]); })
    .attr("height", function(d) { return y(d[0])-y(d[1]); })
    .attr("width", x.bandwidth())
    .on("mouseover",mouseover)
    

//add labels!
labelheight=height-20
svg.append("g")
    .attr("transform", "translate(0,"+labelheight+")")
    .call(d3.axisBottom(x).tickFormat(i=>data[i].country));
svg.append("g")
    .attr("transform", "translate(30, 0)")
    .call(d3.axisLeft(y))