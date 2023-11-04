<script>
    import {onMount} from 'svelte';
    onMount(() => {
        console.log(window.innerWidth)
    })

    let svg, main, obstacle, overlay, scoreOverlay, startOverlay;
    let width = 1000,
        height = 350;
    let mw = 50,
        mh = 50;
    let isJump = false;
    let ground;
    let score = 0;
    let isPlay = false;
    let speed = 1000;
    let intervals = [];
    let mainUp, mainDown, obstacleSide;
    let button;
    let lose = false;

    import * as d3 from "d3";

    function jump() {
        if (!isPlay) {
            if (lose) {
                obstacleSide.attr("x", width);
            }
            isPlay = true;
            score = 0;
            play();
        } else if (isPlay) {
            if (!isJump) {
                mainUp = d3.select(main);
                mainUp
                    .transition()
                    .duration(300)
                    .ease(d3.easeCubicOut)
                    .attr("y", height / 3 - mh / 2);
                mainDown = d3.select(main);
                mainDown
                    .transition()
                    .delay(300)
                    .duration(300)
                    .ease(d3.easeCubicIn)
                    .attr("y", (height / 3) * 2 - mh / 2);
                isJump = true;
                setTimeout(() => {
                    isJump = false;
                }, 1000);
            }
        }
    }

    function repeat(e, s) {
        obstacleSide = d3.select(e);
        obstacleSide.attr("x", width);
        obstacleSide
            .transition()
            .duration(s)
            .ease(d3.easeLinear)
            .attr("x", -mw);
        d3.select(e)
            .transition()
            .delay(s)
            .duration(0)
            .ease(d3.easeLinear)
            .attr("x", width);
    }

    function checkCollision() {
        let obj = d3.select(main);
        let x1 = parseFloat(obj.attr("x"));
        let y1 = parseFloat(obj.attr("y"));
        let x2 = x1 + mw;
        let y2 = y1 + mh;

        let obs = d3.select(obstacle);
        let xo1 = parseFloat(obs.attr("x"));
        let yo1 = parseFloat(obs.attr("y"));
        let xo2 = x1 + mw / 2;
        let yo2 = y1 + mh;

        if (xo1 <= x2 && xo1 >= x1 && yo1 <= y2 && yo1 >= y1) {
            obs.style("fill", "coral");
            obstacleSide.interrupt();
            intervals.forEach((d) => clearInterval(d));
            d3.select(overlay).attr("opacity", 0.5);
            d3.select(scoreOverlay).attr("opacity", 1);
            isPlay = false;
            lose = true;
        } else {
            obs.style("fill", "cornflowerblue");
        }
    }

    onMount(() => {
        window.addEventListener('keydown', (event) => {
            // Check if the key pressed is the spacebar (key code 32)
            if (event.keyCode === 32) {
                // Call the jump function
                jump();
            }
        });
    }) 


    function play() {
        d3.select(startOverlay).transition().duration(250).style("opacity", 1);
        d3.select(startOverlay)
            .transition()
            .delay(10)
            .duration(250)
            .style("opacity", 0);
        d3.select(overlay).attr("opacity", 0);
        d3.select(scoreOverlay).attr("opacity", 0);
        intervals.push(
            setInterval(() => {
                repeat(obstacle, speed + 10);
            }, speed)
        );
        intervals.push(
            setInterval(() => {
                checkCollision();
            }, 1)
        );
        intervals.push(
            setInterval(() => {
                score++;
            }, 100)
        );
    }
</script>

<svg bind:this={svg} {width} {height}>
    <rect
        bind:this={main}
        x={width / 2 - mw / 2}
        y={(height / 3) * 2 - mh / 2}
        width={mw}
        height={mh}
    />
    <rect
        bind:this={obstacle}
        x={width}
        y={(height / 3) * 2 - mh / 2}
        width={mw / 2}
        height={mh}
        fill="cornflowerblue"
    />
    <line
        bind:this={ground}
        x1="0"
        x2={width}
        y1={(height / 3) * 2 + mh / 2}
        y2={(height / 3) * 2 + mh / 2}
        stroke="black"
        stroke-width="3"
    />
    <text x="20" y="20" font-family="monospace"
        >Score: {score.toString().length == 1
            ? "00000" + score
            : score.toString().length == 2
            ? "0000" + score
            : score.toString().length == 3
            ? "000" + score
            : score.toString().length == 4
            ? "00" + score
            : score.toString().length == 5
            ? "0" + score
            : score}</text
    >
    <rect bind:this={overlay} x="0" y="0" {width} {height} opacity={0} />
    <text
        bind:this={scoreOverlay}
        opacity={0}
        x={width / 2}
        y={height / 2}
        font-size="2rem"
        font-family="monospace"
    >
        <tspan x={width / 2} dy=".6em" text-anchor="middle" fill="white"
            >Your Score</tspan
        >
        <tspan x={width / 2} dy="1.2em" text-anchor="middle" fill="white"
            >{score}</tspan
        >
    </text>
    <text
        bind:this={startOverlay}
        opacity={0}
        x={width / 2}
        y={height / 2}
        font-size="2rem"
        font-family="monospace"
    >
        <tspan x={width / 2} dy=".6em" text-anchor="middle" fill="black"
            >START!</tspan
        >
    </text>
</svg>
<br />
<button style:width="{width}px" on:click={jump} bind:this={button}>
    Press to Start!!
</button>

<style>
    svg {
        background-color: white;
    }
    button {
        background-color: black;
        color: antiquewhite;
    }
</style>
