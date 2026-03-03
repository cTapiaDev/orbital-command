<script setup>
import { ref, onMounted, watch } from 'vue'
import * as d3 from 'd3'

const props = defineProps({
    rocket: { type: Object, required: true },
})

const chartRef = ref(null)

const getChartData = () => {
    const engines = props.rocket?.engines
    if (!engines) return []

    return [
        { name: 'Nivel del Mar', thrust: engines.thrust_sea_level?.kN || 0 },
        { name: 'Espacio', thrust: engines.thrust_vacuum?.kN || 0 },
    ]
}

// const engineData = [
//     { name: 'Nivel del Mar', thrust: 7607 },
//     { name: 'Espacio', thrust: 9340 },
//     { name: 'Aterrizaje', thrust: 3800 },
// ]

const drawChart = () => {
    const data = getChartData()
    if (data.length === 0) return

    const width = 600
    const height = 300
    const margin = { top: 20, right: 20, bottom: 40, left: 60 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const svg = d3.select(chartRef.value)
    svg.selectAll('*').remove()

    svg.attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .classed('w-full h-auto', true)

    const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`)

    const xScale = d3
        .scaleBand()
        .domain(data.map((d) => d.name)) // ['Nivel del Mar', ' Espacio', 'Aterrizaje']
        .range([0, innerWidth])
        .padding(0.3) // Este padding de d3 es el espacio entre elementos del gráfico

    const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.thrust)])
        .range([innerHeight, 0])

    // Dibujar Eje X
    const xAxis = d3.axisBottom(xScale)
    g.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(xAxis)
        .attr('color', '#94a3b8')
        .selectAll('text')
        .attr('font-size', '8px')
        .attr('font-family', 'Rajdhani')

    // Dibujar Eje Y
    const yAxis = d3.axisLeft(yScale).ticks(5)
    g.append('g')
        .call(yAxis)
        .attr('color', '#94a3b8')
        .selectAll('text')
        .attr('font-size', '8px')
        .attr('font-family', 'Rajdhani')

    // g.select('.domain').remove() // Nos permite quitar las líneas del medio

    // Dibujo de Barras
    g.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => xScale(d.name))
        .attr('width', xScale.bandwidth())
        .attr('y', (d) => yScale(d.thrust))
        .attr('height', (d) => innerHeight - yScale(d.thrust))
        .attr('fill', '#38bdf8')
        .style('transform', 'fill 0.3s ease')

    // Hover a la barra
    g.selectAll('.bar')
        .on('mouseenter', (event, d) => {
            d3.select(event.currentTarget).attr('fill', '#0ea5e9')
        })
        .on('mouseleave', (event, d) => {
            d3.select(event.currentTarget).attr('fill', '#38bdf8')
        })

    // Etiquetas
    g.selectAll('.label')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('x', (d) => xScale(d.name) + xScale.bandwidth() / 2)
        .attr('y', (d) => yScale(d.thrust) - 10)
        .attr('text-anchor', 'middle')
        .attr('fill', '#f8fafc')
        .attr('font-size', '10px')
        .attr('font-weight', 'bold')
        .attr('font-family', 'Rajdhani')
        .text((d) => `${d.thrust} kN`)
}

onMounted(() => {
    drawChart()
})

watch(
    () => props.rocket,
    () => {
        drawChart()
    },
    { deep: true },
)
</script>

<template>
    <div class="w-full bg-black/20 p-6 rounded-xl border border-white/5 relative">
        <h4 class="text-white font-bold mb-4 flex items-center gap-2">
            <font-awesome-icon icon="chart-bar" class="text-brand" />
            Rendimiento de Propulsión
        </h4>

        <svg ref="chartRef" class="w-full"></svg>
    </div>
</template>
