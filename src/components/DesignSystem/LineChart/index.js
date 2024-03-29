import React, { useState, useEffect, useRef } from 'react';
// import { withRouter, Link, Redirect } from 'react-router-dom';

// echarts
import * as echarts from 'echarts';

// css
import classes from './style_module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const LineChart = ({ title = 'Line Chart', chartData = [], color = ['#ff7c32', '#ffcb01', '#4bd0ce'], onclick }) => {
    const [option, setOption] = useState({
        title: {
            text: title,
            textStyle: {
                // color: '#999',
                // fontWeight: 'normal',
                fontSize: 14
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        color: color /* 折線圖的颜色 */,
        legend: {
            data: ['斷線', '資料過少', 'CT負值']
            // orient: 'vertical', // 垂直排列
            // right: -50, // 靠右側距離
            // top: 50 // 距離頂部的距離
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            show: true, // 工具列開關(下載、拖拽、放大、圖表盤等)
            feature: {
                saveAsImage: {},
                // dataView: {},
                dataZoom: {},
                magicType: {
                    title: {
                        // line: '折線圖',
                        // bar: '條形圖',
                        // stack: '堆疊圖',
                        // tiled: '堆疊圖',
                    },
                    option: {
                        line: {},
                        bar: {}
                    },
                    type: ['line', 'bar']
                }
            }
        },
        // dataZoom: [
        //     {   // 这个dataZoom组件，默认控制x轴。
        //         type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
        //         bottom: '-10px',
        //         start: 0,      // 左边在 0% 的位置。
        //         end: 100         // 右边在 100% 的位置。
        //     },
        // ],
        xAxis: {
            type: 'category',
            boundaryGap: false, // 座標軸兩邊留白
            // X 軸線 設定
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#B5B5B5',
                    width: 1
                }
            },
            // 每條X軸的線
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#e3e8eb',
                    width: 1
                }
            },
            // 刻度線
            axisTick: {
                show: true
            }
        },
        yAxis: {
            type: 'value',
            // Y 軸線 設定
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#B5B5B5',
                    width: 1
                }
            }
        },
        series: [
            {
                name: '斷線',
                type: 'line',
                // stack: 'Total',
                data: [
                    ['2022-06-15', 84],
                    ['2022-07-03', 92]
                ]
            }
        ]
    });
    const chartDOM = useRef();
    const initChart = () => {
        let chartLine = echarts.init(chartDOM.current);
        chartLine.clear();
        option && chartLine.setOption(option);
    };

    useEffect(() => {
        const myChart = echarts.init(chartDOM.current);
        myChart.setOption(option);

        const handleResize = () => {
            myChart.resize();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            myChart.dispose();
        };
    }, []);

    useEffect(() => {
        let chartLine = echarts.init(chartDOM.current);
        // 監聽點擊事件
        chartLine.on('click', params => {
            // params 包含了點擊的相關信息，例如數據索引、數據值等
            // 在這裡可以獲取點擊的參數，並進行相應的處理
            onclick(params);
        });
    }, []);

    useEffect(() => {
        option.series = chartData;
        option.color = color;
        setOption(option);
        initChart();
    }, [chartData]);

    return <div id="chartLine" ref={chartDOM} style={{ width: '100%', height: '100%' }} />;
};

export default LineChart;
