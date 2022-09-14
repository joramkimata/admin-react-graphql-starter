import { Divider, Paper } from '@mui/material'
import React from 'react'
import TitleBoxUi from '../../components/title-box/TitleBoxUi';
import Statistic from '../../components/statistics/Statistic';
import { AccountBox, Home, MonetizationOnTwoTone } from '@mui/icons-material';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts'

const options = {
    chart: {
        type: 'area'
    },
    title: {
        text: 'Historic and Estimated Worldwide Population Growth by Region'
    },
    subtitle: {
        text: 'Source: Wikipedia.org'
    },
    xAxis: {
        categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
        tickmarkPlacement: 'on',
        title: {
            enabled: false
        }
    },
    yAxis: {
        title: {
            text: 'Billions'
        },
        labels: {
            formatter: function () {
                return this.value / 1000;
            }
        }
    },
    tooltip: {
        split: true,
        valueSuffix: ' millions'
    },
    plotOptions: {
        area: {
            stacking: 'normal',
            lineColor: '#666666',
            lineWidth: 1,
            marker: {
                lineWidth: 1,
                lineColor: '#666666'
            }
        }
    },
    series: [{
        name: 'Asia',
        data: [502, 635, 809, 947, 1402, 3634, 5268]
    }, {
        name: 'Africa',
        data: [106, 107, 111, 133, 221, 767, 1766]
    }, {
        name: 'Europe',
        data: [163, 203, 276, 408, 547, 729, 628]
    }, {
        name: 'America',
        data: [18, 31, 54, 156, 339, 818, 1201]
    }, {
        name: 'Oceania',
        data: [2, 2, 2, 6, 13, 30, 46]
    }]
}

const optionx = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Browser market shares in January, 2018'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'Chrome',
            y: 61.41,
            sliced: true,
            selected: true
        }, {
            name: 'Internet Explorer',
            y: 11.84
        }, {
            name: 'Firefox',
            y: 10.85
        }, {
            name: 'Edge',
            y: 4.67
        }, {
            name: 'Safari',
            y: 4.18
        }, {
            name: 'Sogou Explorer',
            y: 1.64
        }, {
            name: 'Opera',
            y: 1.6
        }, {
            name: 'QQ',
            y: 1.2
        }, {
            name: 'Other',
            y: 2.61
        }]
    }]
};

function Dashboard() {



    return (
        <>
            <TitleBoxUi title='Dashboard' icon={<Home />}>
            </TitleBoxUi>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Paper sx={{ p: 2 }}>
                <div className='row'>
                    <div className='col-3'>
                        <Statistic title='Users' icon={<AccountBox fontSize='large' />} />
                    </div>

                </div>
            </Paper>

            <Divider sx={{ mt: 2, mb: 2 }} />

            <TitleBoxUi title='Reports' icon={<MonetizationOnTwoTone />}>
            </TitleBoxUi>

            <Divider sx={{ mt: 2, mb: 2 }} />


            <Paper elevation={12} sx={{ p: 2 }}>
                <div className='row'>
                    <div className='col-6'>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options}
                        />
                    </div>
                    <div className='col-6'>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={optionx}
                        />
                    </div>
                </div>
            </Paper>


        </>
    )
}

export default Dashboard
